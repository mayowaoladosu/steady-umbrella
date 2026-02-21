"use client"

import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

const SERVICES = [
    {
        badge: "COMPUTE",
        title: "BARE-METAL & VMs",
        description: "High-performance virtual machines and dedicated instances provisioned in seconds. NVMe storage included."
    },
    {
        badge: "CONTAINERS",
        title: "KUBERNETES ENGINES",
        description: "Managed Kubernetes clusters for containerized workloads. Auto-scaling and auto-healing built-in."
    },
    {
        badge: "APP_PLATFORM",
        title: "SERVERLESS PAAS",
        description: "Deploy code directly from Git. We handle the builds, routing, and scaling automatically."
    },
    {
        badge: "DATA",
        title: "MANAGED DATABASES",
        description: "Highly available PostgreSQL and Redis clusters with automated backups and read replicas."
    },
    {
        badge: "NETWORK",
        title: "DNS & FIREWALLS",
        description: "Global DNS resolution, domain registration, and cloud firewalls operating at the network edge."
    },
    {
        badge: "STORAGE",
        title: "OBJECT & BLOCK",
        description: "S3-compatible object storage and scalable block storage volumes attached directly to your nodes."
    }
]

export function ServicesSection() {
    return (
        <section className="w-full px-6 py-12 lg:px-12">
            {/* Section label */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease }}
                className="flex items-center gap-4 mb-8"
            >
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                    {"// SECTION: SERVICES"}
                </span>
                <div className="flex-1 border-t border-border" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                    007
                </span>
            </motion.div>

            {/* Grid Layout */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-2 border-foreground"
            >
                {SERVICES.map((service, index) => {
                    // Layout styling to create the internal grid lines flawlessly
                    const isLastRow = index >= SERVICES.length - 3;
                    const isLastCol = (index + 1) % 3 === 0;

                    return (
                        <div
                            key={service.title}
                            className={`flex flex-col p-6 lg:p-8 border-foreground ${!isLastCol ? "lg:border-r-2" : ""
                                } ${!isLastRow ? "lg:border-b-2" : ""
                                } border-b-2 lg:border-none`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-[10px] tracking-[0.2em] font-mono text-[#ea580c] bg-[#ea580c]/10 px-2 py-1 rounded-sm border border-[#ea580c]/20 uppercase">
                                    [{service.badge}]
                                </span>
                            </div>
                            <h3 className="text-base font-mono font-bold tracking-tight text-foreground uppercase mb-3">
                                {service.title}
                            </h3>
                            <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    )
                })}
            </motion.div>
        </section>
    )
}
