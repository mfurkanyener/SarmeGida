import Link from 'next/link';

export default function AdminDashboardPage() {
    return (
        <main className="container-inline py-10">
            <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

            <ul className="space-y-3">
                <li>
                    <Link href="/admin/posts" className="text-blue-700 hover:underline">
                        Posts
                    </Link>
                </li>
                <li>
                    <Link href="/admin/posts/new" className="text-blue-700 hover:underline">
                        New Post
                    </Link>
                </li>
                <li>
                    <Link href="/admin/products" className="text-blue-700 hover:underline">
                        Products
                    </Link>
                </li>
            </ul>
        </main>
    );
}