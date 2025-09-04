// app/(public)/[locale]/page.tsx  ← DİKKAT: 'use client' YOK
import HeaderShell from '@layout/HeaderShell';
import Navbar from '@layout/Navbar';
import Hero from '@/app/sections/home/Hero';
import AboutIntro from '@/app/sections/about/AboutIntro';
import Flovors from '@/app/sections/home/Flavors';
import Sustainability from '@/app/sections/home/Sustainability';
import Testimonials from '@/app/sections/home/Testimonials';


export default async function HomePage() {

    return (
        <div className="flex flex-col min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
            <HeaderShell height={720}>
                <Navbar/>
                <Hero/>
            </HeaderShell>

            <AboutIntro/>
            <Flovors/>
            <Sustainability/>
            {/* Örnek: posts’u bir client bileşene verebilirsin */}
            <Testimonials/>
        </div>
    );
}