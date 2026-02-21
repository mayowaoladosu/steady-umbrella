"use client"

import { motion } from "framer-motion"
import { HardDrive, Server, ShieldCheck, Activity } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const SPECS = [
    {
        category: "STORAGE",
        title: "NVMe Optimized",
        description: "Direct-attached NVMe storage for extreme I/O performance and consistent low latency.",
        icon: HardDrive,
        details: ["Up to 100k IOPS", "Low latency PCIe 5.0", "Dedicated bandwidth"]
    },
    {
        category: "AVAILABILITY",
        title: "Instant Replication",
        description: "Synchronous replication across multiple fault domains with automated failover and recovery.",
        icon: Server,
        details: ["Zero-data-loss RPO", "Sub-60s recovery RTO", "Cross-region standby"]
    },
    {
        category: "DATA_PROTECTION",
        title: "PITR Backups",
        description: "Point-in-time recovery with continuous transaction logging. Roll back to any second in the last 35 days.",
        icon: ShieldCheck,
        details: ["Continuous WAL streaming", "Instant point-in-time", "Immutable backups"]
    },
    {
        category: "MANAGEMENT",
        title: "Automated Lifecycle",
        description: "Automated minor versions upgrades, vulnerability patching, and infrastructure scaling.",
        icon: Activity,
        details: ["Predictive monitoring", "Auto-scaling disk", "Guided performance API"]
    }
]

export function DatabaseSpecs() {
    return (
        <section className="w-full px-6 py-20 lg:px-12 bg-foreground/5">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-12"
            >
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                    {"// SECTION: PERSISTENCE_CORE"}
                </span>
                <div className="flex-1 border-t border-foreground/10" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                    DATA.001
                </span>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-2 border-foreground">
                {SPECS.map((spec, i) => (
                    <motion.div
                        key={spec.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5, ease }}
                        className={`p-8 bg-background flex flex-col gap-6 ${i !== SPECS.length - 1 ? "md:border-r-2 border-foreground" : ""
                            } ${i < 2 ? "border-b-2 lg:border-b-0 border-foreground" : ""}`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono tracking-widest text-[#ea580c]">
                                {spec.category}
                            </span>
                            <spec.icon size={20} strokeWidth={1.5} className="text-foreground/40" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-mono font-bold uppercase tracking-tight">{spec.title}</h3>
                            <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                                {spec.description}
                            </p>
                        </div>

                        <ul className="flex flex-col gap-2 mt-auto">
                            {spec.details.map((detail) => (
                                <li key={detail} className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-[#ea580c]" />
                                    <span className="text-[10px] font-mono uppercase tracking-tight text-foreground/70">
                                        {detail}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
