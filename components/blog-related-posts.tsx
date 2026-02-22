"use client"

import { motion } from "framer-motion"
import { BlogCard } from "@/components/blog-card"
import type { BlogPostMeta } from "@/lib/blog"

const ease = [0.22, 1, 0.36, 1] as const

interface BlogRelatedPostsProps {
    posts: BlogPostMeta[]
}

export function BlogRelatedPosts({ posts }: BlogRelatedPostsProps) {
    if (posts.length === 0) return null

    return (
        <section className="w-full px-6 py-16 lg:px-12">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease }}
                className="flex items-center gap-4 mb-8"
            >
                <span className="text-[10px] tracking-[0.2em] font-mono text-[#ea580c] uppercase">
                    {"// RELATED_ENTRIES"}
                </span>
                <div className="flex-1 border-t border-foreground/10" />
                <span className="h-2 w-2 bg-[#ea580c] animate-pulse" />
            </motion.div>

            <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease }}
                className="text-2xl lg:text-3xl font-pixel uppercase tracking-tight mb-8"
            >
                Continue Reading
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                {posts.map((post, i) => (
                    <BlogCard key={post.slug} post={post} index={i} />
                ))}
            </div>
        </section>
    )
}
