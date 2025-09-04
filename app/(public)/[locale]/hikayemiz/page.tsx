'use client';
import FounderStory from "@/app/sections/about/FounderStory"
import VisionMission from "@/app/sections/about/VisionMission";
import AboutHighlights from "@/app/sections/about/AboutHighlights";
import {Certificates} from "@sections/about";
import {Testimonials} from "@sections/home";
import {useTranslations} from 'next-intl';
import HeaderShell from '@layout/HeaderShell';
import GenericHero from '@/app/components/hero/GenericHero';

export default function Page() {
    const t = useTranslations('about.hero');

    return (
        <main>
            <HeaderShell height={420}>
                <GenericHero title={t('title')} subtitle={t('subtitle')}/>
            </HeaderShell>
            <FounderStory/>
            <VisionMission/>
            <AboutHighlights/>
            <Certificates />
            <Testimonials/>
        </main>
    );
}