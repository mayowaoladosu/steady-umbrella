"use client"

import { motion } from "framer-motion"
import { Cpu, Globe, Database, ShieldCheck } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const SPECS = [
    {
        category: "CONTROL_PLANE",
        title: "High-Availability CP",
        description: "Fully redundant control planes distributed across multiple fault domains. Zero management overhead.",
        icon: Cpu,
        details: ["Multi-master configuration", "Etcd backup/recovery", "Sub-second failover"]
    },
    {
        category: "STORAGE",
        title: "CSI Driver Integration",
        description: "Cloud-native block and file storage integrations with support for dynamic volume provisioning.",
        icon: Database,
        details: ["ReadWriteOnce / ReadWriteMany", "Instant snapshots", "Storage class automation"]
    },
    {
        category: "NETWORKING",
        title: "Global VPC Mesh",
        description: "Integrated Cilium-powered networking with support for global service discovery and cross-region mesh.",
        icon: Globe,
        details: ["Auto-configured Ingress", "eBPF-based security", "DDoS-protected endpoints"]
    },
    {
        category: "COMPLIANCE",
        title: "Hardened Runtime",
        description: "Nodes are pre-configured with industry-standard benchmarks (CIS) and automatic security updates.",
        icon: ShieldCheck,
        details: ["Automatic K8s patching", "Worker node isolation", "Integrated RBAC"]
    }
]

export function KubernetesSpecs() {
    return (
        <section className="w-full px-6 py-20 lg:px-12 bg-foreground/5">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-12"
            >
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                    {"// SECTION: ORCHESTRATION_CORE"}
                </span>
                <div className="flex-1 border-t border-foreground/10" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                    K8S.001
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
