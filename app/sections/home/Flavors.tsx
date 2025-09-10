'use client';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

export default function Flavors() {
    // i18n namespace önerisi: "flavors"
    const t = useTranslations('flavors');

    return (
        <section aria-labelledby="flavors-heading" className="section-y">
            <div className="container-inline">
                {/* Başlık */}
                <h2
                    id="flavors-heading"
                    className="text-center font-heading text-3xl md:text-4xl font-bold text-[color:var(--olive-700)] mb-4"
                >
                    {t('title')}
                </h2>

                {/* --- 1. Satır: Sarma (Görsel solda, metin sağda) --- */}
                <div className="mt-12 md:mt-16 grid grid-cols-12 items-center gap-y-8 md:gap-10">
                    {/* Görsel */}
                    <div className="col-span-12 md:col-span-6">
                        <div className="relative mx-auto w-[min(520px,80vw)] aspect-[4/3]">
                            <Image
                                src="/images/products/sarmahero.png"
                                alt={t('sarma.alt')}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Metin */}
                    <div className="col-span-12 md:col-span-6">
                        <h3 className="font-heading text-2xl md:text-4xl text-[color:var(--olive-700)] mb-4">
                            {t('sarma.heading')}
                        </h3>
                        <p className="text-[color:var(--text)]/90 leading-relaxed md:text-lg">
                            {t('sarma.body')}
                        </p>
                    </div>
                </div>

                {/* --- 2. Satır: Çiğ Köfte (Metin solda, görsel sağda) --- */}
                <div className="mt-14 md:mt-20 grid grid-cols-12 items-center gap-y-8 md:gap-10">
                    {/* Metin */}
                    <div className="col-span-12 md:col-span-6 order-2 md:order-1">
                        <h3 className="font-heading text-2xl md:text-4xl text-[color:var(--olive-700)] mb-4">
                            {t('cigkofte.heading')}
                        </h3>
                        <p className="text-[color:var(--text)]/90 leading-relaxed md:text-lg">
                            {t('cigkofte.body')}
                        </p>
                    </div>

                    {/* Görsel */}
                    <div className="col-span-12 md:col-span-6 order-1 md:order-2">
                        <div className="relative mx-auto w-[min(520px,80vw)] aspect-[4/3]">
                            <Image
                                src="/images/products/cigkoftehero.png"
                                alt={t('cigkofte.alt')}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}