"use client"

import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

const PRINCIPLES = [
    { id: "01", title: "TOTAL_TRANSPARENCY", content: "Architecture-level audit logs for every operation. Know exactly where your compute is and how it's performing." },
    { id: "02", title: "LATENCY_OBSESSION", content: "Sub-millisecond routing across our global Anycast network. We fight for every microsecond of edge performance." },
    { id: "03", title: "OPEN_CORE", content: "Built on battle-tested open-source protocols. No vendor lock-in. No proprietary black boxes." },
    { id: "04", title: "BRUTAL_SIMPLICITY", content: "Minimalist APIs and industrial UI. We remove the noise so you can focus on scale." }
]

export function AboutManifesto() {
    return (
        <section className="w-full px-6 py-20 lg:px-12 bg-foreground text-background">
            <div className="flex flex-col gap-12">
                <div className="flex items-center gap-4">
                    <span className="text-[10px] tracking-[0.2em] font-mono text-[#ea580c] uppercase">// CORE_PRINCIPLES</span>
                    <div className="flex-1 border-t border-background/20" />
                    <span className="text-[10px] tracking-[0.2em] font-mono text-background/40 uppercase">MANIFESTO.v3</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-2 border-background/20 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-background/20">
                    {PRINCIPLES.map((p, i) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5, ease }}
                            className="p-10 flex flex-col gap-12 group hover:bg-background/5 transition-colors"
                        >
                            <span className="text-4xl font-serif font-bold opacity-10 group-hover:opacity-100 transition-all duration-700 text-[#ea580c]">{p.id}</span>
                            <div className="flex flex-col gap-4">
                                <h3 className="text-lg font-pixel uppercase tracking-widest">{p.title}</h3>
                                <p className="text-[10px] font-mono leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
                                    {p.content}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
