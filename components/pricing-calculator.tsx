"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Server,
    Database,
    Layers,
    HardDrive,
    Globe,
    Cpu,
    Zap,
    ChevronRight,
    Calculator,
    Plus,
    Trash2,
    RefreshCw
} from "lucide-react"
import { useExchangeRates } from "@/hooks/use-exchange-rates"

const ease = [0.22, 1, 0.36, 1] as const

/* ── CONSTANTS & FORMULAS (BACKEND SYNCED) ── */
const MARKUP_COMPUTE = 1.20 // 20%
const MARKUP_SERVICE = 1.15 // 15%

const INSTANCE_SIZES = [
    { slug: "s-1vcpu-1gb", name: "Entry", vcpu: 1, ram: 1, disk: 25, price: 6 },
    { slug: "s-1vcpu-2gb", name: "Standard", vcpu: 1, ram: 2, disk: 50, price: 12 },
    { slug: "s-2vcpu-4gb", name: "Performance", vcpu: 2, ram: 4, disk: 80, price: 24 },
    { slug: "s-4vcpu-8gb", name: "Pro", vcpu: 4, ram: 8, disk: 160, price: 48 },
    { slug: "g-2vcpu-8gb", name: "Compute Dedicated", vcpu: 2, ram: 8, disk: 25, price: 60 },
]

const DB_ENGINES = ["PostgreSQL", "MySQL", "Redis", "MongoDB"]
const STORAGE_PRICE_PER_GB = 0.10 // $0.10/GB
const LB_SIZES = [
    { id: "lb-small", name: "Small", price: 12 },
    { id: "lb-medium", name: "Medium", price: 24 },
    { id: "lb-large", name: "Large", price: 48 },
]

export function PricingCalculator() {
    const { convert, format, rates, loading } = useExchangeRates()
    const [currency, setCurrency] = useState("USD")
    const [items, setItems] = useState<any[]>([])
    const [activeTab, setActiveTab] = useState("instances")

    // Form states
    const [selectedInstance, setSelectedInstance] = useState(INSTANCE_SIZES[0])
    const [instanceCount, setInstanceCount] = useState(1)

    const [dbEngine, setDbEngine] = useState("PostgreSQL")
    const [dbStorage, setDbStorage] = useState(10)
    const [dbNodes, setDbNodes] = useState(1)

    const [storageGb, setStorageGb] = useState(100)

    const [lbSize, setLbSize] = useState(LB_SIZES[0])

    const currencies = Object.keys(rates.rates)

    const addItem = (type: string, name: string, basePrice: number, details: string) => {
        setItems([...items, { id: Math.random().toString(36).substr(2, 9), type, name, basePrice, details }])
    }

    const removeItem = (id: string) => {
        setItems(items.filter(i => i.id !== id))
    }

    const totalPriceUsd = useMemo(() => {
        return items.reduce((sum, item) => sum + item.basePrice, 0)
    }, [items])

    return (
        <section className="w-full px-6 py-20 lg:px-12 bg-background min-h-[800px]">
            <div className="flex flex-col gap-4 mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4"
                >
                    <span className="text-[10px] tracking-[0.2em] font-mono text-[#ea580c] uppercase">// FINANCIAL_ESTIMATOR_v2</span>
                    <div className="flex-1 border-t border-foreground/10" />
                </motion.div>

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl lg:text-6xl font-pixel uppercase">Pricing Calculator</h1>
                        <p className="text-sm font-mono text-muted-foreground max-w-xl">
                            Estimate your monthly cloud infrastructure costs with industrial precision.
                            All calculations include Nubis edge markup and SLA guarantees.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 min-w-[200px]">
                        <span className="text-[10px] font-mono uppercase text-muted-foreground">Select Display Currency</span>
                        <div className="grid grid-cols-4 gap-1 border-2 border-foreground p-1 bg-foreground/5">
                            {["USD", "NGN", "KES", "EUR"].map((curr) => (
                                <button
                                    key={curr}
                                    onClick={() => setCurrency(curr)}
                                    className={`py-2 text-[10px] font-mono transition-colors ${currency === curr ? "bg-[#ea580c] text-background" : "hover:bg-foreground/10"
                                        }`}
                                >
                                    {curr}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column: Configurator */}
                <div className="lg:col-span-8 flex flex-col gap-8">
                    {/* Tabs */}
                    <div className="grid grid-cols-4 border-2 border-foreground">
                        {[
                            { id: "instances", label: "COMPUTE", icon: Server },
                            { id: "databases", label: "DATABASES", icon: Database },
                            { id: "storage", label: "STORAGE", icon: HardDrive },
                            { id: "networking", label: "NETWORK", icon: Globe },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 flex flex-col items-center gap-2 border-r-2 last:border-r-0 border-foreground transition-all ${activeTab === tab.id ? "bg-foreground text-background" : "hover:bg-foreground/5"
                                    }`}
                            >
                                <tab.icon size={18} />
                                <span className="text-[10px] font-mono uppercase tracking-[0.1em]">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Config Panels */}
                    <div className="border-2 border-foreground p-8 bg-background relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Calculator size={120} strokeWidth={0.5} />
                        </div>

                        <AnimatePresence mode="wait">
                            {activeTab === "instances" && (
                                <motion.div
                                    key="instances"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex flex-col gap-8"
                                >
                                    <div className="flex flex-col gap-4">
                                        <label className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest">Select Plan Size</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {INSTANCE_SIZES.map((size) => (
                                                <button
                                                    key={size.slug}
                                                    onClick={() => setSelectedInstance(size)}
                                                    className={`p-4 border-2 text-left flex flex-col gap-2 transition-all ${selectedInstance.slug === size.slug
                                                            ? "border-[#ea580c] bg-[#ea580c]/5"
                                                            : "border-foreground/10 hover:border-foreground/30"
                                                        }`}
                                                >
                                                    <span className="text-xs font-mono font-bold uppercase">{size.name} ({size.slug})</span>
                                                    <span className="text-[10px] font-mono text-muted-foreground">
                                                        {size.vcpu} vCPU / {size.ram}GB RAM / {size.disk}GB SSD
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className="flex-1 flex flex-col gap-4">
                                            <label className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest">Quantity</label>
                                            <input
                                                type="range" min="1" max="100" value={instanceCount}
                                                onChange={(e) => setInstanceCount(parseInt(e.target.value))}
                                                className="accent-[#ea580c]"
                                            />
                                            <div className="flex justify-between items-center bg-foreground/5 px-4 py-2 border border-foreground/10">
                                                <span className="text-xs font-mono">{instanceCount} Nodes</span>
                                                <span className="text-xs font-mono font-bold">{format(convert(selectedInstance.price * instanceCount * MARKUP_COMPUTE, currency), currency)}/mo</span>
                                            </div>
                                        </div>

                                        <div className="flex items-end">
                                            <button
                                                onClick={() => addItem("instance", `Instance: ${selectedInstance.name}`, selectedInstance.price * instanceCount * MARKUP_COMPUTE, `${instanceCount}x ${selectedInstance.slug}`)}
                                                className="bg-foreground text-background px-8 py-3 text-xs font-mono uppercase tracking-widest hover:bg-[#ea580c] transition-colors"
                                            >
                                                Add to Estimate
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "databases" && (
                                <motion.div
                                    key="databases"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex flex-col gap-8"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="flex flex-col gap-4">
                                            <label className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest">Engine</label>
                                            <select
                                                value={dbEngine}
                                                onChange={(e) => setDbEngine(e.target.value)}
                                                className="bg-background border-2 border-foreground p-3 text-xs font-mono uppercase outline-none focus:border-[#ea580c]"
                                            >
                                                {DB_ENGINES.map(e => <option key={e} value={e}>{e}</option>)}
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <label className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest">Storage (GB)</label>
                                            <input
                                                type="number"
                                                min="10"
                                                max="5000"
                                                value={dbStorage}
                                                onChange={(e) => setDbStorage(parseInt(e.target.value))}
                                                className="bg-background border-2 border-foreground p-3 text-xs font-mono outline-none focus:border-[#ea580c]"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-8 items-end">
                                        <div className="flex-1 flex flex-col gap-4">
                                            <label className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest">Nodes (HA Cluster)</label>
                                            <div className="flex gap-2">
                                                {[1, 2, 3].map(n => (
                                                    <button
                                                        key={n}
                                                        onClick={() => setDbNodes(n)}
                                                        className={`flex-1 py-3 border-2 font-mono text-xs ${dbNodes === n ? "bg-foreground text-background" : "border-foreground/10"}`}
                                                    >
                                                        {n === 1 ? "Standalone" : `${n} Nodes`}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => addItem("database", `DB: ${dbEngine}`, (dbStorage * STORAGE_PRICE_PER_GB + (dbNodes * 15)) * MARKUP_SERVICE, `${dbNodes} Nodes, ${dbStorage}GB Storage`)}
                                            className="bg-foreground text-background px-8 py-3 text-xs font-mono uppercase tracking-widest hover:bg-[#ea580c] transition-colors"
                                        >
                                            Add to Estimate
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "storage" && (
                                <motion.div
                                    key="storage"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex flex-col gap-8"
                                >
                                    <div className="flex flex-col gap-4">
                                        <label className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest">Block Storage Volume (GB)</label>
                                        <input
                                            type="range" min="1" max="10000" step="1" value={storageGb}
                                            onChange={(e) => setStorageGb(parseInt(e.target.value))}
                                            className="accent-[#ea580c]"
                                        />
                                        <div className="flex justify-between items-center bg-foreground/5 px-4 py-2 border border-foreground/10">
                                            <span className="text-xs font-mono">{storageGb} GB NVMe</span>
                                            <span className="text-xs font-mono font-bold">{format(convert(storageGb * STORAGE_PRICE_PER_GB * MARKUP_SERVICE, currency), currency)}/mo</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => addItem("storage", `Storage Volume`, storageGb * STORAGE_PRICE_PER_GB * MARKUP_SERVICE, `${storageGb}GB NVMe Optane`)}
                                        className="bg-foreground text-background self-start px-8 py-3 text-xs font-mono uppercase tracking-widest hover:bg-[#ea580c] transition-colors"
                                    >
                                        Add to Estimate
                                    </button>
                                </motion.div>
                            )}

                            {activeTab === "networking" && (
                                <motion.div
                                    key="networking"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex flex-col gap-8"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {LB_SIZES.map((lb) => (
                                            <button
                                                key={lb.id}
                                                onClick={() => setLbSize(lb)}
                                                className={`p-6 border-2 flex flex-col items-center gap-3 transition-all ${lbSize.id === lb.id ? "bg-[#ea580c] text-background border-[#ea580c]" : "border-foreground/10 hover:border-foreground/30"
                                                    }`}
                                            >
                                                <Layers size={24} />
                                                <span className="text-xs font-mono font-bold uppercase">{lb.name} LB</span>
                                                <span className="text-[10px] font-mono opacity-70">Starting {format(convert(lb.price * MARKUP_SERVICE, currency), currency)}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => addItem("network", `${lbSize.name} Load Balancer`, lbSize.price * MARKUP_SERVICE, "High-Availability Edge LB")}
                                        className="bg-foreground text-background self-start px-8 py-3 text-xs font-mono uppercase tracking-widest hover:bg-[#ea580c] transition-colors"
                                    >
                                        Add to Estimate
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Column: Estimate Summary */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="border-2 border-foreground bg-foreground text-background p-6">
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-mono uppercase tracking-widest opacity-50">Total Estimate</span>
                                <span className="text-5xl font-mono font-bold">{format(convert(totalPriceUsd, currency), currency)}</span>
                                <span className="text-[10px] font-mono uppercase tracking-widest opacity-50">Billed monthly (est.)</span>
                            </div>
                            <div className="p-2 border border-background/20">
                                <Calculator size={24} />
                            </div>
                        </div>

                        <button className="w-full bg-[#ea580c] text-background py-4 text-xs font-mono font-bold uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2">
                            Launch Stack <ChevronRight size={16} />
                        </button>
                    </div>

                    <div className="border-2 border-foreground flex-1 flex flex-col">
                        <div className="px-6 py-4 border-b-2 border-foreground flex justify-between items-center bg-foreground/5">
                            <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Cost Breakdown</span>
                            <span className="text-[10px] font-mono text-muted-foreground uppercase">{items.length} Elements</span>
                        </div>

                        <div className="flex-1 max-h-[400px] overflow-y-auto">
                            {items.length === 0 ? (
                                <div className="p-8 text-center flex flex-col items-center gap-4 opacity-30">
                                    <Cpu size={40} />
                                    <span className="text-[10px] font-mono uppercase">Calculator Empty</span>
                                </div>
                            ) : (
                                <div className="divide-y-2 divide-foreground/10">
                                    {items.map((item) => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            key={item.id}
                                            className="p-4 flex justify-between items-center group hover:bg-foreground/5"
                                        >
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-mono font-bold uppercase">{item.name}</span>
                                                <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-tight">{item.details}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs font-mono">{format(convert(item.basePrice, currency), currency)}</span>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-1 hover:text-[#ea580c] opacity-0 group-hover:opacity-100 transition-all"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t-2 border-foreground bg-foreground/5 space-y-4">
                            <div className="flex justify-between text-xs font-mono">
                                <span className="text-muted-foreground uppercase">Subtotal (USD)</span>
                                <span className="font-bold">${totalPriceUsd.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xs font-mono">
                                <span className="text-muted-foreground uppercase">Markup (Inc.)</span>
                                <span className="text-[#ea580c]">TRUE</span>
                            </div>
                            <button
                                onClick={() => setItems([])}
                                className="w-full py-2 border border-foreground/20 text-[10px] font-mono uppercase hover:bg-foreground hover:text-background transition-all"
                            >
                                Reset System
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-20 border-2 border-foreground p-8 grid grid-cols-1 md:grid-cols-3 gap-8 grayscale opacity-70 hover:grayscale-0 transition-all">
                <div className="flex flex-col gap-3">
                    <Zap size={24} className="text-[#ea580c]" />
                    <h4 className="text-sm font-mono font-bold uppercase">Dynamic Exchange</h4>
                    <p className="text-[10px] font-mono leading-relaxed">Rates are updated every 10 minutes from Global Markets. Local currency billing available for all African regions.</p>
                </div>
                <div className="flex flex-col gap-3">
                    <Globe size={24} className="text-[#ea580c]" />
                    <h4 className="text-sm font-mono font-bold uppercase">Zero Hidden Fees</h4>
                    <p className="text-[10px] font-mono leading-relaxed">Estimates include all egress, API, and management fees. The price you see is what you pay on your monthly invoice.</p>
                </div>
                <div className="flex flex-col gap-3">
                    <RefreshCw size={24} className="text-[#ea580c]" />
                    <h4 className="text-sm font-mono font-bold uppercase">Commitment Discounts</h4>
                    <p className="text-[10px] font-mono leading-relaxed">Save up to 40% with reserved instances or annual prepay. Contact our engineering team for custom architectural quotes.</p>
                </div>
            </div>
        </section>
    )
}
