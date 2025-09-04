'use client';
import Navbar from "@layout/Navbar";
import FounderStory from "@/app/sections/about/FounderStory"
import VisionMission from "@/app/sections/about/VisionMission";
import AboutHighlights from "@/app/sections/about/AboutHighlights";
import {Certificates} from "@sections/about";
import {Testimonials} from "@sections/home";

export default function Page() {
    return (
        <main>
            <Navbar/>
            <FounderStory/>
            <VisionMission/>
            <AboutHighlights/>
            <Certificates />
            <Testimonials/>
        </main>
    );
}