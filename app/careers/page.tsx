"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CareerHero } from "@/components/career-hero"
import { JobList } from "@/components/job-list"
import { CareerBenefits } from "@/components/career-benefits"
import { ApplicationModal } from "@/components/application-modal"
import { GlitchMarquee } from "@/components/glitch-marquee"
import { CtaSection } from "@/components/cta-section"

export default function CareersPage() {
    const [selectedJob, setSelectedJob] = useState<any>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleApply = (job: any) => {
        setSelectedJob(job)
        setIsModalOpen(true)
    }

    return (
        <div className="min-h-screen dot-grid-bg">
            <Navbar />
            <main>
                <CareerHero />
                <JobList onApply={handleApply} />
                <CareerBenefits />
                <GlitchMarquee />
                <CtaSection />
            </main>
            <Footer />

            {selectedJob && (
                <ApplicationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    job={selectedJob}
                />
            )}
        </div>
    )
}
