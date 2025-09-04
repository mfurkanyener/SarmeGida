import { supabaseServer } from '@/lib/supabase/server';
import Link from 'next/link';
import {Post} from "@/app/types/cms";

export default async function AdminPostsPage() {
    const supabase = await supabaseServer();
    const { data: posts } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Blog Yazıları</h2>
                <Link href="/admin/posts/new" className="px-3 py-2 rounded-lg bg-[var(--olive-700)] text-white">
                    + Yeni Yazı
                </Link>
            </div>

            <table className="w-full border-collapse overflow-hidden rounded-lg">
                <thead>
                <tr className="bg-gray-100 text-left">
                    <th className="p-3 border">Başlık</th>
                    <th className="p-3 border">Dil</th>
                    <th className="p-3 border">Slug</th>
                    <th className="p-3 border">Durum</th>
                    <th className="p-3 border w-48">İşlemler</th>
                </tr>
                </thead>
                <tbody>
                {posts?.map((p: Post) => (
                    <tr key={p.id} className="bg-white">
                        <td className="p-3 border">{p.title}</td>
                        <td className="p-3 border">{p.locale}</td>
                        <td className="p-3 border">{p.slug}</td>
                        <td className="p-3 border">{p.visible ? 'Görünür' : 'Gizli'}</td>
                        <td className="p-3 border">
                            <Link href={`/admin/posts/${p.id}`} className="text-blue-700 underline mr-3">Düzenle</Link>
                            <form action={`/api/admin/posts/${p.id}/toggle`} method="post" className="inline">
                                <button className="underline mr-3">{p.visible ? 'Gizle' : 'Göster'}</button>
                            </form>
                            <form action={`/api/admin/posts/${p.id}/delete`} method="post" className="inline">
                                <button className="text-red-600 underline">Sil</button>
                            </form>
                        </td>
                    </tr>
                )) || null}
                </tbody>
            </table>
        </div>
    );
}