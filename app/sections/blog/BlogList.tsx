// app/sections/blog/BlogList.tsx
import type { Post } from '@/app/types/cms';
import BlogTeaser from '@cards/BlogTeaser';

type Props = {
    posts: Post[];
    locale: string;
};

export default function BlogList({ posts, locale }: Props) {
    if (!posts?.length) {
        return (
            <section className="container-inline py-16">
                <p className="text-center text-[color:var(--muted)]">
                    Henüz içerik bulunamadı.
                </p>
            </section>
        );
    }

    return (
        <section className="container-inline py-10 md:py-14 space-y-8 md:space-y-10">
            {posts.map((post, i) => (
                <BlogTeaser key={post.id} post={post} index={i} locale={locale} />
            ))}
        </section>
    );
}