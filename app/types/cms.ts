export type Post = {
    id: string;
    locale: 'tr'|'en';
    title: string;
    slug: string;
    excerpt?: string | null;
    body?: string | null;
    cover_url?: string | null;
    visible: boolean;
    created_at: string;
    updated_at: string;
};