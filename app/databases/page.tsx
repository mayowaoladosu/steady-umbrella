import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DatabaseHero } from "@/components/database-hero"
import { DatabaseEngines } from "@/components/database-engines"
import { DatabaseSpecs } from "@/components/database-specs"
import { CtaSection } from "@/components/cta-section"
import { GlitchMarquee } from "@/components/glitch-marquee"

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Managed Cloud Databases in Nigeria & Africa | Nubis Cloud",
    description: "Enterprise-grade PostgreSQL, Redis, and MySQL hosted in Africa. Fully managed with automated backups, high availability, NVMe performance, and local data sovereignty.",
    keywords: ['managed postgresql nigeria', 'managed database africa', 'cloud mysql lagos', 'redis hosting africa', 'nubis databases', 'data sovereignty nigeria'],
}

export default function DatabasesPage() {
    return (
        <div className="min-h-screen dot-grid-bg">
            <Navbar />
            <main>
                <DatabaseHero />
                <DatabaseEngines />
                <DatabaseSpecs />
                <GlitchMarquee />
                <CtaSection />
            </main>
            <Footer />
        </div>
    )
}
