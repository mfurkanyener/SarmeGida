// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

const intl = createIntlMiddleware({
    locales: ['tr', 'en'],
    defaultLocale: 'tr',
});

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
};

export async function middleware(req: NextRequest) {
    const { pathname, search } = req.nextUrl;

    // statik & api geç
    if (pathname.startsWith('/api') || pathname.startsWith('/_next') || /\.[\w]+$/.test(pathname)) {
        return NextResponse.next();
    }

    // i18n sonucu (rewrite/redirect’leri gözetelim)
    const intlRes = intl(req);

    // “/admin” ve “/:locale/admin” eşleştir
    const isAdminPath = /^\/(?:(?:tr|en)\/)?admin(?:\/|$)/.test(pathname);
    const isAuthPath = /^\/(?:(?:tr|en)\/)?auth(?:\/|$)/.test(pathname);

    if (isAdminPath && !isAuthPath) {
        // intlRes bir NextResponse ise onu temel al, değilse yeni response
        const base = intlRes instanceof NextResponse ? intlRes : NextResponse.next();

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get: (name: string) => req.cookies.get(name)?.value,
                    set: (name: string, value: string, options?: CookieOptions) => {
                        base.cookies.set({ name, value, ...(options ?? {}) });
                    },
                    remove: (name: string, options?: CookieOptions) => {
                        base.cookies.set({ name, value: '', ...(options ?? {}), maxAge: 0 });
                    },
                },
            }
        );

        const { data: { user } } = await supabase.auth.getUser();

        // 🔑 Middleware sadece “loginli mi?” kontrol ediyor
        if (!user) {
            const url = req.nextUrl.clone();
            const seg = url.pathname.split('/')[1];
            const hasLocale = seg === 'tr' || seg === 'en';
            url.pathname = hasLocale ? `/${seg}/auth/login` : '/auth/login';
            // geri dönüş için redirect paramını ekle
            url.search = `?redirect=${encodeURIComponent(pathname + search)}`;
            return NextResponse.redirect(url);
        }

        return base; // oturum var → geç
    }

    // public rotalar
    return intlRes;
}