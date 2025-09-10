// app/components/AboutHighlights.tsx
'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

type Item = { title: string; body: string };

type Props = {
    imageSrc?: string;
    imageAlt?: string;
};

export default function AboutHighlights({ imageSrc, imageAlt }: Props) {
    const t = useTranslations('about.aboutHighlights');

    const items: Item[] = [
        { title: t('items.0.title'), body: t('items.0.body') },
        { title: t('items.1.title'), body: t('items.1.body') },
        { title: t('items.2.title'), body: t('items.2.body') },
    ];

    // imageSrc yoksa varsayılan görsel kullan
    const finalSrc = imageSrc || '/images/about/aboutPhoto.png';

    return (
        <section className="section-y">
            <div className="container-inline grid gap-12 lg:grid-cols-2 items-start">
                {/* Sol: Görsel */}
                <div className="relative w-full max-w-[620px] aspect-[4/5] rounded-[24px] overflow-hidden mx-auto lg:mx-0 shadow-sm">
                    <Image
                        src={finalSrc}
                        alt={imageAlt || t('imageAlt')}
                        fill
                        className="object-cover"
                        sizes="(min-width:1280px) 600px, (min-width:768px) 50vw, 100vw"
                        priority={false}
                    />
                </div>

                {/* Sağ: Başlıklar + Paragraflar */}
                <div className="flex flex-col gap-14">
                    {items.map((it, idx) => (
                        <div key={idx}>
                            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[color:var(--olive-700)] mb-4">
                                {it.title}
                            </h2>
                            <p className="mt-3 text-lg leading-relaxed text-[color:var(--muted)] max-w-[46ch]">
                                {it.body}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}