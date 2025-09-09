'use client';

import Link from 'next/link';
import Image from 'next/image';
import {useTranslations, useLocale} from 'next-intl';
import LanguageSwitch from '@layout/LanguageSwitch';
import {useEffect, useState} from 'react';
import clsx from 'clsx';

type Props = { withSpacer?: boolean };

export default function Navbar({ withSpacer = true }: Props) {
    const t = useTranslations('nav');
    const locale = useLocale();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 32);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const barHeight = scrolled ? 90 : 110;

    const linkHover =
        "relative inline-block after:content-[''] after:absolute after:block after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-[color:var(--olive-700)] after:transition-all after:duration-300 hover:after:w-full";
    return (
        <>
            <div
                className={clsx(
                    'fixed inset-x-0 top-0 z-50 transition-all duration-300',
                    scrolled
                        ? 'backdrop-blur supports-[backdrop-filter]:bg-[rgba(237,228,217,0.80)] bg-[rgba(237,228,217,0.95)] shadow-[0_6px_24px_rgba(0,0,0,0.08)]'
                        : 'bg-transparent'
                )}
                style={{ height: barHeight }}
            >
                <nav className="h-full">
                    <div className="container-inline relative h-full flex items-center">
                        {/* Sol: Logo */}
                        <Link href={`/${locale}`} className="flex items-center gap-3">
                            <Image
                                src="/images/common/logo.png"
                                alt={t('alt')}
                                width={scrolled ? 84 : 100}
                                height={scrolled ? 84 : 100}
                                className="transition-all duration-300 w-auto h-auto"
                                priority
                            />
                            <span
                                className={clsx(
                                    'hidden sm:block font-semibold tracking-wide text-[color:var(--olive-700)] transition-opacity duration-200',
                                    scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
                                )}
                            >
                {t('brand')}
              </span>
                        </Link>

                        {/* ORTA – orijinal menü (scrolled=false) */}
                        <ul
                            className={clsx(
                                'pointer-events-auto absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 text-[color:var(--text)] transition-opacity duration-200',
                                scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
                            )}
                        >
                            <li><Link href={`/${locale}/hikayemiz`} className={linkHover}>{t('about')}</Link></li>
                            <li><Link href={`/${locale}/lezzetlerimiz`} className={linkHover}>{t('flavors')}</Link></li>
                            <li><Link href={`/${locale}/iletisim`} className={linkHover}>{t('contact')}</Link></li>
                            <li>
                                <Link
                                    href={`/${locale}/lezzet-recetesi`}
                                    className="rounded-lg px-6 py-3 text-lg font-medium bg-[color:var(--olive-700)] text-white hover:bg-[color:var(--olive-600)] transition"
                                >
                                    {t('recipe')}
                                </Link>
                            </li>
                        </ul>

                        {/* ORTA – compact (scrolled=true) */}
                        <div
                            className={clsx(
                                'hidden md:flex items-center gap-10 mx-auto transition-opacity duration-200',
                                scrolled ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                            )}
                        >
                            <ul className="flex items-center gap-8 text-[color:var(--text)]">
                                <li><Link href={`/${locale}/hikayemiz`} className={linkHover}>{t('about')}</Link></li>
                                <li><Link href={`/${locale}/lezzetlerimiz`} className={linkHover}>{t('flavors')}</Link></li>
                            </ul>

                            <Image
                                src="/images/common/ankaKusuLogo.svg"
                                alt=""
                                width={80}
                                height={80}
                                className="select-none pointer-events-none"
                                priority
                            />

                            <ul className="flex items-center gap-8 text-[color:var(--text)]">
                                <li><Link href={`/${locale}/iletisim`} className={linkHover}>{t('contact')}</Link></li>
                                <li>
                                    <Link
                                        href={`/${locale}/lezzet-recetesi`}
                                        className="rounded-full px-5 py-2.5 text-base bg-[color:var(--olive-700)] text-white hover:bg-[color:var(--olive-600)] transition"
                                    >
                                        {t('recipe')}
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Sağ: Dil değiştirici */}
                        <div className={clsx('ml-auto transition-transform duration-300', scrolled ? 'scale-95' : 'scale-100')}>
                            <LanguageSwitch />
                        </div>
                    </div>
                </nav>
            </div>

            {withSpacer && <div aria-hidden className="w-full" style={{ height: barHeight }} />}
        </>
    );
}