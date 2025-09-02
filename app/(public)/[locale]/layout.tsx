// app/(public)/[locale]/layout.tsx
import React from 'react';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import Footer from '@components/Footer';
import {headers} from 'next/headers';

const SUPPORTED = ['tr', 'en'] as const;
type Locale = (typeof SUPPORTED)[number];

function isLocale(x: string): x is Locale {
    return (SUPPORTED as readonly string[]).includes(x);
}

// KENDİ props tipimiz:
type Props = {
    children: React.ReactNode;
    // Next typed routes burada string döndürür; biz guard ile daraltacağız
    params: { locale: string };
};

export default async function LocaleLayout({children, params}: Props) {
    const raw = params?.locale ?? 'tr';
    const locale: Locale = isLocale(raw) ? raw : 'tr';

    setRequestLocale(locale);
    const messages = await getMessages({locale});
    if (!messages) notFound();

    // headers() -> Promise<ReadonlyHeaders> olduğundan await gerekli
    const hdrs = await headers();
    const path = hdrs.get('x-invoke-path') || '/';
    const isHome = path === `/${locale}`; // istersen kullan

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {/* Sayfa içerikleri */}
            <main className="min-h-[60vh]">{children}</main>

            {/* ← Her sayfada ortak footer */}
            <Footer />
        </NextIntlClientProvider>
    );
}

