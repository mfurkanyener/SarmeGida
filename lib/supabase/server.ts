// lib/supabase/server.ts
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * RSC / layout / page gibi yerlerde kullan.
 * Çerez yazma girişimleri sessizce yok sayılır (no-op).
 */
export async function supabaseServerRead() {
    const cookieStore = await cookies(); // Next 15: promise

    return createServerClient(url, key, {
        cookies: {
            get(name: string) {
                return cookieStore.get(name)?.value;
            },
            set(_name: string, _value: string, _options?: CookieOptions) {
                // RSC’de çerez set edilemez; sessizce no-op
            },
            remove(_name: string, _options?: CookieOptions) {
                // RSC’de çerez silinemez; sessizce no-op
            },
        },
    });
}

/**
 * Server Action veya Route Handler içinde kullan.
 * Çerezler gerçekten yazılır/silinir.
 */
export async function supabaseServerAction() {
    const cookieStore = await cookies();

    return createServerClient(url, key, {
        cookies: {
            get(name: string) {
                return cookieStore.get(name)?.value;
            },
            set(name: string, value: string, options?: CookieOptions) {
                // Next 15’te bu kullanım Server Action/Route Handler’da serbest
                (cookieStore as unknown as {
                    set: (name: string, value: string, options?: CookieOptions) => void;
                }).set(name, value, options);
            },
            remove(name: string, options?: CookieOptions) {
                (cookieStore as unknown as {
                    set: (name: string, value: string, options?: CookieOptions) => void;
                }).set(name, '', { ...(options ?? {}), maxAge: 0 });
            },
        },
    });
}