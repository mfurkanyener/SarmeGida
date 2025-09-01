// app/(public)/[locale]/layout.tsx
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import Footer from '@components/Footer';


export function generateStaticParams() {
    return ['tr', 'en'].map((locale) => ({locale}));
}

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: 'tr' | 'en' }>;
};

export default async function LocaleLayout({children, params}: {children: React.ReactNode; params: Promise<{locale:'tr'|'en'}>}) {
    const {locale} = await params;
    setRequestLocale(locale);
    const messages = await getMessages({locale});

    if (!messages) notFound();

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {/* Sayfa içerikleri */}
            <main className="min-h-[60vh]">{children}</main>

            {/* ← Her sayfada ortak footer */}
            <Footer />
        </NextIntlClientProvider>

    );
}