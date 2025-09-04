import ProductsGrid from '@/app/sections/products/ProductsGrid';
import Navbar from '@/app/components/layout/Navbar'

export default function ProductsPage() {
    const products = [
        {
            title: 'Yaprak Sarması',
            desc: 'Geleneksel tarifle hazırlanmış, taptaze malzemelerden.',
            imageSrc: '/images/products/sarma.png',
            href: '/lezzetlerimiz/yaprak-sarmasi'
        },
        {
            title: 'Çiğ Köfte',
            desc: 'Geleneksel tarifle hazırlanmış, taptaze malzemelerden.',
            imageSrc: '/images/products/cigkofte.png',
            href: '/lezzetlerimiz/cig-kofte'
        },
        {
            title: 'Meze',
            desc: 'Geleneksel tarifle hazırlanmış, taptaze malzemelerden.',
            imageSrc: '/images/placeholders/gray-4x3.svg', // geçiciyse placeholder
            href: '/lezzetlerimiz/meze'
        },
        {
            title: 'Kalburabastı',
            desc: 'Geleneksel tarifle hazırlanmış, taptaze malzemelerden.',
            imageSrc: '/images/placeholders/gray-4x3.svg',
            href: '/lezzetlerimiz/kalburabasti'
        },
        {
            title: 'Şambali',
            desc: 'Geleneksel tarifle hazırlanmış, taptaze malzemelerden.',
            imageSrc: '/images/placeholders/gray-4x3.svg',
            href: '/lezzetlerimiz/sambali'
        }
    ];

    return(
        <div>
    <Navbar/>
    <ProductsGrid items={products} />;
        </div>
    );


}