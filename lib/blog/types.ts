export type PostPublicRow = {
    post_id: string;
    cover_url: string | null;
    gallery: string[] | null;
    visible: boolean;
    sort: number;
    tags: string[] | null;
    created_at: string;
    updated_at: string;
    locale: 'tr'|'en';
    title: string;
    slug: string;
    excerpt: string | null;
    body: string | null;
};

export type NewPostInput = {
    coverFile?: File;
    coverUrl?: string;
    visible: boolean;
    sort: number;
    tags?: string[];
    tr: { title: string; slug: string; excerpt?: string; body?: string };
    en: { title: string; slug: string; excerpt?: string; body?: string };
};

export type UpdatePostInput = Partial<NewPostInput> & { postId: string };