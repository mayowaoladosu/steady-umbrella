import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { KubernetesHero } from "@/components/kubernetes-hero"
import { KubernetesSpecs } from "@/components/kubernetes-specs"
import { WhyNubisKubernetes } from "@/components/why-nubis-kubernetes"
import { KubernetesUseCases } from "@/components/kubernetes-use-cases"
import { CtaSection } from "@/components/cta-section"
import { GlitchMarquee } from "@/components/glitch-marquee"

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Managed Kubernetes Hosting in Africa | Nubis Cloud",
    description: "Production-ready, fully managed Kubernetes clusters in Nigeria. Zero-config control plane, integrated security, and localized routing for African scale-ups.",
    keywords: ['managed kubernetes africa', 'k8s hosting nigeria', 'kubernetes cluster lagos', 'cloud native africa', 'managed kubernetes provider'],
}

export default function KubernetesPage() {
    return (
        <div className="min-h-screen dot-grid-bg">
            <Navbar />
            <main>
                <KubernetesHero />
                <WhyNubisKubernetes />
                <KubernetesSpecs />
                <KubernetesUseCases />
                <GlitchMarquee />
                <CtaSection />
            </main>
            <Footer />
        </div>
    )
}
