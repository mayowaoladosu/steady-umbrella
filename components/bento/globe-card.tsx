"use client"

import { Globe } from "@/components/magicui/globe"

export function GlobeCard() {
    return (
        <div className="flex flex-col h-full bg-background">
            <div className="flex items-center justify-between border-b-2 border-foreground px-4 py-2 relative z-10 bg-background">
                <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
                    network_topology.map
                </span>
                <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
                    global_edge_routing
                </span>
            </div>
            <div className="flex-1 relative overflow-hidden flex items-center justify-center p-4">
                <Globe />
            </div>
        </div>
    )
}
