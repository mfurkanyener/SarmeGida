// app/components/Footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {SubscribeBar} from "@sections/home";

export default function Footer() {
    const socials = [
        {
            label: "Instagram",
            href: "https://www.instagram.com/sarmezworkshop/",
            src: "/images/icons/igIcon.png",
            alt: "Instagram Icon",
        },
        {
            label: "LinkedIn",
            href: "https://linkedin.com",
            src: "/images/icons/linkedinIcon.png",
            alt: "LinkedIn Icon",
        },
        {
            label: "Facebook",
            href: "https://facebook.com",
            src: "/images/icons/fbIcon.png",
            alt: "Facebook Icon",
        },
        {
            label: "TikTok",
            href: "https://tiktok.com",
            src: "/images/icons/ttIcon.png",
            alt: "TikTok Icon",
        },
    ];
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
                <section className="container-inline relative pt-0 pb-10 text-center">
                    <SubscribeBar/>
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
                                Mail: <a className="underline" href="mailto:info@sarmez.com">info@sarmez.com</a>
                            </p>
                            <p className="text-sm opacity-90">Telefon: +90 536 706 33 00</p>
                        </div>

                        {/* Adres */}
                        <div className="md:border-l md:border-white/25 md:pl-8">
                            <h3 className="font-heading text-xl mb-2">Adres</h3>
                            <p className="text-sm opacity-90">
                                10016. Sk. No:31, 35620
                                <br/>
                                Aosb/Çiğli/İzmir, Türkiye
                            </p>
                        </div>

                        {/* Çalışma Saatleri */}
                        <div className="md:border-l md:border-white/25 md:pl-8">
                            <h3 className="font-heading text-xl mb-2">Çalışma Saatleri</h3>
                            <p className="text-sm opacity-90">Pazartesi-Cumartesi</p>
                            <p className="text-sm opacity-90">09.00 - 18.00</p>
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
                                {socials.map((s) => (
                                    <Link
                                        key={s.label}
                                        href={s.href}
                                        aria-label={s.label}
                                        className="flex h-9 w-9 items-center justify-center rounded-md bg-white/90 hover:bg-white transition"
                                        target="_blank"
                                    >
                                        <Image
                                            src={s.src}
                                            alt={s.alt}
                                            width={20}
                                            height={20}
                                            className="h-5 w-5 object-contain"
                                        />
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
                        <span className="opacity-90">© 2025 SarMez. Tüm hakları saklıdır.</span>
                        <div className="flex items-center gap-6 opacity-90">
                            <Link href="/tr/gizlilik" className="hover:underline">Gizlilik Politikası</Link>
                            <Link href="/tr/sartlar" className="hover:underline">Şartlar ve Koşullar</Link>
                        </div>
                        <span className="opacity-90">
                            <Link href="https://www.furkanyener.dev" target="_blank" rel="noopener noreferrer">
                            Created by Furkan Yener
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}