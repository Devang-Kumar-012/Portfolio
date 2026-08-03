"use client"

import * as React from "react"
import { HoverCard as HoverCardPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
function HoverCard({
    ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
    return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}
function HoverCardTrigger({
    ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
    return (
        <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
    )
}