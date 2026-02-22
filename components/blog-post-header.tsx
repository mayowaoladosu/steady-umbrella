"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, User } from "lucide-react"
import type { BlogPost } from "@/lib/blog"

const ease = [0.22, 1, 0.36, 1] as const

interface BlogPostHeaderProps {
    post: BlogPost
}

export function BlogPostHeader({ post }: BlogPostHeaderProps) {
    return (
        <section className="w-full px-6 pt-32 pb-0 lg:px-12 lg:pt-40">
            {/* Breadcrumb */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease }}
                className="flex items-center gap-2 mb-8"
            >
                <Link
                    href="/blog"
                    className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-[#ea580c] transition-colors"
                >
                    <ArrowLeft size={12} />
                    Blog
                </Link>
                <span className="text-muted-foreground/40">/</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ea580c]">
                    {post.category}
                </span>
            </motion.div>

            {/* Category Badge */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease }}
                className="mb-4"
            >
                <span className="bg-[#ea580c] text-background text-[9px] font-mono font-bold uppercase tracking-[0.15em] px-2.5 py-1">
                    {post.category}
                </span>
            </motion.div>

            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.15, ease }}
                className="text-3xl md:text-5xl lg:text-6xl font-pixel uppercase tracking-tight leading-none text-foreground mb-6 max-w-4xl"
            >
                {post.title}
            </motion.h1>

            {/* Excerpt */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25, ease }}
                className="text-sm lg:text-base font-mono text-muted-foreground max-w-2xl leading-relaxed mb-8"
            >
                {post.excerpt}
            </motion.p>

            {/* Author & Meta Row */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease }}
                className="flex flex-wrap items-center gap-6 pb-8 border-b-2 border-foreground/10"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border-2 border-foreground bg-foreground/10 flex items-center justify-center">
                        {post.authorAvatar ? (
                            <Image
                                src={post.authorAvatar}
                                alt={post.author}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User size={16} className="text-muted-foreground" />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-mono font-bold uppercase">{post.author}</span>
                        {post.authorRole && (
                            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                                {post.authorRole}
                            </span>
                        )}
                    </div>
                </div>

                <span className="text-foreground/10">|</span>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                    <Calendar size={12} />
                    {new Date(post.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                    <Clock size={12} />
                    {post.readingTime}
                </div>
            </motion.div>

            {/* Cover Image */}
            {post.coverImage && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.4, ease }}
                    className="relative w-full aspect-[21/9] border-2 border-foreground overflow-hidden mt-8 group"
                >
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />

                    <div className="absolute bottom-3 left-3 z-10">
                        <span className="text-[10px] font-mono bg-background/90 backdrop-blur-sm px-2 py-1 uppercase tracking-widest text-[#ea580c]">
                            COVER_IMAGE: LOADED
                        </span>
                    </div>
                </motion.div>
            )}
        </section>
    )
}
