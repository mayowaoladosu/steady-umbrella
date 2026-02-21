"use client"

import { motion } from "framer-motion"
import { Database, Zap, Flame, Shield } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const ENGINES = [
    {
        name: "PostgreSQL",
        description: "The world's most advanced open source relational database. Scalable, reliable, and standards-compliant.",
        icon: Database,
        color: "#336791"
    },
    {
        name: "Redis",
        description: "Lightning-fast in-memory data store for caching, session management, and real-time analytics.",
        icon: Zap,
        color: "#D82C20"
    },
    {
        name: "MySQL",
        description: "The most popular open source database. Optimized for web applications and fast read performance.",
        icon: Flame,
        color: "#F29111"
    },
    {
        name: "MongoDB",
        description: "Flexible, document-oriented NoSQL database for rapid development and scale-out architectures.",
        icon: Shield,
        color: "#47A248"
    }
]

export function DatabaseEngines() {
    return (
        <section className="w-full px-6 py-24 lg:px-12 bg-background">
            <div className="flex flex-col items-center text-center gap-4 mb-20">
                <h2 className="text-3xl lg:text-5xl font-pixel uppercase">Supported Engines</h2>
                <p className="text-sm font-mono text-muted-foreground max-w-xl leading-relaxed">
                    Choose from the industry's most popular database engines, all managed by our engineering-grade infrastructure.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {ENGINES.map((engine, i) => (
                    <motion.div
                        key={engine.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5, ease }}
                        className="p-8 border-2 border-foreground hover:border-[#ea580c] transition-all group relative overflow-hidden h-full flex flex-col"
                    >
                        <div
                            className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none"
                            style={{ color: engine.color }}
                        >
                            <engine.icon size={120} strokeWidth={1} />
                        </div>

                        <div className="w-12 h-12 border border-foreground/20 flex items-center justify-center bg-foreground/5 mb-6 group-hover:scale-110 transition-transform duration-300">
                            <engine.icon size={24} strokeWidth={1.5} className="text-foreground" />
                        </div>

                        <h3 className="text-xl font-mono font-bold uppercase tracking-tight mb-3">{engine.name}</h3>
                        <p className="text-xs text-muted-foreground font-mono leading-relaxed mb-8 flex-1">
                            {engine.description}
                        </p>

                        <div className="pt-6 border-t border-foreground/5 flex items-center justify-between mt-auto">
                            <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                                Production-Ready
                            </span>
                            <div className="w-1.5 h-1.5 bg-[#ea580c]" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
