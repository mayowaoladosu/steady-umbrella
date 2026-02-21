"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, Briefcase, Code, Terminal, ArrowRight } from "lucide-react"

const JOBS = [
    {
        id: "staff-rust-systems",
        title: "Staff Systems Engineer (Rust)",
        location: "Global / Remote",
        team: "Core Infrastructure",
        type: "Full-Time",
        desc: "Design and implement high-performance virtualization layers and API gateways. Experience with Rust, KVM/QEMU, and eBPF required.",
        expectations: [
            "Optimize our proprietary VPC networking layer.",
            "Implement high-throughput DigitalOcean API middleware.",
            "Maintain 99.999% uptime for core virtualization services."
        ]
    },
    {
        id: "edge-network-go",
        title: "Edge Network Engineer (Go/Rust)",
        location: "Lagos / Remote",
        team: "Network Operations",
        type: "Full-Time",
        desc: "Scale our global Anycast DNS network. Focus on BGP optimization and sub-ms resolution performance.",
        expectations: [
            "Manage global Anycast routing strategies.",
            "Develop DDoS mitigation layers using Go and XDP.",
            "Scale DNS resolution throughput to 10M+ RPS."
        ]
    },
    {
        id: "staff-frontend",
        title: "Staff Frontend Architect",
        location: "Remote",
        team: "Product Experience",
        type: "Full-Time",
        desc: "Lead the implementation of our 'Liquid Glass' design system. Bridge the gap between industrial aesthetics and web performance.",
        expectations: [
            "Develop ultra-low-latency dashboards using Next.js & Framer.",
            "Maintain a type-safe brutalist component library.",
            "Optimize frontend bundle sizes for emerging market connectivity."
        ]
    },
    {
        id: "platform-sre",
        title: "Platform Engineer (SRE)",
        location: "Global / Remote",
        team: "Site Reliability",
        type: "Full-Time",
        desc: "Automate the lifecycle of thousands of bare-metal servers. Ensure the Nubis control plane remains deterministic during high volatility.",
        expectations: [
            "Scale Kubernetes control planes across 9+ regions.",
            "Implement Nix-based immutable infrastructure pipelines.",
            "Proactively identify and eliminate recursive failure modes."
        ]
    }
]

export function JobList({ onApply }: { onApply: (job: any) => void }) {
    const [search, setSearch] = useState("")

    const filteredJobs = JOBS.filter(j =>
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.team.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <section className="w-full px-6 py-20 lg:px-12 flex flex-col gap-12">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b-2 border-foreground pb-8">
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl lg:text-5xl font-mono font-bold uppercase tracking-tighter">Open Transmissions</h2>
                    <span className="text-xs font-mono text-muted-foreground uppercase">{JOBS.length} ACTIVE_REQUISITIONS</span>
                </div>

                <div className="relative w-full lg:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input
                        type="text"
                        placeholder="FILTER_BY_ROLE_OR_TEAM..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-foreground/5 border-2 border-foreground p-4 pl-12 text-xs font-mono uppercase outline-none focus:border-[#ea580c]"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredJobs.map((job) => (
                        <motion.div
                            layout
                            key={job.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="border-2 border-foreground flex flex-col lg:flex-row group hover:border-[#ea580c] transition-colors overflow-hidden"
                        >
                            <div className="flex-1 p-8 flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3">
                                        <Terminal size={14} className="text-[#ea580c]" />
                                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{job.team}</span>
                                    </div>
                                    <h3 className="text-xl lg:text-2xl font-mono font-bold uppercase tracking-tight group-hover:text-[#ea580c] transition-colors">{job.title}</h3>
                                </div>

                                <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed max-w-3xl">
                                    {job.desc}
                                </p>

                                <div className="flex flex-wrap gap-4 pt-4 border-t border-foreground/5">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={12} className="text-muted-foreground" />
                                        <span className="text-[10px] font-mono uppercase">{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Briefcase size={12} className="text-muted-foreground" />
                                        <span className="text-[10px] font-mono uppercase">{job.type}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Code size={12} className="text-muted-foreground" />
                                        <span className="text-[10px] font-mono uppercase">L3-L6+</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-80 border-t-2 lg:border-t-0 lg:border-l-2 border-foreground bg-foreground/5 p-8 flex flex-col justify-between items-start gap-8">
                                <div className="flex flex-col gap-4">
                                    <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#ea580c]">Key Deliverables</span>
                                    <ul className="flex flex-col gap-3">
                                        {job.expectations.map((exp, i) => (
                                            <li key={i} className="flex gap-3 text-[10px] font-mono leading-tight">
                                                <span className="text-[#ea580c]">&gt;</span>
                                                <span className="text-muted-foreground">{exp}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button
                                    onClick={() => onApply(job)}
                                    className="w-full bg-foreground text-background font-mono py-4 text-xs font-bold uppercase tracking-[0.2em] group-hover:bg-[#ea580c] transition-all flex items-center justify-center gap-2"
                                >
                                    Init Application <ArrowRight size={14} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    )
}
