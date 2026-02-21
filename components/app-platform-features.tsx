"use client"

import { motion } from "framer-motion"
import { Shield, Globe, Terminal, Settings, Layers, Code } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const FEATURES = [
    {
        title: "Global CDN Edge",
        description: "Your assets are automatically distributed across our global network for sub-100ms latency worldwide.",
        icon: Globe,
    },
    {
        title: "Integrated SSL",
        description: "Automatic Let's Encrypt certificates for all your custom domains. Zero configuration required.",
        icon: Shield,
    },
    {
        title: "Env Management",
        description: "Inject production secrets and environment variables securely via the Nubis console or CLI.",
        icon: Settings,
    },
    {
        title: "Preview Deploys",
        description: "Get a unique URL for every pull request to test changes before they hit production.",
        icon: Layers,
    },
    {
        title: "Serverless Scale",
        description: "Your app scales from zero to thousands of instances instantly based on incoming traffic spikes.",
        icon: Code,
    },
    {
        title: "Developer CLI",
        description: "Manage your deployments, logs, and billing directly from your local terminal with nubis-cli.",
        icon: Terminal,
    }
]

export function AppPlatformFeatures() {
    return (
        <section className="w-full px-6 py-24 lg:px-12 bg-foreground/5 overflow-hidden">
            <div className="flex flex-col gap-4 mb-20">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                >
                    <span className="text-[10px] tracking-[0.2em] font-mono text-[#ea580c] uppercase">// PLATFORM_CAPABILITIES</span>
                    <div className="flex-1 border-t border-foreground/10" />
                </motion.div>
                <h2 className="text-3xl lg:text-5xl font-pixel uppercase text-foreground">Advanced toolset</h2>
                <p className="text-sm font-mono text-muted-foreground max-w-2xl leading-relaxed">
                    The App Platform isn't just for static sites. It's a full PaaS designed for modern web frameworks and high-traffic APIs.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-2 border-foreground">
                {FEATURES.map((feature, i) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className={`p-8 bg-background hover:bg-foreground/5 transition-colors group border-foreground ${(i + 1) % 3 !== 0 ? "lg:border-r-2" : ""
                            } ${i < 3 ? "border-b-2" : "md:border-b-2 lg:border-b-0"} ${(i + 1) % 2 !== 0 ? "md:border-r-2 lg:border-r-0" : ""
                            }`}
                    >
                        <div className="flex flex-col gap-6">
                            <div className="w-12 h-12 border border-foreground/20 flex items-center justify-center bg-foreground/5 group-hover:bg-[#ea580c] group-hover:border-[#ea580c] group-hover:text-background transition-colors duration-300">
                                <feature.icon size={20} strokeWidth={1.5} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-mono font-bold uppercase tracking-tight">{feature.title}</h3>
                                <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
