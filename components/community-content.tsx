"use client"

import { motion } from "framer-motion"
import { MessageSquare, Github, Twitter, BookOpen, Terminal, Share2 } from "lucide-react"

const CHANNELS = [
    {
        icon: MessageSquare,
        title: "Discord Server",
        tag: "Real-time",
        desc: "Join the live engineering chat. Troubleshooting, architecture deep-dives, and platform feedback.",
        link: "https://discord.gg/usenubis",
        color: "#5865F2"
    },
    {
        icon: Github,
        title: "GitHub Discussions",
        tag: "Open Source",
        desc: "The primary hub for RFCs, feature requests, and technical brainstorming. Shape the roadmap.",
        link: "https://github.com/usenubis/feedback",
        color: "#ffffff"
    },
    {
        icon: Twitter,
        title: "X (Twitter)",
        tag: "News",
        desc: "Real-time updates, engineering blogs, and system announcements. Follow for the latest benchmarks.",
        link: "https://x.com/usenubis",
        color: "#000000"
    },
    {
        icon: BookOpen,
        title: "Community Docs",
        tag: "Guides",
        desc: "User-contributed guides and specialized deployment templates for complex infrastructure.",
        link: "https://docs.usenubis.com/community",
        color: "#ea580c"
    }
]

export function CommunityContent() {
    return (
        <section className="w-full px-6 py-24 lg:px-12 bg-background">
            <div className="max-w-6xl mx-auto flex flex-col gap-16">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 border-b-2 border-foreground pb-8">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-3xl font-serif font-bold tracking-tighter uppercase italic">Primary Channels</h2>
                        <p className="text-sm font-mono text-muted-foreground max-w-md">
                            Secure routes to our engineering ecosystem. Choose your preferred communication protocol.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest uppercase opacity-60">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            All Systems Operational
                        </span>
                    </div>
                </div>

                {/* Channels Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {CHANNELS.map((ch, i) => (
                        <motion.a
                            key={ch.title}
                            href={ch.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative border-2 border-foreground bg-card hover:bg-[#ea580c]/5 transition-all p-8 flex flex-col gap-6 overflow-hidden"
                        >
                            {/* Decorative Icon in background */}
                            <ch.icon className="absolute -bottom-8 -right-8 w-32 h-32 opacity-[0.03] group-hover:rotate-12 transition-transform" />

                            <div className="flex items-start justify-between">
                                <div className="p-4 border-2 border-foreground bg-foreground text-background group-hover:bg-[#ea580c] group-hover:text-white transition-colors">
                                    <ch.icon className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-mono font-bold tracking-[0.2em] border border-foreground/20 px-3 py-1 uppercase">
                                    {ch.tag}
                                </span>
                            </div>

                            <div className="flex flex-col gap-2 relative z-10">
                                <h3 className="text-xl font-serif font-bold tracking-tighter uppercase italic">{ch.title}</h3>
                                <p className="text-sm font-mono text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                                    {ch.desc}
                                </p>
                            </div>

                            <div className="mt-4 flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#ea580c] group-hover:translate-x-2 transition-transform">
                                Connect now <Terminal className="w-4 h-4" />
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Engineering Lab Placeholder/Concept */}
                <div className="mt-12 p-12 border-2 border-foreground bg-foreground text-background flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group">
                    <Share2 className="absolute -right-12 top-0 w-64 h-64 opacity-5" />

                    <div className="flex flex-col gap-4 flex-1">
                        <h2 className="text-4xl font-serif font-bold tracking-tighter uppercase italic italic-accent">Showcase Your Stack</h2>
                        <p className="text-sm font-mono opacity-80 leading-relaxed">
                            Built something unique on Nubis? We showcase community-driven infrastructure.
                            Submit your architecture diagrams and deployment scripts to be featured in the Nubis Foundry Showcase.
                        </p>
                    </div>

                    <button className="px-8 py-4 bg-[#ea580c] hover:bg-white hover:text-[#ea580c] transition-all text-sm font-mono font-bold uppercase tracking-widest shrink-0 border-2 border-transparent hover:border-[#ea580c]">
                        Submit Architecture
                    </button>
                </div>
            </div>
        </section>
    )
}
