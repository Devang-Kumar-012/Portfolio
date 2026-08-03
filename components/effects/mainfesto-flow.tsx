"use client"

import { useLanguage } from "@/providers/language-provider";

const Separator = () => (
    <div className="aspect-square h-3 w-3 rounded-full bg-foreground/10 sm:h-4 sm:w-4 md:h-5 md:w-5 xl:h-6 xl:w-6"></div>
);

export default function ManifestoFlow({ reverse = false }: { reverse?: boolean }) {
    const { content } = useLanguage();

    const mainfestoItems = content?.manifesto || [];

    return (
        <div className="relative w-full overflow-hidden border-y border-border/50"></div>
    )
}