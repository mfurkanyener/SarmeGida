'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/cn';

export type ProductCardProps = {
  title: string;
  desc: string;
  imageSrc: string;
  imageAlt?: string;
  href: string;
  className?: string;
};

export default function ProductCard({
  title,
  desc,
  imageSrc,
  imageAlt = title,
  href,
  className
}: ProductCardProps) {
  return (
    <article
      className={cn(
        'group relative rounded-xl border border-black/5 bg-[color:var(--paper,#efe8db)]',
        'shadow-sm hover:shadow-md transition-all',
        'focus-within:ring-2 focus-within:ring-[color:var(--olive-700)]',
        className
      )}
      role="article"
    >
      {/* Görsel */}
      <div className="px-8 pt-8">
        <div className="rounded-lg bg-white/60">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={520}
            height={390}
            className="h-auto w-full object-contain"
            priority={false}
          />
        </div>
      </div>

      {/* İçerik */}
      <div className="p-8">
        <h3 className="font-heading text-[color:var(--olive-700)] text-xl">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted,#666)]">
          {desc}
        </p>

        <div className="mt-5">
          <Link
            href={href}
            className="
              inline-block rounded-md px-4 py-2 text-sm
              bg-[color:var(--olive-700)] text-white
              hover:brightness-110 active:translate-y-[1px]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--olive-700)]
            "
          >
            Lezzeti Keşfet
          </Link>
        </div>
      </div>

      {/* Mavi seçili çerçeve hissi için (örn: klavye fokus) */}
      <span
        className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-transparent group-focus-within:ring-blue-400"
        aria-hidden
      />
    </article>
  );
}