// app/components/FounderStory.tsx
'use client';

import {useTranslations} from 'next-intl';
import Image from 'next/image';

export default function FounderStory() {
    const t = useTranslations('about.founder');    // ✅ "trAbout.json" veya "enAbout.json" içinden "founder" anahtarını arar

    return (
        <section className="section-y">
            <div className="container-inline grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                <div className="max-w-2xl">
                    <h1 className="font-heading text-3xl md:text-4xl text-[color:var(--olive-700)] mb-6">
                        {t('title')}
                    </h1>
                    <div className="space-y-5 text-[color:var(--text)] leading-relaxed">
                        <p>{t('p1')}</p>
                        <p>{t('p2')}</p>
                        <p>{t('p3')}</p>
                        <p>{t('p4')}</p>
                    </div>
                </div>

                <div className="relative">
                    <Image
                        src="/images/about/founder-hands.jpg"
                        alt={t('imageAlt')}
                        width={820}
                        height={1024}
                        className="rounded-2xl shadow-lg object-cover"
                    />
                </div>
            </div>
        </section>
    );
}