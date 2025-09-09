// app/components/legal/TermsConditions.tsx
import trDoc from '@/messages/tr/trTermsConditions.json';
import enDoc from '@/messages/en/enTermsConditions.json';

type Locale = 'tr' | 'en';

type TermsDoc = {
    updatedLabel: string;
    sections: { heading: string; paragraph?: string; list?: string[] }[];
    contactEmail: string;
};

// JSON iki şekilde gelebilir: doğrudan TermsDoc ya da { termConditions: TermsDoc }
type TermsFile = TermsDoc | { termConditions: TermsDoc };

function toTermsDoc(file: TermsFile): TermsDoc {
    if ("termConditions" in file) {
        return file.termConditions;
    }
    return file;
}

export default function TermsConditions({
                                            locale,
                                            lastUpdated,
                                        }: {
    locale: Locale;
    lastUpdated?: string;
}) {
    const raw = (locale === 'tr' ? trDoc : enDoc) as unknown as TermsFile;
    const doc = toTermsDoc(raw);

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
                    {doc.sections.map((sec, i) => (
                        <div key={i}>
                            <h2 className="font-heading text-2xl">{sec.heading}</h2>
                            {sec.paragraph && <p>{sec.paragraph}</p>}
                            {sec.list && (
                                <ul className="list-disc pl-6">
                                    {sec.list.map((li, k) => (
                                        <li key={k}>{li}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}

                    <p>
                        <a className="underline" href={`mailto:${doc.contactEmail}`}>
                            {doc.contactEmail}
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}