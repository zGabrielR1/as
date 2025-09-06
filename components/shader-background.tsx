"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { MeshGradient } from "@paper-design/shaders-react"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const { theme } = useTheme()

  const getThemeColors = () => {
    if (theme === 'figma') {
      return {
        primary: ['#ffffff', '#030213', '#e9ebef', '#d4183d', '#717182'],
        secondary: ['#030213', '#ffffff', '#ececf0', '#030213']
      }
    } else {
      // Default dark/light
      return {
        primary: ["#000000", "#8b5cf6", "#ffffff", "#1e1b4b", "#4c1d95"],
        secondary: ["#000000", "#ffffff", "#8b5cf6", "#000000"]
      }
    }
  }

  const colors1 = getThemeColors().primary
  const colors2 = getThemeColors().secondary

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-[var(--background)] relative overflow-hidden" style={{ backgroundImage: `var(--bg-image)` }}>
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0 z-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Background Shaders */}
      <MeshGradient
        className="absolute inset-0 w-full h-full z-0"
        colors={colors1}
        speed={0.3}
      />
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-60 z-0"
        colors={colors2}
        speed={0.2}
      />

      {children}
    </div>
  )
}
