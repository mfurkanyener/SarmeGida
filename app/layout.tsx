// app/layout.tsx
import {getLocale} from 'next-intl/server';
import './../styles/tailwind.css';
import './../styles/globals.css';


import {Inter, Playfair_Display} from 'next/font/google';

const bodyFont = Inter({
    subsets: ['latin'],
    variable: '--font-body'
});

const headingFont = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-heading'
});


export default async function RootLayout({children}: {children: React.ReactNode}) {
    const locale = await getLocale();
    return (
        <html
            lang={locale ?? 'tr'}
            className={`${bodyFont.variable} ${headingFont.variable}`}  // 🔴 sınıflar HTML'de
        >
        <body className="antialiased">{children}</body>
        </html>
    );
}