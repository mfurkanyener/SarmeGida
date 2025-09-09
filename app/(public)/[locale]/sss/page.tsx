// app/(public)/[locale]/sss/page.tsx
import Accordion, { FaqItem } from '@/app/components/faq/Accordion';
import HeaderShell from '@layout/HeaderShell';
import GenericHero from '@/app/components/hero/GenericHero';
import { getTranslations } from 'next-intl/server';

type Props = { params: { locale: 'tr' | 'en' } };

export default async function FAQPage({ params }: Props) {
    const t = await getTranslations({ locale: params.locale, namespace: 'faq' });

    const title = t('hero.title');
    const subtitle = t('hero.subtitle');

    const tx = (key: string) => {
        try { return t(key as never); } catch { return ''; }
    };

    const items: FaqItem[] = [];
    for (let i = 0; i < 5; i++) {
        const q = tx(`items.${i}.q`);
        const a = tx(`items.${i}.a`);
        if (!q || !a || q.startsWith('items.') || a.startsWith('items.')) break;
        items.push({ q, a });
    }

    return (
        <>
            <HeaderShell height={420}>
                <GenericHero title={title} subtitle={subtitle} />
            </HeaderShell>

            <main className="container-inline py-10" style={{ maxWidth: 'var(--container-max)' }}>
                <section aria-labelledby="faq-heading" className="section-y">
                    <h1 id="faq-heading" className="sr-only">FAQ</h1>
                    <Accordion items={items} />
                </section>
            </main>
        </>
    );
}