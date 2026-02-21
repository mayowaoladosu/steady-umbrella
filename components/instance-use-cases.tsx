"use client"

import { motion } from "framer-motion"
import { Database, Brain, BarChart3, Binary, Globe, Box } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const USE_CASES = [
    {
        title: "Large-Scale Databases",
        description: "Eliminate hypervisor latency for mission-critical PostgreSQL, MongoDB, or Cassandra clusters with direct-path NVMe I/O.",
        icon: Database,
        stats: "0% IOPS virtualization loss"
    },
    {
        title: "Machine Learning & AI",
        description: "Scale high-throughput model training and inference workloads with dedicated GPU access and massive memory bandwidth.",
        icon: Brain,
        stats: "2.4x Training speed vs Cloud VMs"
    },
    {
        title: "Financial Modeling",
        description: "Deterministic performance for high-frequency trading and risk analysis where every microsecond of latency counts.",
        icon: BarChart3,
        stats: "< 1µs Cross-core jitter"
    },
    {
        title: "Custom Hypervisors",
        description: "Run your own virtualization stack (KVM, Xen, ESXi) or container orchestration without nested virtualization penalties.",
        icon: Binary,
        stats: "Native L0 hardware access"
    },
    {
        title: "Global CDN Edge",
        description: "Deploy custom caching engines and edge compute logic on the same hardware that powers our global network backbone.",
        icon: Globe,
        stats: "100Gbps Dedicated throughput"
    },
    {
        title: "Ad-Tech Realtime Bidding",
        description: "Handle millions of requests per second with consistent sub-millisecond response times across millions of cores.",
        icon: Box,
        stats: "99.999% Percentile consistency"
    }
]

export function InstanceUseCases() {
    return (
        <section className="w-full px-6 py-24 lg:px-12 bg-background border-t-2 border-foreground">
            <div className="flex flex-col gap-4 mb-20">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                >
                    <span className="text-[10px] tracking-[0.2em] font-mono text-[#ea580c] uppercase">// WORKLOAD_OPTIMIZATION</span>
                    <div className="flex-1 border-t border-foreground/10" />
                </motion.div>
                <h2 className="text-3xl lg:text-5xl font-pixel uppercase text-foreground">Optimized for Scale</h2>
                <p className="text-sm font-mono text-muted-foreground max-w-2xl leading-relaxed">
                    Nubis Bare Metal is engineered for workloads that demand 100% of the underlying hardware resources without compromises.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {USE_CASES.map((useCase, i) => (
                    <motion.div
                        key={useCase.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5, ease }}
                        className="group p-8 border-2 border-foreground/10 hover:border-foreground transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <useCase.icon size={80} strokeWidth={1} />
                        </div>

                        <div className="flex flex-col h-full gap-6">
                            <div className="w-10 h-10 border border-foreground/20 flex items-center justify-center bg-foreground/5 group-hover:bg-[#ea580c] group-hover:border-[#ea580c] group-hover:text-background transition-colors duration-300">
                                <useCase.icon size={18} strokeWidth={1.5} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-mono font-bold uppercase tracking-tight">{useCase.title}</h3>
                                <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                                    {useCase.description}
                                </p>
                            </div>

                            <div className="mt-auto pt-6 border-t border-foreground/5 flex items-center justify-between">
                                <span className="text-[10px] font-mono tracking-widest text-[#ea580c] uppercase font-bold">
                                    {useCase.stats}
                                </span>
                                <div className="w-1.5 h-1.5 bg-[#ea580c] animate-pulse" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
