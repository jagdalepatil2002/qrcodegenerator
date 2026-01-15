"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PulseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

export function PulseButton({ text, className, ...props }: PulseButtonProps) {
    return (
        <button
            className={cn(
                "bg-slate-800 w-[192px] z-40 h-[64px] no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block",
                className
            )}
            {...props}
        >
            <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative flex justify-center w-full text-center space-x-2 h-full items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                <span className="md:text-2xl text-base inline-block bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 via-neutral-600 to-neutral-300">
                    {text}
                </span>
            </div>
        </button>
    );
}
