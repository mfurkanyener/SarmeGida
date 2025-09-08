import {getPosts} from '@/lib/blog/queries';
import {getTranslations} from 'next-intl/server';
import GenericHero from "@/app/components/hero/GenericHero";
import HeaderShell from "@layout/HeaderShell";

type PageProps = { params: { locale: string } | Promise<{ locale: string }> };

export default async function BlogListPage({ params }: PageProps) {
    const { locale } = await Promise.resolve(params);
    const loc = (locale === 'en') ? 'en' : 'tr';

    const t = await getTranslations({ locale: loc, namespace: 'blog.hero' });
    const posts = await getPosts(loc);

    return (
        <>

            <HeaderShell height={420}>
                <GenericHero title={t('title')} subtitle={t('subtitle')} />
            </HeaderShell>
        <main className="container-inline py-10" style={{maxWidth:'var(--container-max)'}}>

            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map(p => (
                    <li key={p.slug} className="rounded-2xl border bg-white overflow-hidden" style={{boxShadow:'var(--shadow-card)'}}>
                        <a href={`/${loc}/lezzet-recetesi/${p.slug}`} className="block">
                            {p.cover_url ? (
                                <img src={p.cover_url} alt={p.title} className="w-full aspect-[4/3] object-cover" loading="lazy"/>
                            ) : (
                                <div className="w-full aspect-[4/3] bg-[color:var(--card-bg)] grid place-items-center text-[color:var(--muted)]">Görsel yok</div>
                            )}
                            <div className="p-4">
                                <h3 className="font-semibold text-lg">{p.title}</h3>
                                {p.excerpt && <p className="mt-1 text-[color:var(--muted)]">{p.excerpt}</p>}
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </main>
        </>
    );
}