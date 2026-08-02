"use client"

import { ArrowRight } from "lucide-react";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { useLanguage } from "@/providers/language-provider";
import { useState } from "react";
// import { AboutModal } from "@/components/modals/about-modal;
// import { HangingProfile } from "components/widgets/hanging-profile";

export default function About() {
    const { content, dict } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="w-full container-void bg-background text-foreground overflow-hidden">
            <div className="container mx-auto px-container">
                <div className="flex flex-col xl:flex-row gap-12 xl:gap-32">
                    <div className="xl:w-1/4">
                        <div className="flex flex-col gap-4 sticky top-32">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}