// app/admin/products/page.tsx
export default function AdminProductsPage() {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Ürünler</h2>
            <p>Ürün yönetimi için placeholder liste alanı.</p>

            <ul className="list-disc pl-6">
                <li>Yaprak Sarma</li>
                <li>Çiğ Köfte</li>
                <li>Meze Çeşitleri</li>
            </ul>
        </div>
    );
}