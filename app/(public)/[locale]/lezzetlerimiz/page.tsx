// app/(public)/[locale]/lezzetlerimiz/page.tsx
import { supabaseServerRead } from '@/lib/supabase/server';
import HeaderShell from '@layout/HeaderShell';
import GenericHero from '@/app/components/hero/GenericHero';
import {getTranslations} from 'next-intl/server';

type PageProps = {
    params: { locale: string } | Promise<{ locale: string }>;
};

type ProductListRow = {
    product_id: string;
    image_url: string | null;
    name: string;
    slug: string;
    excerpt: string | null;
    locale: 'tr'|'en';
};

export default async function ProductsListPage({ params }: PageProps) {
    const { locale } = await Promise.resolve(params);
    const loc = (locale === 'en') ? 'en' : 'tr';

    const t = await getTranslations({ locale: loc, namespace: 'product.hero' });

    const supabase = await supabaseServerRead();
    const { data, error } = await supabase
        .from('products_public')
        .select('product_id, image_url, name, slug, excerpt, locale')
        .eq('locale', loc)
        .order('created_at', { ascending: false })
        .returns<ProductListRow[]>();

    return (
        <>
            <HeaderShell height={420}>
                <GenericHero title={t('title')} subtitle={t('subtitle')} />
            </HeaderShell>
        <main className="container-inline py-10" style={{ maxWidth: 'var(--container-max)' }}>

            {error && (
                <p className="mt-6 text-red-700">Hata: {error.message}</p>
            )}

            {!error && (!data || data.length === 0) && (
                <p className="mt-6 text-[color:var(--muted)]">Şu an listelenecek ürün yok.</p>
            )}

            {!error && data && data.length > 0 && (
                <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((p) => (
                        <li key={p.slug} className="rounded-2xl border bg-white overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
                            <a href={`/${loc}/lezzetlerimiz/${p.slug}`} className="block">
                                {p.image_url ? (
                                    <img
                                        src={p.image_url}
                                        alt={p.name}
                                        className="w-full aspect-[4/3] object-cover"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full aspect-[4/3] bg-[color:var(--card-bg)] grid place-items-center text-[color:var(--muted)]">
                                        Görsel yok
                                    </div>
                                )}
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg">{p.name}</h3>
                                    {p.excerpt && <p className="mt-1 text-[color:var(--muted)]">{p.excerpt}</p>}
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </main>
        </>
    );
}