import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/** RSC / layout / page: sadece okuma, cookie yazmaz */
export async function supabaseServerRead() {
    const cookieStore = await cookies();

    return createServerClient(url, key, {
        cookies: {
            get(name: string) {
                return cookieStore.get(name)?.value;
            },
            set() {
                /* no-op in RSC */
            },
            remove() {
                /* no-op in RSC */
            },
        },
    });
}

/** Server Action / Route Handler: cookie yazabilir */
export async function supabaseServerAction() {
    const cookieStore = await cookies();

    return createServerClient(url, key, {
        cookies: {
            get(name: string) {
                return cookieStore.get(name)?.value;
            },
            set(name: string, value: string, options?: CookieOptions) {
                (cookieStore as unknown as {
                    set: (n: string, v: string, o?: CookieOptions) => void;
                }).set(name, value, options);
            },
            remove(name: string, options?: CookieOptions) {
                (cookieStore as unknown as {
                    set: (n: string, v: string, o?: CookieOptions) => void;
                }).set(name, '', { ...(options ?? {}), maxAge: 0 });
            },
        },
    });
}