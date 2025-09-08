'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createPost } from '@/app/actions/blog';
import { supabaseClient } from '@/lib/supabase/client';

export default function AdminNewPostPage() {
    const router = useRouter();
    const { locale } = useParams<{ locale: 'tr'|'en' }>();

    const [coverFile, setCoverFile] = useState<File|null>(null);
    const [coverUrl, setCoverUrl] = useState('');
    const [visible, setVisible] = useState(true);
    const [sort, setSort] = useState(0);
    const [tags, setTags] = useState('');

    const [tr, setTR] = useState({ title:'', slug:'', excerpt:'', body:'' });
    const [en, setEN] = useState({ title:'', slug:'', excerpt:'', body:'' });

    const [saving, setSaving] = useState(false);
    const [err, setErr] = useState<string|null>(null);

    async function uploadCoverIfNeeded(): Promise<string | undefined> {
        // URL yazılmışsa onu kullan
        if (coverUrl.trim()) return coverUrl.trim();
        // Dosya seçilmişse Supabase Storage’a yükle
        if (coverFile) {
            const fileName = `posts/${Date.now()}-${coverFile.name || 'cover'}`;
            const { data, error } = await supabaseClient
                .storage.from('media')
                .upload(fileName, coverFile, { upsert: true });
            if (error) throw error;
            const { data: pub } = supabaseClient.storage.from('media').getPublicUrl(data.path);
            return pub.publicUrl || undefined;
        }
        return undefined;
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true); setErr(null);
        try {
            const finalCoverUrl = await uploadCoverIfNeeded();

            await createPost({
                coverUrl: finalCoverUrl, // 👈 sadece URL gidiyor
                visible,
                sort,
                tags: tags ? tags.split(',').map(s=>s.trim()).filter(Boolean) : [],
                // slug'ları ufak temizlikle gönder (opsiyonel)
                tr: { ...tr, slug: tr.slug.trim() },
                en: { ...en, slug: en.slug.trim() },
            });

            router.replace(`/${locale}/admin/posts`);
        } catch (err: unknown) {
            setErr(err instanceof Error ? err.message : 'Kayıt başarısız');
        } finally {
            setSaving(false);
        }
    }

    return (
        <main className="container-inline py-10 flex justify-center">
            <div className="w-full bg-white rounded-2xl border"
                 style={{ maxWidth: 'var(--container-max)', boxShadow: 'var(--shadow-card)',
                     padding: 'clamp(var(--gutter-min), 5vw, var(--gutter))' }}>
                <h1 className="font-heading text-2xl text-[color:var(--olive-700)] mb-6">Yeni Yazı</h1>

                <form onSubmit={onSubmit} className="space-y-8">
                    <section className="grid gap-6 md:grid-cols-2">
                        <label className="block space-y-1">
                            <span className="text-sm text-[color:var(--muted)]">Kapak (dosya)</span>
                            <input type="file" accept="image/*" onChange={(e)=>setCoverFile(e.target.files?.[0] ?? null)} />
                        </label>
                        <label className="block space-y-1">
                            <span className="text-sm text-[color:var(--muted)]">Kapak URL (opsiyonel)</span>
                            <input className="w-full rounded border p-2" value={coverUrl} onChange={(e)=>setCoverUrl(e.target.value)} />
                        </label>
                    </section>

                    <section className="grid gap-6 md:grid-cols-3">
                        <label className="block space-y-1">
                            <span className="text-sm text-[color:var(--muted)]">Sıra</span>
                            <input type="number" className="w-full rounded border p-2"
                                   value={sort} onChange={(e)=>setSort(parseInt(e.target.value||'0',10))}/>
                        </label>
                        <label className="flex items-center gap-3">
                            <input type="checkbox" checked={visible} onChange={(e)=>setVisible(e.target.checked)} />
                            <span>Görünür</span>
                        </label>
                        <label className="block space-y-1">
                            <span className="text-sm text-[color:var(--muted)]">Etiketler (virgülle)</span>
                            <input className="w-full rounded border p-2"
                                   value={tags} onChange={(e)=>setTags(e.target.value)} />
                        </label>
                    </section>

                    <section className="space-y-3">
                        <h2 className="font-heading text-xl text-[color:var(--olive-700)]">Türkçe</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <input className="rounded border p-2" placeholder="Başlık" value={tr.title} onChange={(e)=>setTR({...tr, title:e.target.value})} required/>
                            <input className="rounded border p-2" placeholder="Slug"   value={tr.slug}  onChange={(e)=>setTR({...tr, slug:e.target.value})}  required/>
                        </div>
                        <input className="w-full rounded border p-2" placeholder="Kısa açıklama" value={tr.excerpt} onChange={(e)=>setTR({...tr, excerpt:e.target.value})}/>
                        <textarea className="w-full rounded border p-2" rows={5} placeholder="Metin" value={tr.body} onChange={(e)=>setTR({...tr, body:e.target.value})}/>
                    </section>

                    <section className="space-y-3">
                        <h2 className="font-heading text-xl text-[color:var(--olive-700)]">English</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <input className="rounded border p-2" placeholder="Title" value={en.title} onChange={(e)=>setEN({...en, title:e.target.value})} required/>
                            <input className="rounded border p-2" placeholder="Slug"  value={en.slug}  onChange={(e)=>setEN({...en, slug:e.target.value})}  required/>
                        </div>
                        <input className="w-full rounded border p-2" placeholder="Excerpt" value={en.excerpt} onChange={(e)=>setEN({...en, excerpt:e.target.value})}/>
                        <textarea className="w-full rounded border p-2" rows={5} placeholder="Body" value={en.body} onChange={(e)=>setEN({...en, body:e.target.value})}/>
                    </section>

                    {err && <p className="text-red-600">{err}</p>}
                    <div className="flex justify-end">
                        <button className="btn btn-olive px-6" disabled={saving}>
                            {saving ? 'Kaydediliyor…' : 'Kaydet'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}