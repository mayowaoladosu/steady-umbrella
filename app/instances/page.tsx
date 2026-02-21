import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { InstancesHero } from "@/components/instances-hero"
import { InstanceSpecs } from "@/components/instance-specs"
import { InstanceUseCases } from "@/components/instance-use-cases"
import { WhyBareMetal } from "@/components/why-bare-metal"
import { CtaSection } from "@/components/cta-section"
import { GlitchMarquee } from "@/components/glitch-marquee"

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Cloud VPS & Bare Metal Compute in Africa | Nubis Cloud",
    description: "High-performance cloud compute, VPS, and dedicated physical servers in Nigeria. Zero virtualization overhead, affordable latency-optimized hosting for African businesses.",
    keywords: ['cloud vps nigeria', 'bare metal server africa', 'cheap vps lagos', 'cloud compute nigeria', 'aws ec2 alternative africa'],
}

export default function InstancesPage() {
    return (
        <div className="min-h-screen dot-grid-bg">
            <Navbar />
            <main>
                <InstancesHero />
                <WhyBareMetal />
                <InstanceSpecs />
                <InstanceUseCases />
                <GlitchMarquee />
                <CtaSection />
            </main>
            <Footer />
        </div>
    )
}
