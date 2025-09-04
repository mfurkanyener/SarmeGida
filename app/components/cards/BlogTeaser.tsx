// app/components/cards/BlogTeaser.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '@/app/types/cms';
import clsx from 'clsx';

type Props = {
    post: Post;
    index: number; // çapraz için
    locale: string;
};

export default function BlogTeaser({ post, index, locale }: Props) {
    const isReversed = index % 2 === 1;

    return (
        <article
            className={clsx(
                'rounded-2xl bg-[color:var(--card-bg)]/70 backdrop-blur',
                'p-6 md:p-8',
                'border border-black/5',
                'flex flex-col md:flex-row gap-6 md:gap-10',
                isReversed && 'md:flex-row-reverse'
            )}
        >
            {/* Görsel */}
            <div className="md:basis-[42%] shrink-0">
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                    <Image
                        src={post.cover_url || '/placeholder.jpg'}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-contain md:object-contain"
                        priority={index < 2}
                    />
                </div>
            </div>

            {/* Metin */}
            <div className="md:flex-1 flex flex-col justify-center">
                <h3 className="font-heading text-2xl md:text-3xl text-[color:var(--olive-700)]">
                    {post.title}
                </h3>
                <p className="mt-3 text-[color:var(--muted)]">{post.excerpt}</p>

                <div className="mt-5">
                    <Link
                        href={{ pathname: `/${locale}/lezzet-recetesi/${post.slug}` }}
                        className="btn btn-olive px-5 py-2.5 rounded-full"
                    >
                        Keşfet
                    </Link>
                </div>
            </div>
        </article>
    );
}