export type PostPublicRow = {
    post_id: string;
    cover_url: string | null;
    visible: boolean;
    sort: number;
    created_at: string;
    updated_at: string;
    locale: 'tr' | 'en';
    title: string;
    slug: string;
    excerpt: string | null;
    body: string | null;
};