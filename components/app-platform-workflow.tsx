"use client"

import { motion } from "framer-motion"
import { GitBranch, Box, Cpu, ChevronRight } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const STEPS = [
    {
        title: "Connect GitHub",
        description: "Grant Nubis access to your repository. We support all major frameworks out-of-the-box.",
        icon: GitBranch,
    },
    {
        title: "Automatic Build",
        description: "Every push triggers a fresh build in an isolated container. No config files required.",
        icon: Box,
    },
    {
        title: "Zero-Downtime Deploy",
        description: "We switch traffic to your new version only after successful health checks.",
        icon: Cpu,
    }
]

export function AppPlatformWorkflow() {
    return (
        <section id="how-it-works" className="w-full px-6 py-24 lg:px-12 bg-background">
            <div className="text-center mb-20 flex flex-col items-center gap-4">
                <h2 className="text-3xl lg:text-6xl font-pixel uppercase">The Workflow</h2>
                <p className="text-muted-foreground font-mono text-sm max-w-xl">
                    We've eliminated the friction between writing code and viewing it in production.
                </p>
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                {STEPS.map((step, i) => (
                    <motion.div
                        key={step.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2, duration: 0.6, ease }}
                        className="flex flex-col items-center text-center gap-6 group"
                    >
                        <div className="relative">
                            <div className="w-24 h-24 border-2 border-foreground flex items-center justify-center bg-background group-hover:bg-[#ea580c] group-hover:border-[#ea580c] group-hover:text-background transition-all duration-300">
                                <step.icon size={32} strokeWidth={1} />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 border border-foreground bg-background flex items-center justify-center font-mono text-[10px] font-bold">
                                0{i + 1}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-mono font-bold uppercase tracking-tight">{step.title}</h3>
                            <p className="text-sm text-muted-foreground font-mono leading-relaxed max-w-[280px]">
                                {step.description}
                            </p>
                        </div>

                        {i < STEPS.length - 1 && (
                            <div className="hidden lg:block absolute top-12 left-[calc(33.3%*(i+1)-80px)] opacity-20">
                                <ChevronRight size={48} strokeWidth={1} />
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
