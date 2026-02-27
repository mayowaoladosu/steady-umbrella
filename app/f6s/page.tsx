import { Metadata } from 'next'
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowRight, Gift, Server, Rocket, Database } from "lucide-react"
import { GlitchMarquee } from "@/components/glitch-marquee"
import { FeatureGrid } from "@/components/feature-grid"
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
    title: 'Nubis & F6S Startup Program | $100 in Free Cloud Credits',
    description: 'Nubis is partnering with F6S to offer $100 in free cloud infrastructure credits to startups. Deploy your next big idea on Africa\'s premier cloud platform.',
    keywords: ['f6s offer', 'nubis credits', 'startup program', 'cloud credits', 'founder perks'],
}

export default function F6SPage() {
    return (
        <div className="min-h-screen dot-grid-bg relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ea580c] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 hidden md:block" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#ea580c] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 hidden md:block" />

            <Navbar />

            <main className="relative z-10 pt-24 pb-16">
                {/* F6S Hero Section */}
                <section className="container mx-auto px-6 pt-12 md:pt-20 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#ea580c]/20 bg-[#ea580c]/5 text-[#ea580c] text-xs font-mono font-bold tracking-widest uppercase mb-8">
                        <Gift size={14} />
                        <span>Exclusive F6S Founder Perk</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-foreground mb-6 max-w-4xl mx-auto leading-[1.1]">
                        Build your startup on <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea580c] to-amber-500">Nubis</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground font-mono max-w-2xl mx-auto mb-12 leading-relaxed">
                        We've partnered with F6S to give your startup a massive head start. Claim <span className="text-foreground font-bold border-b-2 border-[#ea580c]">$100 in free cloud credits</span> to deploy databases, containers, and web apps with zero abstraction tax.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Link href="https://console.usenubis.com/dashboard" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-sm font-mono tracking-widest uppercase font-bold bg-foreground text-background hover:bg-foreground/90 transition-all group overflow-hidden relative">
                                <span className="relative z-10 flex items-center gap-2">
                                    Claim Your Credits
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                                {/* Button shine effect */}
                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
                            </Button>
                        </Link>
                    </div>

                    <div className="bg-background/80 backdrop-blur-md border border-foreground/10 p-6 md:p-8 rounded-2xl max-w-2xl mx-auto flex flex-col items-center">
                        <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground mb-3">Your Promo Code</p>
                        <div className="bg-foreground/[0.03] border border-foreground/10 border-dashed rounded-lg px-6 py-4 flex items-center gap-4">
                            <code className="text-2xl md:text-3xl font-mono font-bold text-[#ea580c] tracking-widest">F6SSTARTUP100</code>
                        </div>
                        <p className="text-xs font-mono text-muted-foreground mt-4 text-center">
                            Sign up today and enter this code in your Billing dashboard to instantly unlock $100 in cloud credits. Valid for 1 year.
                        </p>
                    </div>
                </section>

                {/* What you can build */}
                <section className="container mx-auto px-6 py-24 border-t border-foreground/10 mt-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">What can $100 build?</h2>
                        <p className="text-sm font-mono text-muted-foreground">Premium cloud primitives to scale your startup.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto font-mono">
                        {[
                            { title: "App Platform", desc: "Run a backend API + frontend framework for 6+ months entirely free.", icon: Rocket },
                            { title: "Managed Databases", desc: "Deploy a highly available Postgres or Redis cluster for your core stack.", icon: Database },
                            { title: "Compute Instances", desc: "Spin up robust Linux servers for heavy lifting and custom workloads.", icon: Server }
                        ].map((feature, i) => (
                            <div key={i} className="bg-background/50 border border-foreground/10 p-6 rounded-xl hover:border-[#ea580c]/50 transition-colors group">
                                <div className="w-12 h-12 rounded-lg bg-foreground/[0.03] border border-foreground/10 flex items-center justify-center mb-6 group-hover:bg-[#ea580c]/10 group-hover:border-[#ea580c] transition-colors">
                                    <feature.icon size={24} className="text-foreground group-hover:text-[#ea580c] transition-colors" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <FeatureGrid />
                <GlitchMarquee />

                {/* Bottom CTA */}
                <section className="container mx-auto px-6 py-24 text-center">
                    <h2 className="text-3xl md:text-5xl font-serif font-black mb-8 text-foreground max-w-2xl mx-auto">
                        Ready to accelerate your startup?
                    </h2>
                    <Link href="https://console.usenubis.com/dashboard">
                        <Button size="lg" className="h-14 px-8 text-sm font-mono tracking-widest uppercase font-bold bg-[#ea580c] text-white hover:bg-[#ea580c]/90">
                            Apply Code F6SSTARTUP100
                        </Button>
                    </Link>
                </section>

            </main>
            <Footer />
        </div>
    )
}
