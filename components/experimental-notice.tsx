"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Lightbulb, UserCheck } from "lucide-react"

export function ExperimentalNotice() {
    return (
        <section className="w-full px-6 py-12 lg:px-12 bg-[#ea580c]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-2 border-background p-8">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-background flex items-center justify-center shrink-0">
                        <AlertTriangle size={32} className="text-[#ea580c]" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-pixel text-background uppercase leading-tight">Experimental Feature</h2>
                        <p className="text-sm font-mono text-background/80 max-w-xl">
                            App Platform is currently in closed beta. Some features may be unstable or subject
                            to change as we finalize the production API. Your feedback is critical.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 w-full md:w-fit">
                    <div className="flex items-center gap-3 text-background/90 font-mono text-xs uppercase tracking-widest px-4 py-2 border border-background/20 bg-background/5">
                        <Lightbulb size={14} />
                        <span>Active Development</span>
                    </div>
                    <div className="flex items-center gap-3 text-background/90 font-mono text-xs uppercase tracking-widest px-4 py-2 border border-background/20 bg-background/5">
                        <UserCheck size={14} />
                        <span>Early Access Only</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
