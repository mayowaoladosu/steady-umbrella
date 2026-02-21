"use client"

import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

const REASONS = [
    {
        title: "GLOBAL_EDGE_ROUTING",
        description: "Optimized global network topology. We route your traffic through the fastest, lowest-latency paths available worldwide."
    },
    {
        title: "BARE_METAL_PERFORMANCE",
        description: "Direct access to compute resources. No noisy neighbors, hypervisor tax, or degraded IOPS."
    },
    {
        title: "TRANSPARENT_PRICING",
        description: "No opaque bandwidth fees or surprise billing. Deterministic costs for deterministic workloads."
    }
]

export function WhySection() {
    return (
        <section className="w-full px-6 py-12 lg:px-12">
            {/* Section label */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease }}
                className="flex items-center gap-4 mb-8"
            >
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                    {"// SECTION: WHY_NUBIS"}
                </span>
                <div className="flex-1 border-t border-border" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                    006
                </span>
            </motion.div>

            {/* Grid Layout */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease }}
                className="grid grid-cols-1 md:grid-cols-3 border-2 border-foreground"
            >
                {REASONS.map((reason, index) => {
                    const borderClass =
                        index === 0 ? "border-b-2 md:border-b-0 md:border-r-2" :
                            index === 1 ? "border-b-2 md:border-b-0 md:border-r-2" :
                                "";

                    return (
                        <div
                            key={reason.title}
                            className={`flex flex-col p-6 lg:p-10 border-foreground ${borderClass}`}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <span className="h-2 w-2 bg-[#ea580c] shrink-0" />
                                <h3 className="text-sm lg:text-base font-mono font-bold tracking-tight text-foreground uppercase">
                                    {reason.title}
                                </h3>
                            </div>
                            <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed mt-auto">
                                {reason.description}
                            </p>
                        </div>
                    )
                })}
            </motion.div>
        </section>
    )
}
