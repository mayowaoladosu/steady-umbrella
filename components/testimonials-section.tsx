"use client"

import { motion } from "framer-motion"
import { Marquee } from "@/components/ui/marquee"

const ease = [0.22, 1, 0.36, 1] as const

const TESTIMONIALS = [
    {
        quote: "Migrating our core databases to Nubis cut our latency in half across West Africa. The bare-metal performance is totally unmatched.",
        author: "Lead DevOps, FinTech Startup"
    },
    {
        quote: "Finally, deterministic pricing for cloud compute. We completely dropped AWS and our infrastructure bill dropped by 60% without sacrificing reliability.",
        author: "CTO, E-Commerce Platform"
    },
    {
        quote: "The managed Kubernetes service is rock solid. We auto-scale to thousands of containers during peak hours without a single dropped packet.",
        author: "VP Engineering, SaaS Provider"
    },
    {
        quote: "Nubis provides the localized routing and raw IOPS we desperately needed to run our real-time fraud detection systems at scale.",
        author: "Head of Infrastructure, Banking Platform"
    },
    {
        quote: "Unbelievable support and provisioning speed. It genuinely feels like having our own private data center, without any of the operational headache.",
        author: "Systems Architect, Logistics Corp"
    },
    {
        quote: "The object storage performance is phenomenal. We serve terabytes of video assets daily with near-zero latency variations across the global edge.",
        author: "Backend Lead, Media Network"
    },
    {
        quote: "Deploying from Git to the serverless App Platform took 45 seconds. They handle the builds and routing so we can just focus on shipping code.",
        author: "Senior Developer, Rapid Prototyping"
    },
    {
        quote: "The cloud firewalls and automated backups give our enterprise clients the security guarantees they demand. Robust, compliant, and insanely fast.",
        author: "Security Director, HealthTech"
    },
    {
        quote: "We moved 400 microservices over to Nubis VMs. The network isolation and sub-millisecond internal routing is exactly what distributed systems need.",
        author: "Platform Engineer, Payment Gateway"
    },
    {
        quote: "No opaque bandwidth fees. Just raw, unfettered compute power. It's the exact infrastructure missing from the modern cloud ecosystem.",
        author: "Founder, AI Inference Lab"
    }
]

export function TestimonialsSection() {
    return (
        <section className="w-full py-12 pb-24 lg:pb-32 overflow-hidden border-t-2 border-foreground mt-12 bg-background">
            {/* Section label */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease }}
                className="flex items-center gap-4 mb-12 px-6 lg:px-12"
            >
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                    {"// SECTION: REVIEWS"}
                </span>
                <div className="flex-1 border-t border-border" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
                    008
                </span>
            </motion.div>

            {/* Marquee Wrapper */}
            <div className="relative border-y-2 border-foreground bg-background py-8 flex flex-col items-center justify-center overflow-hidden w-full">
                {/* MagicUI Marquee */}
                <Marquee pauseOnHover className="[--duration:60s] w-full">
                    {TESTIMONIALS.map((t, index) => (
                        <div
                            key={index}
                            className="relative flex flex-col justify-between p-6 lg:p-8 w-[350px] md:w-[450px] shrink-0 mx-4 border-2 border-foreground bg-background"
                        >
                            <div className="mb-6 h-[80px]">
                                <span className="text-xl leading-none text-[#ea580c] font-serif block italic mb-2">"</span>
                                <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed line-clamp-3">
                                    {t.quote}
                                </p>
                            </div>
                            <div className="flex items-center gap-3 pt-4 border-t border-border">
                                <span className="h-2 w-2 bg-foreground" />
                                <p className="text-[10px] lg:text-xs font-mono font-bold uppercase tracking-tight text-foreground">
                                    {t.author}
                                </p>
                            </div>
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    )
}
