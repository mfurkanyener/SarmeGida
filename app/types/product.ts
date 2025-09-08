// app/types/product.ts
export type Nutrition = {
    per: '100g' | '1portion' | string;
    calories_kcal?: number;
    carbs_g?: number;
    protein_g?: number;
    fat_g?: number;
    [k: string]: number | string | undefined;
};

export type ProductBase = {
    id: string;
    visible: boolean;
    image_url: string | null;
    gallery: string[] | null;
    nutrition: Nutrition | null;
    sort: number;
    created_at: string;
    updated_at: string;
};

export type ProductTranslation = {
    id: string;
    product_id: string;
    locale: 'tr' | 'en';
    name: string;
    slug: string;
    excerpt: string;
    body: string;
    ingredients: string[];
    created_at: string;
    updated_at: string;
};

export type ProductPublic = {
    product_id: string;               // 👈 eklendi / değişti
    image_url: string | null;
    gallery: string[] | null;
    visible: boolean;
    sort: number;
    nutrition: Record<string, number> | null; // veya Json tipin
    created_at: string;
    updated_at: string;

    locale: 'tr' | 'en';
    name: string;
    slug: string;
    excerpt: string | null;
    body: string | null;
    ingredients: string[] | null;
};

export type ProductFull = ProductBase & {
    t: ProductTranslation; // seçili locale çevirisi
};