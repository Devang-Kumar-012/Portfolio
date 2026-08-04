"use client";

import Image from "next/image";
import { useLanguage } from "@/providers/language-provider";
import { BlurReveal } from "@/components/effects/blur-reveal";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import type { StackItem } from "@/types/stack";

export default function Stack() {
    const { content, dict } = useLanguage();

    const categories = [
        {
            title: dict.frontendStack,
            items: content.stack?.frontend || [],
        },
        {
            title: dict.backendStack,
            items: content.stack?.backend || [],
        },
        {
            title: dict.databaseStack,
            items: content.stack?.database || [],
        },
        {
            title: dict.toolsStack,
            items: content.stack?.tools || [],
        },
    ];

    return (
        <section className="w-full bg-background text-foreground overflow-hidden relative py-16 md:py-24 lg:py-32 xl:py-40 2xl:py-36">
            <div className="h-full flex flex-col px-container container mx-auto">
                <div className="flex flex-col gap-4 mb-16">
                    <BlurReveal>
                        <span className="title-counter">[Section-Two]</span>
                    </BlurReveal>

                    <BlurReveal>
                        <h2 className="title">{dict.title.stack}</h2>
                    </BlurReveal>
                </div>

                <div className="flex flex-col gap-container mb-6">
                    {categories.map((category, catIndex) => (
                        <BlurReveal key={category.title}>
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-[10px] font-mono tracking-widest text-muted-foreground/40">
                                        0{catIndex + 1}
                                    </span>
                                    <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground">
                                        {category.title}
                                    </h3>
                                </div>

                                {/* ADDED: Flex container so items align in a row */}
                                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                                    {category.items.map((item: StackItem) => (
                                        <HoverCard key={item.name} openDelay={50} closeDelay={50}>
                                            <HoverCardTrigger asChild>
                                                {/* FIXED: py-2 5 -> py-2 */}
                                                <div className="group flex items-center gap-3 py-2 px-1 shrink-0 cursor-default">
                                                    <div className="transition-all duration-500 ease-out opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110">
                                                        <Image src={item.icon} alt="" width={20} height={20} unoptimized={item.icon.endsWith('.svg')} />
                                                    </div>
                                                    <span className="text-sm tracking-wide text-muted-foreground transition-colors duration-500 ease-out group-hover:text-foreground">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </HoverCardTrigger>
                                            <HoverCardContent
                                                side="top"
                                                align="center"
                                                className="w-auto p-4 flex flex-col items-center justify-center gap-4 bg-background/95 backdrop-blur-cl border border-border/50 shadow-2xl rounded-2xl overflow-hidden"
                                            >
                                                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"></div>
                                                <div className="absolute inset-0 bg-linear-to-r from-foreground/5 to-transparent pointer-events-none"></div>

                                            </HoverCardContent>
                                        </HoverCard>
                                    ))}
                                </div>
                            </div>
                        </BlurReveal>
                    ))}
                </div>

            </div>
        </section>
    );
}