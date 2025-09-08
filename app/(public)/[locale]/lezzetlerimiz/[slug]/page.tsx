import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/products';
import { supabaseServerRead } from '@/lib/supabase/server';
import ProductDetailCard from '@/app/components/product/ProductDetailCard';
import { adaptToDetailProps } from '@/lib/product-adapter';
import SetLangOverride from './SetLangOverride';
import HeaderShell from "@layout/HeaderShell";
import GenericHero from "@/app/components/hero/GenericHero";
import {getTranslations} from "next-intl/server";

type ParamsMaybePromise =
    | { params: { locale: string; slug: string } }
    | Promise<{ params: { locale: string; slug: string } }>;

export default async function ProductDetailPage(props: ParamsMaybePromise) {
    const { params } = await Promise.resolve(props);
    const locale = (params?.locale === 'en' ? 'en' : 'tr') as 'tr' | 'en';
    const slug = params?.slug ?? '';

    const loc = (locale === 'en') ? 'en' : 'tr';

    const t = await getTranslations({ locale: loc, namespace: 'product.hero' });

    const row = await getProductBySlug(locale, slug);
    if (!row) notFound();

    // Diğer dilin slug'ını çek
    const other = locale === 'tr' ? 'en' : 'tr';
    const supabase = await supabaseServerRead();
    const { data: otherRow } = await supabase
        .from('products_public')
        .select('slug, locale')
        .eq('product_id', row.product_id) // dikkat: product_id
        .eq('locale', other)
        .maybeSingle();

    const trPath = `/${'tr'}/lezzetlerimiz/${locale === 'tr' ? slug : otherRow?.slug ?? ''}`;
    const enPath = `/${'en'}/lezzetlerimiz/${locale === 'en' ? slug : otherRow?.slug ?? ''}`;

    const detailProps = adaptToDetailProps(row);

    return (
        <>
            <HeaderShell height={420}>
                <GenericHero title={t('title')} subtitle={t('subtitle')} />
            </HeaderShell>
        <main className="container-inline py-10" style={{ maxWidth: 'var(--container-max)' }}>
            {/* Navbar’daki tek LanguageSwitch, bu override’ı kullanacak */}
            <SetLangOverride trPath={trPath} enPath={enPath} />
            <ProductDetailCard {...detailProps} />
        </main>
            </>
    );
}