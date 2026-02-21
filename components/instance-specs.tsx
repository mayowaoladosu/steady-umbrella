"use client"

import { motion } from "framer-motion"
import { Cpu, HardDrive, Network, MemoryStick } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const SPECS = [
    {
        category: "COMPUTE",
        title: "Dedicated Processors",
        description: "Full access to AMD EPYC™ 9004 Series or Intel® Xeon® Scalable processors. No noisy neighbors.",
        icon: Cpu,
        details: ["Up to 128 Cores / 256 Threads", "Base clock up to 3.1GHz", "AVX-512 Support"]
    },
    {
        category: "MEMORY",
        title: "ECC RDIMM RAM",
        description: "High-density DDR5 memory with error correction for mission-critical reliability.",
        icon: MemoryStick,
        details: ["Up to 2TB DDR5 RAM", "4800MT/s transfer speed", "Eight-channel memory architecture"]
    },
    {
        category: "STORAGE",
        title: "NVMe Gen5 Storage",
        description: "Direct-attached PCIe 5.0 NVMe drives for extreme I/O performance and low latency.",
        icon: HardDrive,
        details: ["Up to 30TB Raw NVMe", "Software RAID 0/1/10 support", "Sub-100µs latency"]
    },
    {
        category: "NETWORKING",
        title: "100Gbps Connectivity",
        description: "Dual 100GbE ports with support for SR-IOV and high-performance packet processing.",
        icon: Network,
        details: ["Redundant 100G uplinks", "DPDK & eBPF optimized", "Private VPC networking"]
    }
]

export function InstanceSpecs() {
    return (
        <section className="w-full px-6 py-20 lg:px-12 bg-foreground/5">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease }}
                className="flex items-center gap-4 mb-12"
            >
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                    {"// SECTION: HARDWARE_SPECIFICATIONS"}
                </span>
                <div className="flex-1 border-t border-foreground/10" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                    SPEC.001
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
                            <h3 className="text-xl font-mono font-bold uppercase">{spec.title}</h3>
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
