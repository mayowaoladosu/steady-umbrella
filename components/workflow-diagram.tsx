"use client"

import { motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"

type Node = {
  id: string
  label: string
  x: number
  y: number
  kind: "input" | "core" | "output"
}

const NODES: Node[] = [
  { id: "src", label: "Source", x: 95, y: 70, kind: "input" },
  { id: "git", label: "Commit", x: 95, y: 160, kind: "input" },

  { id: "queue", label: "Queue", x: 260, y: 115, kind: "core" },
  { id: "build", label: "Build", x: 400, y: 55, kind: "core" },
  { id: "scan", label: "Scan", x: 400, y: 115, kind: "core" },
  { id: "test", label: "Test", x: 400, y: 175, kind: "core" },

  { id: "registry", label: "Registry", x: 560, y: 80, kind: "output" },
  { id: "deploy", label: "Deploy", x: 560, y: 150, kind: "output" },
  { id: "obs", label: "Observe", x: 710, y: 115, kind: "output" },
]

const EDGES = [
  ["src", "queue"],
  ["git", "queue"],
  ["queue", "build"],
  ["queue", "scan"],
  ["queue", "test"],
  ["build", "registry"],
  ["scan", "deploy"],
  ["test", "deploy"],
  ["registry", "obs"],
  ["deploy", "obs"],
] as const

function nodeById(id: string) {
  return NODES.find((n) => n.id === id)!
}

function roundedRectPath(x: number, y: number, w: number, h: number, r: number) {
  return `M${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} H${x + r} Q${x},${y + h} ${x},${y + h - r} V${y + r} Q${x},${y} ${x + r},${y} Z`
}

function FlowNode({ node, delay }: { node: Node; delay: number }) {
  const w = node.kind === "core" ? 108 : 96
  const h = 34
  const x = node.x - w / 2
  const y = node.y - h / 2

  const stroke =
    node.kind === "core" ? "#ea580c" : "hsl(var(--border))"

  const fill =
    node.kind === "core"
      ? "hsl(var(--muted))"
      : "hsl(var(--background))"

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ scale: 1.02 }}
      style={{ transformOrigin: `${node.x}px ${node.y}px` }}
    >
      <path d={roundedRectPath(x, y, w, h, 10)} fill={fill} stroke={stroke} strokeWidth={1.4} />
      <text
        x={node.x}
        y={node.y + 4}
        textAnchor="middle"
        fill="hsl(var(--foreground))"
        fontSize={11}
        fontFamily="var(--font-mono), monospace"
        letterSpacing="0.04em"
      >
        {node.label}
      </text>
    </motion.g>
  )
}

function edgePath(a: Node, b: Node) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const c1x = a.x + dx * 0.42
  const c1y = a.y
  const c2x = a.x + dx * 0.58
  const c2y = b.y
  return `M ${a.x} ${a.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${b.x} ${b.y}`
}

function Edge({
  from,
  to,
  delay,
}: {
  from: Node
  to: Node
  delay: number
}) {
  const d = edgePath(from, to)

  return (
    <>
      <motion.path
        d={d}
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth={1.5}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke="#ea580c"
        strokeWidth={1}
        opacity={0.35}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.35 }}
        transition={{ duration: 0.7, delay: delay + 0.06 }}
      />
    </>
  )
}

function Packet({
  from,
  to,
  delay,
  duration = 1.6,
}: {
  from: Node
  to: Node
  delay: number
  duration?: number
}) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const p1 = { x: from.x + dx * 0.42, y: from.y }
  const p2 = { x: from.x + dx * 0.58, y: to.y }

  const points = useMemo(
    () => [
      { x: from.x, y: from.y },
      { x: (from.x + p1.x) / 2, y: (from.y + p1.y) / 2 },
      { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 },
      { x: (p2.x + to.x) / 2, y: (p2.y + to.y) / 2 },
      { x: to.x, y: to.y },
    ],
    [from.x, from.y, p1.x, p1.y, p2.x, p2.y, to.x, to.y]
  )

  return (
    <motion.circle
      r={2.8}
      fill="#ea580c"
      filter="url(#wfGlow)"
      initial={{ cx: from.x, cy: from.y, opacity: 0 }}
      animate={{
        cx: points.map((p) => p.x),
        cy: points.map((p) => p.y),
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: 2.4,
        ease: "linear",
      }}
    />
  )
}

export function WorkflowDiagram() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="h-[260px] w-full" />

  return (
    <div className="mx-auto w-full max-w-[860px]">
      <svg
        viewBox="0 0 820 230"
        className="h-auto w-full"
        role="img"
        aria-label="Workflow diagram showing Source and Commit flowing into Queue, then Build, Scan, Test, then Registry and Deploy, then Observe"
      >
        <defs>
          <filter id="wfGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="hubGrad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="hsl(var(--muted))" />
            <stop offset="100%" stopColor="hsl(var(--background))" />
          </radialGradient>
        </defs>

        <rect
          x={6}
          y={6}
          width={808}
          height={218}
          rx={14}
          fill="hsl(var(--background))"
          stroke="hsl(var(--border))"
          strokeWidth={1}
        />

        <g opacity={0.7}>
          <line x1={150} y1={30} x2={150} y2={200} stroke="hsl(var(--border))" strokeDasharray="3 6" />
          <line x1={320} y1={30} x2={320} y2={200} stroke="hsl(var(--border))" strokeDasharray="3 6" />
          <line x1={490} y1={30} x2={490} y2={200} stroke="hsl(var(--border))" strokeDasharray="3 6" />
          <line x1={650} y1={30} x2={650} y2={200} stroke="hsl(var(--border))" strokeDasharray="3 6" />
        </g>

        {EDGES.map(([a, b], i) => (
          <Edge key={`${a}-${b}`} from={nodeById(a)} to={nodeById(b)} delay={0.08 + i * 0.05} />
        ))}

        {EDGES.map(([a, b], i) => (
          <Packet
            key={`p1-${a}-${b}`}
            from={nodeById(a)}
            to={nodeById(b)}
            delay={0.8 + i * 0.18}
          />
        ))}
        {EDGES.filter((_, i) => i % 2 === 0).map(([a, b], i) => (
          <Packet
            key={`p2-${a}-${b}`}
            from={nodeById(a)}
            to={nodeById(b)}
            delay={1.3 + i * 0.22}
            duration={1.85}
          />
        ))}

        <motion.g
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <circle cx={400} cy={115} r={52} fill="url(#hubGrad)" stroke="hsl(var(--border))" strokeWidth={1.2} />
          <circle cx={400} cy={115} r={44} fill="none" stroke="#ea580c" strokeOpacity={0.35} strokeWidth={1} />
          <line x1={382} y1={115} x2={418} y2={115} stroke="hsl(var(--foreground))" strokeWidth={2.5} />
          <line x1={400} y1={97} x2={400} y2={133} stroke="hsl(var(--foreground))" strokeWidth={2.5} />
          <circle cx={400} cy={115} r={6} fill="#ea580c" filter="url(#wfGlow)" />
          <circle cx={400} cy={115} r={48} fill="none" stroke="#ea580c" strokeWidth={0.9} opacity={0.35}>
            <animate attributeName="r" values="48;54;48" dur="2.7s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.35;0.08;0.35" dur="2.7s" repeatCount="indefinite" />
          </circle>
        </motion.g>

        {NODES.map((n, i) => (
          <FlowNode key={n.id} node={n} delay={0.14 + i * 0.05} />
        ))}

        <text
          x={55}
          y={24}
          fill="hsl(var(--muted-foreground))"
          fontSize={10}
          fontFamily="var(--font-mono), monospace"
          letterSpacing="0.08em"
        >
          INPUT
        </text>
        <text
          x={348}
          y={24}
          fill="hsl(var(--muted-foreground))"
          fontSize={10}
          fontFamily="var(--font-mono), monospace"
          letterSpacing="0.08em"
        >
          PIPELINE
        </text>
        <text
          x={655}
          y={24}
          fill="hsl(var(--muted-foreground))"
          fontSize={10}
          fontFamily="var(--font-mono), monospace"
          letterSpacing="0.08em"
        >
          DELIVERY
        </text>
      </svg>
    </div>
  )
}