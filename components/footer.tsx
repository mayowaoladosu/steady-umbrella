"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Terminal } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const FOOTER_LINKS = {
  Infrastructure: [
    { label: "Bare-Metal Compute", href: "/instances" },
    { label: "Managed Kubernetes", href: "/kubernetes" },
    { label: "App Platform", href: "/app-platform" },
    { label: "PostgreSQL & Redis", href: "/databases" },
    { label: "Cloud Firewalls", href: "/firewalls" },
    { label: "Global Edge DNS", href: "/dns" },
  ],
  Resources: [
    { label: "API Documentation", href: "https://docs.usenubis.com" },
    { label: "Pricing Calculator", href: "/pricing" },
    { label: "Status Page", href: "https://status.usenubis.com" },
    { label: "Open Source", href: "https://github.com/usenubis" },
    { label: "Changelog", href: "https://github.com/usenubis/speedy-umbrella/changelogs" },
  ],
  Company: [
    { label: "About Nubis", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Community Support", href: "/community" },
  ],
}

export function Footer() {
  return (
    <footer className="w-full relative overflow-hidden bg-background border-t-2 border-foreground pt-16 flex flex-col justify-between min-h-[500px] lg:min-h-[700px]">

      {/* Absolute Background Text Effect */}
      <div className="absolute -bottom-4 md:-bottom-8 lg:-bottom-12 left-0 w-full flex justify-center pointer-events-none z-0 overflow-hidden select-none">
        <div
          className="text-[25vw] sm:text-[22vw] lg:text-[25vw] font-serif font-bold tracking-tighter leading-none text-foreground/15 whitespace-nowrap"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
          }}
        >
          NUBIS
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 w-full px-6 lg:px-12 flex flex-col h-full grow">

        {/* Top Section: Links & Branding */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-24">

          {/* Logo & Manifesto Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo/nubis_logo_black_transparent.png"
                alt="Nubis Logo"
                width={800}
                height={200}
                className="w-36 sm:w-44 h-auto dark:hidden object-contain"
              />
              <Image
                src="/images/logo/nubis_logo_white_on_da.png"
                alt="Nubis Logo"
                width={800}
                height={200}
                className="w-36 sm:w-44 h-auto hidden dark:block object-contain"
              />
            </Link>
            <p className="text-sm font-mono text-muted-foreground w-full max-w-sm leading-relaxed">
              Bare-metal class performance with modern delivery. Deploy, route, secure, and monitor workloads globally without hidden coupling or surprise bills.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#ea580c]">
                {title}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="mt-auto border-t border-border pt-6 pb-6 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono tracking-widest uppercase font-bold text-foreground">
              NUBIS
            </span>
            <span className="text-[10px] sm:text-xs font-mono tracking-widest text-muted-foreground">
              {"(C) 2026 NUBIS CLOUD INC."}
            </span>
          </div>

          {/* Live Status Badge */}
          <iframe
            src="https://status.usenubis.com/badge?theme=light"
            width="250"
            height="30"
            frameBorder="0"
            scrolling="no"
            style={{ colorScheme: "normal" }}
            title="Nubis System Status"
          />

          <div className="flex items-center gap-6">
            <Link href="https://github.com" className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
              GITHUB
            </Link>
            <Link href="https://x.com/usenubis" className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
              TWITTER
            </Link>
            <Link href="https://linkedin.com/company/usenubis" className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
              LINKEDIN
            </Link>
          </div>
        </div>

      </div>
    </footer >
  )
}
