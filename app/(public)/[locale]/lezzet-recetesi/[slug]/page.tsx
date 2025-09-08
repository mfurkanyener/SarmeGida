// app/(public)/[locale]/lezzet-recetesi/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/blog/queries';
import type { PostPublicRow } from '@/lib/blog/types';
import GenericHero from "@/app/components/hero/GenericHero";
import HeaderShell from "@layout/HeaderShell";
import { getTranslations } from "next-intl/server";
import { SubscribeBar } from "@sections/home";

type ParamsMaybePromise =
    | { params: { locale: string; slug: string } }
    | Promise<{ params: { locale: string; slug: string } }>;

export default async function BlogDetailPage(props: ParamsMaybePromise) {
    const { params } = await Promise.resolve(props);
    const locale = (params?.locale === 'en' ? 'en' : 'tr') as 'tr' | 'en';
    const slug = params?.slug ?? '';

    const data = await getPostBySlug(locale, slug);
    if (!data) return notFound();

    const row: PostPublicRow = data;
    const t = await getTranslations({ locale, namespace: 'blog.hero' });

    return (
        <>
            <HeaderShell height={420}>
                <GenericHero title={t('title')} subtitle={t('subtitle')} />
            </HeaderShell>

            <main className="container-inline py-10" style={{ maxWidth: 'var(--container-max)' }}>
                <article className="prose max-w-none">
                    <h1 className="font-heading text-4xl text-[color:var(--olive-700)]">{row.title}</h1>
                    {row.cover_url && (
                        <div className="my-6 rounded-2xl overflow-hidden border" style={{ boxShadow: 'var(--shadow-card)' }}>
                            <img src={row.cover_url} alt={row.title} className="w-full object-cover" />
                        </div>
                    )}
                    {row.excerpt && <p className="text-[color:var(--muted)] text-lg">{row.excerpt}</p>}
                    {row.body && <div className="mt-6 whitespace-pre-wrap">{row.body}</div>}
                </article>
            </main>

            <SubscribeBar />
        </>
    );
}