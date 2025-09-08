'use client';

import {usePathname, useRouter} from 'next/navigation';
import {useLanguageSwitch} from '@/app/components/i18n/LanguageSwitchContext';

export default function LanguageSwitch() {
    const pathname = usePathname() || '/';
    const router = useRouter();
    const {override} = useLanguageSwitch();

    // mevcut locale
    const parts = pathname.split('/');
    const current = parts[1] === 'en' ? 'en' : 'tr';
    const next = current === 'tr' ? 'en' : 'tr';

    function getDefaultSwapPath() {
        const newParts = [...parts];
        newParts[1] = next;
        const nextPath = newParts.join('/') || `/${next}`;
        return nextPath;
    }

    function onClick() {
        // 1) override varsa onu kullan
        const target = override?.[next];
        if (target) {
            router.push(target);
            return;
        }
        // 2) yoksa sadece /tr↔/en segment swap
        router.push(getDefaultSwapPath());
    }

    return (
        <button
            onClick={onClick}
            aria-label={`Switch language to ${next.toUpperCase()}`}
            className="px-4 py-1 rounded-full border border-[color:var(--olive-700)] text-[color:var(--olive-700)] hover:bg-[color:var(--olive-700)] hover:text-white transition"
        >
            {next.toUpperCase()}
        </button>
    );
}