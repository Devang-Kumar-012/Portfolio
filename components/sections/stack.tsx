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
};
return (

)
}