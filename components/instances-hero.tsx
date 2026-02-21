"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Cpu, Zap, Shield, Globe } from "lucide-react"
import Link from "next/link"

const ease = [0.22, 1, 0.36, 1] as const

export function InstancesHero() {
    return (
        <section className="relative w-full px-6 pt-20 pb-12 lg:px-12 lg:pt-32 lg:pb-20 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease }}
                        className="flex items-center gap-2 px-3 py-1 border border-foreground/20 bg-foreground/5 w-fit"
                    >
                        <Cpu size={14} className="text-[#ea580c]" />
                        <span className="text-[10px] font-mono tracking-widest uppercase text-foreground/80">
                            Bare Metal Infrastructure
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease }}
                        className="text-4xl md:text-6xl lg:text-7xl font-pixel tracking-tight text-foreground leading-none"
                    >
                        RAW POWER.<br />
                        ZERO OVERHEAD.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease }}
                        className="text-sm md:text-base text-muted-foreground font-mono max-w-xl leading-relaxed"
                    >
                        Nubis Bare Metal Instances provide dedicated physical servers with no virtualization layer.
                        Experience maximum performance, consistent latency, and full hardware access for your
                        most demanding workloads.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease }}
                        className="flex flex-wrap gap-4"
                    >
                        <Link href="https://console.usenubis.com/instances/create">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group flex items-center gap-0 bg-foreground text-background text-sm font-mono tracking-wider uppercase"
                            >
                                <span className="flex items-center justify-center w-10 h-10 bg-[#ea580c]">
                                    <ArrowRight size={16} strokeWidth={2} className="text-background" />
                                </span>
                                <span className="px-6 py-2.5">Deploy Now</span>
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.2, ease }}
                    className="relative aspect-square border-2 border-foreground bg-foreground/5 flex items-center justify-center overflow-hidden"
                >
                    <div className="absolute inset-0 dot-grid opacity-20" />
                    <Image
                        src="/images/bare-metal-hero.png"
                        alt="Bare Metal Compute Illustration"
                        fill
                        className="object-contain p-4"
                        priority
                    />
                    {/* Overlay engineering lines */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-4 left-4 border-t border-l border-foreground/20 w-8 h-8" />
                        <div className="absolute top-4 right-4 border-t border-r border-foreground/20 w-8 h-8" />
                        <div className="absolute bottom-4 left-4 border-b border-l border-foreground/20 w-8 h-8" />
                        <div className="absolute bottom-4 right-4 border-b border-r border-foreground/20 w-8 h-8" />
                    </div>
                </motion.div>
            </div>

            {/* Feature highlight bar */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 border-2 border-foreground divide-x-2 divide-y-2 md:divide-y-0 divide-foreground">
                {[
                    { icon: Zap, label: "Performance", value: "No Virtualization" },
                    { icon: Shield, label: "Security", value: "Isolated Hardware" },
                    { icon: Globe, label: "Network", value: "100Gbps Backbone" },
                    { icon: Cpu, label: "Processor", value: "Latest Gen EPYC/Xeon" }
                ].map((feat, i) => (
                    <motion.div
                        key={feat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                        className="p-4 flex flex-col gap-2 bg-background"
                    >
                        <div className="flex items-center gap-2">
                            <feat.icon size={12} className="text-[#ea580c]" />
                            <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
                                {feat.label}
                            </span>
                        </div>
                        <span className="text-xs font-mono font-bold uppercase transition-all duration-300">
                            {feat.value}
                        </span>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
