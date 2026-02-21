"use client"

import { motion } from "framer-motion"
import { Cpu, Zap, HardDrive, Shield } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const VALUES = [
    {
        icon: Cpu,
        title: "Engineering > Hype",
        desc: "We don't build features based on industry trends. We build based on kernel stability, networking physics, and IOPS benchmarks."
    },
    {
        icon: Zap,
        title: "Deterministic Scale",
        desc: "Your application should behave exactly the same at 1 req/s as it does at 1M req/s. Zero jitter. Zero surprise bottlenecks."
    },
    {
        icon: HardDrive,
        title: "Sovereignty first",
        desc: "Total control over your data and compute. Open-source foundations with transparent operational guardrails."
    }
]

export function AboutPhilosophy() {
    return (
        <section className="w-full px-6 py-20 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                <div className="lg:col-span-5 flex flex-col gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4"
                    >
                        <span className="text-[10px] tracking-[0.2em] font-mono text-[#ea580c] uppercase">// PHILOSOPHY</span>
                        <div className="w-12 border-t border-[#ea580c]" />
                    </motion.div>

                    <h2 className="text-3xl lg:text-5xl font-mono font-bold uppercase tracking-tighter leading-tight">
                        We build for the<br />
                        <span className="text-[#ea580c]">Inspectable Cloud</span>
                    </h2>

                    <p className="text-sm font-mono text-muted-foreground leading-relaxed">
                        Hyperscalers have become black boxes. Nubis is the antidote.
                        By leveraging bare-metal performance with modern orchestration,
                        we provide the control of on-prem with the speed of serverless.
                    </p>

                    <div className="mt-8 p-6 border-2 border-foreground bg-foreground/5 grid grid-cols-2 gap-8 divide-x-2 divide-foreground/10">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-mono uppercase text-muted-foreground">Active_CPUs</span>
                            <span className="text-2xl font-mono font-bold">540k+</span>
                        </div>
                        <div className="flex flex-col gap-1 pl-8">
                            <span className="text-[10px] font-mono uppercase text-muted-foreground">Data_Ingress</span>
                            <span className="text-2xl font-mono font-bold">12.8PB</span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7 flex flex-col justify-center divide-y-2 divide-foreground/10 border-t-2 border-b-2 border-foreground">
                    {VALUES.map((val, i) => (
                        <motion.div
                            key={val.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5, ease }}
                            className="py-10 flex flex-col md:flex-row gap-6 group hover:bg-foreground/5 transition-colors px-4"
                        >
                            <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-foreground text-background transition-transform group-hover:rotate-12">
                                <val.icon size={20} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-lg font-mono font-bold uppercase tracking-tight">{val.title}</h3>
                                <p className="text-xs font-mono text-muted-foreground leading-relaxed max-w-lg">
                                    {val.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
