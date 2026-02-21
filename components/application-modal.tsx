"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Loader2, CheckCircle2 } from "lucide-react"

export function ApplicationModal({
    isOpen,
    onClose,
    job
}: {
    isOpen: boolean
    onClose: () => void
    job: any
}) {
    const [step, setStep] = useState(1) // 1: Form, 2: Loading, 3: Success
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        links: "",
        motivation: ""
    })
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStep(2)
        setError(null)

        try {
            const res = await fetch("/api/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    role: job.title
                })
            })

            if (res.ok) {
                setStep(3)
            } else {
                const data = await res.json()
                setError(data.error || "Application failed to sync. Please try again.")
                setStep(1)
            }
        } catch (err) {
            setError("Network error. Please verify your connection.")
            setStep(1)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/80 backdrop-blur-md z-[100]"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-2xl bg-background border-l-2 border-foreground z-[101] shadow-2xl p-8 lg:p-12 overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-mono text-[#ea580c] uppercase font-bold tracking-widest">// APPLICATION_PANEL</span>
                                <span className="text-xs font-mono text-muted-foreground uppercase">{job.id}</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-3 border-2 border-foreground hover:bg-[#ea580c] hover:text-background transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {step === 1 && (
                            <div className="flex flex-col gap-12">
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-3xl font-mono font-bold uppercase tracking-tighter">Apply for {job.title}</h2>
                                    <p className="text-xs font-mono text-muted-foreground">Engineering team review priority: HIGH</p>
                                </div>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-mono uppercase font-bold">Candidate_Name</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="FULL_NAME"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="bg-foreground/5 border-2 border-foreground p-4 text-xs font-mono outline-none focus:border-[#ea580c]"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] font-mono uppercase font-bold">Email_Endpoint</label>
                                            <input
                                                required
                                                type="email"
                                                placeholder="EMAIL_ADDRESS"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="bg-foreground/5 border-2 border-foreground p-4 text-xs font-mono outline-none focus:border-[#ea580c]"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-mono uppercase font-bold">Portfolio / GitHub / Resume Link</label>
                                        <input
                                            required
                                            type="url"
                                            placeholder="HTTPS://..."
                                            value={formData.links}
                                            onChange={(e) => setFormData({ ...formData, links: e.target.value })}
                                            className="bg-foreground/5 border-2 border-foreground p-4 text-xs font-mono outline-none focus:border-[#ea580c]"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-mono uppercase font-bold">System Motivation & Core Competencies</label>
                                        <textarea
                                            required
                                            rows={6}
                                            placeholder="Why Nubis? What complex systems have you built?"
                                            value={formData.motivation}
                                            onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                                            className="bg-foreground/5 border-2 border-foreground p-4 text-xs font-mono outline-none focus:border-[#ea580c] resize-none"
                                        />
                                    </div>

                                    {error && (
                                        <div className="p-4 border-2 border-red-500 bg-red-500/5 text-red-500 text-[10px] font-mono uppercase">
                                            ERROR: {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="w-full bg-foreground text-background font-mono py-5 text-sm font-bold uppercase tracking-[0.3em] hover:bg-[#ea580c] transition-all flex items-center justify-center gap-3"
                                    >
                                        Transmit Application <Send size={18} />
                                    </button>
                                </form>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
                                <Loader2 className="w-12 h-12 text-[#ea580c] animate-spin" strokeWidth={3} />
                                <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] animate-pulse">Syncing with Nubis Talent Registry...</span>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="h-[60vh] flex flex-col items-center justify-center text-center gap-8">
                                <div className="w-20 h-20 bg-[#ea580c]/10 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-10 h-10 text-[#ea580c]" />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <h3 className="text-4xl font-mono font-bold uppercase tracking-tighter">Transmission Successful</h3>
                                    <p className="max-w-xs text-sm font-mono text-muted-foreground mx-auto">
                                        Your application has been received and indexed by our core foundry team. Check your email for confirmation.
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="border-2 border-foreground px-12 py-4 text-xs font-mono font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-all"
                                >
                                    Close Panel
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
