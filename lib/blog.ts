import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

export interface BlogPost {
    slug: string
    title: string
    date: string
    author: string
    authorRole?: string
    authorAvatar?: string
    category: string
    tags: string[]
    excerpt: string
    coverImage: string
    readingTime: string
    content: string
    featured?: boolean
}

export interface BlogPostMeta extends Omit<BlogPost, "content"> { }

function parseMdxFile(filePath: string): BlogPost {
    const raw = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(raw)
    const stats = readingTime(content)

    return {
        slug: data.slug || path.basename(filePath, ".mdx"),
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString(),
        author: data.author || "Nubis Team",
        authorRole: data.authorRole,
        authorAvatar: data.authorAvatar,
        category: data.category || "Engineering",
        tags: data.tags || [],
        excerpt: data.excerpt || "",
        coverImage: data.coverImage || "/images/blog/default-cover.png",
        readingTime: stats.text,
        content,
        featured: data.featured || false,
    }
}

export function getAllPosts(): BlogPostMeta[] {
    if (!fs.existsSync(BLOG_DIR)) return []

    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))

    const posts = files.map((file) => {
        const post = parseMdxFile(path.join(BLOG_DIR, file))
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { content, ...meta } = post
        return meta
    })

    return posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
}

export function getPostBySlug(slug: string): BlogPost | null {
    if (!fs.existsSync(BLOG_DIR)) return null

    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))

    for (const file of files) {
        const post = parseMdxFile(path.join(BLOG_DIR, file))
        if (post.slug === slug) return post
    }

    return null
}

export function getCategories(): string[] {
    const posts = getAllPosts()
    const categories = new Set(posts.map((p) => p.category))
    return Array.from(categories).sort()
}

export function getRelatedPosts(
    currentSlug: string,
    count = 3
): BlogPostMeta[] {
    const current = getPostBySlug(currentSlug)
    if (!current) return []

    const allPosts = getAllPosts().filter((p) => p.slug !== currentSlug)

    // Score by overlapping tags
    const scored = allPosts.map((post) => {
        const overlap = post.tags.filter((t) => current.tags.includes(t)).length
        const sameCategory = post.category === current.category ? 2 : 0
        return { post, score: overlap + sameCategory }
    })

    scored.sort((a, b) => b.score - a.score)

    return scored.slice(0, count).map((s) => s.post)
}

export function getAllSlugs(): string[] {
    if (!fs.existsSync(BLOG_DIR)) return []

    return fs
        .readdirSync(BLOG_DIR)
        .filter((f) => f.endsWith(".mdx"))
        .map((file) => {
            const post = parseMdxFile(path.join(BLOG_DIR, file))
            return post.slug
        })
}
