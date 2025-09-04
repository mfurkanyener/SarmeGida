'use client';

import { useState } from 'react';
import { supabaseClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function NewPostPage() {
    const [locale, setLocale] = useState<'tr'|'en'>('tr');
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [body, setBody] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const router = useRouter();
    const [saving, setSaving] = useState(false);

    async function uploadImage(): Promise<string | null> {
        if (!file) return null;
        const fileName = `posts/${Date.now()}-${file.name}`;
        const { data, error } = await supabaseClient.storage.from('media').upload(fileName, file, { upsert: true });
        if (error) { console.error(error); return null; }
        const { data: pub } = supabaseClient.storage.from('media').getPublicUrl(data.path);
        return pub.publicUrl ?? null;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        const img = await uploadImage();
        const { error } = await supabaseClient.from('posts').insert([{
            locale, title, slug, excerpt, body, cover_url: img, visible: true
        }]);
        setSaving(false);
        if (!error) router.push('/admin/posts');
        else alert(error.message);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl bg-white p-4 rounded-lg border">
            <h2 className="text-xl font-semibold mb-2">Yeni Blog Yazısı</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                    <span className="text-sm">Dil</span>
                    <select value={locale} onChange={(e) => setLocale(e.target.value as 'tr'|'en')}
                            className="w-full border rounded p-2">
                        <option value="tr">Türkçe</option>
                        <option value="en">English</option>
                    </select>
                </label>

                <label className="block">
                    <span className="text-sm">Slug</span>
                    <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full border rounded p-2"/>
                </label>
            </div>

            <label className="block">
                <span className="text-sm">Başlık</span>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded p-2"/>
            </label>

            <label className="block">
                <span className="text-sm">Kısa Açıklama</span>
                <input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="w-full border rounded p-2"/>
            </label>

            <label className="block">
                <span className="text-sm">İçerik</span>
                <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={8}
                          className="w-full border rounded p-2"/>
            </label>

            <label className="block">
                <span className="text-sm">Fotoğraf</span>
                <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)}/>
            </label>

            <button disabled={saving}
                    className="px-4 py-2 rounded bg-[var(--olive-700)] text-white disabled:opacity-50">
                {saving ? 'Kaydediliyor…' : 'Kaydet'}
            </button>
        </form>
    );
}