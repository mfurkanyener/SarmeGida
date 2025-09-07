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
        <main className="container-inline py-12 max-w-md">
            <h1 className="text-2xl font-semibold mb-6">Admin Giriş</h1>
            <form onSubmit={onSubmit} className="space-y-4">
                <input className="w-full border rounded px-3 py-2" type="email"
                       placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}
                       required autoComplete="email" />
                <input className="w-full border rounded px-3 py-2" type="password"
                       placeholder="Şifre" value={password} onChange={(e)=>setPwd(e.target.value)}
                       required autoComplete="current-password" />
                {err && <p className="text-red-600 text-sm">{err}</p>}
                <button disabled={loading} className="btn btn-olive w-full">
                    {loading ? 'Giriş yapılıyor…' : 'Giriş Yap'}
                </button>
            </form>
        </main>
    );
}