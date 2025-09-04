import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function supabaseServer() {
    const cookieStore = await cookies();
    const isWritable = typeof (cookieStore as unknown as { set?: unknown }).set === 'function';

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    if (isWritable) {
                        (cookieStore as unknown as {
                            set: (name: string, value: string, options?: CookieOptions) => void;
                        }).set(name, value, options);
                    }
                },
                remove(name: string, options: CookieOptions) {
                    if (isWritable) {
                        (cookieStore as unknown as {
                            set: (name: string, value: string, options?: CookieOptions) => void;
                        }).set(name, '', { ...options, maxAge: 0 });
                    }
                },
            },
        }
    );
}