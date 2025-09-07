import Link from 'next/link';

export default function AdminDashboardPage() {
    return (
        <main className="container-inline py-10">
            {/* üst bar */}
            <div
                className="mx-auto w-full"
                style={{ maxWidth: 'var(--container-max)' }}
            >
                <div className="flex items-center gap-4 mb-6">
                    <h1 className="text-3xl font-bold text-[color:var(--olive-700)]">
                        Yönetim
                    </h1>
                </div>

                {/* açıklama */}
                <p className="text-[color:var(--muted)] mb-8">
                    Blog yazıları ve ürün içeriklerini buradan yönetin.
                </p>

                {/* kartlar */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* BLOG */}
                    <article className="card p-5 md:p-6 border border-black/5">
                        <header className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Blog</h2>
                            <span className="text-xs px-2 py-1 rounded-full bg-black/5 text-[color:var(--muted)]">
                İçerik
              </span>
                        </header>

                        <p className="text-sm text-[color:var(--muted)] mb-5">
                            Blog yazılarını ekleyin, düzenleyin ve görünürlüklerini yönetin.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {/* relative href — locale ve /admin segmentini korur */}
                            <Link href="/admin/posts" className="btn btn-olive">
                                Listele
                            </Link>
                            <Link
                                href="/admin/posts/new"
                                className="btn bg-white border border-black/10 hover:border-black/20"
                            >
                                Yeni Ekle
                            </Link>
                        </div>
                    </article>

                    {/* ÜRÜNLER */}
                    <article className="card p-5 md:p-6 border border-black/5">
                        <header className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Ürünler</h2>
                            <span className="text-xs px-2 py-1 rounded-full bg-black/5 text-[color:var(--muted)]">
                Katalog
              </span>
                        </header>

                        <p className="text-sm text-[color:var(--muted)] mb-5">
                            Ürünleri yönetin, açıklama ve görsellerini güncelleyin.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <Link href="/admin/products" className="btn btn-olive">
                                Listele
                            </Link>
                            <Link
                                href="/admin/products/new"
                                className="btn bg-white border border-black/10 hover:border-black/20"
                            >
                                Yeni Ekle
                            </Link>
                        </div>
                    </article>
                </section>
            </div>
        </main>
    );
}