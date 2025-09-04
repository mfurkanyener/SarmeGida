'use client';

import {useTranslations} from 'next-intl';
import Image from 'next/image';

type Props = {
    phone?: string;
    email?: string;
    address?: string;
    hours?: string;
    // Google Maps embed src (iframe)
    mapSrc?: string;
};

export default function ContactInfo({
                                        phone = '+90 535 572 76 39',
                                        email = 'info@sarmez.com',
                                        address = '10016. Sk. No:2, 35620 Aosb/Çiğli/İzmir, Türkiye',
                                        hours = 'Pazartesi–Cumartesi 9.00 – 18.00',
                                        mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1989.877...'
                                    }: Props) {
    const t = useTranslations('contact');

    return (
        <section className="container-inline py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                {/* Sol: İletişim bilgileri */}
                <div>
                    {/* İletişim */}
                    <h2 className="text-3xl md:text-4xl font-heading text-[color:var(--olive-700)] mb-6">
                        {t('contactTitle')}
                    </h2>

                    <div className="space-y-8 text-lg">
                        <div>
                            <p className="mb-2">{phone}</p>
                            <a
                                href={`mailto:${email}`}
                                className="underline underline-offset-4 hover:opacity-80"
                            >
                                {email}
                            </a>
                        </div>

                        {/* Adres */}
                        <div>
                            <h3 className="text-2xl font-heading text-[color:var(--olive-700)] mb-2">
                                {t('addressTitle')}
                            </h3>
                            <p>{address}</p>
                        </div>

                        {/* Çalışma saatleri */}
                        <div>
                            <h3 className="text-2xl font-heading text-[color:var(--olive-700)] mb-2">
                                {t('hoursTitle')}
                            </h3>
                            <p>{hours}</p>
                        </div>

                        {/* Sosyaller */}
                        <div>
                            <h3 className="text-2xl font-heading text-[color:var(--olive-700)] mb-4">
                                {t('followTitle')}
                            </h3>

                            <div className="flex items-center gap-6">
                                {/* Eğer elinizde PNG/SVG ikonlar varsa /public altına koyup bu Image’ları kullanın */}
                                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                                    <Image src="/images/common/instagram.png" alt="Instagram" width={40} height={40} />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                                    <Image src="/images/common/linkedin.png" alt="LinkedIn" width={40} height={40} />
                                </a>
                                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                                    <Image src="/images/common/facebook.png" alt="Facebook" width={40} height={40} />
                                </a>
                                <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">
                                    <Image src="/images/common/tiktok.png" alt="TikTok" width={40} height={40} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sağ: Harita */}
                <div className="rounded-2xl overflow-hidden bg-white/60">
                    <iframe
                        title={t('mapAlt')}
                        src={mapSrc}
                        width="100%"
                        height="520"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full border-0"
                    />
                </div>
            </div>
        </section>
    );
}