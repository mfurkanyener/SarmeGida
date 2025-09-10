'use client';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

type Item = {
    icon: string;
    alt: string;
    title: string;
    body: string;
    size?: number; // px
};

export default function Sustainability() {
    const t = useTranslations('sustainability');

    const items: Item[] = [
        { icon: '/images/homepageIcon/sustainability1.png', alt: t('waste.alt'),     title: t('waste.title'),     body: t('waste.body'),     size: 161 },
        { icon: '/images/homepageIcon/sustainability2.png', alt: t('local.alt'),     title: t('local.title'),     body: t('local.body'),     size: 161 },
        { icon: '/images/homepageIcon/sustainability3.png', alt: t('ops.alt'),       title: t('ops.title'),       body: t('ops.body'),       size: 161 },
        { icon: '/images/homepageIcon/sustainability4.png', alt: t('packaging.alt'), title: t('packaging.title'), body: t('packaging.body'), size: 161 },
    ];

    return (
        <section aria-labelledby="sustainability-heading" className="section-y">
            <div className="container-inline">
                {/* Başlıklar */}
                <h2
                    id="sustainability-heading"
                    className="text-center font-heading text-3xl md:text-4xl font-bold text-[color:var(--olive-700)] mb-4"

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

                {/* 2x2 grid – ortaya al */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14 max-w-5xl mx-auto justify-items-center">
                    {items.map((it, idx) => {
                        const size = it.size ?? 56; // fallback
                        return (
                            <article key={idx} className="max-w-[46ch] text-center">
                                <div
                                    className="mb-4 relative mx-auto"
                                    style={{ width: size, height: size }}
                                >
                                    <Image src={it.icon} alt={it.alt} fill className="object-contain" />
                                </div>
                                <h4 className="font-heading text-2xl text-[color:var(--olive-700)] mb-2">
                                    {it.title}
                                </h4>
                                <p className="text-[color:var(--text)]/90 leading-relaxed">
                                    {it.body}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}