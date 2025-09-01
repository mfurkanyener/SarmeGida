'use client';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

type Item = {
    icon: string;
    alt: string;
    title: string;
    body: string;
};

export default function Sustainability() {
    const t = useTranslations('sustainability');

    // ikon yollarını public/ altından veriyoruz
    const items: Item[] = [
        {
            icon: '/images/homepageIcon/sustainability1.png',
            alt: t('waste.alt'),
            title: t('waste.title'),
            body: t('waste.body'),
        },
        {
            icon: '/images/homepageIcon/sustainability2.png',
            alt: t('local.alt'),
            title: t('local.title'),
            body: t('local.body'),
        },
        {
            icon: '/images/homepageIcon/sustainability3.png',
            alt: t('ops.alt'),
            title: t('ops.title'),
            body: t('ops.body'),
        },
        {
            icon: '/images/homepageIcon/sustainability4.png',
            alt: t('packaging.alt'),
            title: t('packaging.title'),
            body: t('packaging.body'),
        },
    ];

    return (
        <section aria-labelledby="sustainability-heading" className="section-y">
            <div className="container-inline">
                {/* Başlıklar */}
                <h2
                    id="sustainability-heading"
                    className="text-center font-heading text-3xl md:text-5xl text-[color:var(--olive-700)]"
                >
                    {t('title')}
                </h2>
                <p className="mt-2 text-center italic text-[color:var(--muted)] md:text-lg">
                    {t('subtitle')}
                </p>

                {/* Giriş metni */}
                <h3 className="mt-10 text-center font-heading text-xl md:text-2xl text-[color:var(--olive-700)]">
                    {t('intro.title')}
                </h3>
                <p className="mt-3 max-w-3xl mx-auto text-center text-[color:var(--text)]/85 md:text-lg leading-relaxed">
                    {t('intro.body')}
                </p>

                {/* 2x2 grid */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
                    {items.map((it, idx) => (
                        <article key={idx} className="max-w-[46ch]">
                            <div className="mb-4 h-14 w-14 relative">
                                <Image src={it.icon} alt={it.alt} fill className="object-contain" />
                            </div>
                            <h4 className="font-heading text-2xl text-[color:var(--olive-700)] mb-2">
                                {it.title}
                            </h4>
                            <p className="text-[color:var(--text)]/90 leading-relaxed">
                                {it.body}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}