'use server';

import { supabaseServerAction } from '@/lib/supabase/server';

export async function subscribe(email: string) {
    // çok basit bir e-posta validasyonu
    const ok = typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) return { ok: false as const, error: 'INVALID_EMAIL' };

    const supabase = await supabaseServerAction();

    const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

    if (error) {
        console.error('subscribe insert error:', JSON.stringify(error, null, 2));
        return { ok: false as const, error: error.message };
    }

    return { ok: true as const };
}