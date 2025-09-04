'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Certificates() {
    const t = useTranslations('about.certificates');

    const certificates = [
        {
            id: 1,
            src: "/images/common/ornekSertifika.jpeg",
            alt: "Örnek Sertifika",
        },
        {
            id: 2,
            src: "/images/common/ornekSertifika.jpeg",
            alt: "Örnek Sertifika 2",
        },
        {
            id: 3,
            src: "/images/common/ornekSertifika.jpeg",
            alt: "Örnek Sertifika 3",
        },
        {
            id: 4,
            src: "/images/common/ornekSertifika.jpeg",
            alt: "Örnek Sertifika 4",
        },
    ];

    return (
        <section className="container-inline py-16 text-center">
            <h2 className="text-2xl font-semibold mb-6">{t('title')}</h2>
            <p className="max-w-2xl mx-auto text-gray-600 mb-12">{t('description')}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {certificates.map(cert => (
                    <div key={cert.id} className="flex justify-center">
                        <Image
                            src={cert.src}
                            alt={cert.alt}
                            width={300}
                            height={200}
                            className="rounded-lg shadow-md"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}