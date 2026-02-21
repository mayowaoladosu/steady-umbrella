import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PrivacyHero } from "@/components/privacy-hero"
import { PrivacyContent } from "@/components/privacy-content"
import { GlitchMarquee } from "@/components/glitch-marquee"

export const metadata = {
    title: "Privacy Policy | Nubis Cloud",
    description: "Our commitment to data sovereignty and privacy. Learn how Nubis Cloud protects your infrastructure data.",
}

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <PrivacyHero />
            <PrivacyContent />
            <GlitchMarquee
                text="DATA SOVEREIGNTY // ZERO ACCESS ENCRYPTION // NUBIS PRIVACY FOUNDRY"
                speed={15}
            />
            <Footer />
        </main>
    )
}
