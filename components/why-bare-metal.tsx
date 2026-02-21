"use client"

import { motion } from "framer-motion"
import { Layers, Zap, Maximize, Activity } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const COMPARISON = [
    {
        feature: "Latency",
        virtual: "Variable (Hypervisor overhead)",
        baremetal: "Deterministic (Sub-microsecond)",
        icon: Activity
    },
    {
        feature: "Performance",
        virtual: "Shared Resources",
        baremetal: "100% Dedicated",
        icon: Zap
    },
    {
        feature: "Overhead",
        virtual: "10-15% CPU Loss",
        baremetal: "Zero Overhead",
        icon: Layers
    },
    {
        feature: "Scalability",
        virtual: "Horizontal/Vertical",
        baremetal: "Cloud-Scale Hardware",
        icon: Maximize
    }
]

export function WhyBareMetal() {
    return (
        <section className="w-full px-6 py-20 lg:px-12 bg-background">
            <div className="flex flex-col items-center text-center gap-4 mb-16">
                <h2 className="text-3xl lg:text-5xl font-pixel uppercase">Why Bare Metal?</h2>
                <p className="text-sm font-mono text-muted-foreground max-w-2xl">
                    Traditional virtualization adds layers of complexity and latency. Nubis Bare Metal removes
                    the hypervisor, giving you direct access to the silicon.
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
                                <span className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest">Virtual Cloud</span>
                                <span className="text-xs font-mono line-through opacity-50">{item.virtual}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-mono uppercase text-[#ea580c] tracking-widest">Nubis Bare Metal</span>
                                <span className="text-sm font-mono font-bold uppercase">{item.baremetal}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
