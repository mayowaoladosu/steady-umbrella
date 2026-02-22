"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogHero } from "@/components/blog-hero"
import { BlogCard } from "@/components/blog-card"
import { CtaSection } from "@/components/cta-section"
import type { BlogPostMeta } from "@/lib/blog"

interface BlogPageClientProps {
    posts: BlogPostMeta[]
    categories: string[]
}

export function BlogPageClient({ posts, categories }: BlogPageClientProps) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null)

    const filteredPosts = activeCategory
        ? posts.filter((p) => p.category === activeCategory)
        : posts

    return (
        <div className="min-h-screen dot-grid-bg">
            <Navbar />
            <main>
                <BlogHero
                    postCount={posts.length}
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />

                {/* Posts Grid */}
                <section className="w-full px-6 pb-20 lg:px-12">
                    {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                            {filteredPosts.map((post, i) => (
                                <BlogCard
                                    key={post.slug}
                                    post={post}
                                    index={i}
                                    featured={i === 0 && !activeCategory}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="border-2 border-foreground/10 p-16 text-center">
                            <span className="text-sm font-mono text-muted-foreground">
                                No posts found in this category.
                            </span>
                        </div>
                    )}
                </section>

                <CtaSection />
            </main>
            <Footer />
        </div>
    )
}
