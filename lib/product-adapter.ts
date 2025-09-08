import type { ProductPublic } from '@/app/types/product';

// Bileşenin beklediği tiplerin lokal kopyası (import etmek istersen oradan da alabilirsin)
type Locale = 'tr'|'en';
type Nutrition = { kcal?: number; carbs_g?: number; protein_g?: number; fat_g?: number; [k: string]: number | undefined; };
type Translation = { locale: Locale; name: string; slug: string; excerpt: string; body?: string; ingredients?: string[]; };

export type ProductDetailProps = {
    image_url: string;
    gallery?: string[];
    t: Translation;
    nutrition?: Nutrition;
    labels?: Partial<{
        ingredients: string; nutritionTitle: string; per100g: string;
        kcal: string; carbs: string; protein: string; fat: string; value: string;
    }>;
};

/** Supabase view (products_public) satırını ProductDetailCard prop’larına çevirir */
export function adaptToDetailProps(row: ProductPublic): ProductDetailProps {
    return {
        image_url: row.image_url ?? '/images/placeholders/product.jpg',
        gallery: row.gallery ?? [],
        t: {
            locale: (row.locale === 'en' ? 'en' : 'tr'),
            name: row.name ?? '',
            slug: row.slug ?? '',
            excerpt: row.excerpt ?? '',
            body: row.body ?? '',
            ingredients: row.ingredients ?? []
        },
        nutrition: normalizeNutrition(row.nutrition)
    };
}

/** DB’de nutrition JSON’unda iki durumu destekle:
 * 1) Standart anahtarlar: {kcal, carbs_g, protein_g, fat_g}
 * 2) Serbest metin anahtarlar: {"Kalori":"150 kcal","Karbonhidrat":"18 g",...}
 */
function normalizeNutrition(n: unknown): Nutrition | undefined {
    if (!n || typeof n !== 'object') return undefined;
    const obj = n as Record<string, unknown>;

    // 1) Standart şema zaten uygunsa direkt dön
    if ('kcal' in obj || 'carbs_g' in obj || 'protein_g' in obj || 'fat_g' in obj) {
        const typed = obj as Nutrition;
        return typed;
    }

    // 2) Serbest anahtarlar → sayıya çevir
    const out: Nutrition = {};
    for (const [k, v] of Object.entries(obj)) {
        const num = typeof v === 'string' ? parseFloat(v) : typeof v === 'number' ? v : NaN;
        if (Number.isNaN(num)) continue;

        if (/kalori|calorie/i.test(k)) out.kcal = num;
        else if (/karbonhidrat|carb/i.test(k)) out.carbs_g = num;
        else if (/protein/i.test(k)) out.protein_g = num;
        else if (/ya[gğ]|fat/i.test(k)) out.fat_g = num;
        else out[k] = num; // ek alanlar
    }
    return Object.keys(out).length ? out : undefined;
}