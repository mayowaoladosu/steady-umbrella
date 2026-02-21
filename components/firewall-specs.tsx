"use client"

import { motion } from "framer-motion"
import { Shield, Zap, Search, Activity } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const SPECS = [
    {
        category: "INSPECTION",
        title: "Stateful Layer 4",
        description: "Rules look beyond individual packets, tracking the state of network connections (SYN, ACK, Established) for total flow control.",
        icon: Search,
        details: ["TCP/UDP stream tracking", "Bi-directional flow analysis", "ICMP state awareness"]
    },
    {
        category: "PERFORMANCE",
        title: "Edge Enforcement",
        description: "Firewall logic is executed at our network boundary on dedicated hardware. Zero performance impact on your instances.",
        icon: Zap,
        details: ["< 1µs Rule processing", "Kernel-bypass pathing", "Hardware offload (eBPF)"]
    },
    {
        category: "MANAGEMENT",
        title: "Dynamic rule engine",
        description: "Instantly apply rule changes across entire fleets using tags and dynamic groups. No need to update individual VMs.",
        icon: Shield,
        details: ["Tag-based targeting", "Auto-propagation", "Bulk rule orchestration"]
    },
    {
        category: "VISIBILITY",
        title: "Telemetry & Logs",
        description: "Real-time streaming of accepted and dropped packets. Integrated with our monitoring stack for deep forensic analysis.",
        icon: Activity,
        details: ["Netflow v9 support", "Dropped packet alerts", "API-driven log export"]
    }
]

export function FirewallSpecs() {
    return (
        <section className="w-full px-6 py-20 lg:px-12 bg-foreground/5">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-12"
            >
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                    {"// SECTION: SECURITY_CORE"}
                </span>
                <div className="flex-1 border-t border-foreground/10" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                    S.FW.001
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
