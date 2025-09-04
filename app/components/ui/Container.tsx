// app/components/ui/Button.tsx
'use client';

import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
}

export default function Button({ variant = 'primary', className, ...props }: ButtonProps) {
    return (
        <button
            className={clsx(
                'px-4 py-2 rounded font-medium transition',
                variant === 'primary' && 'bg-[color:var(--olive-700)] text-white hover:bg-[color:var(--olive-600)]',
                variant === 'secondary' && 'border border-[color:var(--olive-700)] text-[color:var(--olive-700)] hover:bg-[color:var(--olive-700)] hover:text-white',
                className
            )}
            {...props}
        />
    );
}