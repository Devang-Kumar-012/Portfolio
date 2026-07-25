"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useScroll, useTransform, useMotionTemplate, motion } from "framer-motion";
import { useLanguage } from "@/providers/language-provider";
import { ArrowRight, Mouse } from "lucide-react";
import { ContactModal } from "@/components/modals/contact-modal";
import { InteractiveParticles } from "@/components/effects/Interactive-Particles";

const TRACK_1 = [
    "/hero-slider/makise-kurisu-2.webp",
    "/hero-slider/atam-1.webp",
    "/hero-slider/kintaro-2.webp",
    "/hero-slider/makise-kurisu-1.webp",
    "/hero-slider/atam-2.webp",
    "/hero-slider/kintaro-1.webp",
] as const;

const TRACK_2 = [
    "/hero-slider/kintaro-1.webp",
    "/hero-slider/atam-2.webp",
    "/hero-slider/makise-kurisu-1.webp",
    "/hero-slider/kintaro-2.webp",
    "/hero-slider/atam-1.webp",
    "/hero-slider/makise-kurisu-2.webp",
] as const;

const COL_1_IMAGES = [...TRACK_1, ...TRACK_1];
const COL_2_IMAGES = [...TRACK_2, ...TRACK_2];

export default function Hero() {
    const { content, dict } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const [contactOpen, setContactOpen] = useState(false);

    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 800], [1, 0]);
    const scale = useTransform(scrollY, [0, 800], [1, 0.94]);
    const y = useTransform(scrollY, [0, 800], [0, -150]);
    const blurValue = useTransform(scrollY, [0, 800], [0, 10]);
    const filter = useMotionTemplate`blur(${blurValue}px)`;

    const scrollToProjects = useCallback(() => {
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: "smooth" });
        }
    }, []);
    return (
        <section
            ref={containerRef}
            className="sticky top-0 h-screen w-full flex flex-col justify-between bg-background px-container md:px-16 pt-28 pb-12 sm:pt-32 sm:pb-16 2xl:pb-24 overflow-hidden" id="home">
            <InteractiveParticles />
        </section>
    );
}