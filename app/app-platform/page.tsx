import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AppPlatformHero } from "@/components/app-platform-hero"
import { ExperimentalNotice } from "@/components/experimental-notice"
import { AppPlatformWorkflow } from "@/components/app-platform-workflow"
import { AppPlatformFeatures } from "@/components/app-platform-features"
import { CtaSection } from "@/components/cta-section"
import { GlitchMarquee } from "@/components/glitch-marquee"

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "App Platform Alternative in Africa | Nubis Cloud",
    description: "The fastest way to deploy your Node.js, Python, and web applications in Africa. Git-to-deploy, automatic scaling, and Nigerian server proximity. Vercel/Heroku alternative.",
    keywords: ['vercel alternative africa', 'heroku alternative nigeria', 'app server hosting lagos', 'node js hosting africa', 'python hosting nigeria', 'nubis app platform'],
}

export default function AppPlatformPage() {
    return (
        <div className="min-h-screen dot-grid-bg">
            <Navbar />
            <main>
                <AppPlatformHero />
                <ExperimentalNotice />
                <AppPlatformWorkflow />
                <AppPlatformFeatures />
                <GlitchMarquee />
                <CtaSection />
            </main>
            <Footer />
        </div>
    )
}
