'use client';

import {usePathname, useRouter} from 'next/navigation';

export default function LanguageSwitch() {
    const pathname = usePathname();
    const router = useRouter();

    // mevcut locale → /tr/... ya da /en/...
    const parts = (pathname || '/').split('/');
    const current = parts[1] === 'en' ? 'en' : 'tr'; // fallback = tr
    const next = current === 'tr' ? 'en' : 'tr';

    function switchTo(next: 'tr' | 'en') {
        const newParts = [...parts];
        newParts[1] = next;
        const nextPath = newParts.join('/') || `/${next}`;
        router.push(nextPath);
    }

    return (
        <button
            onClick={() => switchTo(next)}
            aria-label={`Switch language to ${next.toUpperCase()}`}
            className="px-4 py-1 rounded-full border border-[color:var(--olive-700)] text-[color:var(--olive-700)] hover:bg-[color:var(--olive-700)] hover:text-white transition"
        >
            {next.toUpperCase()}
        </button>
    );
}