"use client"

import { motion } from "framer-motion"
import { Shield, Book, Activity, X } from "lucide-react"

const CHANNELS = [
    {
        icon: Book,
        title: "Documentation",
        desc: "API references, deployment guides, and architecture specs.",
        link: "https://docs.usenubis.com"
    },
    {
        icon: Activity,
        title: "System Status",
        desc: "Live uptime tracking and operational incident logs.",
        link: "https://status.usenubis.com"
    },
    {
        icon: X,
        title: "Twitter",
        desc: "Follow us for real-time updates and engineering insights.",
        link: "https://x.com/usenubis"
    },
    {
        icon: Shield,
        title: "Security",
        desc: "Report vulnerabilities via our encrypted security portal.",
        link: "mailto:security@usenubis.com"
    }
]

export function SupportDetails() {
    return (
        <div className="w-full lg:w-2/5 flex flex-col gap-8">
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <span className="text-[10px] tracking-[0.2em] font-mono text-[#ea580c] uppercase">// DIRECT_CHANNELS</span>
                    <div className="w-12 border-t border-[#ea580c]" />
                </div>
                <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                    Preferred communication protocols for technical resources and live system monitoring.
                    Standard response time via email is &lt; 24h.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                {CHANNELS.map((ch, i) => (
                    <motion.a
                        key={ch.title}
                        href={ch.link}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="border-2 border-foreground p-6 flex items-start gap-4 group hover:border-[#ea580c] transition-all"
                    >
                        <div className="shrink-0 p-3 bg-foreground text-background group-hover:bg-[#ea580c] transition-colors">
                            <ch.icon size={18} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-xs font-mono font-bold uppercase tracking-widest">{ch.title}</h3>
                            <p className="text-[10px] font-mono text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                                {ch.desc}
                            </p>
                        </div>
                    </motion.a>
                ))}
            </div>

            <div className="mt-8 border-2 border-foreground p-6 bg-foreground text-background flex flex-col gap-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 font-bold">Foundry HQ</span>
                <div className="flex flex-col gap-1">
                    <p className="text-xs font-mono font-bold uppercase">Ibadan, Nigeria</p>
                    <p className="text-[10px] font-mono opacity-60">Operations Core / Edge Routing Lab</p>
                </div>
            </div>
        </div>
    )
}
