"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const ease = [0.22, 1, 0.36, 1] as const

export function AboutHero() {
    return (
        <section className="w-full px-6 pt-32 pb-20 lg:px-12 bg-background relative overflow-hidden">
            <div className="flex flex-col gap-4 mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4"
                >
                    <span className="text-[10px] tracking-[0.2em] font-mono text-[#ea580c] uppercase">// ORIGINS_v2.0</span>
                    <div className="flex-1 border-t border-foreground/10" />
                </motion.div>

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl lg:text-7xl font-pixel uppercase leading-none">The Engineering<br />Foundry</h1>
                        <p className="text-sm lg:text-base font-mono text-muted-foreground max-w-2xl mt-4">
                            Nubis was born from a frustration with "magic" cloud abstractions.
                            We are a team of systems engineers dedicated to restoring transparency,
                            determinism, and raw performance to the modern application stack.
                        </p>
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease }}
                className="relative w-full aspect-[21/9] border-2 border-foreground group overflow-hidden bg-foreground"
            >
                <Image
                    src="/images/about-hero.png"
                    alt="Industrial monolith representing the Nubis core philosophy"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-1">
                    <span className="text-[10px] font-mono bg-background px-2 py-1 uppercase tracking-widest text-[#ea580c]">CORE_ARCHITECTURE: IDENTIFIED</span>
                    <span className="text-[8px] font-mono text-background/60 px-2 uppercase tracking-tighter">RENDER: BRUTALIST_ENGINEERING</span>
                </div>
            </motion.div>
        </section>
    )
}
