"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Link from "next/link"
import { Terminal, Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen dot-grid-bg flex flex-col">
            <Navbar />

            <main className="flex-1 flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ea580c] opacity-5 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute inset-0 bg-transparent pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />

                <div className="max-w-2xl w-full relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-foreground/[0.03] border border-foreground/10 mb-8">
                            <Terminal className="w-12 h-12 text-[#ea580c]" />
                        </div>

                        <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight text-foreground uppercase mb-6">
                            Error <span className="text-[#ea580c]">404</span>
                        </h1>

                        <div className="space-y-4 mb-12">
                            <p className="text-lg md:text-xl font-mono text-muted-foreground">
                                <span className="text-[#ea580c]">&gt;</span> root@nubis:~$ locate page
                            </p>
                            <p className="text-sm md:text-base font-mono bg-foreground/[0.03] border border-foreground/10 p-4 rounded-xl inline-block">
                                locate: warning: database /var/lib/mlocate/mlocate.db' is more than 8 days old
                                <br />
                                <span className="text-red-500">Error: The requested page could not be found.</span>
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto flex items-center gap-2 bg-foreground text-background px-8 py-4 text-xs font-mono font-bold tracking-widest uppercase hover:bg-foreground/90 transition-colors"
                                >
                                    <Home size={16} />
                                    Return to Base
                                </motion.button>
                            </Link>

                            <button
                                onClick={() => window.history.back()}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-xs font-mono font-bold tracking-widest uppercase text-foreground border border-foreground/20 hover:bg-foreground/5 transition-colors"
                            >
                                <ArrowLeft size={16} />
                                Go Back
                            </button>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
