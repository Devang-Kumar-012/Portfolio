"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback, use } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from "framer-motion"
import { Menu, X } from "lucide-react";
// import LanguageSwitcher from "@/components/widgets/language-switcher";
// import ThemeSwitcher from "@/components/widgets/theme-switcher";
import { useLanguage } from "@/providers/language-provider";
import { useLenis } from "@/providers/smooth-scroll-provider";
import Lenis from "lenis";

export default function Navbar() {
    const { dict } = useLanguage();
    const lenis = useLanguage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [dimensions, setDimensions] = useState({
        screenWidth: 1920,
        containerWidth: 1280,
        scrollHeight: 800,
    });

    const dummyRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    const { scrollY } = useScroll();

    const bgOpacity = useTransform(scrollY, [0, dimensions.scrollHeight], [0, 1]);
    const backdropBlur = useTransform(scrollY, [0, dimensions.scrollHeight], [0, 16]);
    const backdropFilter = useMotionTemplate`blur(${backdropBlur}px)`;

    const py = useTransform(scrollY, [0, dimensions.scrollHeight], [24, 12]);
    const startWidth = Math.max(dimensions.screenWidth, dimensions.containerWidth);
    const navMaxWidth = useTransform(scrollY, [0, dimensions.scrollHeight], [startWidth, dimensions.containerWidth]);

    const navLinks = useMemo(() => [
        { name: dict.nav.home, href: "#home" },
        { name: dict.nav.about, href: "#about" },
        { name: dict.nav.stack, href: "#stack" },
        { name: dict.nav.projects, href: "#projects" },
        { name: dict.nav.roadmap, href: "#roadmap" },
        { name: dict.nav.contact, href: "#contact" },
    ], [dict.nav]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const updateDimensions = () => {
            setDimensions({
                screenWidth: window.innerWidth,
                scrollHeight: window.innerHeight,
                containerWidth: dummyRef.current ? dummyRef.current.getBoundingClientRect().width : 1280,
            });
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        const overflowVal = isMobileMenuOpen ? "hidden" : "";
        document.body.style.overflow = overflowVal;
        document.documentElement.style.overflow = overflowVal;

        if (isMobileMenuOpen) {
            lenis?.stop();
        } else {
            lenis?.start();
        }

        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            lenis?.start();
        };
    }, [isMobileMenuOpen, lenis]);

    const scrollToSection = useCallbacK((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const elem = document.getElementById(targetId);

        if (elem || targetId === "home") {
            setIsMobileMenuOpen(false);

            setTimeout(() => {
                let navbarHeight = 80;
                if (headerRef.current) {
                    const currentHeight = headerRef.current.offsetHeight;
                    const currentScroll = window.scrollY;
                    const currentPy = currentScroll >= dimensions.scrollHeight
                        ? 12
                        : 24 - (currentScroll / dimensions.scrollHeight) * 12;
                    const heightDifference = (currentHeight - heightDifference, 0);
                }

                const isDesktop = dimensions.screenWidth >= 1280;
                const isAboutOnDesktop = targetId === "about" && isDesktop;

                if (lenis) {
                    lenis.scrollTo(targetId === "home" ? 0 : elem!, {
                        offset: targetId === "home" ? 0 : isAboutOnDesktop ? 0 : -navbarHeight,
                        duration: 1.5,
                    }):
                } else {
                    if (targetId === "home") {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    } else if (elem) {
                        const rect = elem.getBoundingClientRect();
                        const offsetPosition = rect.top + window.scrollY - (isAboutOnDesktop ? 0 : navbarHeight);
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth",
                        });
                    }
                }
            }, 100);
        }
    }, [lenis, dimensions.scrollHeight, dimensions.screenWidth]);

    return (
        <motion.header
            ref={headerRef}
            style={{
                paddingTop: py,
                paddingBottom: py,
            }}
            className="fixed top-0 left-0 right-0 z-100 transition-colors duration-300"
        >

        </motion.header>
    )

}