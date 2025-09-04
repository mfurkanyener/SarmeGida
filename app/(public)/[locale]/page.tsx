// app/(public)/[locale]/page.tsx  ← DİKKAT: 'use client' YOK
import HeaderShell from '@layout/HeaderShell';
import HomeHero from '@/app/components/hero/HomeHero';
import AboutIntro from '@/app/sections/about/AboutIntro';
import Flovors from '@/app/sections/home/Flavors';
import Sustainability from '@/app/sections/home/Sustainability';
import Testimonials from '@/app/sections/home/Testimonials';


export default async function HomePage() {

    return (
        <>
            <HeaderShell height={720}>
                <HomeHero/>
            </HeaderShell>

            <AboutIntro/>
            <Flovors/>
            <Sustainability/>
            {/* Örnek: posts’u bir client bileşene verebilirsin */}
            <Testimonials/>
        </>
    );
}