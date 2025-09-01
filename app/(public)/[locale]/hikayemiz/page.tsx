'use client';
import Navbar from "@components/Navbar";
import FounderStory from "@components/FounderStory"
import VisionMission from "@components/VisionMission";

export default function Page() {
    return (
        <main>
            <Navbar/>
            <FounderStory/>
            <VisionMission/>
        </main>
    );
}