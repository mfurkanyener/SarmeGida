// app/admin/layout.tsx
export const metadata = {
    title: 'Admin | SarMez',
    description: 'Admin panel shell',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
            <div className="mx-auto max-w-6xl px-6 py-8">
                <header className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Admin</h1>
                </header>
                {children}
            </div>
        </section>
    );
}