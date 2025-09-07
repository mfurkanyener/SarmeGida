// app/components/Footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';

export default function Footer() {
    // ❗ Yol kontrolü: auth sayfalarında footer'ı gizle
    const pathname = usePathname() || '/';
    const hideFooter = /^\/(tr|en)\/auth(?:\/|$)/.test(pathname);
    if (hideFooter) return null;
    return (
        <footer
            className="relative bg-no-repeat bg-cover bg-top text-white"
            style={{backgroundImage: "url('/images/common/footer.png')"}}
        >
            <div className="container mx-auto py-12">

                {/* Abone ol bloğu */}
                <section className="container-inline relative pt-24 pb-10 text-center">
                    <h2 className="font-heading text-3xl md:text-4xl text-[color:var(--bg)]">
                        Abone Ol
                    </h2>
                    <p className="mt-3 text-[color:var(--bg)]/90">
                        Sarmez e-bülten aboneliği ile
                        <br/>
                        en yeni lezzetlerimizi ilk duyan siz olun!
                    </p>

                    <form
                        className="mx-auto mt-6 flex max-w-3xl items-center gap-3"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="email"
                            required
                            placeholder="E-Posta"
                            className="flex-1 rounded-md bg-white/95 px-4 py-3 text-[color:var(--text)] placeholder:text-[color:var(--muted)] focus:outline-none"
                        />
                        <button
                            className="rounded-md bg-[color:var(--olive-700)] px-5 py-3 text-white hover:bg-[color:var(--olive-600)] transition"
                            type="submit"
                        >
                            Abone Ol
                        </button>
                    </form>
                </section>

                {/* Üst bilgiler: logo + iletişim + adres + çalışma saatleri */}
                <section className="container-inline relative border-t border-white/20 pt-10 pb-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:items-start">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <Image
                                src="/images/common/logo.png"
                                alt="SarMez"
                                width={80}
                                height={80}
                                className="w-16 h-auto"
                            />
                            <span className="font-semibold text-lg">SARMEZ</span>
                        </div>

                        {/* İletişim */}
                        <div className="md:border-l md:border-white/25 md:pl-8">
                            <h3 className="font-heading text-xl mb-2">İletişim</h3>
                            <p className="text-sm opacity-90">
                                Mail: <a className="underline" href="mailto:sarmez@info.com">sarmez@info.com</a>
                            </p>
                            <p className="text-sm opacity-90">Telefon: 0 850 352 35 35</p>
                        </div>

                        {/* Adres */}
                        <div className="md:border-l md:border-white/25 md:pl-8">
                            <h3 className="font-heading text-xl mb-2">Adres</h3>
                            <p className="text-sm opacity-90">
                                10026. Sk. No:2, 35620
                                <br/>
                                Aosb/Çiğli/İzmir, Türkiye
                            </p>
                        </div>

                        {/* Çalışma Saatleri */}
                        <div className="md:border-l md:border-white/25 md:pl-8">
                            <h3 className="font-heading text-xl mb-2">Çalışma Saatleri</h3>
                            <p className="text-sm opacity-90">Pazartesi-Cumartesi</p>
                            <p className="text-sm opacity-90">9.00 - 18.00</p>
                        </div>
                    </div>
                </section>

                {/* Alt link blokları */}
                <section className="container-inline border-t border-white/20 py-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        <div>
                            <h4 className="font-heading text-xl mb-3">Hakkımızda</h4>
                            <ul className="space-y-2 opacity-95">
                                <li><Link href="/tr/hikayemiz" className="hover:underline">Hikayemiz</Link></li>
                                <li><Link href="/tr/lezzet-recetesi" className="hover:underline">Lezzet Reçetesi</Link>
                                </li>
                                <li><Link href="/tr/sss" className="hover:underline">Sıkça Sorulan Sorular</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-heading text-xl mb-3">Lezzetlerimiz</h4>
                            <ul className="space-y-2 opacity-95">
                                <li><Link href="/tr/lezzetlerimiz/yaprak-sarmasi" className="hover:underline">Yaprak
                                    Sarması</Link></li>
                                <li><Link href="/tr/lezzetlerimiz/cig-kofte" className="hover:underline">Çiğ
                                    köfte</Link></li>
                                <li><Link href="/tr/lezzetlerimiz/meze" className="hover:underline">Meze</Link></li>
                                <li><Link href="/tr/lezzetlerimiz/kalburabasti"
                                          className="hover:underline">Kalburabastı</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-heading text-xl mb-3">Bize Yazın</h4>
                            <ul className="space-y-2 opacity-95">
                                <li><Link href="/tr/iletisim" className="hover:underline">İletişim Formu</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-heading text-xl mb-3">Bizi Takip Edin</h4>
                            <div className="grid grid-cols-4 gap-3 max-w-[180px]">
                                {[
                                    {label: 'IG', href: 'https://instagram.com'},
                                    {label: 'IN', href: 'https://linkedin.com'},
                                    {label: 'FB', href: 'https://facebook.com'},
                                    {label: 'TT', href: 'https://tiktok.com'}
                                ].map(s => (
                                    <Link
                                        key={s.label}
                                        href={s.href}
                                        aria-label={s.label}
                                        className="flex h-9 w-9 items-center justify-center rounded-md bg-white/90 text-[color:var(--olive-700)] font-semibold hover:bg-white transition"
                                        target="_blank"
                                    >
                                        {s.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* En alt çubuk */}
                <div className="bg-black/20">
                    <div
                        className="container-inline flex flex-col gap-3 py-4 text-sm md:flex-row md:items-center md:justify-between">
                        <span className="opacity-90">© 2025 SarMez</span>
                        <div className="flex items-center gap-6 opacity-90">
                            <Link href="/tr/gizlilik" className="hover:underline">Gizlilik Politikası</Link>
                            <Link href="/tr/sartlar" className="hover:underline">Şartlar ve Koşullar</Link>
                        </div>
                        <span className="opacity-90">Created by Furkan Yener</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}