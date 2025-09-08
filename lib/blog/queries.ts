// lib/queries.ts
import { supabaseServerRead } from '@/lib/supabase/server';
import type { PostPublicRow } from './types';

export async function getPosts(locale: 'tr'|'en', limit = 24) {
    const supabase = await supabaseServerRead();
    const { data, error } = await supabase
        .from('posts_public')
        .select('*')
        .eq('locale', locale)
        .order('sort', { ascending: false, nullsFirst: false })     // sort varsa
        .order('created_at', { ascending: false, nullsFirst: false })
        .limit(limit)
        .returns<PostPublicRow[]>();

    if (error) throw error;
    return data ?? [];
}

export async function getPostBySlug(locale: 'tr'|'en', slug: string) {
    const supabase = await supabaseServerRead();
    const { data, error } = await supabase
        .from('posts_public')
        .select('*')
        .eq('locale', locale)
        .eq('slug', slug)
        .returns<PostPublicRow>()
        .maybeSingle();

    if (error) throw error;
    return data; // PostPublicRow | null
}