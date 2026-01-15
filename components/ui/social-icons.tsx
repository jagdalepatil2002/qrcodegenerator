"use client"

import { useState } from "react"

const socials = [
    {
        name: "GitHub",
        href: "https://github.com/tejasjagdale-ai",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/jagdaletejas/",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        name: "Website",
        href: "https://tejasjagdale.dev/",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221a19.782 19.782 0 0 0-4.66-3.824c.73-1.378 1.547-2.732 2.455-4.045 1.05.904 1.905 2.059 2.205 7.869zm-5.894 9.172c-1.634 0-3.178-.344-4.575-.956.126-1.543.34-3.09.641-4.64h7.868c.3 1.55.515 3.097.641 4.64-1.397.612-2.941.956-4.575.956zm0-7.394H4.764c-.201-1.334-.304-2.656-.304-3.951 0-1.295.103-2.617.304-3.951h14.472c.201 1.334.304 2.656.304 3.951 0 1.295-.103 2.617-.304 3.951H12zm-5.894-8.221a19.782 19.782 0 0 0 4.66-3.824c-1.07-1.624-2.288-3.197-3.644-4.697A9.553 9.553 0 0 0 6.106 1.778zM1.778 12c0-1.295.103-2.617.304-3.951h-.859a9.58 9.58 0 0 0 0 7.902h.859c-.201-1.334-.304-2.656-.304-3.951zm1.666 5.869c1.07 1.624 2.288 3.197 3.644 4.697a9.553 9.553 0 0 0 4.686-1.503c-.73-1.378-1.547-2.732-2.455-4.045a19.782 19.782 0 0 0-5.875 .851zm8.339 3.194c.908-1.313 1.725-2.667 2.455-4.045a19.782 19.782 0 0 0 4.66 3.824 9.553 9.553 0 0 0 4.686 1.503c-1.356-1.5-2.574-3.073-3.644-4.697z" />
            </svg>
        ),
    },
]

export function SocialIcons() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
        <div className="flex items-center gap-4">

            {socials.map((social, index) => (
                <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center size-10 rounded-xl transition-colors duration-200"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    aria-label={social.name}
                >
                    <span
                        className={`absolute inset-1 rounded-lg bg-white/[0.08] transition-all duration-300 ease-out ${hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-90"
                            }`}
                    />

                    <span
                        className={`relative z-10 transition-all duration-300 ease-out ${hoveredIndex === index ? "text-white scale-110" : "text-neutral-500"
                            }`}
                    >
                        {social.icon}
                    </span>

                    <span
                        className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-white transition-all duration-300 ease-out ${hoveredIndex === index ? "w-3 opacity-100" : "w-0 opacity-0"
                            }`}
                    />

                    <span
                        className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-white text-neutral-950 text-[11px] font-medium whitespace-nowrap transition-all duration-300 ease-out ${hoveredIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
                            }`}
                    >
                        {social.name}
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-2 rotate-45 bg-white" />
                    </span>
                </a>
            ))}
        </div>
    )
}
