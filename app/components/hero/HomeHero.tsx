// app/components/Hero.tsx
'use client';
import Image from 'next/image';
import {useTranslations} from 'next-intl';

export default function Hero() {
    const t = useTranslations('hero');

    return (
        <section className="hero-section">
            <div className="container-inline grid grid-cols-1 mt-10 lg:grid-cols-2 items-start gap-10">                <div className="max-w-xl relative">  {/* ← relative eklendi */}
                <h1 className="m-0 font-heading text-4xl md:text-6xl leading-tight text-[color:var(--olive-700)]">
                    {t('title')}
                </h1>
                <p className="mt-4 text-lg md:text-xl text-[color:var(--muted)]">
                    {t('subtitle')}
                </p>

                <button className="mt-6 inline-flex items-center rounded-full px-5 py-3 text-sm font-medium
                     bg-[color:var(--olive-700)] text-white hover:bg-[color:var(--olive-600)] transition">
                    {t('cta')}
                </button>

                {/* Post-it: sol padding çizgisine hizalı (80px), butondan 16px aşağı */}
                <Image
                    src="/images/common/note.svg"
                    alt="Lezzet Reçetesi"
                    width={260}
                    height={300}
                    priority
                    className="
              absolute left-0 top-[calc(100%+16px)]
              w-[200px] md:w-[240px] h-auto
              -rotate-[4deg] z-[1]
            "
                />
            </div>

                {/* Sağ: grid/layer kompozisyon */}
                <div
                    className="
            relative
            h-[520px] md:h-[560px] xl:h-[620px]
            grid grid-cols-12 grid-rows-[1fr_1fr]
          "
                >
                    {/* Sarma (arka, sağ üst) */}
                    <Image
                        src="/images/products/sarmahero.png"
                        alt="Sarma"
                        width={620} height={420}
                        className="
                          col-start-8 col-span-5 row-start-1 self-start justify-self-end
                          w-[min(34vw,620px)] max-w-none h-auto
                          translate-y-[8px] md:translate-y-[200px]
                          drop-shadow-lg
                          z-[2]
                        "
                        priority
                    />

                    {/* Çiğ köfte (önde, altta, ortaya yakın) */}
                    <Image
                        src="/images/products/cigkoftehero.png"
                        alt="Çiğ Köfte"
                        width={600} height={380}
                        className="
                          col-start-6 col-span-6 row-start-2 self-end justify-self-center
                          w-[min(36vw,620px)] max-w-none h-auto
                          -translate-y-[64px] md:-translate-y-[1px]
                          -translate-x-[150px]
                          drop-shadow-[0_18px_30px_rgba(0,0,0,0.28)]
                          z-[3]
                        "
                        priority
                    />


                </div>
            </div>
        </section>
    );
}