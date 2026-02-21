"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function CommunityHero() {
    return (
        <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden border-b-2 border-foreground bg-background">
            {/* Background Image with Overlay */}
            <Image
                src="/community-hero.png" // This should be copied to public/ later
                alt="Nubis Community Foundry"
                fill
                className="object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
                priority
            />

            {/* Blueprint Grid Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background" />

            <div className="relative z-10 text-center px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] tracking-[0.4em] font-mono text-[#ea580c] uppercase font-bold">
              // ENGINEERING_COMMONS
                        </span>
                        <div className="w-12 h-[1px] bg-[#ea580c]" />
                    </div>

                    <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter uppercase italic italic-accent">
                        THE FOUNDRY <br />
                        <span className="text-outline-foreground">NETWORK</span>
                    </h1>

                    <p className="text-sm md:text-base font-mono text-muted-foreground max-w-2xl leading-relaxed">
                        Infrastructure is better built together. Direct access to the architects, developers, and engineers powering the next generation of cloud computing.
                    </p>
                </motion.div>
            </div>

            {/* Decorative Corner Accents */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#ea580c]/50" />
            <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-[#ea580c]/50" />
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-[#ea580c]/50" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[#ea580c]/50" />
        </section>
    )
}
