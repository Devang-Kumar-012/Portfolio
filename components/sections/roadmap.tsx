"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { useLanguage } from "@/providers/language-provider";
import type { RoadmapItem } from "@/types/roadmap";

export default function Roadmap() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { content, dict } = useLanguage();
    const roadmapItems: RoadmapItem[] = content.roadmap || [];

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <section className="relative container-void overflow-hidden py-32 xl:py-48 border-t border-border/50">
            <div className="absolute top-1/4 left-0 w-full max-w-lg h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2"></div>
            <div className="absolute top-1/4 left-0 w-full max-w-lg h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2"></div>

            <motion.div
                style={{ y: yBackground }}
                className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none flex items-center justify-center opacity-[0.2] z-0 overflow-hidden"
            >
                <div className="text-[20w] font-black tracking-tighter uppercase whitespace-nowrap">
                    {dict.title.roadmap}
                </div>
            </motion.div>
        </section >
    )
}
