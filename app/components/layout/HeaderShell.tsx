// app/components/HeaderShell.tsx
'use client';
import Image from 'next/image';

type Props = { children: React.ReactNode; height?: number };

export default function HeaderShell({ children, height = 720 }: Props) {
    return (
        <header className="relative overflow-hidden" style={{ minHeight: height }}>
            {/* 1) Üst dalga deseni */}
            <div className="absolute inset-x-0 top-0 z-0" style={{ height }}>
                <Image
                    src="/images/common/wawes.svg"      // repeating/large dalga
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-top"
                />
            </div>

            {/* 2) Alt kıvrımlı zemin (tasarımdaki açık bej yüzey) */}
            <div className="absolute inset-x-0 bottom-0 z-0 h-[220px]">
                <Image
                    src="/images/common/herovektor.png" // PNG/JPG de olabilir
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover object-bottom opacity-95"
                />
            </div>


            {/* İçerik */}
            <div className="relative z-10">{children}</div>
        </header>
    );
}