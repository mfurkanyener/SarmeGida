// app/components/product/ProductDetailCard.tsx
// 'next/image' gerekmiyor; domain whitelisti sorunlarından kaçınmak için <img> kullanıyoruz.
// İstersen sadece Supabase Storage kullanıyorsan Image'a dönebilirsin.
type Locale = "tr" | "en";

type Nutrition = {
    kcal?: number;
    carbs_g?: number;
    protein_g?: number;
    fat_g?: number;
    [k: string]: number | undefined;
};

type Translation = {
    locale: Locale;
    name: string;
    slug: string;
    excerpt: string;
    body?: string;
    ingredients?: string[];
};

type ProductDetailProps = {
    image_url: string | null;
    gallery?: string[] | null;
    t: Translation;
    nutrition?: Nutrition;
    labels?: Partial<{
        ingredients: string;
        nutritionTitle: string;
        per100g: string;
        kcal: string;
        carbs: string;
        protein: string;
        fat: string;
        value: string;
    }>;
};

export default function ProductDetailCard({
                                              image_url,
                                              gallery,
                                              t,
                                              nutrition,
                                              labels,
                                          }: ProductDetailProps) {
    const isTR = t.locale === "tr";

    const L = {
        ingredients: isTR ? "İçindekiler" : "Ingredients",
        nutritionTitle: isTR ? "Besin Değeri (100 gr için)" : "Nutrition Facts (per 100 g)",
        per100g: isTR ? "100 gr için" : "per 100 g",
        kcal: isTR ? "Kalori" : "Calories",
        carbs: isTR ? "Karbonhidrat" : "Carbs",
        protein: isTR ? "Protein" : "Protein",
        fat: isTR ? "Yağ" : "Fat",
        value: isTR ? "Değer" : "Value",
        ...labels,
    };

    return (
        <section
            className="container-inline py-10"
            style={{ maxWidth: "var(--container-max)" }}
            aria-labelledby="product-title"
        >
            {/* Üst: görsel + metinler */}
            <div className="grid gap-8 md:grid-cols-12 items-start">
                {/* Görsel */}
                <div className="md:col-span-5">
                    <div
                        className="overflow-hidden rounded-2xl border bg-white"
                        style={{ boxShadow: "var(--shadow-card)" }}
                    >
                        {/* 4:3 oran kutusu */}
                        <div className="relative w-full" style={{ paddingTop: "75%" }}>
                            {image_url ? (
                                <img
                                    src={image_url}
                                    alt={t.name}
                                    className="absolute inset-0 h-full w-full object-cover"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="absolute inset-0 grid place-items-center bg-[color:var(--card-bg)] text-[color:var(--muted)]">
                                    Görsel yok
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Küçük galeri (opsiyonel) */}
                    {Array.isArray(gallery) && gallery.length > 0 && (
                        <ul className="mt-3 grid grid-cols-4 gap-2">
                            {gallery.slice(0, 4).map((g, i) => (
                                <li
                                    key={`${g}-${i}`}
                                    className="overflow-hidden rounded-lg border bg-white"
                                >
                                    <div className="relative w-full" style={{ paddingTop: "66%" }}>
                                        <img
                                            src={g}
                                            alt={`${t.name} - ${i + 1}`}
                                            className="absolute inset-0 h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Başlık + metinler */}
                <div className="md:col-span-7">
                    <h1
                        id="product-title"
                        className="font-heading text-3xl md:text-4xl text-[color:var(--olive-700)]"
                    >
                        {t.name}
                    </h1>

                    {t.excerpt && (
                        <p className="mt-3 text-[color:var(--muted)] text-lg">{t.excerpt}</p>
                    )}

                    {t.body && (
                        <div className="prose mt-6 max-w-none prose-p:my-3 prose-headings:text-[color:var(--olive-700)]">
                            <p>{t.body}</p>
                        </div>
                    )}

                    {/* İçindekiler */}
                    {t.ingredients && t.ingredients.length > 0 && (
                        <div className="mt-8">
                            <h2 className="font-heading text-2xl text-[color:var(--olive-700)]">
                                {L.ingredients}
                            </h2>
                            <p className="mt-2">{t.ingredients.join(", ")}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Besin tablosu */}
            {nutrition && (
                <div
                    className="mt-10 rounded-2xl border bg-white"
                    style={{ boxShadow: "var(--shadow-card)" }}
                    aria-labelledby="nutrition-title"
                >
                    <div className="border-b px-4 md:px-6 py-4">
                        <h2
                            id="nutrition-title"
                            className="font-heading text-xl md:text-2xl text-[color:var(--olive-700)]"
                        >
                            {L.nutritionTitle}
                        </h2>
                    </div>

                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-[color:var(--card-bg)]/60 text-left">
                            <th className="px-4 md:px-6 py-3 w-2/3">
                                {isTR ? "Besin Değeri" : "Nutrient"}
                            </th>
                            <th className="px-4 md:px-6 py-3 w-1/3">{L.value}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {typeof nutrition.kcal !== "undefined" && (
                            <tr className="border-t">
                                <td className="px-4 md:px-6 py-3">{L.kcal}</td>
                                <td className="px-4 md:px-6 py-3">{nutrition.kcal} kcal</td>
                            </tr>
                        )}
                        {typeof nutrition.carbs_g !== "undefined" && (
                            <tr className="border-t">
                                <td className="px-4 md:px-6 py-3">{L.carbs}</td>
                                <td className="px-4 md:px-6 py-3">{nutrition.carbs_g} g</td>
                            </tr>
                        )}
                        {typeof nutrition.protein_g !== "undefined" && (
                            <tr className="border-t">
                                <td className="px-4 md:px-6 py-3">{L.protein}</td>
                                <td className="px-4 md:px-6 py-3">{nutrition.protein_g} g</td>
                            </tr>
                        )}
                        {typeof nutrition.fat_g !== "undefined" && (
                            <tr className="border-t">
                                <td className="px-4 md:px-6 py-3">{L.fat}</td>
                                <td className="px-4 md:px-6 py-3">{nutrition.fat_g} g</td>
                            </tr>
                        )}
                        {Object.entries(nutrition)
                            .filter(([k]) => !["kcal", "carbs_g", "protein_g", "fat_g"].includes(k))
                            .map(([k, v]) =>
                                typeof v === "number" ? (
                                    <tr className="border-t" key={k}>
                                        <td className="px-4 md:px-6 py-3">{k}</td>
                                        <td className="px-4 md:px-6 py-3">{v}</td>
                                    </tr>
                                ) : null
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}