'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import clsx from 'clsx';
import SignOutButton from '@/app/components/SignOutButton';

type NavItem = { href: string; label: string };

export default function AdminNavbar({ locale: forcedLocale }: { locale?: 'tr' | 'en' }) {
    const pathname = usePathname() ?? '';
    const [open, setOpen] = useState(false);

    // URL’den locale yakala; prop geldiyse o öncelikli
    const match = /^\/(tr|en)(?:\/|$)/.exec(pathname);
    const locale = forcedLocale ?? ((match?.[1] as 'tr' | 'en') ?? 'tr');

    const base = `/${locale}/admin`;
    const items: NavItem[] = [
        { href: `${base}`, label: 'Panel' },
        { href: `${base}/posts`, label: 'Blog Yazıları' },
        { href: `${base}/products`, label: 'Ürünler' },
    ];

    const isActive = (href: string) => (href === base ? pathname === base : pathname.startsWith(href));

    return (
        <>
            <a
                href="#admin-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white border rounded px-3 py-2"
            >
                İçeriğe geç
            </a>

            <header
                className="sticky top-0 z-40 border-b bg-[color:var(--bg)]/90 backdrop-blur"
                style={{ boxShadow: 'var(--shadow-card)' }}
            >
                <nav
                    className="container-inline"
                    aria-label="Yönetim gezinme"
                    style={{ maxWidth: 'var(--container-max)', paddingBlock: 'clamp(12px, 2.5vw, 16px)' }}
                >
                    <div className="flex items-center justify-between gap-3">
                        <Link href={base} className="font-heading text-xl text-[color:var(--olive-700)]">
                            Admin
                        </Link>

                        <ul className="hidden md:flex items-center gap-2">
                            {items.map((it) => (
                                <li key={it.href}>
                                    <Link
                                        href={it.href}
                                        className={clsx(
                                            'px-4 py-2 rounded-full transition border',
                                            isActive(it.href)
                                                ? 'bg-[color:var(--olive-700)] text-white border-transparent'
                                                : 'bg-white text-[color:var(--text)] hover:bg-[color:var(--card-bg)] border-black/5'
                                        )}
                                        aria-current={isActive(it.href) ? 'page' : undefined}
                                    >
                                        {it.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="hidden md:flex items-center gap-2">
                            <SignOutButton />
                        </div>

                        <button
                            onClick={() => setOpen((v) => !v)}
                            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-black/10"
                            aria-expanded={open}
                            aria-controls="admin-mobile-menu"
                            aria-label="Menüyü aç/kapat"
                        >
                            <span>☰</span>
                        </button>
                    </div>

                    {open && (
                        <div
                            id="admin-mobile-menu"
                            className="md:hidden mt-3 rounded-2xl border bg-white"
                            style={{ boxShadow: 'var(--shadow-card)' }}
                        >
                            <ul className="p-2">
                                {items.map((it) => (
                                    <li key={it.href}>
                                        <Link
                                            href={it.href}
                                            onClick={() => setOpen(false)}
                                            className={clsx(
                                                'block w-full px-3 py-2 rounded-lg transition',
                                                isActive(it.href)
                                                    ? 'bg-[color:var(--olive-700)] text-white'
                                                    : 'hover:bg-[color:var(--card-bg)]'
                                            )}
                                            aria-current={isActive(it.href) ? 'page' : undefined}
                                        >
                                            {it.label}
                                        </Link>
                                    </li>
                                ))}
                                <li className="mt-1 border-t pt-2">
                                    <SignOutButton />
                                </li>
                            </ul>
                        </div>
                    )}
                </nav>
            </header>
        </>
    );
}