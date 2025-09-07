import { supabaseServerAction } from '@/lib/supabase/server';
import Link from 'next/link';
import { Post } from '@/app/types/cms';

export default async function AdminPostsPage() {
    const supabase = await supabaseServerAction();
    const { data: posts } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <main className="container-inline py-10">
            <div
                className="mx-auto w-full"
                style={{maxWidth: 'var(--container-max)'}}
            >
                {/* header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-heading text-[color:var(--olive-700)]">Blog Yazıları</h1>


                    {/* Sağ tarafa gruplanmış butonlar */}
                    <div className="flex items-center gap-3">
                        <Link href="/admin/posts/new" className="btn btn-olive">+ Yeni Yazı</Link>
                    </div>
                </div>

                {/* tablo */}
                <div className="overflow-x-auto rounded-lg shadow-sm border border-black/10 bg-white">
                    <table className="w-full border-collapse overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
                        <thead className="bg-[color:var(--card-bg)] text-left">
                        <tr className="bg-[color:var(--card-bg)]/80 text-left">
                            <th className="p-4 text-[15px] font-semibold border">Başlık</th>
                            <th className="p-4 text-[15px] font-semibold border">Açıklama</th>
                            <th className="p-4 text-[15px] font-semibold border">Durum</th>
                            <th className="p-4 text-[15px] font-semibold border w-56">İşlemler</th>
                        </tr>
                        </thead>
                        <tbody className="[&_tr:nth-child(even)]:bg-black/5">
                        {posts?.length ? (
                            posts.map((p: Post) => (
                                <tr
                                    key={p.id}
                                    className="border-t last:border-b hover:bg-[color:var(--bg)]"
                                >
                                    <td className="p-4">{p.title}</td>
                                    <td className="p-4">{p.slug}</td>
                                    <td className="p-4">
                      <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                              p.visible
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-200 text-gray-600'
                          }`}
                      >
                        {p.visible ? 'Görünür' : 'Gizli'}
                      </span>
                                    </td>
                                    <td className="p-3 space-x-3">
                                        <Link
                                            href={`/admin/posts/${p.id}`}
                                            className="text-blue-700 hover:underline"
                                        >
                                            Düzenle
                                        </Link>
                                        <form
                                            action={`/api/admin/posts/${p.id}/toggle`}
                                            method="post"
                                            className="inline"
                                        >
                                            <button
                                                className="text-[color:var(--olive-700)] hover:underline"
                                                type="submit"
                                            >
                                                {p.visible ? 'Gizle' : 'Göster'}
                                            </button>
                                        </form>
                                        <form
                                            action={`/api/admin/posts/${p.id}/delete`}
                                            method="post"
                                            className="inline"
                                        >
                                            <button
                                                className="text-red-600 hover:underline"
                                                type="submit"
                                            >
                                                Sil
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="p-6 text-center text-[color:var(--muted)]" colSpan={5}>
                                    Henüz hiç yazı eklenmemiş.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}