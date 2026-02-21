import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DnsHero } from "@/components/dns-hero"
import { DomainSearchVisual } from "@/components/domain-search-visual"
import { DnsSpecs } from "@/components/dns-specs"
import { DnsFeatures } from "@/components/dns-features"
import { CtaSection } from "@/components/cta-section"
import { GlitchMarquee } from "@/components/glitch-marquee"

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Global Edge DNS & Domain Registration Africa | Nubis Cloud",
    description: "Enterprise-grade name resolution on a global anycast network with edge nodes in Africa. Fast domain registration (NGN support) with instant propagation.",
    keywords: ['buy domains nigeria', 'dns hosting africa', 'anycast dns lagos', 'domain registration ngn', 'african dns provider'],
}

export default function DnsPage() {
    return (
        <div className="min-h-screen dot-grid-bg">
            <Navbar />
            <main>
                <DnsHero />
                <DomainSearchVisual />
                <DnsSpecs />
                <DnsFeatures />
                <GlitchMarquee />
                <CtaSection />
            </main>
            <Footer />
        </div>
    )
}
