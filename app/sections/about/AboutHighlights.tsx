// app/components/AboutHighlights.tsx
'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

type Item = { title: string; body: string };

type Props = {
    /** İsterseniz görseli dışarıdan geçebilirsiniz; geçmezseniz placeholder çıkar */
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

    return (
        <section className="section-y">
            <div className="container-inline grid gap-12 lg:grid-cols-2 items-start">
                {/* Sol: Görsel / Placeholder */}
                <div className="relative w-full max-w-[620px] aspect-[4/5] rounded-[24px] overflow-hidden mx-auto lg:mx-0 shadow-sm">
                    {imageSrc ? (
                        <Image
                            src={imageSrc}
                            alt={imageAlt || t('imageAlt')}
                            fill
                            className="object-cover"
                            sizes="(min-width:1280px) 600px, (min-width:768px) 50vw, 100vw"
                            priority={false}
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center rounded-[24px] bg-[#B5835A] text-white">
                            <span className="text-5xl md:text-6xl font-semibold tracking-wide">FOTO</span>
                        </div>
                    )}
                </div>

                {/* Sağ: Başlıklar + Paragraflar */}
                <div className="flex flex-col gap-14">
                    {items.map((it, idx) => (
                        <div key={idx}>
                            <h3 className="font-heading text-3xl md:text-4xl text-[color:var(--olive-700)]">
                                {it.title}
                            </h3>
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