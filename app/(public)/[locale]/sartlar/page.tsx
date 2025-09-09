// app/(public)/[locale]/sartlar/page.tsx
import TermsConditions from '@/app/components/legal/TermsConditions';
import GenericHero from "@/app/components/hero/GenericHero";
import HeaderShell from "@layout/HeaderShell";
import {getTranslations} from "next-intl/server";

type Props = {
    params: { locale: 'tr' | 'en' };
};

export default async function Page({ params }: Props) {
    const t = await getTranslations({ locale: params.locale, namespace: 'termConditions.hero' });

    return (
        <>
            <HeaderShell height={420}>
                <GenericHero title={t('title')} subtitle={t('subtitle')} />
            </HeaderShell>
            <main className="container-inline py-10 max-w-4xl mx-auto">
                <TermsConditions locale={params.locale} />
            </main>
        </>
    );
}
