// app/(admin)/[locale]/admin/products/page.tsx
import {supabaseServerRead} from '@/lib/supabase/server';
import Link from 'next/link';

type Locale = 'tr'|'en';

type ProductPublicRow = {
    product_id: string;
    image_url: string | null;
    visible: boolean;
    sort: number;
    created_at: string;
    locale: Locale;
    name: string;
    slug: string;
};

type PageProps = {
    params: { locale: string } | Promise<{ locale: string }>;
};

export default async function AdminProductsPage({ params }: PageProps) {
    const { locale } = await Promise.resolve(params);
    const loc: Locale = locale === 'en' ? 'en' : 'tr';

    const supabase = await supabaseServerRead();
    const { data, error } = await supabase
        .from('products_public')
        .select('product_id, image_url, visible, sort, created_at, locale, name, slug')
        .in('locale', ['tr', 'en'])
        .order('sort', { ascending: false })
        .order('created_at', { ascending: false });

    if (error) {
        return (
            <main className="container-inline py-10" style={{ maxWidth: 'var(--container-max)' }}>
                <div className="rounded-2xl border bg-white p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="font-heading text-2xl text-[color:var(--olive-700)]">Ürünler</h1>
                        <Link href={`/${loc}/admin/products/new`} className="btn btn-olive">+ Yeni Ürün</Link>
                    </div>
                    <p className="text-red-600">Hata: {error.message}</p>
                </div>
            </main>
        );
    }

    // Aynı product_id için TR/EN satırlarını tek satırda topla
    const grouped = new Map<string, {
        product_id: string;
        image_url: string | null;
        visible: boolean;
        sort: number;
        created_at: string;
        tr?: { name: string; slug: string };
        en?: { name: string; slug: string };
    }>();

    (data ?? []).forEach((row: ProductPublicRow) => {
        const g = grouped.get(row.product_id) ?? {
            product_id: row.product_id,
            image_url: row.image_url,
            visible: row.visible,
            sort: row.sort,
            created_at: row.created_at,
        };
        if (row.locale === 'tr') g.tr = { name: row.name, slug: row.slug };
        if (row.locale === 'en') g.en = { name: row.name, slug: row.slug };
        // image/visible/sort değişmişse en son geleni baz alır; genelde aynı olur
        g.image_url = row.image_url ?? g.image_url;
        g.visible = row.visible;
        g.sort = row.sort;
        g.created_at = row.created_at;
        grouped.set(row.product_id, g);
    });

    const rows = Array.from(grouped.values());

    return (
        <main className="container-inline py-10" style={{ maxWidth: 'var(--container-max)' }}>
            <div className="rounded-2xl border bg-white p-4 md:p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
                {/* Başlık + aksiyon */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="font-heading text-2xl text-[color:var(--olive-700)]">Ürünler</h1>
                    <Link href={`/${loc}/admin/products/new`} className="btn btn-olive">
                        + Yeni Ürün
                    </Link>
                </div>

                {/* Liste */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-[720px]">
                        <thead>
                        <tr className="bg-[color:var(--card-bg)]/60 text-left">
                            <th className="p-3 border">Görsel</th>
                            <th className="p-3 border">TR</th>
                            <th className="p-3 border">EN</th>
                            <th className="p-3 border">Görünür</th>
                            <th className="p-3 border">Sıra</th>
                            <th className="p-3 border w-48">İşlemler</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-6 text-center text-[color:var(--muted)]">
                                    Henüz ürün eklenmemiş.
                                </td>
                            </tr>
                        ) : (
                            rows.map((r) => (
                                <tr key={r.product_id} className="bg-white">
                                    <td className="p-3 border align-top">
                                        {r.image_url ? (
                                            <img
                                                src={r.image_url}
                                                alt={r.tr?.name || r.en?.name || 'Ürün görseli'}
                                                className="w-20 h-16 object-cover rounded-md border"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-20 h-16 grid place-items-center rounded-md border bg-[color:var(--card-bg)] text-[color:var(--muted)] text-xs">
                                                Görsel yok
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-3 border align-top">
                                        {r.tr ? (
                                            <>
                                                <div className="font-semibold">{r.tr.name}</div>
                                                <div className="text-xs text-[color:var(--muted)]">/{'tr'}/lezzetlerimiz/{r.tr.slug}</div>
                                            </>
                                        ) : (
                                            <span className="text-[color:var(--muted)] text-sm">—</span>
                                        )}
                                    </td>
                                    <td className="p-3 border align-top">
                                        {r.en ? (
                                            <>
                                                <div className="font-semibold">{r.en.name}</div>
                                                <div className="text-xs text-[color:var(--muted)]">/{'en'}/lezzetlerimiz/{r.en.slug}</div>
                                            </>
                                        ) : (
                                            <span className="text-[color:var(--muted)] text-sm">—</span>
                                        )}
                                    </td>
                                    <td className="p-3 border align-top">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${r.visible ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                        {r.visible ? 'Görünür' : 'Gizli'}
                      </span>
                                    </td>
                                    <td className="p-3 border align-top">{r.sort}</td>
                                    <td className="p-3 border align-top">
                                        <div className="flex flex-wrap gap-3">
                                            <Link
                                                href={`/${loc}/admin/products/${r.product_id}`}
                                                className="underline text-blue-700"
                                            >
                                                Düzenle
                                            </Link>
                                            {/* İstersen toggle/sil API’leri hazır olduğunda açabilirsin
                        <form action={`/${loc}/api/admin/products/${r.product_id}/toggle`} method="post">
                          <button className="underline">{r.visible ? 'Gizle' : 'Göster'}</button>
                        </form>
                        <form action={`/${loc}/api/admin/products/${r.product_id}/delete`} method="post">
                          <button className="underline text-red-600">Sil</button>
                        </form>
                        */}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}