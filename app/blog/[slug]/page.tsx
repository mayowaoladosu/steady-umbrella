import { Metadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/blog"
import { mdxComponents } from "@/components/mdx-components"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogPostHeader } from "@/components/blog-post-header"
import { BlogTableOfContents } from "@/components/blog-toc"
import { BlogAuthorCard } from "@/components/blog-author-card"
import { BlogRelatedPosts } from "@/components/blog-related-posts"
import { CtaSection } from "@/components/cta-section"

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const slugs = getAllSlugs()
    return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const post = getPostBySlug(slug)
    if (!post) return {}

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://usenubis.com"

    return {
        title: `${post.title} | Nubis Blog`,
        description: post.excerpt,
        keywords: post.tags,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
            tags: post.tags,
            images: [
                {
                    url: post.coverImage,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: [post.coverImage],
        },
        alternates: {
            canonical: `${baseUrl}/blog/${slug}`,
        },
    }
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params
    const post = getPostBySlug(slug)

    if (!post) {
        notFound()
    }

    const relatedPosts = getRelatedPosts(slug, 3)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://usenubis.com"

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: post.coverImage.startsWith("http")
            ? post.coverImage
            : `${baseUrl}${post.coverImage}`,
        datePublished: post.date,
        author: {
            "@type": "Person",
            name: post.author,
        },
        publisher: {
            "@type": "Organization",
            name: "Nubis",
            logo: {
                "@type": "ImageObject",
                url: `${baseUrl}/images/logo/brandmark-dark.svg`,
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${baseUrl}/blog/${slug}`,
        },
        keywords: post.tags.join(", "),
        wordCount: post.content.split(/\s+/).length,
        articleSection: post.category,
    }

    return (
        <div className="min-h-screen dot-grid-bg">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />
            <main>
                <BlogPostHeader post={post} />

                {/* Article Body */}
                <div className="w-full px-6 py-12 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
                        {/* Main Content */}
                        <article className="lg:col-span-8">
                            <MDXRemote
                                source={post.content}
                                components={mdxComponents}
                                options={{
                                    mdxOptions: {
                                        rehypePlugins: [
                                            rehypeSlug,
                                            [rehypeAutolinkHeadings, { behavior: "wrap" }],
                                        ],
                                    },
                                }}
                            />

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t-2 border-foreground/10">
                                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mr-2">
                                    Tags:
                                </span>
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 border border-foreground/20 text-muted-foreground hover:border-[#ea580c] hover:text-[#ea580c] transition-colors"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <BlogAuthorCard
                                name={post.author}
                                role={post.authorRole}
                                avatar={post.authorAvatar}
                            />
                        </article>

                        {/* Sidebar */}
                        <aside className="hidden lg:block lg:col-span-4">
                            <BlogTableOfContents />
                        </aside>
                    </div>
                </div>

                <BlogRelatedPosts posts={relatedPosts} />
                <CtaSection />
            </main>
            <Footer />
        </div>
    )
}
