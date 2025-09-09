// app/(public)/[locale]/gizlilik/page.tsx
import PrivacyPolicy from '@/app/components/legal/PrivacyPolicy';
import GenericHero from '@/app/components/hero/GenericHero';
import HeaderShell from '@layout/HeaderShell';
import {getTranslations} from 'next-intl/server';

type Props = {
    params: { locale: 'tr' | 'en' };
};

export default async function Page({ params }: Props) {
    const t = await getTranslations({ locale: params.locale, namespace: 'privacy.hero' });

    return (
        <>
            <HeaderShell height={420}>
                <GenericHero title={t('title')} subtitle={t('subtitle')} />
            </HeaderShell>
            <main className="container-inline py-10 max-w-4xl mx-auto">
                <PrivacyPolicy locale={params.locale} />
            </main>
        </>
    );
}