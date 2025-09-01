import BlogCard from "@components/BlogCard";
import Navbar from "@components/Navbar";

const posts = [
    {
        title: "Gelecekten Sofraya Sarma",
        excerpt: "Anadolu’nun geleneksel sarması, SarMez’in fabrikasında modern hijyenle buluşuyor...",
        imageSrc: "/images/blog/sarma.jpg",
        href: "/tr/lezzet-recetesi/gelecekten-sofraya-sarma"
    },
    {
        title: "Çiğ Köftenin Sağlıklı Tüketim Yöntemleri",
        excerpt: "Gıda mühendislerimizin önerileriyle hem lezzet hem sağlık bir arada.",
        imageSrc: "/images/blog/cigkofte.jpg",
        href: "/tr/lezzet-recetesi/cig-kofte"
    }
];

export default function Page() {
    return (
        <section className="container-1280 space-y-8">
            <Navbar/>

            {posts.map((post, i) => (
                <BlogCard key={i} {...post} align={i % 2 === 0 ? "left" : "right"} />
            ))}
        </section>
    );
}