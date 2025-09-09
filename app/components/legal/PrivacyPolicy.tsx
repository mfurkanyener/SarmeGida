// app/components/legal/PrivacyPolicy.tsx
import trDoc from '@/messages/tr/trPrivacy.json';
import enDoc from '@/messages/en/enPrivacy.json';

type Locale = 'tr' | 'en';

type PrivacyDoc = {
    updatedLabel: string;
    intro: string;
    sections: { heading: string; list?: string[]; paragraph?: string }[];
    contactPrefix: string;
    email: string;
};

export default function PrivacyPolicy({
                                          locale,
                                          lastUpdated,
                                      }: { locale: Locale; lastUpdated?: string }) {
    const doc: PrivacyDoc = (locale === 'tr' ? trDoc : enDoc) as PrivacyDoc;

    return (
        <section className="section-y">
            <div className="container-inline max-w-4xl mx-auto">
                <header className="mb-8 text-center">
                    {lastUpdated && (
                        <p className="mt-2 text-[color:var(--muted)]">
                            {doc.updatedLabel} {lastUpdated}
                        </p>
                    )}
                </header>

                <div className="prose max-w-none prose-p:my-3">
                    <p>{doc.intro}</p>

                    {doc.sections.map((sec, i) => (
                        <div key={i}>
                            <h2 className="font-heading text-2xl">{sec.heading}</h2>
                            {sec.list && (
                                <ul className="list-disc pl-6">
                                    {sec.list.map((li, k) => <li key={k}>{li}</li>)}
                                </ul>
                            )}
                            {sec.paragraph && <p>{sec.paragraph}</p>}
                        </div>
                    ))}

                    <p>
                        {doc.contactPrefix}{' '}
                        <a className="underline" href={`mailto:${doc.email}`}>
                            {doc.email}
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}