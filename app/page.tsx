import { Metadata } from 'next'
import { Navbar } from "@/components/navbar"

export const metadata: Metadata = {
  title: 'NUBIS | The Best Cloud Platform in Africa & Nigeria',
  description: 'Deploy, scale, and manage your applications with Nubis, the premier cloud provider in Africa. Offering managed databases, Kubernetes, and an African App Platform alternative to Vercel/Heroku.',
  keywords: ['african cloud provider', 'cloud hosting nigeria', 'nubis cloud', 'aws alternative africa', 'cloud computing lagos'],
}
import { HeroSection } from "@/components/hero-section"
import { FeatureGrid } from "@/components/feature-grid"
import { AboutSection } from "@/components/about-section"
import { WhySection } from "@/components/why-section"
import { ServicesSection } from "@/components/services-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CtaSection } from "@/components/cta-section"
import { GlitchMarquee } from "@/components/glitch-marquee"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div className="min-h-screen dot-grid-bg">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureGrid />
        <AboutSection />
        <WhySection />
        <ServicesSection />
        <TestimonialsSection />
        <GlitchMarquee />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
