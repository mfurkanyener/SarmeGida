import { NextResponse, type NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { createServerClient } from '@supabase/ssr';

const intl = createIntlMiddleware({
    locales: ['tr', 'en'],
    defaultLocale: 'tr',
});

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
};

export async function middleware(req: NextRequest) {
    const { pathname } = new URL(req.url);

    // Statik ve api'leri es geç
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        /\.[\w]+$/.test(pathname)
    ) {
        return NextResponse.next();
    }

    // Admin path'i (locale dahil)
    if (pathname.match(/^\/(tr|en)\/admin/)) {
        const res = NextResponse.next();

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get: (name: string) => req.cookies.get(name)?.value,
                    set: (name: string, value: string, options) => {
                        res.cookies.set({ name, value, ...options });
                    },
                    remove: (name: string, options) => {
                        res.cookies.set({ name, value: '', ...options });
                    },
                },
            }
        );

        const {
            data: { user },
        } = await supabase.auth.getUser();

        const isAdmin =
            user &&
            (user.app_metadata?.role === 'admin' ||
                user.user_metadata?.role === 'admin');

        if (!isAdmin && !pathname.startsWith('/auth')) {
            const loginUrl = new URL('/auth/login', req.url);
            return NextResponse.redirect(loginUrl);
        }

        return res;
    }

    // Public rotalar
    return intl(req);
}