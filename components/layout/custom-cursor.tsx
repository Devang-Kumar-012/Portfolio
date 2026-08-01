"use client"

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function CustomCursor() {

    const isVisibleRef = useRef(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const frameld = requestAnimationFrame(() => {
            setIsEnabled(true);
        })
    })
    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none hidden md:flex items-center justify-center mix-blend-difference"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                translateX: "-50%",
                translateY: "-50%",
                opacity: isVisible ? 1 : 0,
                zIndex: 999999
            }}
        >

            <motion.div
                className={cn(
                    "rounded-full flex items-center justify-center transition"

        </motion.div>
    )
}