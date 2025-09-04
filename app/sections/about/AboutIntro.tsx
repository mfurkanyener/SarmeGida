'use client';
import Image from 'next/image';
import {useTranslations} from 'next-intl';

export default function AboutIntro() {
    const t = useTranslations('aboutIntro');

    return (
        <section className="section-y">
            <div className="container-inline text-center max-w-4xl mx-auto">
                {/* Başlık */}
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-[color:var(--olive-700)] mb-4">
                    {t('title')}
                </h2>
                <p className="text-[color:var(--muted)] mb-12">
                    {t('subtitle')}
                </p>
            </div>

            {/* Kartlar */}
            <div className="container-inline grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                {/* Kart 1 */}
                <div className="bg-[color:var(--card-bg)] rounded-[var(--radius-xxl)] p-8 text-center shadow-sm">
                    <h3 className="text-xl font-semibold text-[color:var(--warning)] mb-4">
                        {t('card1.title')}
                    </h3>
                    <p className="text-[color:var(--text)] mb-6">{t('card1.text')}</p>
                    <Image
                        src="/images/homepageIcon/about1.png"
                        alt="Yaprak"
                        width={160}
                        height={160}
                        className="mx-auto h-auto"
                    />
                </div>

                {/* Kart 2 */}
                <div className="bg-[color:var(--olive-700)] text-white rounded-[var(--radius-xxl)] p-8 text-center shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">{t('card2.title')}</h3>
                    <p className="mb-6">{t('card2.text')}</p>
                    <Image
                        src="/images/homepageIcon/about2.png"
                        alt="Kadın Gücü"
                        width={160}
                        height={160}
                        className="mx-auto h-auto"
                    />
                </div>
            </div>

            {/* CTA */}
            <div className="text-center">
                <button className="btn bg-[color:var(--warning)] text-white hover:bg-[color:var(--olive-600)]">
                    {t('cta')}
                </button>
            </div>
        </section>
    );
}