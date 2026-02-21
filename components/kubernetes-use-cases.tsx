"use client"

import { motion } from "framer-motion"
import { Layers, Server, Shield, Terminal, Zap, Cpu } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const USE_CASES = [
    {
        title: "Microservices Architecture",
        description: "Scale and manage hundreds of containers with integrated service mesh and automatic discovery.",
        icon: Layers,
        stats: "Auto-scaling < 10s"
    },
    {
        title: "SaaS Multi-tenancy",
        description: "Securely isolate customer workloads using namespaces and network policies with zero-trust security.",
        icon: Shield,
        stats: "Hardened Node Isolation"
    },
    {
        title: "Data Processing Pipelines",
        description: "Run massive parallel processing jobs with direct access to high-performance block storage.",
        icon: Server,
        stats: "Dynamic PV Provisioning"
    },
    {
        title: "CI/CD & DevOps",
        description: "Native integration with our API and CLI for smooth, automated deployment workflows.",
        icon: Terminal,
        stats: "Integrated CLI / SDK"
    },
    {
        title: "Edge Computing",
        description: "Deploy containerized applications near your users with global load balancing and DNS integrated.",
        icon: Zap,
        stats: "Global Service Mesh"
    },
    {
        title: "Resource intensive Apps",
        description: "Run demanding applications with full control over CPU/RAM allocation and node affinity rules.",
        icon: Cpu,
        stats: "Node Affinity Support"
    }
]

export function KubernetesUseCases() {
    return (
        <section className="w-full px-6 py-24 lg:px-12 bg-background border-t-2 border-foreground">
            <div className="flex flex-col gap-4 mb-20">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                >
                    <span className="text-[10px] tracking-[0.2em] font-mono text-[#ea580c] uppercase">// WORKLOAD_ORCHESTRATION</span>
                    <div className="flex-1 border-t border-foreground/10" />
                </motion.div>
                <h2 className="text-3xl lg:text-5xl font-pixel uppercase text-foreground">Built for Production</h2>
                <p className="text-sm font-mono text-muted-foreground max-w-2xl leading-relaxed">
                    Managed Kubernetes on Nubis is pre-configured with best practices for security, performance, and reliability.
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
