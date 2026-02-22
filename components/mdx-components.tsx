"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"

/* ── MDX component overrides matching Nubis brutalist design ── */

function Heading({
    level,
    children,
    ...props
}: {
    level: 1 | 2 | 3 | 4
    children: React.ReactNode
    id?: string
}) {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements
    const sizes: Record<number, string> = {
        1: "text-2xl lg:text-3xl mt-12 mb-4",
        2: "text-xl lg:text-2xl mt-10 mb-4",
        3: "text-lg lg:text-xl mt-8 mb-3",
        4: "text-base lg:text-lg mt-6 mb-2",
    }

    return (
        <Tag
            className={`font-mono font-bold uppercase tracking-tight text-foreground ${sizes[level]} group`}
            {...props}
        >
            {children}
            {props.id && (
                <a
                    href={`#${props.id}`}
                    className="ml-2 text-[#ea580c] opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                    aria-label="Link to this heading"
                >
                    #
                </a>
            )}
        </Tag>
    )
}

/* ── Callout boxes ── */
function Callout({
    type = "note",
    children,
}: {
    type?: "note" | "tip" | "warning" | "danger"
    children: React.ReactNode
}) {
    const styles: Record<string, { bg: string; border: string; label: string }> =
    {
        note: {
            bg: "bg-foreground/5",
            border: "border-foreground/20",
            label: "NOTE",
        },
        tip: {
            bg: "bg-[#ea580c]/5",
            border: "border-[#ea580c]/30",
            label: "TIP",
        },
        warning: {
            bg: "bg-yellow-500/5",
            border: "border-yellow-500/30",
            label: "WARNING",
        },
        danger: {
            bg: "bg-red-500/5",
            border: "border-red-500/30",
            label: "DANGER",
        },
    }

    const s = styles[type]

    return (
        <div className={`${s.bg} border-l-4 ${s.border} p-4 my-6`}>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#ea580c] block mb-2">
                {s.label}
            </span>
            <div className="text-sm font-mono text-foreground/80 leading-relaxed">
                {children}
            </div>
        </div>
    )
}

export const mdxComponents = {
    h1: (props: any) => <Heading level={1} {...props} />,
    h2: (props: any) => <Heading level={2} {...props} />,
    h3: (props: any) => <Heading level={3} {...props} />,
    h4: (props: any) => <Heading level={4} {...props} />,
    p: (props: any) => (
        <p
            className="text-sm font-mono text-foreground/80 leading-relaxed mb-4"
            {...props}
        />
    ),
    a: (props: any) => (
        <Link
            className="text-foreground underline underline-offset-4 decoration-[#ea580c]/40 hover:decoration-[#ea580c] hover:text-[#ea580c] transition-colors"
            {...props}
        />
    ),
    ul: (props: any) => (
        <ul
            className="list-none space-y-2 my-4 pl-0 text-sm font-mono text-foreground/80"
            {...props}
        />
    ),
    ol: (props: any) => (
        <ol
            className="list-decimal space-y-2 my-4 pl-6 text-sm font-mono text-foreground/80"
            {...props}
        />
    ),
    li: (props: any) => (
        <li className="leading-relaxed flex items-start gap-2">
            <span className="text-[#ea580c] mt-1 shrink-0">▸</span>
            <span {...props} />
        </li>
    ),
    blockquote: (props: any) => (
        <blockquote
            className="border-l-4 border-[#ea580c] pl-4 my-6 italic text-sm font-mono text-foreground/60"
            {...props}
        />
    ),
    code: (props: any) => (
        <code
            className="bg-foreground/10 text-[#ea580c] text-xs font-mono px-1.5 py-0.5 rounded-none"
            {...props}
        />
    ),
    pre: (props: any) => (
        <pre
            className="bg-foreground text-background p-6 my-6 border-2 border-foreground overflow-x-auto text-xs font-mono leading-relaxed"
            {...props}
        />
    ),
    img: ({
        src,
        alt,
        ...props
    }: {
        src?: string
        alt?: string
        [key: string]: any
    }) => (
        <figure className="my-8">
            <div className="border-2 border-foreground overflow-hidden">
                {src && (
                    <Image
                        src={src}
                        alt={alt || ""}
                        width={1200}
                        height={600}
                        className="w-full h-auto object-cover"
                    />
                )}
            </div>
            {alt && (
                <figcaption className="text-[10px] font-mono text-muted-foreground mt-2 uppercase tracking-widest">
                    {alt}
                </figcaption>
            )}
        </figure>
    ),
    table: (props: any) => (
        <div className="my-6 overflow-x-auto">
            <table
                className="w-full border-2 border-foreground text-xs font-mono"
                {...props}
            />
        </div>
    ),
    th: (props: any) => (
        <th
            className="border-2 border-foreground bg-foreground text-background px-4 py-3 text-left text-[10px] uppercase tracking-widest font-bold"
            {...props}
        />
    ),
    td: (props: any) => (
        <td
            className="border border-foreground/20 px-4 py-3 text-foreground/80"
            {...props}
        />
    ),
    hr: () => (
        <div className="my-10 flex items-center gap-4">
            <div className="flex-1 border-t-2 border-foreground/10" />
            <span className="text-[10px] font-mono text-[#ea580c] tracking-widest">
        ///
            </span>
            <div className="flex-1 border-t-2 border-foreground/10" />
        </div>
    ),
    strong: (props: any) => (
        <strong className="font-bold text-foreground" {...props} />
    ),
    em: (props: any) => (
        <em className="italic text-foreground/70" {...props} />
    ),
    Callout,
}
