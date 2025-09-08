import { supabaseServerRead } from '@/lib/supabase/server';
import type { ProductPublic } from '@/app/types/product';

export async function getProductBySlug(locale: 'tr'|'en', slug: string) {
    const supabase = await supabaseServerRead();
    const { data, error } = await supabase
        .from('products_public')
        .select('*')
        .eq('locale', locale)
        .eq('slug', slug)
        .maybeSingle<ProductPublic>();

    if (error) throw error;
    return data;
}