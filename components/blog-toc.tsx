"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface TocItem {
    id: string
    text: string
    level: number
}

export function BlogTableOfContents() {
    const [headings, setHeadings] = useState<TocItem[]>([])
    const [activeId, setActiveId] = useState<string>("")

    useEffect(() => {
        const elements = Array.from(
            document.querySelectorAll("article h2, article h3")
        )
        const items: TocItem[] = elements.map((el) => ({
            id: el.id,
            text: el.textContent || "",
            level: el.tagName === "H2" ? 2 : 3,
        }))
        setHeadings(items)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: "-80px 0px -80% 0px" }
        )

        const elements = document.querySelectorAll("article h2, article h3")
        elements.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [headings])

    if (headings.length === 0) return null

    return (
        <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="sticky top-32"
        >
            <div className="border-2 border-foreground/10 p-5">
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#ea580c] mb-4">
                    Table of Contents
                </h4>
                <div className="flex flex-col gap-1">
                    {headings.map((heading) => (
                        <a
                            key={heading.id}
                            href={`#${heading.id}`}
                            onClick={(e) => {
                                e.preventDefault()
                                document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" })
                            }}
                            className={`text-[11px] font-mono leading-relaxed py-1 transition-all border-l-2 ${heading.level === 3 ? "pl-5" : "pl-3"
                                } ${activeId === heading.id
                                    ? "border-[#ea580c] text-foreground font-bold"
                                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-foreground/30"
                                }`}
                        >
                            {heading.text}
                        </a>
                    ))}
                </div>
            </div>

            {/* Progress line */}
            <div className="mt-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-[#ea580c] animate-pulse" />
                <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
                    Reading in Progress
                </span>
            </div>
        </motion.nav>
    )
}
