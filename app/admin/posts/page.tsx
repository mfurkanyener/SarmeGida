import Link from 'next/link';

export default function AdminPostsPage() {
    // Burada listeyi gerçek veriden dolduracaksın; şimdilik placeholder
    return (
        <main className="container-inline py-10">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Posts</h1>
                <Link href="/admin/posts/new" className="btn btn-olive">
                    Yeni Yazı
                </Link>
            </div>

            <div className="rounded-lg border p-6 bg-white/50">
                <p>Henüz içerik eklenmedi.</p>
            </div>
        </main>
    );
}