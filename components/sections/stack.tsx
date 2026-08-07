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
        {
            title: dict.roboticsStack,
            items: content.stack?.robotics || [],
        },
    ];

    return (
        < section
            id="stack"

            className="w-full bg-background text-foreground overflow-hidden relative py-16 md:py-24 lg:py-32 xl:py-40 2xl:py-36" >
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
                        <BlurReveal key={category.title || catIndex}>
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-[10px] font-mono tracking-widest text-muted-foreground/40">
                                        0{catIndex + 1}
                                    </span>
                                    <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground">
                                        {category.title}
                                    </h3>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                                    {category.items.map((item: StackItem, index: number) => (
                                        <HoverCard key={`${item.name}-${index}`} openDelay={50} closeDelay={50}>
                                            <HoverCardTrigger asChild>
                                                <div className="group flex items-center gap-3 py-2 px-1 shrink-0 cursor-default">
                                                    <div className="transition-all duration-500 ease-out opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110">
                                                        <Image
                                                            src={item.icon}
                                                            alt=""
                                                            width={20}
                                                            height={20}
                                                            style={{ height: "auto" }}
                                                            unoptimized={item.icon.endsWith('.svg')}
                                                        />
                                                    </div>
                                                    <span className="text-sm tracking-wide text-muted-foreground transition-colors duration-500 ease-out group-hover:text-foreground">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </HoverCardTrigger>
                                            <HoverCardContent
                                                side="top"
                                                align="center"
                                                className="w-auto p-4 flex flex-col items-center justify-center gap-4 bg-background/95 backdrop-blur-md border border-border/50 shadow-2xl rounded-2xl overflow-hidden"
                                            >
                                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                                                <div className="absolute inset-0 bg-gradient-to-r from-foreground/5 to-transparent pointer-events-none"></div>

                                                {/* FIXED: Fixed width/height container + relative layout to lock icon display size */}
                                                <div className="relative w-12 h-12 p-2 rounded-xl bg-secondary/50 ring-1 ring-border/50 shadow-inner group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                                                    <Image
                                                        src={item.icon}
                                                        alt={item.name || ""}
                                                        fill
                                                        className="object-contain drop-shadow-lg p-1"
                                                        unoptimized={item.icon.endsWith('.svg')}
                                                    />
                                                </div>
                                                <div className="flex flex-col items-center justify-center gap-1 z-10">
                                                    <span className="text-sm font-bold tracking-[0.15em] uppercase text-foreground">
                                                        {item.name}
                                                    </span>
                                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
                                                        {category.title}
                                                    </span>
                                                </div>
                                            </HoverCardContent>
                                        </HoverCard>
                                    ))}
                                </div>
                            </div>
                        </BlurReveal>
                    ))}
                </div>
            </div>
        </section >
    );
}