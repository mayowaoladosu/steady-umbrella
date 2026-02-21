"use client"

import { motion } from "framer-motion"
import { Check, X, ArrowDown, Shield, Globe, Server } from "lucide-react"

const RULES = [
    {
        type: "INBOUND",
        protocol: "TCP",
        port: "443 (HTTPS)",
        source: "0.0.0.0/0",
        action: "ACCEPT",
        reason: "Public Web Traffic"
    },
    {
        type: "INBOUND",
        protocol: "TCP",
        port: "22 (SSH)",
        source: "10.0.1.45/32",
        action: "ACCEPT",
        reason: "Internal Admin Only"
    },
    {
        type: "INBOUND",
        protocol: "UDP",
        port: "ALL",
        source: "0.0.0.0/0",
        action: "DROP",
        reason: "Default Deny Policy"
    }
]

export function RuleVisualizer() {
    return (
        <section className="w-full px-6 py-24 lg:px-12 bg-background">
            <div className="max-w-4xl mx-auto flex flex-col gap-12">
                <div className="text-center flex flex-col gap-4">
                    <h2 className="text-3xl lg:text-5xl font-pixel uppercase">Rule Orchestration</h2>
                    <p className="text-sm font-mono text-muted-foreground leading-relaxed">
                        Deterministic rule processing. Incoming packets are evaluated top-to-bottom
                        with immediate enforcement at the packet level.
                    </p>
                </div>

                <div className="relative flex flex-col gap-4 items-center">
                    {/* Top Entrance */}
                    <div className="flex flex-col items-center gap-2 mb-4">
                        <Globe size={32} strokeWidth={1} className="text-[#ea580c]" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Inbound Traffic</span>
                        <ArrowDown className="animate-bounce" size={16} />
                    </div>

                    <div className="w-full border-2 border-foreground bg-foreground/5 p-1 flex flex-col gap-1">
                        {RULES.map((rule, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col md:flex-row items-center border border-foreground/10 bg-background p-4 gap-4"
                            >
                                <div className="flex items-center gap-3 md:w-1/4">
                                    <div className={`w-2 h-2 rounded-full ${rule.action === "ACCEPT" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"}`} />
                                    <span className="text-xs font-mono font-bold uppercase">{rule.type}</span>
                                </div>

                                <div className="flex flex-1 gap-6 text-[11px] font-mono tracking-tighter text-muted-foreground overflow-x-auto w-full md:w-auto">
                                    <div className="flex flex-col gap-0.5 min-w-[60px]">
                                        <span className="text-[9px] uppercase opacity-50">Protocol</span>
                                        <span className="text-foreground">{rule.protocol}</span>
                                    </div>
                                    <div className="flex flex-col gap-0.5 min-w-[80px]">
                                        <span className="text-[9px] uppercase opacity-50">Port</span>
                                        <span className="text-foreground">{rule.port}</span>
                                    </div>
                                    <div className="flex flex-col gap-0.5 min-w-[100px]">
                                        <span className="text-[9px] uppercase opacity-50">Source</span>
                                        <span className="text-foreground">{rule.source}</span>
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[9px] uppercase opacity-50">Notes</span>
                                        <span className="italic">{rule.reason}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 md:w-1/6 justify-end">
                                    {rule.action === "ACCEPT" ? (
                                        <div className="flex items-center gap-2 text-emerald-500 font-mono text-[10px] uppercase font-bold px-2 py-1 border border-emerald-500/20 bg-emerald-500/5 w-fit">
                                            <Check size={12} />
                                            ALLOW
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-red-500 font-mono text-[10px] uppercase font-bold px-2 py-1 border border-red-500/20 bg-red-500/5 w-fit">
                                            <X size={12} />
                                            DROP
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom Secure Zone */}
                    <div className="flex flex-col items-center gap-2 mt-8">
                        <ArrowDown size={16} />
                        <div className="p-4 border-2 border-dashed border-emerald-500/40 bg-emerald-500/5 flex items-center gap-4">
                            <Shield size={24} className="text-emerald-500" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 font-bold">Secure Compute Zone</span>
                                <div className="flex items-center gap-3 mt-1 opacity-40">
                                    <Server size={14} />
                                    <Server size={14} />
                                    <Server size={14} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
