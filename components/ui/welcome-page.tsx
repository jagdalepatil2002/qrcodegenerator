"use client";

import React, { useEffect } from "react";
import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect";

interface WelcomePageProps {
    onComplete: () => void;
}

export function WelcomePage({ onComplete }: WelcomePageProps) {
    useEffect(() => {
        // Duration estimate:
        // 3 texts ["Welcome", "to", "QR Code Generator"]
        // Each cycle: Vaporize(2s) + FadeIn(1s) + Wait(0.5s) = 3.5s approx per text
        // 3 * 3.5 = 10.5s
        // Let's force completion after 10.5 seconds or let user click to skip?
        // We'll auto-complete after 10.5s.
        const timer = setTimeout(() => {
            onComplete();
        }, 10500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div
            className="bg-black fixed inset-0 z-50 flex justify-center items-center cursor-pointer"
            onClick={onComplete} // Allow user to skip by clicking
        >
            <VaporizeTextCycle
                texts={["Welcome", "QR Code Generator"]}
                font={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "70px",
                    fontWeight: 600,
                }}
                color="rgb(255, 255, 255)"
                spread={5}
                density={5}
                animation={{
                    vaporizeDuration: 2,
                    fadeInDuration: 1,
                    waitDuration: 0.5,
                }}
                direction="left-to-right"
                alignment="center"
                tag={Tag.H1}
            />
            <div className="absolute bottom-10 text-white/50 text-sm">
                Click anywhere to skip
            </div>
        </div>
    );
}
