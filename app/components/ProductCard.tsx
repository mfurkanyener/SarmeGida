'use client';

import Image from 'next/image';
import Link from 'next/link';

type Props = {
    title: string;
    description?: string;
    image: string;
    href?: string;
};

export default function ProductCard({ title, description, image, href }: Props) {
    const card = (
        <div className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-[var(--card-bg)] shadow-[var(--shadow-card)] transition">
            <div className="relative aspect-[4/3] w-full">
                {/* Next/Image performanslı; görsel yoksa img ile de çalışır */}
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width:768px) 100vw, 33vw"
                />
            </div>

            <div className="flex flex-1 flex-col gap-2 px-5 pb-5">
                <h3 className="font-semibold text-[var(--text)]">{title}</h3>
                {description && (
                    <p className="text-sm leading-relaxed text-[var(--muted)]">{description}</p>
                )}
                <div className="mt-auto pt-2">
          <span className="inline-block rounded-md bg-[var(--olive-700)] px-3 py-2 text-xs text-white transition group-hover:bg-[var(--olive-600)]">
            Lezzeti keşfet
          </span>
                </div>
            </div>
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="block">
                {card}
            </Link>
        );
    }
    return card;
}