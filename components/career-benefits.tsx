"use client"

import { motion } from "framer-motion"
import { Shield, Zap, Globe, Cpu } from "lucide-react"

const BENEFITS = [
    {
        icon: Globe,
        title: "Remote-First Sovereignty",
        desc: "We hire globally. Work from anywhere that has a low-latency connection. No mandatory offices. No timezone micro-management."
    },
    {
        icon: Zap,
        title: "Deep-Tech Equity",
        desc: "Significant ownership in the infrastructure of the future. We believe those who build the core should own the mission."
    },
    {
        icon: Cpu,
        title: "Ultimate Hardware",
        desc: "Custom workstation stipends. Every engineer gets the best high-performance hardware needed to simulate hyperscale environments."
    },
    {
        icon: Shield,
        title: "Industrial Learning",
        desc: "Work on original kernels, custom hypervisors, and global routing hardware. A foundry for true systems engineers."
    }
]

export function CareerBenefits() {
    return (
        <section className="w-full px-6 py-20 lg:px-12 bg-foreground text-background">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="flex flex-col gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4"
                    >
                        <span className="text-[10px] tracking-[0.2em] font-mono text-[#ea580c] uppercase">// PERKS_&_PROTOCOL</span>
                        <div className="w-12 border-t border-[#ea580c]" />
                    </motion.div>

                    <h2 className="text-4xl lg:text-6xl font-pixel uppercase leading-none">The Engineer's Package</h2>

                    <p className="text-sm font-mono opacity-60 leading-relaxed max-w-lg">
                        We don't offer bean bags or ping-pong tables. We offer the chance to solve the most difficult problems in computing alongside the best people in the world.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {BENEFITS.map((b, i) => (
                        <motion.div
                            key={b.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="border-2 border-background/20 p-8 flex flex-col gap-6 group hover:border-[#ea580c] transition-all"
                        >
                            <b.icon size={24} className="text-[#ea580c] opacity-50 group-hover:opacity-100 transition-opacity" />
                            <div className="flex flex-col gap-2">
                                <h3 className="text-sm font-mono font-bold uppercase tracking-widest">{b.title}</h3>
                                <p className="text-[10px] font-mono opacity-50 group-hover:opacity-100 transition-opacity leading-relaxed">
                                    {b.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
