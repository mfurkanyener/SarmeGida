import { supabaseServerRead } from '@/lib/supabase/server';
import EditPostForm from './post-form';

export default async function EditPostPage({ params }: { params: { id: string } }) {
    const supabase = await supabaseServerRead();
    const { data: post } = await supabase.from('posts').select('*').eq('id', params.id).single();
    if (!post) return <div>Bulunamadı</div>;
    return <EditPostForm initial={post} />;
}