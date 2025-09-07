'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { supabaseClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

type Fields = {
    title: string;
    slug: string;
    excerpt: string;
    body: string;
};

const empty: Fields = { title: '', slug: '', excerpt: '', body: '' };

export default function NewPostPage() {
    const router = useRouter();

    // 🔤 İki dil için alanlar
    const [tr, setTR] = useState<Fields>({ ...empty });
    const [en, setEN] = useState<Fields>({ ...empty });

    // 🗂 Sekme
    const [tab, setTab] = useState<'tr' | 'en'>('tr');

    // 📷 Görsel
    const [file, setFile] = useState<File | null>(null);

    // ⏳ durum
    const [saving, setSaving] = useState(false);

    // ---- helpers ----
    const patch =
        (loc: 'tr' | 'en', key: keyof Fields) =>
            (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                const val = e.target.value; // ❗ e.target.value korunuyor
                if (loc === 'tr') setTR((p) => ({ ...p, [key]: val }));
                else setEN((p) => ({ ...p, [key]: val }));
            };

    async function uploadImage(): Promise<string | null> {
        if (!file) return null;
        const fileName = `posts/${Date.now()}-${file.name}`;
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

    const allFilled = (x: Fields) =>
        x.title.trim() && x.slug.trim() && x.excerpt.trim() && x.body.trim();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        // Zorunlu alan kontrolü (iki dil birden)
        if (!allFilled(tr) || !allFilled(en)) {
            alert('Lütfen TR ve EN için tüm alanları doldurun.');
            return;
        }

        setSaving(true);

        const img = await uploadImage();

        // 👇 Tek çağrıda iki satır ekliyoruz
        const { error } = await supabaseClient.from('posts').insert([
            { locale: 'tr', ...tr, cover_url: img, visible: true },
            { locale: 'en', ...en, cover_url: img, visible: true },
        ]);

        setSaving(false);

        if (error) {
            alert(error.message);
            return;
        }

        router.push('/admin/posts');
    }

    // ---- UI ----
    return (
        <main className="container-inline py-10 flex justify-center">
            <div
                className="w-full bg-white rounded-2xl border"
                style={{
                    maxWidth: 'var(--container-max)',
                    padding: 'clamp(var(--gutter-min), 5vw, var(--gutter))',
                    boxShadow: 'var(--shadow-card)',
                }}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-heading text-[color:var(--olive-700)]">
                            Yeni Blog Yazısı (TR & EN)
                        </h2>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setTab('tr')}
                                className={`px-4 py-2 rounded-full border transition ${
                                    tab === 'tr'
                                        ? 'bg-[var(--olive-700)] text-white'
                                        : 'bg-white'
                                }`}
                            >
                                TR
                            </button>
                            <button
                                type="button"
                                onClick={() => setTab('en')}
                                className={`px-4 py-2 rounded-full border transition ${
                                    tab === 'en'
                                        ? 'bg-[var(--olive-700)] text-white'
                                        : 'bg-white'
                                }`}
                            >
                                EN
                            </button>
                        </div>
                    </div>

                    {/* TR Formu */}
                    <section className={tab === 'tr' ? 'block space-y-5' : 'hidden'}>
                        <h3 className="text-lg font-semibold text-[color:var(--olive-700)]">
                            Türkçe İçerik
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <label className="block space-y-1">
                <span className="text-sm font-medium text-[color:var(--muted)]">
                  Başlık
                </span>
                                <input
                                    required
                                    value={tr.title}
                                    onChange={patch('tr', 'title')}
                                    className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-[var(--olive-600)] focus:outline-none"
                                />
                            </label>

                            <label className="block space-y-1">
                <span className="text-sm font-medium text-[color:var(--muted)]">
                  Slug
                </span>
                                <input
                                    required
                                    value={tr.slug}
                                    onChange={patch('tr', 'slug')}
                                    className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-[var(--olive-600)] focus:outline-none"
                                />
                            </label>
                        </div>

                        <label className="block space-y-1">
              <span className="text-sm font-medium text-[color:var(--muted)]">
                Kısa Açıklama
              </span>
                            <input
                                required
                                value={tr.excerpt}
                                onChange={patch('tr', 'excerpt')}
                                className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-[var(--olive-600)] focus:outline-none"
                            />
                        </label>

                        <label className="block space-y-1">
              <span className="text-sm font-medium text-[color:var(--muted)]">
                İçerik
              </span>
                            <textarea
                                required
                                rows={8}
                                value={tr.body}
                                onChange={patch('tr', 'body')}
                                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[var(--olive-600)] focus:outline-none"
                            />
                        </label>
                    </section>

                    {/* EN Formu */}
                    <section className={tab === 'en' ? 'block space-y-5' : 'hidden'}>
                        <h3 className="text-lg font-semibold text-[color:var(--olive-700)]">
                            English Content
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <label className="block space-y-1">
                <span className="text-sm font-medium text-[color:var(--muted)]">
                  Title
                </span>
                                <input
                                    required
                                    value={en.title}
                                    onChange={patch('en', 'title')}
                                    className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-[var(--olive-600)] focus:outline-none"
                                />
                            </label>

                            <label className="block space-y-1">
                <span className="text-sm font-medium text-[color:var(--muted)]">
                  Slug
                </span>
                                <input
                                    required
                                    value={en.slug}
                                    onChange={patch('en', 'slug')}
                                    className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-[var(--olive-600)] focus:outline-none"
                                />
                            </label>
                        </div>

                        <label className="block space-y-1">
              <span className="text-sm font-medium text-[color:var(--muted)]">
                Excerpt
              </span>
                            <input
                                required
                                value={en.excerpt}
                                onChange={patch('en', 'excerpt')}
                                className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-[var(--olive-600)] focus:outline-none"
                            />
                        </label>

                        <label className="block space-y-1">
              <span className="text-sm font-medium text-[color:var(--muted)]">
                Body
              </span>
                            <textarea
                                required
                                rows={8}
                                value={en.body}
                                onChange={patch('en', 'body')}
                                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[var(--olive-600)] focus:outline-none"
                            />
                        </label>
                    </section>

                    {/* Fotoğraf */}
                    <label className="block space-y-1">
            <span className="text-sm font-medium text-[color:var(--muted)]">
              Kapak Fotoğrafı
            </span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-[var(--olive-700)] file:px-4 file:py-2 file:text-white hover:file:bg-[var(--olive-600)]"
                        />
                    </label>

                    {/* Kaydet */}
                    <div className="flex justify-end">
                        <button className="btn btn-olive px-6 disabled:opacity-50" disabled={saving}>
                            {saving ? 'Kaydediliyor…' : 'Kaydet'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}