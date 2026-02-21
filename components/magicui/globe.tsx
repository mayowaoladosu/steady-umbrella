"use client"

import { useEffect, useRef } from "react"
import { useMotionValue, useSpring } from "framer-motion"
import { useTheme } from "next-themes"
import createGlobe from "cobe"

export function Globe({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const pointerInteracting = useRef<number | null>(null)
    const pointerInteractionMovement = useRef(0)

    const r = useSpring(0, { mass: 1, stiffness: 280, damping: 40 })
    const { resolvedTheme } = useTheme()

    useEffect(() => {
        let phi = 0
        let width = 0
        const onResize = () => {
            if (canvasRef.current) {
                width = canvasRef.current.offsetWidth
            }
        }
        window.addEventListener("resize", onResize)
        onResize()

        const isDark = resolvedTheme === "dark"

        // RGB colors array function
        const hexToRgb = (hex: string) => {
            const bigint = parseInt(hex.slice(1), 16)
            const r = (bigint >> 16) & 255
            const g = (bigint >> 8) & 255
            const b = bigint & 255
            return [r / 255, g / 255, b / 255] as [number, number, number]
        }

        // NY, SF, Amsterdam, London, Frankfurt, Toronto, Singapore, Bangalore, Sydney
        const markers = [
            { location: [40.7128, -74.0060], size: 0.05 }, // NY
            { location: [37.7749, -122.4194], size: 0.05 }, // SF
            { location: [52.3676, 4.9041], size: 0.05 }, // Amsterdam
            { location: [51.5074, -0.1278], size: 0.05 }, // London
            { location: [50.1109, 8.6821], size: 0.05 }, // Frankfurt
            { location: [43.6510, -79.3470], size: 0.05 }, // Toronto
            { location: [1.3521, 103.8198], size: 0.05 }, // Singapore
            { location: [12.9716, 77.5946], size: 0.05 }, // Bangalore
            { location: [-33.8688, 151.2093], size: 0.05 }, // Sydney
        ]

        const globe = createGlobe(canvasRef.current!, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: 0.3,
            dark: isDark ? 1 : 0,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: isDark ? [0.15, 0.15, 0.15] : [0.95, 0.95, 0.95],
            markerColor: hexToRgb("#ea580c"), // Orange brand color
            glowColor: isDark ? [0.1, 0.1, 0.1] : [0.9, 0.9, 0.9],
            markers: markers as any,
            onRender: (state) => {
                // Called every frame
                state.phi = phi + r.get()
                phi += 0.003 // Slow auto-rotation
                state.width = width * 2
                state.height = width * 2
            },
        })

        return () => {
            globe.destroy()
            window.removeEventListener("resize", onResize)
        }
    }, [r, resolvedTheme])

    return (
        <div className={`relative w-full aspect-square max-w-[320px] mx-auto ${className || ""}`}>
            <canvas
                ref={canvasRef}
                className="w-full h-full cursor-grab active:cursor-grabbing opacity-90 transition-opacity duration-500"
                onPointerDown={(e) => {
                    pointerInteracting.current = e.clientX - pointerInteractionMovement.current
                    canvasRef.current!.style.cursor = "grabbing"
                }}
                onPointerUp={() => {
                    pointerInteracting.current = null
                    canvasRef.current!.style.cursor = "grab"
                }}
                onPointerOut={() => {
                    pointerInteracting.current = null
                    canvasRef.current!.style.cursor = "grab"
                }}
                onMouseMove={(e) => {
                    if (pointerInteracting.current !== null) {
                        const delta = e.clientX - pointerInteracting.current
                        pointerInteractionMovement.current = delta
                        r.set(delta / 200)
                    }
                }}
                onTouchMove={(e) => {
                    if (pointerInteracting.current !== null && e.touches[0]) {
                        const delta = e.touches[0].clientX - pointerInteracting.current
                        pointerInteractionMovement.current = delta
                        r.set(delta / 100)
                    }
                }}
            />
        </div>
    )
}
