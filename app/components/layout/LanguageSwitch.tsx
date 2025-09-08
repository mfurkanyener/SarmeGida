// app/components/layout/LanguageSwitch.tsx
'use client';

import {useState, useCallback} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {supabaseClient} from '@/lib/supabase/client';

type Locale = 'tr'|'en';

type Override = {
    currentLocale: Locale;
    /** Eğer sağlanırsa tamamen bunu kullanır (örn. özel sayfalar) */
    computeHref?: (to: Locale) => string | Promise<string>;
};

export default function LanguageSwitch({ override }: { override?: Override }) {
    const pathname = usePathname() || '/';
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const current: Locale =
        override?.currentLocale ??
        (pathname.split('/')[1] === 'en' ? 'en' : 'tr');

    const next: Locale = current === 'tr' ? 'en' : 'tr';

    const computeHrefSmart = useCallback(async (to: Locale) => {
        if (override?.computeHref) {
            return await override.computeHref(to);
        }

        const parts = pathname.split('/').filter(Boolean);
        // Minimum: ["tr"] veya ["en"]
        if (parts.length === 0) return `/${to}`;

        const locFromUrl = parts[0] === 'en' ? 'en' : 'tr';
        const rest = parts.slice(1); // locale sonrası path

        if (rest[0] === 'lezzet-recetesi' && rest[1]) {
            const slug = rest[1];

            const { data: cur, error: e1 } = await supabaseClient
                .from('post_translations')
                .select('post_id')
                .eq('locale', locFromUrl)
                .eq('slug', slug)
                .maybeSingle();

            if (e1) console.error(e1);
            if (!cur?.post_id) {
                return `/${to}/lezzet-recetesi`;
            }

            const { data: alt, error: e2 } = await supabaseClient
                .from('post_translations')
                .select('slug')
                .eq('post_id', cur.post_id)
                .eq('locale', to)
                .maybeSingle();

            if (e2) console.error(e2);

            return alt?.slug
                ? `/${to}/lezzet-recetesi/${alt.slug}`
                : `/${to}/lezzet-recetesi`;
        }

        // ÜRÜN DETAY: /:locale/lezzetlerimiz/:slug
        if (rest[0] === 'lezzetlerimiz' && rest[1]) {
            const slug = rest[1];

            // 1) mevcut slug -> product_id
            const { data: cur, error: e1 } = await supabaseClient
                .from('product_translations')
                .select('product_id')
                .eq('locale', locFromUrl)
                .eq('slug', slug)
                .maybeSingle();

            if (e1) console.error(e1);
            if (!cur?.product_id) {
                return `/${to}/lezzetlerimiz`;
            }

            // 2) hedef dil slug
            const { data: alt, error: e2 } = await supabaseClient
                .from('product_translations')
                .select('slug')
                .eq('product_id', cur.product_id)
                .eq('locale', to)
                .maybeSingle();

            if (e2) console.error(e2);

            return alt?.slug
                ? `/${to}/lezzetlerimiz/${alt.slug}`
                : `/${to}/lezzetlerimiz`;
        }

        // 3) Diğer tüm sayfalar: sadece locale segmentini değiştir
        const newParts = [...parts];
        newParts[0] = to;
        return '/' + newParts.join('/');
    }, [override, pathname]);

    async function onClick() {
        try {
            setLoading(true);
            const href = await computeHrefSmart(next);
            router.push(href);
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            onClick={onClick}
            disabled={loading}
            className="px-4 py-1 rounded-full border border-[color:var(--olive-700)] text-[color:var(--olive-700)] hover:bg-[color:var(--olive-700)] hover:text-white transition disabled:opacity-60"
            aria-label={`Switch language to ${next.toUpperCase()}`}
        >
            {next.toUpperCase()}
        </button>
    );
}