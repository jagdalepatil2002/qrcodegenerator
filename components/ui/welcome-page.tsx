"use client";

import React, { useEffect } from "react";
import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

interface WelcomePageProps {
    onComplete: () => void;
}

export function WelcomePage({ onComplete }: WelcomePageProps) {
    const [showText, setShowText] = React.useState(true);
    const [isRobotLoaded, setIsRobotLoaded] = React.useState(false);

    const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

    return (
        <div className="bg-black fixed inset-0 z-50 overflow-hidden">
            {/* Background: Interactive Robot (Full Screen) */}
            <div className="absolute inset-0 z-0">
                <InteractiveRobotSpline
                    scene={ROBOT_SCENE_URL}
                    className="w-full h-full"
                    onLoad={() => setIsRobotLoaded(true)}
                />
            </div>

            {/* Foreground: Split Overlay */}
            <div className="relative z-10 w-full h-full flex flex-col md:flex-row pointer-events-none">

                {/* Left Area: Welcome Text */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-8 pointer-events-auto">
                    {showText && (
                        <div className="w-full h-[200px] flex flex-col items-center justify-center gap-4">
                            <VaporizeTextCycle
                                texts={["Welcome"]}
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
                        </div>
                    )}
                </div>

                {/* Right Area: Enter Button */}
                <div className="w-full md:w-1/2 flex items-center justify-center pointer-events-auto">
                    {showText && isRobotLoaded && (
                        <div className="animate-in fade-in zoom-in duration-1000 slide-in-from-right-10">
                            <InteractiveHoverButton
                                text="Enter App"
                                onClick={onComplete}
                                className="w-40 text-black border-white/20 hover:text-white"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
