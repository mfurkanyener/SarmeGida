// app/actions/blog.ts
'use server';

import { supabaseServerAction } from '@/lib/supabase/server';
import type { NewPostInput, UpdatePostInput } from '@/lib/blog/types';

const BUCKET = 'media';

function getSafeFileName(file: File | undefined, fallback = 'cover') {
    try {
        return file?.name ? file.name : fallback;
    } catch {
        return fallback;
    }
}

type BasePatch = Partial<{
    visible: boolean;
    sort: number;
    tags: string[];
    cover_url: string;
}>;

type TranslationPatch = Partial<{
    title: string;
    slug: string;
    excerpt: string | null | undefined;
    body: string | null | undefined;
}>;

export async function createPost(input: NewPostInput) {
    const supabase = await supabaseServerAction();

    // 1) Kapak yükleme (opsiyonel)
    let coverUrl = input.coverUrl || '';
    if (!coverUrl && input.coverFile) {
        // Server Action üzerinden gelen File güvenli tiplenir
        const file = input.coverFile as unknown as File | undefined;
        const fileName = `posts/${Date.now()}-${getSafeFileName(file)}`;
        if (!file) throw new Error('Kapak dosyası okunamadı');

        const { data, error } = await supabase.storage
            .from(BUCKET)
            .upload(fileName, file, { upsert: true });
        if (error) throw error;

        const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(data.path);
        coverUrl = pub.publicUrl;
    }

    // 2) Base insert
    const { data: base, error: e1 } = await supabase
        .from('posts')
        .insert([{ cover_url: coverUrl, visible: input.visible, sort: input.sort, tags: input.tags ?? [] }])
        .select('id')
        .maybeSingle();
    if (e1) throw e1;
    if (!base?.id) throw new Error('Base post oluşturulamadı');

    // 3) TR & EN translations (zorunlu)
    const rows = [
        { post_id: base.id, locale: 'tr' as const, title: input.tr.title, slug: input.tr.slug, excerpt: input.tr.excerpt, body: input.tr.body },
        { post_id: base.id, locale: 'en' as const, title: input.en.title, slug: input.en.slug, excerpt: input.en.excerpt, body: input.en.body },
    ];
    const { error: e2 } = await supabase.from('post_translations').insert(rows);
    if (e2) throw e2;

    return { postId: base.id };
}

export async function updatePost(input: UpdatePostInput) {
    const supabase = await supabaseServerAction();
    const id = input.postId;

    // base güncelle (her alan opsiyonel)
    if (typeof input.visible === 'boolean' || typeof input.sort === 'number' || input.tags || input.coverFile || input.coverUrl) {
        let coverUrl = input.coverUrl;
        if (!coverUrl && input.coverFile) {
            const file = input.coverFile as unknown as File | undefined;
            const fileName = `posts/${Date.now()}-${getSafeFileName(file)}`;
            if (!file) throw new Error('Kapak dosyası okunamadı');

            const { data, error } = await supabase.storage
                .from(BUCKET)
                .upload(fileName, file, { upsert: true });
            if (error) throw error;

            const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(data.path);
            coverUrl = pub.publicUrl;
        }

        const patch: BasePatch = {};
        if (typeof input.visible === 'boolean') patch.visible = input.visible;
        if (typeof input.sort === 'number') patch.sort = input.sort;
        if (input.tags) patch.tags = input.tags;
        if (coverUrl) patch.cover_url = coverUrl;

        if (Object.keys(patch).length) {
            const { error } = await supabase.from('posts').update(patch).eq('id', id);
            if (error) throw error;
        }
    }

    // translations patch (opsiyonel, var olanı güncelle; yoksa ekle)
    async function upsertTr(locale: 'tr' | 'en', data?: NewPostInput['tr']) {
        if (!data) return;

        const patch: TranslationPatch = {};
        if (data.title) patch.title = data.title;
        if (data.slug) patch.slug = data.slug;
        if (typeof data.excerpt !== 'undefined') patch.excerpt = data.excerpt;
        if (typeof data.body !== 'undefined') patch.body = data.body;

        if (!Object.keys(patch).length) return;

        const { data: exists } = await supabase
            .from('post_translations')
            .select('id')
            .eq('post_id', id)
            .eq('locale', locale)
            .maybeSingle();

        if (exists?.id) {
            const { error } = await supabase.from('post_translations').update(patch).eq('id', exists.id);
            if (error) throw error;
        } else {
            const { error } = await supabase.from('post_translations').insert([{ post_id: id, locale, ...(patch as Omit<Required<typeof patch>, never>) }]);
            if (error) throw error;
        }
    }

    await upsertTr('tr', input.tr);
    await upsertTr('en', input.en);

    return { ok: true };
}

export async function deletePost(postId: string) {
    const supabase = await supabaseServerAction();
    const { error } = await supabase.from('posts').delete().eq('id', postId);
    if (error) throw error;
    return { ok: true };
}

export async function togglePostVisible(postId: string, visible: boolean) {
    const supabase = await supabaseServerAction();
    const { error } = await supabase.from('posts').update({ visible }).eq('id', postId);
    if (error) throw error;
    return { ok: true };
}