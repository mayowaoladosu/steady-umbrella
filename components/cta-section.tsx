"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
    return (
        <section className="w-full py-20 lg:py-32 px-6 lg:px-12 bg-background border-y-2 border-foreground flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-foreground uppercase mb-10 leading-[1.1] max-w-4xl">
                Zero Latency. Zero Lock-in.<br />
                Reclaim your infrastructure.
            </h2>

            <Link href="https://console.usenubis.com/sign-up">
                <button className="group bg-foreground text-background px-8 py-4 flex items-center justify-center gap-3 transition-colors hover:bg-[#ea580c] hover:text-white border-2 border-transparent">
                    <span className="font-mono text-sm font-bold tracking-widest uppercase">
                        [ INITIALIZE_PROJECT ]
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
            </Link>
        </section>
    )
}
