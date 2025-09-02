// app/(public)/[locale]/layout.tsx
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import type {ReactNode} from 'react';
import Footer from "@components/Footer";

type Locale = 'tr' | 'en';

export function generateStaticParams() {
    return [{locale: 'tr'}, {locale: 'en'}];
}

type Props = {
    children: ReactNode;
    params: { locale: Locale }; // <<<< Promise değil
};

export default async function LocaleLayout({children, params}: Props) {
    const {locale} = params;

    // next-intl kurulumları
    setRequestLocale(locale);
    const messages = await getMessages({locale});

    // (İstersen burada Navbar/Footer koşulunu ele alırsın;
    // headers().get(...) gibi şeylere gerek yok, sayfalarda
    // path tabanlı koşula ihtiyaç varsa client tarafında bakarız.)
    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {/* Sayfa içerikleri */}
            <main className="min-h-[60vh]">{children}</main>

            {/* ← Her sayfada ortak footer */}
            <Footer />
        </NextIntlClientProvider>
    );
}

