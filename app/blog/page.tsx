import { Metadata } from "next"
import { getAllPosts, getCategories } from "@/lib/blog"
import { BlogPageClient } from "@/components/blog-page-client"

export const metadata: Metadata = {
    title: "Nubis Blog | Engineering, Cloud & Infrastructure Insights",
    description:
        "Engineering deep-dives, product announcements, and insights from building Africa's cloud infrastructure. Technical content on Kubernetes, databases, edge computing, and more.",
    keywords: [
        "nubis blog",
        "cloud engineering africa",
        "cloud infrastructure blog",
        "kubernetes africa",
        "african cloud provider blog",
        "cloud computing lagos",
        "aws alternative africa blog",
        "managed databases blog",
        "edge computing africa",
    ],
    openGraph: {
        title: "Nubis Blog | Engineering, Cloud & Infrastructure Insights",
        description:
            "Engineering deep-dives, product announcements, and insights from building Africa's cloud infrastructure.",
        type: "website",
        images: [
            {
                url: "/images/og-image.png",
                width: 1200,
                height: 630,
                alt: "Nubis Blog",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Nubis Blog | Engineering, Cloud & Infrastructure Insights",
        description:
            "Engineering deep-dives, product announcements, and insights from building Africa's cloud infrastructure.",
        images: ["/images/og-image.png"],
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_APP_URL || "https://usenubis.com"}/blog`,
    },
}

export default function BlogPage() {
    const posts = getAllPosts()
    const categories = getCategories()

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Nubis Blog",
        description:
            "Engineering deep-dives, product announcements, and insights from building Africa's cloud infrastructure.",
        url: `${process.env.NEXT_PUBLIC_APP_URL || "https://usenubis.com"}/blog`,
        publisher: {
            "@type": "Organization",
            name: "Nubis",
            logo: {
                "@type": "ImageObject",
                url: `${process.env.NEXT_PUBLIC_APP_URL || "https://usenubis.com"}/images/logo/brandmark-dark.svg`,
            },
        },
        blogPost: posts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.date,
            author: {
                "@type": "Person",
                name: post.author,
            },
            description: post.excerpt,
            url: `${process.env.NEXT_PUBLIC_APP_URL || "https://usenubis.com"}/blog/${post.slug}`,
        })),
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BlogPageClient posts={posts} categories={categories} />
        </>
    )
}
