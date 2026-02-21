import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TermsHero } from "@/components/terms-hero"
import { TermsContent } from "@/components/terms-content"
import { GlitchMarquee } from "@/components/glitch-marquee"
import { CtaSection } from "@/components/cta-section"

export const metadata = {
    title: "Terms of Service | Nubis Cloud Foundry",
    description: "Enterprise-grade Terms of Service for Nubis Cloud Foundry. Service protocols, data sovereignty, and operational standards."
}

export default function TermsPage() {
    return (
        <div className="min-h-screen dot-grid-bg">
            <Navbar />
            <main>
                <TermsHero />
                <TermsContent />
                <GlitchMarquee />
                <CtaSection />
            </main>
            <Footer />
        </div>
    )
}
