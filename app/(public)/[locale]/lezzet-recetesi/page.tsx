import { supabaseServer } from '@/lib/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
import {Post} from "@/app/types/cms";

export default async function RecipeListPage({
                                                 params: { locale }
                                             }: {
    params: { locale: string };
}) {
    const supabase = await supabaseServer();
    const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .eq('locale', locale) // TR için tr, EN için en
        .order('created_at', { ascending: false });

    if (error) {
        return <div className="container-inline py-10">Hata: {error.message}</div>;
    }

    return (
        <main className="container-inline py-16 space-y-12">
            <h1 className="text-3xl font-bold mb-10">Lezzet Reçetesi</h1>

            <div className="flex flex-col gap-16">
                {posts?.map((post: Post, idx: number) => (
                    <div
                        key={post.id}
                        className={`flex flex-col md:flex-row items-center gap-8 ${
                            idx % 2 === 1 ? 'md:flex-row-reverse' : ''
                        }`}
                    >
                        {/* Görsel */}
                        {post.cover_url ? (
                            <Image
                                src={post.cover_url}
                                alt={post.title}
                                width={500}
                                height={300}
                                className="rounded-lg shadow-md object-cover"
                            />
                        ) : (
                            <div className="w-[500px] h-[300px] bg-gray-200 flex items-center justify-center rounded-lg">
                                Görsel Yok
                            </div>
                        )}

                        {/* İçerik */}
                        <div className="flex-1">
                            <h2 className="text-2xl font-semibold mb-3">{post.title}</h2>
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            <Link
                                href={`/${locale}/lezzet-recetesi/${post.slug}`}
                                className="inline-block px-5 py-2 rounded bg-[color:var(--olive-700)] text-white hover:bg-[color:var(--olive-600)] transition"
                            >
                                Keşfet
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}