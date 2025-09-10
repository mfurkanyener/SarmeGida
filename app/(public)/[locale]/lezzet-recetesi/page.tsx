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
                <GenericHero title={t('title')} subtitle={t('subtitle')}/>
            </HeaderShell>
            <main className="container-inline py-10" style={{maxWidth: 'var(--container-max)'}}>
                
                <ul className="mt-8 space-y-6">
                    {posts.map((p, i) => {
                        const href = `/${loc}/lezzet-recetesi/${p.slug}`;
                        const reverse = i % 2 === 1; // sırayla sağ/sol
                        return (
                            <li
                                key={p.slug}
                                className="rounded-[var(--radius-xxl)] border bg-[color:var(--card-bg)]/70 overflow-hidden"
                                style={{boxShadow: 'var(--shadow-card)'}}
                            >
                                <a href={href} className="block">
                                    <div className="grid items-center gap-8 p-6 md:p-8 md:grid-cols-5">
                                        {/* Görsel */}
                                        <div className={reverse ? 'md:order-2 md:col-span-2' : 'md:col-span-2'}>
                                            {p.cover_url ? (
                                                <div
                                                    className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-white">
                                                    <img
                                                        src={p.cover_url}
                                                        alt={p.title}
                                                        loading="lazy"
                                                        className="absolute inset-0 h-full w-full object-contain"
                                                    />
                                                </div>
                                            ) : (
                                                <div
                                                    className="w-full aspect-[4/3] grid place-items-center rounded-xl bg-white text-[color:var(--muted)]">
                                                    Görsel yok
                                                </div>
                                            )}
                                        </div>

                                        {/* Metin */}
                                        <div className={reverse ? 'md:order-1 md:col-span-3' : 'md:col-span-3'}>
                                            <h3 className="font-heading text-[clamp(20px,2.6vw,28px)] leading-tight text-[color:var(--olive-700)]">
                                                {p.title}
                                            </h3>
                                            {p.excerpt && (
                                                <p className="mt-2 text-[color:var(--text)]/80">
                                                    {p.excerpt}
                                                </p>
                                            )}
                                            <span
                                                className="mt-4 inline-flex rounded-full px-4 py-2 text-sm bg-[color:var(--olive-700)] text-white hover:bg-[color:var(--olive-600)] transition">
                  Keşfet
                </span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </main>
        </>
    );
}