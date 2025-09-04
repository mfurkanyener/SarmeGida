'use client';

import {useEffect, useMemo, useState, useCallback} from 'react';
import {useTranslations} from 'next-intl';

type Item = {quote: string; author: string; role: string};

export default function Testimonials() {
    const t = useTranslations('testimonials');


    // İçerik i18n'den geliyor (3 örnek item)
    const items: Item[] = useMemo(
        () => [
            {quote: t('items.0.quote'), author: t('items.0.author'), role: t('items.0.role')},
            {quote: t('items.1.quote'), author: t('items.1.author'), role: t('items.1.role')},
            {quote: t('items.2.quote'), author: t('items.2.author'), role: t('items.2.role')}
        ],
        [t]
    );

    const [idx, setIdx] = useState(0);
    const total = items.length;

    const go = useCallback((n: number) => {
        setIdx(() => (n + total) % total);
    }, [total]);

    // ← → ile gezinme
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') go(idx + 1);
            if (e.key === 'ArrowLeft') go(idx - 1);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [idx, go]);

    const active = items[idx];

    return (
        <section aria-labelledby="testimonials-heading" className="section-y">
            <div className="mx-auto max-w-5xl px-4 text-center">
                <h2 id="testimonials-heading"
                    className="font-heading text-[clamp(28px,4vw,48px)] text-[color:var(--olive-700)]">
                    {t('title')}
                </h2>
                <p className="mt-2 italic text-[color:var(--muted)] text-[clamp(16px,2vw,24px)]">
                    {t('subtitle')}
                </p>

                <blockquote className="mt-10 text-[clamp(20px,2.8vw,40px)] leading-snug">
                    <span className="block mx-auto max-w-4xl">“{active.quote}”</span>
                </blockquote>

                <div className="mt-6">
                    <div className="font-heading text-[clamp(18px,2vw,28px)] text-[color:var(--olive-700)]">
                        {active.author}
                    </div>
                    <div className="text-[clamp(14px,1.6vw,22px)] text-[color:var(--muted)]">
                        {active.role}
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-3" role="tablist"
                     aria-label={t('pagination')}>
                    {items.map((_, i) => {
                        const selected = i === idx;
                        return (
                            <button
                                key={i}
                                role="tab"
                                aria-selected={selected}
                                aria-controls={`testimonial-panel-${i}`}
                                className={`h-3 w-3 rounded-full transition ${
                                    selected
                                        ? 'bg-[color:var(--text)]/80 scale-100'
                                        : 'bg-[color:var(--muted)]/30 scale-95 hover:bg-[color:var(--muted)]/60'
                                }`}
                                onClick={() => go(i)}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}