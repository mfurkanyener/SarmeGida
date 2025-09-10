'use client';

import {useTranslations} from 'next-intl';

export default function VisionMission() {
    const t = useTranslations('about.visionMission');

    return (
        <section className="section-y">
            <div className="container-inline">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Vizyon */}
                    <div>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-[color:var(--olive-700)] mb-4">
                            {t('vision.title')}
                        </h2>
                        <p className="text-[color:var(--muted)] leading-relaxed">
                            {t('vision.body')}
                        </p>
                    </div>

                    {/* Misyon */}
                    <div>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-[color:var(--olive-700)] mb-4">
                            {t('mission.title')}
                        </h2>
                        <p className="text-[color:var(--muted)] leading-relaxed">
                            {t('mission.body')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}