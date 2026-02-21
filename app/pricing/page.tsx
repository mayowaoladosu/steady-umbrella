import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PricingCalculator } from "@/components/pricing-calculator"
import { GlitchMarquee } from "@/components/glitch-marquee"
import { CtaSection } from "@/components/cta-section"

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Cloud Pricing & Calculator | Pay in NGN | Nubis Cloud",
    description: "Transparent, predictable cloud pricing. Estimate your infrastructure costs with our calculator and pay in Nigerian Naira (NGN) without fx rates.",
    keywords: ['cloud pricing nigeria', 'pay in ngn cloud', 'affordable cloud africa', 'naira cloud hosting', 'vps pricing lagos', 'aws pricing alternative'],
}

export default function PricingPage() {
    return (
        <div className="min-h-screen dot-grid-bg">
            <Navbar />
            <main>
                <div className="pt-24 min-h-screen">
                    <PricingCalculator />
                </div>
                <GlitchMarquee />
                <CtaSection />
            </main>
            <Footer />
        </div>
    )
}
