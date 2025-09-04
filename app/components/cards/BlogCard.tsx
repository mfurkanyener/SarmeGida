type BlogCardProps = {
    title: string;
    excerpt: string;
    imageSrc: string;
    href: string;
    align?: "left" | "right"; // desktop hizası
};

export default function BlogCard({
                                     title,
                                     excerpt,
                                     imageSrc,
                                     href,
                                     align = "left",
                                 }: BlogCardProps) {
    const imageFirst = align === "left";

    return (
        <article className="card px-card py-card min-h-card">
            {/* ≥1024 grid iki kolon, <768 stack */}
            <div className="grid items-center gap-6 md:gap-8 lg:grid-cols-2">
                {imageFirst && (
                    <div className="order-1">
                        <img
                            src={imageSrc}
                            alt={title}
                            className="w-full rounded-xl shadow/10 aspect-[4/3] object-cover"
                        />
                    </div>
                )}

                <div className={`${imageFirst ? "order-2" : "order-1"}`}>
                    <h3
                        className="font-[var(--font-heading)] text-[var(--olive-700)]
                       text-[clamp(22px,2vw,28px)] leading-[var(--lh-28)]"
                    >
                        {title}
                    </h3>

                    <p className="mt-3 text-[var(--muted)] leading-[var(--lh-18)]">
                        {excerpt}
                    </p>

                    <a href={href} className="btn btn-olive mt-4">
                        Keşfet
                    </a>
                </div>

                {!imageFirst && (
                    <div className="order-3">
                        <img
                            src={imageSrc}
                            alt={title}
                            className="w-full rounded-xl shadow/10 aspect-[4/3] object-cover"
                        />
                    </div>
                )}
            </div>
        </article>
    );
}