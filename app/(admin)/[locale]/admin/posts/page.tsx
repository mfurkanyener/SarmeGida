import {supabaseServerRead} from '@/lib/supabase/server';

type Row = { post_id: string; title: string; slug: string; locale: 'tr'|'en'; visible: boolean; created_at: string };

export default async function AdminPostsPage() {
    const supabase = await supabaseServerRead();
    const { data } = await supabase
        .from('posts_public')
        .select('post_id, title, slug, locale, visible, created_at')
        .order('created_at', { ascending: false })
        .limit(100)
        .returns<Row[]>();

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Blog Yazıları</h2>
                <a href="./posts/new" className="btn btn-olive">+ Yeni Yazı</a>
            </div>

            <table className="w-full border-collapse overflow-hidden rounded-lg bg-white">
                <thead>
                <tr className="bg-gray-100 text-left">
                    <th className="p-3 border">Başlık</th>
                    <th className="p-3 border">Dil</th>
                    <th className="p-3 border">Slug</th>
                    <th className="p-3 border">Durum</th>
                </tr>
                </thead>
                <tbody>
                {data?.map((r) => (
                    <tr key={`${r.post_id}-${r.locale}`} className="bg-white">
                        <td className="p-3 border">{r.title}</td>
                        <td className="p-3 border">{r.locale}</td>
                        <td className="p-3 border">{r.slug}</td>
                        <td className="p-3 border">{r.visible ? 'Görünür' : 'Gizli'}</td>
                    </tr>
                )) ?? null}
                </tbody>
            </table>
        </div>
    );
}