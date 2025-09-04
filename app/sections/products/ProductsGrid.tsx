'use client';

import ProductCard, {ProductCardProps} from '@cards/ProductCard';

type ProductsGridProps = {
    items: ProductCardProps[];
};

export default function ProductsGrid({items}: ProductsGridProps) {
    return (
        <section className="container-inline py-12">
            <div
                className="
          grid gap-8
          sm:grid-cols-2
          lg:grid-cols-3
        "
            >
                {items.map((p) => (
                    <ProductCard key={p.href} {...p} />
                ))}
            </div>
        </section>
    );
}