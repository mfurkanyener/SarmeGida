// app/sections/contact/ContactForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import * as React from 'react';
import clsx from 'clsx';
import emailjs from "emailjs-com";


type Props = {
    className?: string;
};

export default function ContactForm({ className }: Props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const [submitting, setSubmitting] = useState(false);
    const [ok, setOk] = useState<null | boolean>(null);
    const [err, setErr] = useState<string | null>(null);

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);
        setOk(null);
        setErr(null);

        try {
            const res = await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                {
                    from_name: name,
                    from_email: email,
                    phone,
                    message,
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );

            console.log("EmailJS response:", res);
            setOk(true);
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
        } catch (error) {
            console.error(error);
            setErr("Gönderim başarısız, lütfen tekrar deneyin.");
            setOk(false);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section
            className={clsx(
                'container-inline',
                'py-10 md:py-14',
                className
            )}
        >
            <div className="mx-auto rounded-2xl md:rounded-[24px] bg-[#E8DCCF]/70 p-6 md:p-10 lg:p-12 border border-[rgba(85,98,74,0.25)]">
                <h2 className="text-[32px] md:text-[44px] font-heading text-[color:var(--olive-700)] mb-6 md:mb-8">
                    Bize Ulaşın
                </h2>

                <form onSubmit={onSubmit} className="space-y-4 md:space-y-5">
                    {/* Ad & E-posta */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                        <label className="block">
                            <span className="sr-only">Ad Soyad</span>
                            <input
                                type="text"
                                placeholder="Ad Soyad"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full rounded-[16px] border border-[rgba(85,98,74,0.5)] bg-[#E8DCCF] px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-[rgba(85,98,74,0.35)]"
                            />
                        </label>

                        <label className="block">
                            <span className="sr-only">E-Posta</span>
                            <input
                                type="email"
                                placeholder="E-Posta"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-[16px] border border-[rgba(85,98,74,0.5)] bg-[#E8DCCF] px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-[rgba(85,98,74,0.35)]"
                                autoComplete="email"
                            />
                        </label>
                    </div>

                    {/* Telefon */}
                    <label className="block">
                        <span className="sr-only">Telefon</span>
                        <input
                            type="tel"
                            placeholder="Telefon"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full rounded-[16px] border border-[rgba(85,98,74,0.5)] bg-[#E8DCCF] px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-[rgba(85,98,74,0.35)]"
                            autoComplete="tel"
                        />
                    </label>

                    {/* Mesajınız */}
                    <label className="block">
                        <span className="sr-only">Mesajınız</span>
                        <textarea
                            placeholder="Mesajınız"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            rows={6}
                            className="w-full rounded-[16px] border border-[rgba(85,98,74,0.5)] bg-[#E8DCCF] px-5 py-4 text-lg outline-none focus:ring-2 focus:ring-[rgba(85,98,74,0.35)] resize-y"
                        />
                    </label>

                    {/* Not */}
                    <p className="text-sm text-[color:var(--muted)]">
                        Form üzerinden paylaştığınız bilgiler yalnızca size dönüş yapılması amacıyla kullanılacaktır.
                    </p>

                    {/* Hata / Başarı */}
                    <div
                        className={clsx(
                            "fixed bottom-6 right-6 z-50 transition-transform duration-300",
                            ok || err ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
                        )}
                    >
                        <div
                            className={clsx(
                                "px-5 py-3 rounded-lg shadow-lg text-white",
                                ok && "bg-green-600",
                                err && "bg-red-600"
                            )}
                        >
                            {ok && "✅ Teşekkürler! Mesajınız başarıyla iletildi."}
                            {err && `❌ ${err}`}
                        </div>
                    </div>

                    {/* Gönder */}
                    <button
                        type="submit"
                        disabled={submitting}
                        className={clsx(
                            'w-full rounded-[18px] md:rounded-[20px] px-6 py-5 md:py-6',
                            'text-white text-xl md:text-2xl font-medium',
                            'bg-[color:var(--olive-700)] hover:bg-[color:var(--olive-600)]',
                            'transition disabled:opacity-60 disabled:cursor-not-allowed'
                        )}
                    >
                        {submitting ? 'Gönderiliyor…' : 'Gönder'}
                    </button>
                </form>
            </div>
        </section>
    );
}