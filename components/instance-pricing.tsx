"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

function ScramblePrice({ target, prefix = "$" }: { target: string; prefix?: string }) {
    const [display, setDisplay] = useState(target.replace(/[0-9]/g, "0"))

    useEffect(() => {
        let iterations = 0
        const maxIterations = 18
        const interval = setInterval(() => {
            if (iterations >= maxIterations) {
                setDisplay(target)
                clearInterval(interval)
                return
            }
            setDisplay(
                target
                    .split("")
                    .map((char, i) => {
                        if (!/[0-9]/.test(char)) return char
                        if (iterations > maxIterations - 5 && i < iterations - (maxIterations - 5)) return char
                        return String(Math.floor(Math.random() * 10))
                    })
                    .join("")
            )
            iterations++
        }, 50)
        return () => clearInterval(interval)
    }, [target])

    return (
        <span className="font-mono font-bold" style={{ fontVariantNumeric: "tabular-nums" }}>
            {prefix}{display}
        </span>
    )
}

const INSTANCE_TIERS = [
    {
        id: "bm-start",
        name: "BM_STARTER",
        price: "499",
        period: "/ mo",
        specs: "32 Cores / 128GB RAM",
        description: "Entry-level bare metal for CI/CD and smaller databases.",
        features: ["Dual 1.9TB NVMe", "10Gbps Uplink", "Global Edge Access", "Standard Support"]
    },
    {
        id: "bm-perf",
        name: "BM_PERFORMANCE",
        price: "1299",
        period: "/ mo",
        specs: "64 Cores / 512GB RAM",
        description: "High-performance compute for analytics and large-scale apps.",
        features: ["Quad 3.8TB NVMe", "25Gbps Uplink", "DDoS Protection", "Priority Support"],
        highlighted: true
    },
    {
        id: "bm-extreme",
        name: "BM_EXTREME",
        price: "2499",
        period: "/ mo",
        specs: "128 Cores / 2TB RAM",
        description: "Maximum density for AI training and massive databases.",
        features: ["Custom NVMe Array", "100Gbps Uplink", "HPC Optimization", "24/7 Engineer Access"]
    }
]

export function InstancePricing() {
    return (
        <section className="w-full px-6 py-20 lg:px-12">
            <div className="flex flex-col gap-4 mb-12">
                <h2 className="text-3xl lg:text-4xl font-pixel text-foreground uppercase">Transparent Pricing</h2>
                <p className="text-sm font-mono text-muted-foreground max-w-xl">
                    No hidden fees. No egress charges within the Nubis network. Raw hardware at predictable costs.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-2 border-foreground">
                {INSTANCE_TIERS.map((tier, i) => (
                    <motion.div
                        key={tier.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5, ease }}
                        className={`p-8 flex flex-col gap-6 ${tier.highlighted ? "bg-foreground text-background" : "bg-background text-foreground"
                            } ${i !== INSTANCE_TIERS.length - 1 ? "md:border-r-2 border-foreground" : ""} border-b-2 md:border-b-0 border-foreground last:border-b-0`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono tracking-widest uppercase opacity-70">
                                {tier.name}
                            </span>
                            {tier.highlighted && (
                                <span className="bg-[#ea580c] text-background text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 font-mono">
                                    POPULAR
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl">
                                    <ScramblePrice target={tier.price} />
                                </span>
                                <span className="text-xs font-mono opacity-50 uppercase tracking-widest">
                                    {tier.period}
                                </span>
                            </div>
                            <span className="text-xs font-mono font-bold text-[#ea580c]">
                                {tier.specs}
                            </span>
                        </div>

                        <p className="text-xs font-mono leading-relaxed opacity-70">
                            {tier.description}
                        </p>

                        <div className="flex flex-col gap-3 my-4">
                            {tier.features.map((feat) => (
                                <div key={feat} className="flex items-center gap-3">
                                    <Check size={12} className="text-[#ea580c] shrink-0" />
                                    <span className="text-[10px] font-mono uppercase tracking-tight">
                                        {feat}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full py-3 text-xs font-mono tracking-widest uppercase border-2 border-current transition-colors ${tier.highlighted ? "bg-background text-foreground hover:bg-[#ea580c] hover:border-[#ea580c] hover:text-background" : "bg-foreground text-background hover:bg-[#ea580c] hover:border-[#ea580c]"
                                }`}
                        >
                            Configure Instance
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
