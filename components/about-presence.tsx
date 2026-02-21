"use client"

import { motion } from "framer-motion"
import { Globe, MapPin } from "lucide-react"

const REGIONS = [
    { city: "Lagos", code: "LOS-01", status: "ONLINE", latency: "1.2ms" },
    { city: "Nairobi", code: "NBO-01", status: "ONLINE", latency: "2.4ms" },
    { city: "Cape Town", code: "CPT-01", status: "ONLINE", latency: "3.1ms" },
    { city: "Accra", code: "ACC-01", status: "ONLINE", latency: "1.8ms" },
    { city: "Cairo", code: "CAI-01", status: "ONLINE", latency: "4.2ms" },
    { city: "Frankfurt", code: "FRA-01", status: "ONLINE", latency: "0.8ms" },
    { city: "Singapore", code: "SIN-01", status: "ONLINE", latency: "1.5ms" },
    { city: "New York", code: "NYC-01", status: "ONLINE", latency: "0.9ms" },
    { city: "London", code: "LON-01", status: "ONLINE", latency: "1.1ms" },
]

export function AboutPresence() {
    return (
        <section className="w-full px-6 py-20 lg:px-12">
            <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] tracking-[0.2em] font-mono text-[#ea580c] uppercase">// GLOBAL_FOOTPRINT</span>
                        <div className="w-12 border-t border-[#ea580c]" />
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-mono font-bold uppercase tracking-tighter">Distributed Core</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-4 flex flex-col gap-8">
                        <p className="text-sm font-mono text-muted-foreground leading-relaxed">
                            Our anycast network is strategically distributed to prioritize the fastest emerging markets.
                            Every PoP is engineered with proprietary SDN layers and direct fiber interconnects.
                        </p>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 bg-[#ea580c] rounded-full animate-ping" />
                                <span className="text-[10px] font-mono uppercase font-bold tracking-widest">32 Global Edge PoPs</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 bg-[#ea580c] rounded-full" />
                                <span className="text-[10px] font-mono uppercase font-bold tracking-widest">Tier-4 Data Centers Only</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-2">
                        {REGIONS.map((region, i) => (
                            <motion.div
                                key={region.code}
                                initial={{ opacity: 0, filter: "blur(4px)" }}
                                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="border-2 border-foreground p-4 flex flex-col gap-4 group hover:border-[#ea580c] transition-all"
                            >
                                <div className="flex justify-between items-start">
                                    <MapPin size={16} className="text-[#ea580c] group-hover:scale-125 transition-transform" />
                                    <span className="text-[8px] font-mono bg-foreground/5 px-1.5 py-0.5 uppercase">{region.code}</span>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-xs font-mono font-bold uppercase">{region.city}</span>
                                    <div className="flex justify-between items-center text-[9px] font-mono">
                                        <span className="text-muted-foreground">LATENCY:</span>
                                        <span className="text-[#ea580c]">{region.latency}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
