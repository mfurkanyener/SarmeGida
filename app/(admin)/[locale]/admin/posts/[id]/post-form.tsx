'use client';

import { useState } from 'react';
import { supabaseClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import {Post} from "@/app/types/cms";

export default function EditPostForm({ initial }: { initial: Post }) {
    const [form, setForm] = useState<Post>(initial);
    const [file, setFile] = useState<File | null>(null);
    const router = useRouter();

    const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value as 'tr' | 'en';
        patch('locale', val);
    };

    function patch<K extends keyof Post>(key: K, val: Post[K]) {
        setForm(prev => ({ ...prev, [key]: val }));
    }

    async function uploadImage(): Promise<string | null> {
        if (!file) return null;
        const fileName = `posts/${Date.now()}-${file.name}`;
        const { data, error } = await supabaseClient.storage.from('media').upload(fileName, file, { upsert: true });
        if (error) { console.error(error); return null; }
        const { data: pub } = supabaseClient.storage.from('media').getPublicUrl(data.path);
        return pub.publicUrl ?? null;
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        const img = await uploadImage();
        const payload = { ...form, ...(img ? { cover_url: img } : {}) };
        // updated_at server trigger ile de set edilebilir, burada bırakıyorum.
        const { error } = await supabaseClient.from('posts').update(payload).eq('id', form.id);
        if (!error) router.push('/admin/posts');
    }

    return (
        <form onSubmit={onSubmit} className="space-y-4 max-w-2xl bg-white p-4 rounded-lg border">
            <h2 className="text-xl font-semibold">Blog Düzenle</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                    <span className="text-sm">Dil</span>
                    <select value={form.locale} onChange={handleLocaleChange}
                            className="w-full border rounded p-2">
                        <option value="tr">Türkçe</option>
                        <option value="en">English</option>
                    </select>
                </label>
                <label className="block">
                    <span className="text-sm">Slug</span>
                    <input value={form.slug} onChange={(e) => patch('slug', e.target.value)} className="w-full border rounded p-2"/>
                </label>
            </div>

            <label className="block">
                <span className="text-sm">Başlık</span>
                <input value={form.title} onChange={(e) => patch('title', e.target.value)} className="w-full border rounded p-2"/>
            </label>

            <label className="block">
                <span className="text-sm">Kısa Açıklama</span>
                <input value={form.excerpt ?? ''} onChange={(e) => patch('excerpt', e.target.value)} className="w-full border rounded p-2"/>
            </label>

            <label className="block">
                <span className="text-sm">İçerik</span>
                <textarea value={form.body ?? ''} onChange={(e) => patch('body', e.target.value)} rows={8}
                          className="w-full border rounded p-2"/>
            </label>

            <label className="block">
                <span className="text-sm">Yeni Fotoğraf</span>
                <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)}/>
            </label>

            <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2">
                    <input type="checkbox" checked={form.visible} onChange={(e) => patch('visible', e.target.checked)} />
                    <span>Görünür</span>
                </label>
                <button className="ml-auto px-4 py-2 rounded bg-[var(--olive-700)] text-white">Kaydet</button>
            </div>
        </form>
    );
}