'use client';

import { useState, useRef } from 'react';
import { supabaseClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Post } from '@/app/types/cms';

/** Türkçe destekli güvenli slug üretimi */
function slugifyTR(s: string): string {
    return (s ?? '')
        .toString()
        .normalize('NFKD')                     // aksan ayrıştır
        .replace(/ğ/g, 'g')
        .replace(/Ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/Ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/Ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/İ/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/Ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/Ç/g, 'c')
        .replace(/[^\w\s-]/g, '')              // harf/rakam/altçizgi/boşluk/tire dışını at
        .trim()
        .replace(/\s+/g, '-')                  // boşluk → -
        .replace(/-+/g, '-')                   // çoklu - → tek -
        .replace(/^[-_]+|[-_]+$/g, '')         // baş/son -/_ temizle
        .toLowerCase();
}

export default function EditPostForm({ initial }: { initial: Post }) {
    const [form, setForm] = useState<Post>(initial);
    const [file, setFile] = useState<File | null>(null);
    const router = useRouter();

    // Kullanıcı slug alanını manuel düzenledi mi? Başlıktan otomatik doldurmayı kontrol etmek için.
    const slugTouchedRef = useRef(false);

    function patch<K extends keyof Post>(key: K, val: Post[K]) {
        setForm((prev) => ({ ...prev, [key]: val }));
    }

    const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value as 'tr' | 'en';
        patch('locale', val);
    };

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        patch('title', title);
        // Slug alanına kullanıcı dokunmadıysa başlıktan üret
        if (!slugTouchedRef.current) {
            patch('slug', slugifyTR(title) as Post['slug']);
        }
    };

    const onSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        slugTouchedRef.current = true;
        patch('slug', e.target.value as Post['slug']);
    };

    const onSlugBlur = () => {
        // Odak kaybında normalize et
        patch('slug', slugifyTR(String(form.slug)) as Post['slug']);
    };

    async function uploadImage(): Promise<string | null> {
        if (!file) return null;
        const safeName = file.name.replace(/\s+/g, '-');
        const fileName = `posts/${Date.now()}-${safeName}`;
        const { data, error } = await supabaseClient.storage
            .from('media')
            .upload(fileName, file, { upsert: true });
        if (error) {
            console.error(error);
            return null;
        }
        const { data: pub } = supabaseClient.storage.from('media').getPublicUrl(data.path);
        return pub.publicUrl ?? null;
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        // Son kez garanti altına al
        const normalizedSlug = slugifyTR(String(form.slug)) as Post['slug'];
        const img = await uploadImage();

        const payload: Partial<Post> = {
            ...form,
            slug: normalizedSlug,
            // metinlerde istemeden baş/son boşluk bırakılmasın
            title: String(form.title ?? '').trim(),
            excerpt: form.excerpt ? String(form.excerpt).trim() : null,
            body: form.body ? String(form.body).trim() : null,
            ...(img ? { cover_url: img } : {}),
        };

        const { error } = await supabaseClient
            .from('posts')
            .update(payload)
            .eq('id', form.id);

        if (error) {
            console.error(error);
            alert(error.message);
            return;
        }
        router.push('/admin/posts');
    }

    return (
        <form onSubmit={onSubmit} className="space-y-4 max-w-2xl bg-white p-4 rounded-lg border">
            <h2 className="text-xl font-semibold">Blog Düzenle</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                    <span className="text-sm">Dil</span>
                    <select
                        value={form.locale}
                        onChange={handleLocaleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="tr">Türkçe</option>
                        <option value="en">English</option>
                    </select>
                </label>

                <label className="block">
                    <span className="text-sm">Slug</span>
                    <input
                        value={form.slug}
                        onChange={onSlugChange}
                        onBlur={onSlugBlur}
                        className="w-full border rounded p-2"
                        inputMode="url"
                        pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                        title="Küçük harf, rakam ve tire kullanın. Örn: stuffed-vine-leaves"
                        placeholder="ornegin-yazinizin-basligi"
                    />
                </label>
            </div>

            <label className="block">
                <span className="text-sm">Başlık</span>
                <input
                    value={form.title}
                    onChange={onTitleChange}
                    className="w-full border rounded p-2"
                />
            </label>

            <label className="block">
                <span className="text-sm">Kısa Açıklama</span>
                <input
                    value={form.excerpt ?? ''}
                    onChange={(e) => patch('excerpt', e.target.value)}
                    className="w-full border rounded p-2"
                />
            </label>

            <label className="block">
                <span className="text-sm">İçerik</span>
                <textarea
                    value={form.body ?? ''}
                    onChange={(e) => patch('body', e.target.value)}
                    rows={8}
                    className="w-full border rounded p-2"
                />
            </label>

            <label className="block">
                <span className="text-sm">Yeni Fotoğraf</span>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
            </label>

            <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={form.visible}
                        onChange={(e) => patch('visible', e.target.checked)}
                    />
                    <span>Görünür</span>
                </label>
                <button className="ml-auto px-4 py-2 rounded bg-[var(--olive-700)] text-white">
                    Kaydet
                </button>
            </div>
        </form>
    );
}