import type {ReactNode} from 'react';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import Footer from '@layout/Footer';
import {LanguageSwitchProvider} from '@/app/components/i18n/LanguageSwitchContext';

export function generateStaticParams() {
    return [{locale: 'tr'}, {locale: 'en'}];
}

type AnyLayoutProps = {
    children: ReactNode;
    params: Promise<{locale: string}> | {locale: string};
};

export default async function LocaleLayout({children, params}: AnyLayoutProps) {
    const resolved = params instanceof Promise ? await params : params;
    const raw = resolved?.locale ?? 'tr';
    const safe = raw === 'tr' || raw === 'en' ? raw : 'tr';

    setRequestLocale(safe);
    const messages = await getMessages({locale: safe});

    return (
        <NextIntlClientProvider locale={safe} messages={messages}>
            <LanguageSwitchProvider>
                <main className="min-h-[60vh]">{children}</main>
                <Footer />
            </LanguageSwitchProvider>
        </NextIntlClientProvider>
    );
}