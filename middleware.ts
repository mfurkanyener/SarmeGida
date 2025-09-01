// middleware.ts  (proje kökü!)
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['tr','en'],
    defaultLocale: 'tr'
});

export const config = {
    // api ve statikleri dışla; tüm diğer isteklerde çalışsın
    matcher: ['/((?!api|_next|.*\\..*).*)']
};
