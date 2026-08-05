"use client";

import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/providers/language-provider";
import { useMediaQuery, BREAKPOINTS } from "@/hooks/use-media-query";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { ProjectModal } from "@/components/modals/project-modal";
import type { ProjectItem } from "@/types/project";

export default function Projects() {
    const { content, dict } = useLanguage();

    const isDesktop = useMediaQuery(BREAKPOINTS.x1);

    const targetRef = useRef<HTMLDivElement>(null);
    const horizontalContainerRef = useRef<HTMLDivElement>(null);

    const [measurements, setMeasurements] = useState({
        scrollRange: 0, dynamicHeight: "auto",
    });
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!isDesktop) {
            const frame = requestAnimationFrame(() => {
                setMeasurements({
                    scrollRange: 0,
                    dynamicHeight: "auto"
                });
            });
            return () => cancelAnimationFrame(frame);
        }

        const updateMeasurements = () => {
            if (horizontalContainerRef.current) {
                const totalWidth = horizontalContainerRef.current.scrollWidth;
                const viewportW = window.innerWidth;
                const range = totalWidth - viewportW;
                const safeRange = range > 0 ? range : 0;

                setMeasurements({
                    scrollRange: safeRange,
                    dynamicHeight: `${safeRange + window.innerHeight}px`
                });
            }
        };

        updateMeasurements();

        const timeout = setTimeout(updateMeasurements, 100);
        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(updateMeasurements);
        });

        if (horizontalContainerRef.current) {
            resizeObserver.observe(horizontalContainerRef.current);
            return () => {
                clearTimeout(timeout);
                resizeObserver.disconnect();
            };
        }
    }, [isDesktop, content.projects]);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    const x = useTransform(scrollYProgress, [0, 1], [0, -measurements.scrollRange]);
    const smoothX = useSpring(x, { stiffness: 400, damping: 60, restDelta: 0.5 });

    const handleOpenProject = (project: ProjectItem) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    return (
        <section
            ref={targetRef}
            data-slot="projects"
            className="relative py-16 md:py-24 lg:py-32 xl:py-0"
            style={{ height: measurements.dynamicHeight }}
        >
            <div
                className={`w-full ${isDesktop
                    ? "sticky top-0 h-screen flex items-center overflow-hidden"
                    : "relative flex flex-col"
                    }`}
            >
                {!isDesktop ? (
                    <>
                        <div className="flex flex-col gap-4 px-container mb-10">
                            <BlurReveal>
                                <span className="title-counter">
                                    [SECTION THREE]
                                </span>
                            </BlurReveal>

                            <BlurReveal>
                                <h2 className="title">
                                    {dict.title.projects}
                                </h2>
                            </BlurReveal>

                            <BlurReveal>
                                <p className="mt-4 text-muted-foreground text-lg">
                                    {dict.projectsIntro}
                                </p>
                            </BlurReveal>
                        </div>

                        <div className="flex flex-col w-full max-w-full px-container gap-container">
                            {content.projects.map((project: ProjectItem) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onClick={() => handleOpenProject(project)}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <motion.div
                        ref={horizontalContainerRef}
                        style={{ x: smoothX }}
                        className="flex px-container w-max items-center"
                    >
                        <div className="w-[60vw] xl:w-[40vw] shrink-0 flex flex-col justify-center">
                            <div className="flex flex-col gap-4">
                                <BlurReveal>
                                    <span className="title-counter">
                                        [SECTION THREE]
                                    </span>
                                </BlurReveal>

                                <BlurReveal>
                                    <h2 className="title">
                                        {dict.title.projects}
                                    </h2>
                                </BlurReveal>

                                <BlurReveal>
                                    <p className="mt-4 text-5xl leading-tight font-light">
                                        {dict.projectsIntro}
                                    </p>
                                </BlurReveal>
                                <BlurReveal>
                                    <div className="mt-12 flex items-center gap-4">
                                        <div className="h-px w-24 bg-border"></div>
                                        <span className="text-sm font-mono text-foreground/40 uppercase">
                                            {dict.projectsScrollText}
                                        </span>
                                    </div>
                                </BlurReveal>
                            </div>
                        </div>

                        <div className="flex items-center gap-8 pl-12">
                            {content.projects.map((project: ProjectItem) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onClick={() => handleOpenProject(project)}
                                />
                            ))}

                            <div className="w-[40vw] h-[70vh] shrink-0 flex flex-col justify-center items-center">
                                <h3 className="text-[10vw] font-black tracking-tighter text-border uppercase">
                                    {dict.projectsEndText}
                                </h3>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            <ProjectModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                project={selectedProject}
            />
        </section>
    );
}

const ProjectCard = React.memo(function ProjuctCard({ project, onClick }: { project: ProjectItem; onClick?: () => void }) {

    return (
        <BlurReveal>
            <div className="group relative w-full xl:w-[45vw] aspect-4/3 shrink-0 xl:mx-6 perspective-1000 cursor-pointer">
                <div className="relative w-full h-full overflow-hidden bg-muted border border/50 transition-all duration-700 ease-out group-hover:border-foreground/20">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={project.image}
                            alt=""
                            sizes="(max-width: 1280px) 100vw, 45vw"
                            loading="lazy"
                            className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
                    </div>
                </div>
            </div>
        </BlurReveal>
    )
})