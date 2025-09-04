// app/components/Navbar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import {useTranslations, useLocale} from 'next-intl';
import LanguageSwitch from '@layout/LanguageSwitch';

export default function Navbar() {
    const t = useTranslations('nav');
    const locale = useLocale();

    return (
        <nav className="h-[110px] pt-[10px] bg-transparent">
            <div className="container-inline relative h-full flex items-center">
                {/* Sol: Logo */}
                <Link href="/" locale={locale} className="flex items-center gap-3">
                    <Image
                        src="/images/common/logo.png"
                        alt={t('alt')}
                        width={100}
                        height={100}
                        className="w-[100px] h-auto"
                        priority
                    />
                    <span className="hidden sm:block font-semibold tracking-wide text-[color:var(--olive-700)]">
            {t('brand')}
          </span>
                </Link>

                {/* Orta: Menü (absolute center) */}
                <ul
                    className="
            pointer-events-auto
            absolute left-1/2 -translate-x-1/2
            hidden md:flex items-center gap-8
            text-[color:var(--text)]
          "
                >
                    <li>
                        <Link href="/hikayemiz" locale={locale} className="hover:text-[color:var(--olive-700)]">
                            {t('about')}
                        </Link>
                    </li>
                    <li>
                        <Link href="/lezzetlerimiz" locale={locale} className="hover:text-[color:var(--olive-700)]">
                            {t('flavors')}
                        </Link>
                    </li>
                    <li>
                        <Link href="/iletisim" locale={locale} className="hover:text-[color:var(--olive-700)]">
                            {t('contact')}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/lezzet-recetesi"
                            locale={locale}
                            className="rounded-full px-4 py-2 text-sm border
                         border-[color:var(--olive-700)] text-[color:var(--olive-700)]
                         hover:bg-[color:var(--olive-700)] hover:text-white transition"
                        >
                            {t('recipe')}
                        </Link>
                    </li>
                </ul>

                {/* Sağ: Dil değiştirici */}
                <div className="ml-auto">
                    <LanguageSwitch />
                </div>
            </div>
        </nav>
    );
}