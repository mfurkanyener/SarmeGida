// app/api/products/alt-slug/route.ts
import { NextResponse } from 'next/server';
import { supabaseServerAction } from '@/lib/supabase/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const from = (searchParams.get('from') === 'en' ? 'en' : 'tr') as 'tr'|'en';
    const slug = searchParams.get('slug') ?? '';

    if (!slug) {
        return NextResponse.json({ error: 'slug is required' }, { status: 400 });
    }

    const supabase = await supabaseServerAction();

    // 1) Bu slug hangi ürüne ait?
    const { data: cur, error: e1 } = await supabase
        .from('product_translations')
        .select('product_id, locale, slug')
        .eq('locale', from)
        .eq('slug', slug)
        .maybeSingle();

    if (e1) return NextResponse.json({ error: e1.message }, { status: 500 });
    if (!cur) return NextResponse.json({ error: 'not_found' }, { status: 404 });

    // 2) Aynı ürünün diğer dildeki slug’ını getir
    const other = from === 'tr' ? 'en' : 'tr';
    const { data: sibling, error: e2 } = await supabase
        .from('product_translations')
        .select('locale, slug')
        .eq('product_id', cur.product_id)
        .eq('locale', other)
        .maybeSingle();

    if (e2) return NextResponse.json({ error: e2.message }, { status: 500 });
    if (!sibling) return NextResponse.json({ error: 'missing_translation' }, { status: 404 });

    return NextResponse.json({
        productId: cur.product_id,
        tr: from === 'tr' ? slug : sibling.slug,
        en: from === 'en' ? slug : sibling.slug,
    });
}