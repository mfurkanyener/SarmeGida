import { supabaseServerRead } from '@/lib/supabase/server';

type AltSlugRow = {
    slug: string;
    locale: 'tr' | 'en';
};

export async function getAltSlugByPostId(
    postId: string,
    targetLocale: 'tr' | 'en'
): Promise<string | null> {
    const supabase = await supabaseServerRead();
    const { data, error } = await supabase
        .from('post_translations')
        .select('slug, locale')
        .eq('post_id', postId)
        .eq('locale', targetLocale)
        .maybeSingle<AltSlugRow>();

    if (error) throw error;
    return data?.slug ?? null;
}