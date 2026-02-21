import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactHero } from "@/components/contact-hero"
import { ContactForm } from "@/components/contact-form"
import { SupportDetails } from "@/components/support-details"
import { GlitchMarquee } from "@/components/glitch-marquee"
import { CtaSection } from "@/components/cta-section"

export const metadata = {
    title: "Contact Us | Nubis Cloud Foundry",
    description: "Get in touch with the Nubis Cloud engineering team for technical support, partnerships, and corporate inquiries."
}

export default function ContactPage() {
    return (
        <div className="min-h-screen dot-grid-bg">
            <Navbar />
            <main>
                <ContactHero />
                <section className="w-full px-6 py-20 lg:px-12">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                        <ContactForm />
                        <SupportDetails />
                    </div>
                </section>
                <GlitchMarquee />
                <CtaSection />
            </main>
            <Footer />
        </div>
    )
}
