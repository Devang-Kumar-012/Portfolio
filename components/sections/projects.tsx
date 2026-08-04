"use client";

import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/providers/language-provider";
// import { useMediaQuery, BREAKPOINTS } from "@/hooks/use-media-query";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { ProjectModal } from "@/components/modals/project-modal";
import type { ProjectItem } from "@/types/project";

export default function Projects() {
    const { content, dict } = useLanguage();

    // const isDesktop = useMediaQuery(BREAKPOINTS.xl);

    const targetRef = useRef<HTMLDivElement>(null);
    const horizontalContainerRef = useRef<HTMLDivElement>(null);

    const [measurements, setMeasurements] = useState({
        scrollRange: 0, dynamicHeight: "auto"
    });
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section ref={targetRef} className="w-full bg-background text-foreground">
            {/* Your JSX content */}
            <ProjectModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                project={selectedProject}
            />
        </section>
    );
}