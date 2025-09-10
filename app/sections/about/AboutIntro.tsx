// app/sections/home/AboutIntro.tsx (veya mevcut yolun)
'use client';

import Image from 'next/image';
import {useLocale, useTranslations} from 'next-intl';
import Link from 'next/link';

export default function AboutIntro() {
    const t = useTranslations('aboutIntro');
    const locale = useLocale();

    return (
        <section className="container-inline">
                {/* Başlık + alt metin */}
                <div className="text-center max-w-4xl mx-auto">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-[color:var(--olive-700)] mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-[color:var(--muted)] mb-12">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Kartlar */}
                <div
                    className="container-inline container-max grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-10 md:mt-12">
                    {/* Kart 1 */}
                    <div
                        className="rounded-[var(--radius-xxl)] bg-[color:var(--card-bg)] shadow-sm p-7 md:p-8 flex flex-col items-center text-center"
                        style={{boxShadow: 'var(--shadow-card)'}}
                    >
                        <h3 className="text-[clamp(18px,2.4vw,22px)] font-semibold text-[color:var(--accent)] mb-3">
                            {t('card1.title')}
                        </h3>
                        <p className="text-[color:var(--muted)] mb-6 max-w-[460px]">
                            {t('card1.text')}
                        </p>
                        <Image
                            src="/images/homepageIcon/about1.png"
                            alt="Yaprak"
                            width={200}
                            height={200}
                            className="h-auto w-[160px] md:w-[200px]"
                            priority
                        />
                    </div>

                    {/* Kart 2 */}
                    <div
                        className="rounded-[var(--radius-xxl)] bg-[color:var(--accent)] text-white shadow-sm p-7 md:p-8 flex flex-col items-center text-center"
                        style={{boxShadow: 'var(--shadow-card)'}}
                    >
                        <h3 className="text-[clamp(18px,2.4vw,22px)] text-white font-semibold mb-3">
                            {t('card2.title')}
                        </h3>
                        <p className="mb-6 max-w-[460px]">
                            {t('card2.text')}
                        </p>
                        <Image
                            src="/images/homepageIcon/about2.png"
                            alt="Kadın Gücü"
                            width={200}
                            height={200}
                            className="h-auto w-[160px] md:w-[200px]"
                            priority
                        />
                    </div>
                </div>

                {/* CTA */}
                <div className="container-inline container-max text-center">
                    <Link
                        href={`/${locale}/hikayemiz`}
                        className="mt-8 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[15px] font-medium bg-[#B8875B] text-white hover:bg-[#A6784E] transition"
                    >
                        {t('cta')}
                    </Link>
                </div>
        </section>
);
}