// app/components/hero/GenericHero.tsx
import Link from 'next/link';
import clsx from 'clsx';

type Props = {
    title: string;
    subtitle?: string;
    cta?: { label: string; href: string };
    className?: string;
    align?: 'center' | 'left';
};

export default function GenericHero({ title, subtitle, cta, align='center', className }: Props) {
    return (
        <div className={clsx('py-10 md:py-14', align === 'center' ? 'text-center' : 'text-left', className)}>
            <h1 className="font-heading text-[clamp(28px,6vw,56px)] text-[color:var(--olive-700)]">
                {title}
            </h1>
            {subtitle && (
                <p className={clsx('mt-3 text-[color:var(--muted)]', align==='center' ? 'mx-auto max-w-3xl' : 'max-w-3xl')}>
                    {subtitle}
                </p>
            )}
            {cta && (
                <div className={clsx('mt-6', align==='center' ? '' : '')}>
                    <Link
                        href={cta.href}
                        className="inline-block rounded-full bg-[color:var(--olive-700)] px-6 py-3 text-white hover:bg-[color:var(--olive-600)]"
                    >
                        {cta.label}
                    </Link>
                </div>
            )}
        </div>
    );
}