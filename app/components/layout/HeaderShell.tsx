// app/components/layout/HeaderShell.tsx
import type {ReactNode} from 'react';
import Navbar from '@layout/Navbar';
import clsx from 'clsx';

type Props = {
    height?: number;                 // px
    variant?: 'pattern' | 'plain';   // arka plan
    className?: string;
    children: ReactNode;             // hero burada render edilir
};

export default function HeaderShell({height = 520, variant = 'pattern', className, children}: Props) {
    return (
        <header
            className={clsx(
                'relative w-full overflow-hidden',
                variant === 'pattern' ? 'bg-[url("/images/common/wawes.svg")] bg-no-repeat bg-cover bg-top' : 'bg-[var(--bg)]',
                className
            )}
            style={{ minHeight: height }}
        >
            {/* üst navigasyon */}
            <div className="container-inline pt-6">
                <Navbar/>
            </div>

            {/* sağ üst dekor (zeytin dalı vs.) */}
            <img
                src="/images/common/branch.png"
                alt=""
                className="pointer-events-none select-none absolute right-4 top-[-16px] w-[360px] md:w-[520px] opacity-70"
            />

            {/* hero içeriği */}
            <div className="container-inline">{children}</div>
        </header>
    );
}