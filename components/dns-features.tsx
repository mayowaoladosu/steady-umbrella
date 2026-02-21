"use client"

import { motion } from "framer-motion"
import { Globe, Zap, ShieldCheck, Database, Terminal, Activity } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const FEATURES = [
    {
        title: "Global Edge Network",
        description: "DNS records are distributed across 32 dedicated edge locations for maximum reliability.",
        icon: Globe,
    },
    {
        title: "Domain Integration",
        description: "Auto-configure DNS records for domains registered through Nubis with zero manual setup.",
        icon: Database,
    },
    {
        title: "Proprietary Anycast",
        description: "We own our network stack, ensuring predictable routing and sub-ms resolution for users.",
        icon: Zap,
    },
    {
        title: "Secondary DNS",
        description: "Keep your records in sync across multiple providers with full AXFR zone transfer support.",
        icon: Activity,
    },
    {
        title: "API-First Design",
        description: "Every DNS function is available via our REST API and official CLI tools for automation.",
        icon: Terminal,
    },
    {
        title: "Advanced Security",
        description: "Protection against cache poisoning, DNS amplification, and volumetric attacks.",
        icon: ShieldCheck,
    }
]

export function DnsFeatures() {
    return (
        <section className="w-full px-6 py-24 lg:px-12 bg-background border-t-2 border-foreground overflow-hidden">
            <div className="flex flex-col gap-4 mb-20">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                >
                    <span className="text-[10px] tracking-[0.2em] font-mono text-[#ea580c] uppercase">// NETWORK_INFRASTRUCTURE</span>
                    <div className="flex-1 border-t border-foreground/10" />
                </motion.div>
                <h2 className="text-3xl lg:text-5xl font-pixel uppercase text-foreground">Next-Gen Networking</h2>
                <p className="text-sm font-mono text-muted-foreground max-w-2xl leading-relaxed">
                    Nubis Global Edge DNS provides the highest-performance name resolution
                    available, ensuring your users connect to your apps as fast as possible.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-foreground">
                {FEATURES.map((feature, i) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className={`p-8 bg-background hover:bg-foreground/5 transition-colors group border-foreground ${(i + 1) % 3 !== 0 ? "lg:border-r-2" : ""
                            } ${i < 3 ? "border-b-2" : "md:border-b-2 lg:border-b-0"} ${(i + 1) % 2 !== 0 ? "md:border-r-2 lg:border-r-0" : ""
                            }`}
                    >
                        <div className="flex flex-col gap-6">
                            <div className="w-12 h-12 border border-foreground/20 flex items-center justify-center bg-foreground/5 group-hover:bg-[#ea580c] group-hover:border-[#ea580c] group-hover:text-background transition-colors duration-300">
                                <feature.icon size={20} strokeWidth={1.5} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-mono font-bold uppercase tracking-tight">{feature.title}</h3>
                                <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
