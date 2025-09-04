import Link from 'next/link';
import SignOutButton from "@/app/components/SignOutButton";

export default function AdminDashboardPage() {
    return (
        <div className="space-y-4">
            <SignOutButton/>
            <h2 className="text-2xl font-semibold">Yönetim</h2>
            <ul className="grid md:grid-cols-2 gap-4">
                <li className="border rounded-lg p-4 bg-white">
                    <h3 className="font-semibold mb-2">Blog</h3>
                    <div className="space-x-3">
                        <Link href="/admin/posts" className="underline">Listele</Link>
                        <Link href="/admin/posts/new" className="underline">Yeni Ekle</Link>
                    </div>
                </li>
                <li className="border rounded-lg p-4 bg-white">
                    <h3 className="font-semibold mb-2">Ürünler</h3>
                    <div className="space-x-3">
                        <Link href="/admin/products" className="underline">Listele</Link>
                        <Link href="/admin/products/new" className="underline">Yeni Ekle</Link>
                    </div>
                </li>
            </ul>
        </div>
    );
}