import { supabaseServerRead } from '@/lib/supabase/server';

export default async function RecipeDetailPage({
                                                   params: { locale, slug }
                                               }: {
    params: { locale: string; slug: string };
}) {
    const supabase = await supabaseServerRead();
    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('locale', locale)
        .eq('slug', slug)
        .single();

    if (error || !post) {
        return <div className="container-inline py-10">Bulunamadı</div>;
    }

    return (
        <main className="container-inline py-16 prose max-w-3xl">
            <h1>{post.title}</h1>
            <p className="text-gray-600">{post.excerpt}</p>
            <div dangerouslySetInnerHTML={{ __html: post.body ?? '' }} />
        </main>
    );
}