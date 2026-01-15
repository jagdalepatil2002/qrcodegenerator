"use client";

import { useEffect, useState } from "react";
import { QRCodeGenerator } from "@/components/blocks/qr-code";
import { Particles } from "@/components/ui/particles";
import { SparklesText } from "@/components/ui/sparkles-text";
import { SocialIcons } from "@/components/ui/social-icons";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { WelcomePage } from "@/components/ui/welcome-page";

export default function Home() {
  const [particleColor, setParticleColor] = useState("#6366f1");
  const [showIntro, setShowIntro] = useState(true);

  if (showIntro) {
    return <WelcomePage onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background p-4">
      {/* Animated particle background */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={150}
        ease={80}
        color={particleColor}
        refresh
      />

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        <div className="mb-8 text-center flex flex-col items-center">
          <div className="flex justify-center items-center h-16 sm:h-20 md:h-24">
            <SparklesText
              text="QR Code Generator"
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-foreground"
              colors={{ first: '#6366f1', second: '#a855f7' }}
            />
          </div>
          <div className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto flex flex-wrap justify-center items-center gap-1">
            <span>Generate high-quality QR codes</span>
            <PointerHighlight>
              <span className="font-semibold text-primary">instantly.</span>
            </PointerHighlight>
          </div>
        </div>
        <QRCodeGenerator />
      </div>

      {/* Social Icons - Bottom Right */}
      <div className="absolute bottom-4 right-4 z-20">
        <SocialIcons />
      </div>

      {/* Footer */}
      <footer className="relative z-10 flex w-full items-center justify-center gap-2 py-6 text-sm text-neutral-500">
        <span>Made with ❤️ by Tejas Jagdale 2025</span>
        <a
          href="https://www.linkedin.com/in/jagdaletejas/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          aria-label="LinkedIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-linkedin"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
      </footer>
    </div>
  );
}
