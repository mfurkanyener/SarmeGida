'use client';
import { FormEvent, useState } from 'react';
import { subscribe } from '@/app/actions/subscribe';

export default function SubscribeBar() {
    const [email, setEmail] = useState('');
    const [state, setState] = useState<'idle'|'loading'|'ok'|'err'>('idle');

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        const value = email.trim();
        if (!value) return;
        setState('loading');

        const res = await subscribe(value);
        if (res.ok) {
            setEmail('');
            setState('ok');
        } else {
            console.error('subscribe action error:', res.error);
            setState('err');
        }
    }

    return (
        <section className="mt-20">
            <div className="container-inline relative pt-24 pb-10 text-center">
                <h2 className="font-heading text-3xl md:text-4xl text-[color:var(--bg)]">Abone Ol</h2>
                <p className="mt-3 text-[color:var(--bg)]/90">
                    Sarmez e-bülten aboneliği ile
                    <br />
                    en yeni lezzetlerimizi ilk duyan siz olun!
                </p>

                <form onSubmit={onSubmit} className="mx-auto mt-6 flex max-w-3xl items-center gap-3">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-posta adresiniz"
                        className="flex-1 rounded-md bg-white/95 px-4 py-3 text-[color:var(--text)] placeholder:text-[color:var(--muted)] focus:outline-none"
                    />
                    <button
                        type="submit"
                        disabled={state === 'loading'}
                        className="rounded-md bg-[color:var(--olive-700)] px-5 py-3 text-white hover:bg-[color:var(--olive-600)] transition"
                    >
                        {state === 'loading' ? 'Gönderiliyor…' : 'Abone Ol'}
                    </button>
                </form>

                {state === 'ok' && <p className="mt-3 text-center text-sm text-green-700">Teşekkürler! Aboneliğin alındı.</p>}
                {state === 'err' && <p className="mt-3 text-center text-sm text-red-700">Bir hata oluştu. Lütfen tekrar dene.</p>}
            </div>
        </section>
    );
}