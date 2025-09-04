'use client';

import {FormEvent, useState} from 'react';

export default function SubscribeBar() {
    const [email, setEmail] = useState('');
    const [state, setState] = useState<'idle'|'loading'|'ok'|'err'>('idle');

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        if (!email) return;
        setState('loading');

        try {
            // Hızlı demo için: /api/subscribe endpoint’ine POST at
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email })
            });

            if (res.ok) {
                setState('ok');
                setEmail('');
            } else {
                setState('err');
            }
        } catch {
            setState('err');
        }
    }

    return (
        <section className="mt-20 bg-[var(--card-bg)]/60">
            <div className="container mx-auto px-6 py-12">
                <h3 className="mb-2 text-center text-xl font-semibold text-[var(--text)]">
                    Abone Ol
                </h3>
                <p className="mb-6 text-center text-sm text-[var(--muted)]">
                    En yeni lezzetlerimiz ve tariflerimizden ilk sen haberdar ol.
                </p>

                <form
                    onSubmit={onSubmit}
                    className="mx-auto flex w-full max-w-xl items-center gap-3"
                >
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-posta adresiniz"
                        className="h-11 flex-1 rounded-md border border-black/10 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[var(--olive-700)]"
                    />
                    <button
                        type="submit"
                        disabled={state==='loading'}
                        className="h-11 whitespace-nowrap rounded-md bg-[var(--olive-700)] px-5 text-sm text-white transition hover:bg-[var(--olive-600)] disabled:opacity-60"
                    >
                        {state==='loading' ? 'Gönderiliyor…' : 'Abone Ol'}
                    </button>
                </form>

                {state==='ok' && (
                    <p className="mt-3 text-center text-sm text-green-700">
                        Teşekkürler! Aboneliğin alındı.
                    </p>
                )}
                {state==='err' && (
                    <p className="mt-3 text-center text-sm text-red-700">
                        Bir hata oluştu. Lütfen tekrar dene.
                    </p>
                )}
            </div>
        </section>
    );
}