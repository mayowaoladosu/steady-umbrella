"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

function ScrambleCount({ target }: { target: number }) {
    const [display, setDisplay] = useState("000")
    const targetStr = String(target).padStart(3, "0")

    useEffect(() => {
        let iterations = 0
        const maxIterations = 20
        const interval = setInterval(() => {
            if (iterations >= maxIterations) {
                setDisplay(targetStr)
                clearInterval(interval)
                return
            }
            setDisplay(
                targetStr
                    .split("")
                    .map((char, i) => {
                        if (iterations > maxIterations - 5 && i < iterations - (maxIterations - 5)) return char
                        return String(Math.floor(Math.random() * 10))
                    })
                    .join("")
            )
            iterations++
        }, 50)
        return () => clearInterval(interval)
    }, [targetStr])

    return (
        <span className="font-mono font-bold" style={{ fontVariantNumeric: "tabular-nums" }}>
            {display}
        </span>
    )
}

interface BlogHeroProps {
    postCount: number
    categories: string[]
    activeCategory: string | null
    onCategoryChange: (cat: string | null) => void
}

export function BlogHero({ postCount, categories, activeCategory, onCategoryChange }: BlogHeroProps) {
    return (
        <section className="relative w-full px-6 pt-32 pb-12 lg:px-12 lg:pt-40 lg:pb-16 overflow-hidden">
            {/* Section label */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease }}
                className="flex items-center gap-4 mb-8"
            >
                <span className="text-[10px] tracking-[0.2em] font-mono text-[#ea580c] uppercase">
                    {"// SECTION: ENGINEERING_LOG"}
                </span>
                <div className="flex-1 border-t border-foreground/10" />
                <span className="text-[10px] tracking-[0.2em] font-mono text-muted-foreground uppercase">
                    {new Date().toISOString().split("T")[0]}
                </span>
            </motion.div>

            {/* Headline */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, ease }}
                    className="flex flex-col gap-3"
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-pixel uppercase tracking-tight leading-none">
                        The Nubis<br />Journal
                    </h1>
                    <p className="text-sm font-mono text-muted-foreground max-w-lg leading-relaxed">
                        Engineering deep-dives, product announcements, and insights from building Africa&apos;s cloud infrastructure layer.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3, ease }}
                    className="flex flex-col gap-2"
                >
                    <div className="flex items-center gap-3 bg-foreground text-background px-4 py-3">
                        <span className="text-[10px] font-mono tracking-widest uppercase opacity-60">Total Entries</span>
                        <span className="text-2xl">
                            <ScrambleCount target={postCount} />
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
                        <span className="h-1.5 w-1.5 bg-[#ea580c] animate-pulse" />
                        <span>Feed Active</span>
                    </div>
                </motion.div>
            </div>

            {/* Category Filter */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease }}
                className="flex flex-wrap items-center gap-2"
            >
                <button
                    onClick={() => onCategoryChange(null)}
                    className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest border-2 transition-all ${activeCategory === null
                            ? "bg-foreground text-background border-foreground"
                            : "border-foreground/20 text-muted-foreground hover:border-foreground/40"
                        }`}
                >
                    All Posts
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => onCategoryChange(cat)}
                        className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest border-2 transition-all ${activeCategory === cat
                                ? "bg-[#ea580c] text-background border-[#ea580c]"
                                : "border-foreground/20 text-muted-foreground hover:border-foreground/40"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
                <ArrowRight size={14} className="text-muted-foreground/30 ml-2" />
            </motion.div>
        </section>
    )
}
