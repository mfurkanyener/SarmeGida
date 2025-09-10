// app/components/Hero.tsx
'use client';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {useEffect, useState} from 'react';

const IMAGES = [
    { src: '/images/products/sarmahero.png', alt: 'Sarma' },
    { src: '/images/products/cigkoftehero.png', alt: 'Çiğ Köfte' },
] as const;

export default function Hero() {
    const t = useTranslations('hero');
    const [active, setActive] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setActive((p) => (p + 1) % IMAGES.length), 3000);
        return () => clearInterval(id);
    }, []);

    return (
        <section className="hero-section">
            <div className="container-inline grid grid-cols-1 mt-10 lg:grid-cols-2 items-start gap-10">
                {/* Sol metin */}
                <div className="max-w-xl relative">
                    <h1 className="m-0 font-heading text-4xl md:text-6xl leading-tight text-[color:var(--olive-700)]">
                        {t('title')}
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-[color:var(--muted)]">{t('subtitle')}</p>

                    <button
                        className="mt-6 inline-flex items-center rounded-full px-5 py-3 text-sm font-medium bg-[color:var(--olive-700)] text-white hover:bg-[color:var(--olive-600)] transition">
                        {t('cta')}
                    </button>

                    <Image
                        src="/images/common/note.svg"
                        alt="Lezzet Reçetesi"
                        width={390}
                        height={450}
                        priority
                        className="absolute left-0 top-[calc(100%+16px)] w-[200px] md:w-[240px] h-auto -rotate-[4deg] z-[1]"
                    />
                </div>

                {/* Sağ: tek tuval, üst üste cross-fade */}
                <div className="relative h-[520px] md:h-[560px] xl:h-[620px]">
                    {/* hizalama kutusu: ortala */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {IMAGES.map((img, i) => {
                            const visible = active === i;
                            return (
                                <Image
                                    key={img.src}
                                    src={img.src}
                                    alt={img.alt}
                                    width={620}
                                    height={420}
                                    priority={i === 0}
                                    sizes="(min-width:1024px) 36vw, 90vw"
                                    className={`
            absolute
            h-auto max-h-full
            w-[min(36vw,620px)] max-w-full
            object-contain
            transition-all duration-700 ease-out
            ${visible ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-[0.99] z-0'}
            pointer-events-none select-none
              translate-y-50   // 👈 burası: 6 = ~1.5rem
              translate-x-50

          `}
                                    style={{willChange: 'opacity, transform'}}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}