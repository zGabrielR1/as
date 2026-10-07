"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MousePointer } from "lucide-react"

interface Cursor {
  id: string
  finalX: number
  finalY: number
  delay: number
  rotation: number
}

function ButtonGlobal({ onClick }: { onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false)

  // Single ring of cursors — cheap to animate, same burst feel without the jank.
  const cursors: Cursor[] = useMemo(() => {
    const count = 12
    const radius = 150
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * 2 * Math.PI
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      return {
        id: `cursor-${i}`,
        finalX: x,
        finalY: y,
        delay: i * 0.008,
        rotation: Math.atan2(y, x) * (180 / Math.PI),
      }
    })
  }, [])

  return (
    <button
      type="button"
      data-name="Contact Me Button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onClick={onClick}
      className="glassy group relative z-20 flex cursor-pointer flex-row items-center justify-center gap-0.5 overflow-visible rounded-[38px] border border-border px-[22px] py-3 backdrop-blur-md transition-all duration-300 hover:border-accent-foreground hover:bg-accent hover:shadow-2xl active:scale-95"
    >
      <span className="absolute inset-0 rounded-[38px] bg-gradient-to-r from-primary-foreground/10 via-primary-foreground/5 to-transparent" />

      <motion.span
        className="absolute inset-0 rounded-[38px]"
        animate={
          isHovered
            ? {
                opacity: [0, 0.6, 0],
                scale: [1, 1.05, 1],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <AnimatePresence>
        {isHovered && (
          <motion.span
            className="pointer-events-none absolute top-1/2 left-1/2 z-10"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {cursors.map((cursor) => (
              <motion.span
                key={cursor.id}
                className="pointer-events-none absolute"
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{ x: cursor.finalX, y: cursor.finalY, opacity: [1, 0.8, 1], scale: [1, 1.1, 1] }}
                exit={{ opacity: 0, scale: 0, transition: { duration: 0.05 } }}
                transition={{ duration: 0.15, delay: cursor.delay, ease: "easeOut" }}
              >
                <MousePointer
                  className="h-5 w-5 text-foreground drop-shadow-lg"
                  style={{
                    filter: "drop-shadow(0 0 6px rgba(255,255,255,0.6))",
                    transform: `rotate(${cursor.rotation}deg)`,
                  }}
                />
              </motion.span>
            ))}
          </motion.span>
        )}
      </AnimatePresence>

      <span className="relative z-10 font-[Inter,sans-serif] text-[20px] font-normal tracking-[-0.7px] text-primary-foreground drop-shadow-lg">
        Contact Me
      </span>
    </button>
  )
}

export default function HeroContent() {
  const handleViewProjects = () => {
    const element = document.getElementById("projects")
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const handleContactMe = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <main className="hero-readable relative z-10 flex min-h-screen items-end px-8 pt-32 pb-16">
      <div className="max-w-lg text-left">
        <div className="glassy relative mb-4 inline-flex items-center rounded-full px-3 py-1 backdrop-blur-sm">
          <div className="absolute top-0 right-1 left-1 h-px rounded-full bg-gradient-to-r from-transparent via-border to-transparent" />
          <span className="relative z-10 text-xs font-light text-muted-foreground">💻 Full-Stack Developer</span>
        </div>

        <h1 className="mb-4 text-5xl font-light tracking-tight text-foreground md:text-6xl md:leading-tight">
          <span className="instrument font-medium italic">Gabriel</span> Renostro
          <br />
          <span className="font-light tracking-tight text-foreground">Developer</span>
        </h1>

        <p className="mb-4 text-xs leading-relaxed font-light text-muted-foreground">
          Crafting exceptional digital experiences through clean code, innovative solutions, and modern web
          technologies. Specializing in React, Next.js, and full-stack development with a passion for beautiful,
          functional design.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={handleViewProjects}
            className="glassy cursor-pointer rounded-full border border-border bg-transparent px-8 py-3 text-xs font-normal text-foreground transition-all duration-200 hover:border-accent-foreground hover:bg-accent"
          >
            View Projects
          </button>
          <ButtonGlobal onClick={handleContactMe} />
        </div>
      </div>
    </main>
  )
}
