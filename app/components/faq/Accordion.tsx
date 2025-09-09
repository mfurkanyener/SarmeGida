'use client';

import {useState} from 'react';
import clsx from 'clsx';

export type FaqItem = { q: string; a: string };

export default function Accordion({ items }: { items: FaqItem[] }) {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <div className="mx-auto w-full max-w-3xl divide-y divide-[color:var(--olive-700)]/10 rounded-2xl bg-[color:var(--card-bg)] p-2 shadow-sm">
            {items.map((it, i) => {
                const isOpen = open === i;
                return (
                    <div key={i} className="py-2">
                        <button
                            className="flex w-full items-center justify-between gap-4 rounded-xl px-4 py-4 text-left hover:bg-white/50 transition"
                            aria-expanded={isOpen}
                            onClick={() => setOpen(isOpen ? null : i)}
                        >
                            <span className="font-medium text-[color:var(--olive-700)]">{it.q}</span>
                            <span
                                className={clsx(
                                    'inline-flex h-6 w-6 items-center justify-center rounded-full border border-[color:var(--olive-700)] text-[color:var(--olive-700)] transition-transform',
                                    isOpen ? 'rotate-45' : 'rotate-0'
                                )}
                                aria-hidden
                            >
                +
              </span>
                        </button>

                        <div
                            className={clsx(
                                'grid transition-[grid-template-rows] duration-300 ease-out',
                                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                            )}
                        >
                            <div className="overflow-hidden">
                                <div className="px-4 pb-4 text-[color:var(--text)]/85 leading-relaxed">
                                    {it.a}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}