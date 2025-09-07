'use client';

import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { supabaseBrowser } from '@/lib/supabase/client';

export default function LoginClient() {
    const router = useRouter();
    const qs = useSearchParams();
    const locale = useLocale();
    const redirectTo = qs.get('redirect') || `/${locale}/admin`;

    const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setErr(null);

        const { error } = await supabaseBrowser.auth.signInWithPassword({ email, password });
        setLoading(false);

        if (error) {
            console.error('[signInWithPassword]', error);
            setErr(error.message || 'Giriş başarısız. E-posta/şifreyi kontrol edin.');
            return;
        }

        // 🔁 Client oturumunu SSR cookie’ye senkronla
        const { data: { session } } = await supabaseBrowser.auth.getSession();
        await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event: 'SIGNED_IN', session }),
        });

        router.replace(redirectTo);
    }

    return (
        <main
            className="container-inline"
            style={{paddingBlock: 'clamp(32px, 6vw, 64px)'}}  /* globals.css -> section boşluğu */
        >
            <div
                className="mx-auto w-full"
                style={{maxWidth: 'var(--container-max)'}}       /* içerik genişliği sınırı */
            >
                <div
                    className="mx-auto w-full max-w-md bg-white rounded-2xl border"
                    style={{
                        boxShadow: 'var(--shadow-card)',
                        padding: 'clamp(var(--gutter-min), 5vw, var(--gutter))', // responsive gutter
                    }}
                >
                    {/* Başlık */}
                    <h1 className="text-2xl font-semibold mb-1 text-[color:var(--olive-700)]">
                        Admin Giriş
                    </h1>
                    <p className="text-sm mb-6 text-[color:var(--muted)]">
                        Lütfen hesabınıza giriş yapın.
                    </p>

                    {/* Form */}
                    <form onSubmit={onSubmit} className="space-y-4">
                        <label className="block">
                            <span className="text-sm font-medium text-[color:var(--muted)]">Email</span>
                            <input
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-[color:var(--olive-600)]"
                                type="email"
                                placeholder="email@ornek.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium text-[color:var(--muted)]">Şifre</span>
                            <input
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-[color:var(--olive-600)]"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPwd(e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                        </label>

                        {err && (
                            <p className="text-red-600 text-sm">
                                {err}
                            </p>
                        )}

                        <button disabled={loading} className="btn btn-olive w-full disabled:opacity-50">
                            {loading ? 'Giriş yapılıyor…' : 'Giriş Yap'}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}