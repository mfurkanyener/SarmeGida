'use client';

import HeaderShell from '@components/HeaderShell';
import Navbar from '@components/Navbar';
import Hero from '@components/Hero';
import AboutIntro from "@components/AboutIntro";
import Flovors from '@components/Flavors'
import Sustainability from "@components/Sustainability";
import Testimonials from "@components/Testimonials";


export default function HomePage() {

    return (
        <div className="flex flex-col min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
            <HeaderShell height={720}>
                <Navbar/>
                <Hero/>
            </HeaderShell>

            <AboutIntro/>
            <Flovors/>
            <Sustainability/>
            <Testimonials />

        </div>
    );
}