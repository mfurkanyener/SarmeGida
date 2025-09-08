'use server';

import { supabaseServerAction } from '@/lib/supabase/server';

export type NewProductInput = {
    imageFile?: File | null;
    imageUrl?: string | null;
    visible: boolean;
    sort: number;
    nutrition: {
        kcal?: number; carbs_g?: number; protein_g?: number; fat_g?: number;
        [k: string]: number | undefined;
    };

    tr: {
        name: string; slug: string; excerpt?: string; body?: string; ingredients: string[];
    };
    en: {
        name: string; slug: string; excerpt?: string; body?: string; ingredients: string[];
    };
};

async function uploadToStorage(file: File): Promise<string> {
    const supabase = await supabaseServerAction();
    const path = `products/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
        .from('media')
        .upload(path, file, { upsert: true });
    if (error) throw error;
    const pub = supabase.storage.from('media').getPublicUrl(data.path);
    return pub.data.publicUrl;
}

export async function createProduct(input: NewProductInput) {
    const supabase = await supabaseServerAction();

    let image_url = input.imageUrl ?? null;
    if (!image_url && input.imageFile) {
        image_url = await uploadToStorage(input.imageFile);
    }

    const { data: prod, error: pErr } = await supabase
        .from('products')
        .insert([{
            image_url,
            visible: input.visible,
            sort: input.sort ?? 0,
            nutrition: input.nutrition ?? {},
        }])
        .select('id')
        .single();

    if (pErr || !prod) throw pErr ?? new Error('Product insert failed');

    const rows = [
        {
            product_id: prod.id, locale: 'tr',
            name: input.tr.name, slug: input.tr.slug, excerpt: input.tr.excerpt ?? '',
            body: input.tr.body ?? '', ingredients: input.tr.ingredients ?? [],
        },
        {
            product_id: prod.id, locale: 'en',
            name: input.en.name, slug: input.en.slug, excerpt: input.en.excerpt ?? '',
            body: input.en.body ?? '', ingredients: input.en.ingredients ?? [],
        },
    ];

    const { error: tErr } = await supabase.from('product_translations').insert(rows);

    if (tErr) {
        await supabase.from('products').delete().eq('id', prod.id);
        throw tErr;
    }

    return { id: prod.id };
}