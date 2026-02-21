"use client"

import { motion } from "framer-motion"
import { Search, CheckCircle2, XCircle, Globe } from "lucide-react"
import { useState } from "react"

const ease = [0.22, 1, 0.36, 1] as const

const EXAMPLE_DOMAINS = [
    { name: "nubis.cloud", status: "TAKEN", price: "$49.00/yr" },
    { name: "nubis.io", status: "AVAILABLE", price: "$32.00/yr" },
    { name: "nubis.dev", status: "AVAILABLE", price: "$12.00/yr" },
    { name: "nubis.network", status: "AVAILABLE", price: "$28.00/yr" }
]

export function DomainSearchVisual() {
    const [searchValue, setSearchValue] = useState("nubis")

    return (
        <section className="w-full px-6 py-24 lg:px-12 bg-background border-t-2 border-foreground">
            <div className="max-w-4xl mx-auto flex flex-col gap-12">
                <div className="text-center flex flex-col gap-4">
                    <h2 className="text-3xl lg:text-5xl font-pixel uppercase">Domain Registration</h2>
                    <p className="text-sm font-mono text-muted-foreground leading-relaxed">
                        Secure your digital identity with our integrated registrar.
                        Automatic DNS configuration and free WHOIS privacy.
                    </p>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="text-foreground/40 group-focus-within:text-[#ea580c] transition-colors" size={20} />
                        </div>
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="w-full bg-foreground/5 border-2 border-foreground/10 focus:border-[#ea580c] p-6 pl-12 font-mono text-xl uppercase tracking-tighter outline-none transition-all"
                            placeholder="ENTER_DOMAIN_NAME..."
                        />
                        <div className="absolute inset-y-0 right-0 p-1">
                            <button className="h-full px-8 bg-foreground text-background font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#ea580c] transition-colors">
                                Search
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-1 border-2 border-foreground/10 bg-foreground/5 p-1">
                        {EXAMPLE_DOMAINS.map((domain, i) => (
                            <motion.div
                                key={domain.name}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center justify-between p-4 bg-background group hover:bg-foreground/5 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 border border-foreground/10 flex items-center justify-center bg-foreground/5">
                                        <Globe size={14} className="text-foreground/40" />
                                    </div>
                                    <span className="font-mono font-bold text-sm uppercase">{domain.name}</span>
                                </div>

                                <div className="flex items-center gap-8">
                                    <div className="hidden md:flex flex-col items-end gap-0.5">
                                        <span className="text-[10px] uppercase text-muted-foreground font-mono">Status</span>
                                        {domain.status === "AVAILABLE" ? (
                                            <div className="flex items-center gap-1.5 text-emerald-500 font-mono text-[10px] font-bold uppercase">
                                                <CheckCircle2 size={12} />
                                                Available
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-red-500 font-mono text-[10px] font-bold uppercase">
                                                <XCircle size={12} />
                                                Taken
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col items-end gap-0.5">
                                        <span className="text-[10px] uppercase text-muted-foreground font-mono">Price</span>
                                        <span className="text-xs font-mono font-bold text-[#ea580c]">{domain.price}</span>
                                    </div>

                                    <button
                                        disabled={domain.status === "TAKEN"}
                                        className={`px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest border-2 border-foreground transition-all ${domain.status === "TAKEN"
                                                ? "opacity-20 cursor-not-allowed"
                                                : "hover:bg-foreground hover:text-background"
                                            }`}
                                    >
                                        Register
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
