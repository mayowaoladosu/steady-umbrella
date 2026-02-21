import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about-hero"
import { AboutPhilosophy } from "@/components/about-philosophy"
import { AboutManifesto } from "@/components/about-manifesto"
import { AboutPresence } from "@/components/about-presence"
import { GlitchMarquee } from "@/components/glitch-marquee"
import { CtaSection } from "@/components/cta-section"

export const metadata = {
    title: "About Nubis | Engineering at Hyperscale",
    description: "Learn about the mission, engineering philosophy, and the team behind Nubis Cloud. Building the inspectable cloud infrastructure of the future."
}

export default function AboutPage() {
    return (
        <div className="min-h-screen dot-grid-bg">
            <Navbar />
            <main>
                <AboutHero />
                <AboutPhilosophy />
                <AboutManifesto />
                <AboutPresence />
                <GlitchMarquee />
                <CtaSection />
            </main>
            <Footer />
        </div>
    )
}
