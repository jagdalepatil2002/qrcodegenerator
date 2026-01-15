"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface AnimatedTitleProps {
    text: string;
    className?: string;
}

export function AnimatedTitle({ text, className }: AnimatedTitleProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <h1 className={className}>{text}</h1>
        );
    }

    return (
        <h1 className={cn("flex flex-wrap justify-center gap-[0.05em]", className)}>
            {text.split("").map((char, index) => (
                <span
                    key={index}
                    className="transition-transform duration-200 hover:scale-125 cursor-default inline-block select-none"
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </h1>
    );
}
