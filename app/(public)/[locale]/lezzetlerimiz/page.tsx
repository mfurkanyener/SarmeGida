// app/(public)/[locale]/lezzetlerimiz/page.tsx
import {useTranslations} from 'next-intl';
import HeaderShell from '@layout/HeaderShell';
import GenericHero from '@/app/components/hero/GenericHero';
import ProductsGrid from '@/app/sections/products/ProductsGrid';

export default function Page() {
    const products = [
        {
            title: 'Yaprak Sarması',
            desc: 'Geleneksel tarifle hazırlanmış, taptaze malzemelerden.',
            imageSrc: '/images/products/sarma.png',
            href: '/lezzetlerimiz/yaprak-sarmasi'
        },
        {
            title: 'Çiğ Köfte',
            desc: 'Geleneksel tarifle hazırlanmış, taptaze malzemelerden.',
            imageSrc: '/images/products/cigkofte.png',
            href: '/lezzetlerimiz/cig-kofte'
        },
        {
            title: 'Meze',
            desc: 'Geleneksel tarifle hazırlanmış, taptaze malzemelerden.',
            imageSrc: '/images/placeholders/gray-4x3.svg', // geçiciyse placeholder
            href: '/lezzetlerimiz/meze'
        },
        {
            title: 'Kalburabastı',
            desc: 'Geleneksel tarifle hazırlanmış, taptaze malzemelerden.',
            imageSrc: '/images/placeholders/gray-4x3.svg',
            href: '/lezzetlerimiz/kalburabasti'
        },
        {
            title: 'Şambali',
            desc: 'Geleneksel tarifle hazırlanmış, taptaze malzemelerden.',
            imageSrc: '/images/placeholders/gray-4x3.svg',
            href: '/lezzetlerimiz/sambali'
        }
    ];
    const t = useTranslations('products.hero');
    return (
        <>
            <HeaderShell height={420}>
                <GenericHero
                    title={t('title')}                  // "LEZZETLERİMİZ"
                    subtitle={t('subtitle')}            // kısa açıklama
                    align="center"
                />
            </HeaderShell>

            <ProductsGrid items={products} />        </>
    );
}