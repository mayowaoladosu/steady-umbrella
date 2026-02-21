import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CommunityHero } from "@/components/community-hero"
import { CommunityContent } from "@/components/community-content"
import { GlitchMarquee } from "@/components/glitch-marquee"

export const metadata = {
    title: "Community Support | Nubis Cloud Hub",
    description: "Connect with the Nubis Cloud engineering community. Join our Discord, contribute on GitHub, and shape the future of cloud computing.",
}

export default function CommunityPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <CommunityHero />
            <CommunityContent />
            <GlitchMarquee
                text="COLLABORATIVE ENGINEERING // THE FOUNDRY NETWORK // OPEN INFRASTRUCTURE"
                speed={12}
            />
            <Footer />
        </main>
    )
}
