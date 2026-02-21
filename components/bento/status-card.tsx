"use client"

import { useEffect, useState } from "react"

const REGIONS = [
  { name: "New York", status: "ONLINE", baseLatency: 12 },
  { name: "San Francisco", status: "ONLINE", baseLatency: 45 },
  { name: "Amsterdam", status: "ONLINE", baseLatency: 85 },
  { name: "London", status: "ONLINE", baseLatency: 78 },
  { name: "Frankfurt", status: "ONLINE", baseLatency: 92 },
  { name: "Toronto", status: "ONLINE", baseLatency: 18 },
  { name: "Singapore", status: "ONLINE", baseLatency: 210 },
  { name: "Bangalore", status: "ONLINE", baseLatency: 185 },
  { name: "Sydney", status: "ONLINE", baseLatency: 245 },
]

export function StatusCard() {
  const [tick, setTick] = useState(0)
  const [latencies, setLatencies] = useState<number[]>(REGIONS.map(r => r.baseLatency))

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1)
      setLatencies(prev => prev.map((l, i) => {
        // simulate a small jitter +- 3ms
        const jitter = Math.floor(Math.random() * 7) - 3
        return Math.max(1, REGIONS[i].baseLatency + jitter)
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b-2 border-foreground px-4 py-2 bg-background relative z-10">
        <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
          edge_nodes.status
        </span>
        <span className="text-[10px] tracking-widest text-muted-foreground">
          {`TICK:${String(tick).padStart(4, "0")}`}
        </span>
      </div>
      <div className="flex-1 flex flex-col p-3 gap-0">
        {/* Table header */}
        <div className="grid grid-cols-3 gap-2 border-b border-border pb-1.5 mb-1.5 bg-background z-10">
          <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">Region</span>
          <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">Status</span>
          <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground text-right">Latency</span>
        </div>
        {REGIONS.map((region, i) => (
          <div
            key={region.name}
            className="grid grid-cols-3 gap-2 py-1 border-b border-border/40 last:border-none"
          >
            <span className="text-[10px] lg:text-xs font-mono text-foreground">{region.name}</span>
            <div className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5"
                style={{
                  backgroundColor: region.status === "ONLINE" ? "#ea580c" : "hsl(var(--muted-foreground))",
                }}
              />
              <span className="text-[10px] lg:text-xs font-mono text-muted-foreground">{region.status}</span>
            </div>
            <span className="text-[10px] lg:text-xs font-mono text-foreground text-right">{latencies[i]}ms</span>
          </div>
        ))}
        {/* Throughput bar */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground">
              Global Capacity
            </span>
            <span className="text-[9px] font-mono text-foreground">87%</span>
          </div>
          <div className="h-1.5 w-full border border-foreground/30">
            <div className="h-full bg-foreground" style={{ width: "87%" }} />
          </div>
        </div>
      </div>
    </div>
  )
}
