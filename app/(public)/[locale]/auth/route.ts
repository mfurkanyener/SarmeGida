// app/api/auth/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function POST(req: Request) {
    const { event, session } = await req.json();

    const cookieStore = await cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get: (name: string) => cookieStore.get(name)?.value,
                set: (name: string, value: string, options?: CookieOptions) => {
                    // Next 15: headers/cookies yazımı server route'ta serbest
                    (cookieStore as unknown as {
                        set: (n: string, v: string, o?: CookieOptions) => void;
                    }).set(name, value, options);
                },
                remove: (name: string, options?: CookieOptions) => {
                    (cookieStore as unknown as {
                        set: (n: string, v: string, o?: CookieOptions) => void;
                    }).set(name, '', { ...(options ?? {}), maxAge: 0 });
                },
            },
        }
    );

    if (event === 'SIGNED_IN' && session) {
        // 🔑 SSR cookie’yi set et
        await supabase.auth.setSession({
            access_token: session.access_token,
            refresh_token: session.refresh_token,
        });
    }

    if (event === 'SIGNED_OUT') {
        await supabase.auth.signOut();
    }

    return NextResponse.json({ ok: true });
}