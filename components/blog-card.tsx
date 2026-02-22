"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import type { BlogPostMeta } from "@/lib/blog"

const ease = [0.22, 1, 0.36, 1] as const

interface BlogCardProps {
    post: BlogPostMeta
    index: number
    featured?: boolean
}

export function BlogCard({ post, index, featured = false }: BlogCardProps) {
    return (
        <Link href={`/blog/${post.slug}`}>
            <motion.article
                initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.08, duration: 0.6, ease }}
                className={`group flex flex-col h-full border-2 border-foreground bg-background hover:border-[#ea580c] transition-colors duration-300 ${featured ? "md:col-span-2" : ""
                    }`}
            >
                {/* Cover Image */}
                <div className={`relative overflow-hidden border-b-2 border-foreground group-hover:border-[#ea580c] transition-colors ${featured ? "aspect-[21/9]" : "aspect-[16/9]"
                    }`}>
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                        <span className="bg-[#ea580c] text-background text-[9px] font-mono font-bold uppercase tracking-[0.15em] px-2.5 py-1">
                            {post.category}
                        </span>
                    </div>

                    {/* Index number */}
                    <div className="absolute top-3 right-3">
                        <span className="bg-background/90 backdrop-blur-sm text-foreground text-[10px] font-mono px-2 py-1">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                    <h2 className={`font-mono font-bold uppercase tracking-tight text-foreground mb-3 group-hover:text-[#ea580c] transition-colors leading-tight ${featured ? "text-lg lg:text-xl" : "text-sm lg:text-base"
                        }`}>
                        {post.title}
                    </h2>

                    <p className="text-xs font-mono text-muted-foreground leading-relaxed flex-1 mb-4 line-clamp-3">
                        {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-foreground/10">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                                {new Date(post.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </span>
                            <span className="text-foreground/20">|</span>
                            <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                                <Clock size={10} />
                                {post.readingTime}
                            </span>
                        </div>

                        <motion.span
                            className="flex items-center gap-1 text-[10px] font-mono text-[#ea580c] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity"
                            whileHover={{ x: 3 }}
                        >
                            Read <ArrowRight size={12} />
                        </motion.span>
                    </div>
                </div>
            </motion.article>
        </Link>
    )
}
