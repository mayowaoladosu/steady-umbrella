"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import Image from "next/image"
import {
  Server, Ship, Rocket, Database, Shield, Globe,
  Calculator, BookOpen, Activity, Github, Users, FileText,
  Building2, Briefcase, Mail, Scale, Lock, Menu, X, Terminal,
  ChevronDown, ExternalLink, Cpu
} from "lucide-react"

// ─── Menu Definitions ──────────────────────────────────────────────

const PLATFORM_ITEMS = {
  compute: [
    { label: "Bare-Metal Compute", desc: "High-performance dedicated servers", href: "/instances", icon: Server },
    { label: "Managed Kubernetes", desc: "Production-grade K8s clusters", href: "/kubernetes", icon: Ship },
    { label: "App Platform", desc: "Git-push serverless deployments", href: "/app-platform", icon: Rocket },
  ],
  data: [
    { label: "Managed Databases", desc: "PostgreSQL, Redis & MySQL", href: "/databases", icon: Database },
    { label: "Cloud Firewalls", desc: "Stateful packet inspection at edge", href: "/firewalls", icon: Shield },
    { label: "Global Edge DNS", desc: "Anycast DNS & domain registration", href: "/dns", icon: Globe },
  ],
}

const RESOURCES_ITEMS = [
  { label: "API Documentation", desc: "Full REST & SDK references", href: "https://docs.usenubis.com", icon: BookOpen, external: true },
  { label: "Pricing Calculator", desc: "Estimate your infrastructure costs", href: "/pricing", icon: Calculator },
  { label: "System Status", desc: "Live uptime and incident tracking", href: "https://status.usenubis.com", icon: Activity, external: true },
  { label: "Open Source", desc: "Explore our public repositories", href: "https://github.com/usenubis", icon: Github, external: true },
  { label: "Community Hub", desc: "Discord, GitHub Discussions & more", href: "/community", icon: Users },
  { label: "Changelog", desc: "Latest platform updates", href: "https://github.com/usenubis/speedy-umbrella/changelogs", icon: FileText, external: true },
]

const COMPANY_ITEMS = [
  { label: "About Nubis", desc: "Our mission and engineering philosophy", href: "/about", icon: Building2 },
  { label: "Careers", desc: "Join the systems engineering team", href: "/careers", icon: Briefcase },
  { label: "Contact Us", desc: "Get in touch with our team", href: "/contact", icon: Mail },
  { label: "Terms of Service", desc: "Legal terms and conditions", href: "/terms", icon: Scale },
  { label: "Privacy Policy", desc: "Data protection and privacy", href: "/privacy", icon: Lock },
]

// ─── Sub-components ────────────────────────────────────────────────

function MenuLink({ item, onClick }: { item: { label: string; desc: string; href: string; icon: any; external?: boolean }; onClick?: () => void }) {
  const Icon = item.icon
  const isExternal = item.external || item.href.startsWith("http")

  const content = (
    <div className="flex items-start gap-4 p-3 -mx-3 rounded-sm group/item hover:bg-foreground/[0.04] transition-colors">
      <div className="shrink-0 p-2 border border-foreground/10 bg-foreground/[0.03] group-hover/item:border-[#ea580c]/40 group-hover/item:bg-[#ea580c]/5 transition-colors">
        <Icon size={16} className="text-muted-foreground group-hover/item:text-[#ea580c] transition-colors" />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
          {item.label}
          {isExternal && <ExternalLink size={10} className="opacity-40" />}
        </span>
        <span className="text-[11px] font-mono text-muted-foreground leading-relaxed">{item.desc}</span>
      </div>
    </div>
  )

  if (isExternal) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {content}
      </a>
    )
  }

  return (
    <Link href={item.href} onClick={onClick}>
      {content}
    </Link>
  )
}

// ─── Dropdown Panels ───────────────────────────────────────────────

function PlatformPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-8 p-6">
      <div>
        <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#ea580c] font-bold mb-4">Compute & Deploy</p>
        <div className="flex flex-col">
          {PLATFORM_ITEMS.compute.map(item => (
            <MenuLink key={item.label} item={item} onClick={onClose} />
          ))}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#ea580c] font-bold mb-4">Data & Security</p>
        <div className="flex flex-col">
          {PLATFORM_ITEMS.data.map(item => (
            <MenuLink key={item.label} item={item} onClick={onClose} />
          ))}
        </div>
      </div>
      {/* Bottom banner */}
      <div className="col-span-2 mt-2 pt-4 border-t border-foreground/10 flex items-center justify-between">
        <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">6 infrastructure primitives. Zero abstraction tax.</p>
        <Link href="/pricing" onClick={onClose} className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#ea580c] hover:underline flex items-center gap-2">
          View Pricing <Calculator size={12} />
        </Link>
      </div>
    </div>
  )
}

function ResourcesPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-6">
      <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#ea580c] font-bold mb-4">Developer Resources</p>
      <div className="grid grid-cols-2 gap-x-8">
        {RESOURCES_ITEMS.map(item => (
          <MenuLink key={item.label} item={item} onClick={onClose} />
        ))}
      </div>
    </div>
  )
}

function CompanyPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#ea580c] font-bold mb-4">About</p>
          <div className="flex flex-col">
            {COMPANY_ITEMS.slice(0, 3).map(item => (
              <MenuLink key={item.label} item={item} onClick={onClose} />
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#ea580c] font-bold mb-4">Legal</p>
          <div className="flex flex-col">
            {COMPANY_ITEMS.slice(3).map(item => (
              <MenuLink key={item.label} item={item} onClick={onClose} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Mobile Menu Items ─────────────────────────────────────────────

function MobileSection({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-foreground/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-lg font-serif font-bold tracking-tight text-foreground uppercase"
      >
        {title}
        <ChevronDown size={18} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pb-5 flex flex-col gap-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main Navbar ───────────────────────────────────────────────────

const MENU_KEYS = ["Platform", "Resources", "Company"] as const
type MenuKey = (typeof MENU_KEYS)[number]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset"
    return () => { document.body.style.overflow = "unset" }
  }, [isOpen])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const handleMenuEnter = (key: MenuKey) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveMenu(key)
  }

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 200)
  }

  const handleDropdownEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  const closeMenu = () => {
    setActiveMenu(null)
    setIsOpen(false)
  }

  const renderPanel = () => {
    switch (activeMenu) {
      case "Platform": return <PlatformPanel onClose={closeMenu} />
      case "Resources": return <ResourcesPanel onClose={closeMenu} />
      case "Company": return <CompanyPanel onClose={closeMenu} />
      default: return null
    }
  }

  return (
    <>
      <motion.div
        ref={navRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full px-4 pt-4 lg:px-6 lg:pt-6 sticky top-0 z-50 flex justify-center pointer-events-none"
      >
        <motion.div
          animate={{
            maxWidth: scrolled ? "1024px" : "1152px",
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full pointer-events-auto relative"
        >
          <motion.nav
            animate={{
              borderRadius: "24px",
              boxShadow: scrolled ? "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" : "0 4px 6px -1px rgb(0 0 0 / 0.05)"
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full border border-foreground/10 bg-background/80 backdrop-blur-xl px-6 py-3 lg:px-8 overflow-hidden"
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center relative z-50">
                <Image
                  src="/images/logo/nubis_logo_black_transparent.png"
                  alt="Nubis Logo"
                  width={800}
                  height={200}
                  className="w-28 sm:w-32 h-auto dark:hidden object-contain"
                  priority
                />
                <Image
                  src="/images/logo/nubis_logo_white_on_da.png"
                  alt="Nubis Logo"
                  width={800}
                  height={200}
                  className="w-28 sm:w-32 h-auto hidden dark:block object-contain"
                  priority
                />
              </Link>

              {/* Desktop nav links with hover dropdowns */}
              <div className="hidden md:flex items-center gap-1">
                {MENU_KEYS.map((key) => (
                  <div
                    key={key}
                    className="relative"
                    onMouseEnter={() => handleMenuEnter(key)}
                    onMouseLeave={handleMenuLeave}
                  >
                    <button
                      className={`px-4 py-2 text-xs font-mono tracking-widest uppercase transition-colors duration-200 flex items-center gap-1.5 ${activeMenu === key ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      {key}
                      <ChevronDown size={10} className={`transition-transform duration-200 ${activeMenu === key ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Right side */}
              <div className="flex items-center gap-4 relative z-50">
                <ThemeToggle />
                <a
                  href="https://console.usenubis.com"
                  className="hidden sm:block text-xs font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Log In
                </a>
                <Link href="https://console.usenubis.com/signup" className="hidden sm:block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-foreground text-background px-4 py-2 text-xs font-mono tracking-widest uppercase"
                  >
                    Sign up
                  </motion.button>
                </Link>
                <button
                  className="md:hidden flex items-center justify-center p-2 text-foreground"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Toggle menu"
                >
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </motion.nav>

          {/* Desktop Dropdown Panel */}
          <AnimatePresence>
            {activeMenu && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0, borderRadius: "24px", marginTop: "16px" }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 right-0 top-full border border-foreground/10 bg-background/95 backdrop-blur-xl shadow-2xl z-50 overflow-hidden"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleMenuLeave}
              >
                {renderPanel()}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Mobile Full-Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden px-6 pt-24 pb-8 flex flex-col overflow-y-auto"
          >
            <div className="flex flex-col mt-4">
              {/* Platform */}
              <MobileSection title="Platform" defaultOpen>
                {[...PLATFORM_ITEMS.compute, ...PLATFORM_ITEMS.data].map(item => (
                  <MenuLink key={item.label} item={item} onClick={closeMenu} />
                ))}
              </MobileSection>

              {/* Resources */}
              <MobileSection title="Resources">
                {RESOURCES_ITEMS.map(item => (
                  <MenuLink key={item.label} item={item} onClick={closeMenu} />
                ))}
              </MobileSection>

              {/* Company */}
              <MobileSection title="Company">
                {COMPANY_ITEMS.map(item => (
                  <MenuLink key={item.label} item={item} onClick={closeMenu} />
                ))}
              </MobileSection>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex flex-col gap-4 w-full mt-8 pt-8 border-t border-foreground/10"
            >
              <a
                href="https://console.usenubis.com"
                className="w-full text-center border font-mono border-foreground/20 text-foreground py-4 text-xs tracking-widest uppercase hover:bg-foreground/5 transition-colors"
                onClick={closeMenu}
              >
                Log In
              </a>
              <Link href="https://console.usenubis.com/signup" className="w-full" onClick={closeMenu}>
                <button className="w-full bg-foreground text-background py-4 text-xs font-mono tracking-widest uppercase">
                  Sign up
                </button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
