"use client"

import { motion } from "framer-motion"
import { Activity, Zap, ShieldCheck, Database } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const SPECS = [
    {
        category: "RESOLUTION",
        title: "Global Anycast",
        description: "Requests are automatically routed to the nearest geographic PoP, ensuring sub-10ms resolution globally.",
        icon: Zap,
        details: ["32 Global Anycast PoPs", "Geo-steering support", "Instant failover"]
    },
    {
        category: "PROPAGATION",
        title: "Real-time Update",
        description: "Changes propagate to our global edge in under 30 seconds. No more waiting hours for DNS updates.",
        icon: Activity,
        details: ["30s TTL support", "Global push API", "Atomic record updates"]
    },
    {
        category: "SECURITY",
        title: "DNSSEC / DDoS",
        description: "Full DNSSEC support with automatic key rotation. Built-in protection against volumetric DNS DDoS attacks.",
        icon: ShieldCheck,
        details: ["Automated KSK rotation", "Anycast absorption", "Rate-limiting engine"]
    },
    {
        category: "PROTOCOLS",
        title: "Full Record Stack",
        description: "Comprehensive support for all modern record types with a streamlined API for automation.",
        icon: Database,
        details: ["A, AAAA, MX, CNAME", "TXT, SRV, CAA", "Wildcard support"]
    }
]

export function DnsSpecs() {
    return (
        <section className="w-full px-6 py-20 lg:px-12 bg-foreground/5">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-12"
            >
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                    {"// SECTION: NETWORK_CORE"}
                </span>
                <div className="flex-1 border-t border-foreground/10" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                    N.DNS.001
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
