"use client"

import { motion } from "framer-motion"
import { Box, Settings, Cpu, Zap } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const COMPARISON = [
    {
        feature: "Control Plane",
        standard: "Self-Managed (Complex)",
        nubis: "Fully Managed (Zero UI)",
        icon: Settings
    },
    {
        feature: "Upgrades",
        standard: "Manual / Risky",
        nubis: "Continuous / Non-disruptive",
        icon: Zap
    },
    {
        feature: "Provisioning",
        standard: "15-20 Minutes",
        nubis: "< 90 Seconds",
        icon: Cpu
    },
    {
        feature: "Integrated Services",
        standard: "Fragmented (Helm/Manifests)",
        nubis: "Native VPC & Storage Mesh",
        icon: Box
    }
]

export function WhyNubisKubernetes() {
    return (
        <section className="w-full px-6 py-20 lg:px-12 bg-background">
            <div className="flex flex-col items-center text-center gap-4 mb-16">
                <h2 className="text-3xl lg:text-5xl font-pixel uppercase">The Nubis K8s Advantage</h2>
                <p className="text-sm font-mono text-muted-foreground max-w-2xl leading-relaxed">
                    Running Kubernetes usually requires a dedicated devops team. With Nubis, we've
                    automated the plumbing so you only deal with deployments.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {COMPARISON.map((item, i) => (
                    <motion.div
                        key={item.feature}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5, ease }}
                        className="flex flex-col border-2 border-foreground p-6 gap-4 hover:bg-foreground/5 transition-colors"
                    >
                        <item.icon size={24} className="text-[#ea580c]" strokeWidth={1.5} />
                        <h3 className="text-lg font-mono font-bold uppercase">{item.feature}</h3>

                        <div className="flex flex-col gap-4 mt-2">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest">Standard K8s</span>
                                <span className="text-xs font-mono line-through opacity-50">{item.standard}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-mono uppercase text-[#ea580c] tracking-widest">Nubis Managed</span>
                                <span className="text-sm font-mono font-bold uppercase">{item.nubis}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
