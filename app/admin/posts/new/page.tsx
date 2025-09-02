export default function AdminNewPostPage() {
    return (
        <main className="container-inline py-10">
            <h1 className="text-2xl font-semibold mb-6">Yeni Yazı</h1>

            <form className="space-y-4 max-w-xl">
                <div>
                    <label className="block text-sm mb-1">Başlık</label>
                    <input className="w-full rounded border px-3 py-2" placeholder="Başlık..." />
                </div>
                <div>
                    <label className="block text-sm mb-1">İçerik</label>
                    <textarea className="w-full rounded border px-3 py-2 min-h-[160px]" placeholder="İçerik..." />
                </div>
                <button type="button" className="btn btn-olive">Kaydet (placeholder)</button>
            </form>
        </main>
    );
}