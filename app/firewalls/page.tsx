import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FirewallHero } from "@/components/firewall-hero"
import { FirewallSpecs } from "@/components/firewall-specs"
import { RuleVisualizer } from "@/components/rule-visualizer"
import { FirewallFeatures } from "@/components/firewall-features"
import { CtaSection } from "@/components/cta-section"
import { GlitchMarquee } from "@/components/glitch-marquee"

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Cloud Firewalls & Network Security Africa | Nubis Cloud",
    description: "Next-gen, stateful network protection for African cloud infrastructure. Rule orchestration and zero-latency filtering for your Nigerian servers.",
    keywords: ['cloud firewalls nigeria', 'african ddos protection', 'cloud security lagos', 'infrastructure security africa'],
}

export default function FirewallsPage() {
    return (
        <div className="min-h-screen dot-grid-bg">
            <Navbar />
            <main>
                <FirewallHero />
                <FirewallSpecs />
                <RuleVisualizer />
                <FirewallFeatures />
                <GlitchMarquee />
                <CtaSection />
            </main>
            <Footer />
        </div>
    )
}
