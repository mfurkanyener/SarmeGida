'use client';

import { useState } from 'react';
import { createProduct, type NewProductInput } from '@/app/actions/products';
import { useRouter, useParams } from 'next/navigation';

const N_KEYS = ['kcal', 'carbs_g', 'protein_g', 'fat_g'] as const;
type NKey = typeof N_KEYS[number];

export default function AdminNewProductPage() {
    const router = useRouter();
    const { locale } = useParams<{ locale: 'tr' | 'en' }>();

    // base
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState('');
    const [visible, setVisible] = useState(true);
    const [sort, setSort] = useState(0);
    const [nutrition, setNutrition] = useState<Record<NKey, number>>({
        kcal: 0,
        carbs_g: 0,
        protein_g: 0,
        fat_g: 0
    });

    // TR
    const [tr, setTR] = useState({ name: '', slug: '', excerpt: '', body: '', ingredients: '' });
    // EN
    const [en, setEN] = useState({ name: '', slug: '', excerpt: '', body: '', ingredients: '' });

    const [saving, setSaving] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setErr(null);

        const payload: NewProductInput = {
            imageFile: imageFile ?? undefined,
            imageUrl: imageUrl || undefined,
            visible,
            sort,
            nutrition,
            tr: {
                name: tr.name,
                slug: tr.slug,
                excerpt: tr.excerpt,
                body: tr.body,
                ingredients: tr.ingredients.split(',').map(s => s.trim()).filter(Boolean),
            },
            en: {
                name: en.name,
                slug: en.slug,
                excerpt: en.excerpt,
                body: en.body,
                ingredients: en.ingredients.split(',').map(s => s.trim()).filter(Boolean),
            },
        };

        try {
            await createProduct(payload);
            router.replace(`/${locale}/admin/products`);
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            setErr(msg || 'Kayıt başarısız');
        } finally {
            setSaving(false);
        }
    }

    return (
        <main className="container-inline py-10 flex justify-center">
            <div
                className="w-full bg-white rounded-2xl border"
                style={{
                    maxWidth: 'var(--container-max)',
                    boxShadow: 'var(--shadow-card)',
                    padding: 'clamp(var(--gutter-min), 5vw, var(--gutter))',
                }}
            >
                <h1 className="font-heading text-2xl text-[color:var(--olive-700)] mb-6">
                    Yeni Ürün
                </h1>

                <form onSubmit={onSubmit} className="space-y-8">
                    {/* Görsel */}
                    <section className="grid gap-6 md:grid-cols-2">
                        <label className="block space-y-1">
                            <span className="text-sm text-[color:var(--muted)]">Görsel (dosya)</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                            />
                        </label>
                        <label className="block space-y-1">
                            <span className="text-sm text-[color:var(--muted)]">Görsel URL (opsiyonel)</span>
                            <input
                                className="w-full rounded border p-2"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                        </label>
                    </section>

                    {/* Base ayarlar */}
                    <section className="grid gap-6 md:grid-cols-3">
                        <label className="block space-y-1">
                            <span className="text-sm text-[color:var(--muted)]">Sıra</span>
                            <input
                                type="number"
                                className="w-full rounded border p-2"
                                value={sort}
                                onChange={(e) => setSort(parseInt(e.target.value || '0', 10))}
                            />
                        </label>
                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={visible}
                                onChange={(e) => setVisible(e.target.checked)}
                            />
                            <span>Görünür</span>
                        </label>
                        <div />
                        <div className="md:col-span-3 grid gap-4 md:grid-cols-4">
                            {N_KEYS.map((k) => (
                                <label key={k} className="block space-y-1">
                                    <span className="text-sm text-[color:var(--muted)]">{k}</span>
                                    <input
                                        type="number"
                                        className="w-full rounded border p-2"
                                        value={nutrition[k] ?? 0}
                                        onChange={(e) =>
                                            setNutrition((prev) => ({
                                                ...prev,
                                                [k]: Number(e.target.value),
                                            }))
                                        }
                                    />
                                </label>
                            ))}
                        </div>
                    </section>

                    {/* TR */}
                    <section className="space-y-3">
                        <h2 className="font-heading text-xl text-[color:var(--olive-700)]">Türkçe</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <input
                                className="rounded border p-2"
                                placeholder="Ad"
                                value={tr.name}
                                onChange={(e) => setTR({ ...tr, name: e.target.value })}
                                required
                            />
                            <input
                                className="rounded border p-2"
                                placeholder="Slug"
                                value={tr.slug}
                                onChange={(e) => setTR({ ...tr, slug: e.target.value })}
                                required
                            />
                        </div>
                        <input
                            className="w-full rounded border p-2"
                            placeholder="Kısa açıklama"
                            value={tr.excerpt}
                            onChange={(e) => setTR({ ...tr, excerpt: e.target.value })}
                        />
                        <textarea
                            className="w-full rounded border p-2"
                            rows={4}
                            placeholder="Uzun açıklama"
                            value={tr.body}
                            onChange={(e) => setTR({ ...tr, body: e.target.value })}
                        />
                        <input
                            className="w-full rounded border p-2"
                            placeholder="İçindekiler (virgülle ayır)"
                            value={tr.ingredients}
                            onChange={(e) => setTR({ ...tr, ingredients: e.target.value })}
                        />
                    </section>

                    {/* EN */}
                    <section className="space-y-3">
                        <h2 className="font-heading text-xl text-[color:var(--olive-700)]">English</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <input
                                className="rounded border p-2"
                                placeholder="Name"
                                value={en.name}
                                onChange={(e) => setEN({ ...en, name: e.target.value })}
                                required
                            />
                            <input
                                className="rounded border p-2"
                                placeholder="Slug"
                                value={en.slug}
                                onChange={(e) => setEN({ ...en, slug: e.target.value })}
                                required
                            />
                        </div>
                        <input
                            className="w-full rounded border p-2"
                            placeholder="Excerpt"
                            value={en.excerpt}
                            onChange={(e) => setEN({ ...en, excerpt: e.target.value })}
                        />
                        <textarea
                            className="w-full rounded border p-2"
                            rows={4}
                            placeholder="Body"
                            value={en.body}
                            onChange={(e) => setEN({ ...en, body: e.target.value })}
                        />
                        <input
                            className="w-full rounded border p-2"
                            placeholder="Ingredients (comma separated)"
                            value={en.ingredients}
                            onChange={(e) => setEN({ ...en, ingredients: e.target.value })}
                        />
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