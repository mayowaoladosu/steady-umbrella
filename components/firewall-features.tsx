"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Network, Database, Lock, Terminal, Activity } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const FEATURES = [
    {
        title: "Zero-Latency Filtering",
        description: "Our firewall rules are enforced at the network interface layer. Sub-microsecond processing overhead.",
        icon: Zap,
    },
    {
        title: "VPC-Wide Policies",
        description: "Apply security groups across entire virtual private clouds or target specific resource types using tags.",
        icon: Network,
    },
    {
        title: "Stateful Inspection",
        description: "The firewall automatically allows return traffic for outbound requests without needing explicit inbound rules.",
        icon: ShieldCheck,
    },
    {
        title: "Protocol Support",
        description: "Full filtering control for TCP, UDP, ICMP, and GRE protocols across IPv4 and IPv6 stacks.",
        icon: Lock,
    },
    {
        title: "Terraform & API",
        description: "Manage complex rule sets programmatically or using Infrastructure as Code (IaC) tools.",
        icon: Terminal,
    },
    {
        title: "Detailed Flow Logs",
        description: "Stream network logs to external SIEM or storage for compliance auditing and threat hunting.",
        icon: Activity,
    }
]

import { Zap } from "lucide-react"

export function FirewallFeatures() {
    return (
        <section className="w-full px-6 py-24 lg:px-12 bg-background border-t-2 border-foreground overflow-hidden">
            <div className="flex flex-col gap-4 mb-20">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                >
                    <span className="text-[10px] tracking-[0.2em] font-mono text-[#ea580c] uppercase">// SECURE_INFRASTRUCTURE</span>
                    <div className="flex-1 border-t border-foreground/10" />
                </motion.div>
                <h2 className="text-3xl lg:text-5xl font-pixel uppercase text-foreground">Next-Gen Protection</h2>
                <p className="text-sm font-mono text-muted-foreground max-w-2xl leading-relaxed">
                    Nubis Cloud Firewalls act as an impenetrable boundary for your applications,
                    mitigating DDoS attacks and unauthorized access attempts at the network edge.
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
