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
  isTrail: boolean
  opacity: number
  scale: number
}

function ButtonGlobal({ onClick }: { onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const cursors: Cursor[] = useMemo(() => {
    const cursors: Cursor[] = []
    const circles = [140, 180, 220, 260]
    const cursorsPerCircle = [8, 12, 16, 20]
    
    circles.forEach((radius, circleIndex) => {
      const count = cursorsPerCircle[circleIndex]
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * 2 * Math.PI
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        
        const rotationOutward = Math.atan2(y, x) * (180 / Math.PI)
        
        cursors.push({
          id: `cursor-${circleIndex}-${i}`,
          finalX: x,
          finalY: y,
          delay: circleIndex * 0.01 + i * 0.002,
          rotation: rotationOutward,
          isTrail: false,
          opacity: 1,
          scale: 1
        })

        for (let t = 1; t <= 2; t++) {
          cursors.push({
            id: `cursor-${circleIndex}-${i}-trail-${t}`,
            finalX: x,
            finalY: y,
            delay: circleIndex * 0.01 + i * 0.002 + t * 0.008,
            rotation: rotationOutward,
            isTrail: true,
            opacity: 1 - (t * 0.3),
            scale: 1 - (t * 0.2)
          })
        }
      }
    })
    
    return cursors
  }, [])

  return (
    <div
      className="absolute glassy shader-clock backdrop-blur-md bg-card border border-border shadow-xl shadow-muted box-border content-stretch flex flex-row gap-0.5 items-center justify-center left-1/2 px-[22px] py-3 rounded-[38px] translate-x-[-50%] translate-y-[-50%] transition-all duration-300 hover:bg-accent hover:border-accent-foreground hover:shadow-2xl hover:shadow-accent-foreground hover:scale-105 active:scale-95 group overflow-visible z-20 will-change-transform cursor-pointer"
      data-name="Contact Me Button"
      style={{ top: "calc(50% - 0.5px)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary-foreground/10 via-primary-foreground/5 to-transparent rounded-[38px]" />
      
      <motion.div
        className="absolute inset-0 rounded-[38px] opacity-0 will-change-transform"
        animate={(isHovered || isActive) ? {
          opacity: [0, 0.6, 0],
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 0 0px rgba(255,255,255,0)",
            "0 0 20px rgba(255,255,255,0.4)",
            "0 0 0px rgba(255,255,255,0)"
          ]
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="absolute inset-0 rounded-[38px] shadow-inner shadow-primary-foreground/20" />
      
      <AnimatePresence>
        {(isHovered || isActive) && (
          <motion.div
            className="absolute pointer-events-none will-change-transform z-10"
            style={{ 
              left: '50%', 
              top: 'calc(50% - 0.5px)',
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              rotate: -360
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {cursors.map((cursor) => (
              <motion.div
                key={cursor.id}
                className="absolute pointer-events-none will-change-transform"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                  scale: 0
                }}
                animate={{
                  x: cursor.finalX,
                  y: cursor.finalY,
                  opacity: cursor.isTrail ? cursor.opacity : [1, 0.8, 1],
                  scale: cursor.isTrail ? cursor.scale : [1, 1.1, 1]
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                  transition: { duration: 0.03 }
                }}
                transition={{
                  duration: 0.08,
                  delay: cursor.delay,
                  ease: "easeOut",
                  type: "spring",
                  damping: 25,
                  stiffness: 400,
                  opacity: {
                    duration: cursor.isTrail ? 0.08 : 2,
                    repeat: cursor.isTrail ? 0 : Infinity,
                    ease: "easeInOut"
                  },
                  scale: {
                    duration: cursor.isTrail ? 0.08 : 2,
                    repeat: cursor.isTrail ? 0 : Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <MousePointer 
                  className="w-5 h-5 text-foreground drop-shadow-lg" 
                  style={{ 
                    filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.6))',
                    opacity: cursor.opacity,
                    transform: `scale(${cursor.scale}) rotate(${cursor.rotation}deg)`
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-primary-foreground text-[20px] text-center text-nowrap tracking-[-0.7px] z-10 drop-shadow-lg">
        <p className="adjustLetterSpacing block leading-[1.4] whitespace-pre">
          Contact Me
        </p>
      </div>
    </div>
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
    <main className="relative z-10 min-h-screen flex items-end pb-16 pl-8 pr-8 pt-20 glassy shader-clock bg-transparent">
      <div className="text-left max-w-lg">
        <div
          className="inline-flex items-center px-3 py-1 rounded-full glassy shader-clock bg-muted/50 backdrop-blur-sm mb-4 relative"
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-border to-transparent rounded-full" />
          <span className="text-muted-foreground text-xs font-light relative z-10">💻 Full-Stack Developer</span>
        </div>

        <h1 className="glassy shader-clock text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-foreground mb-4">
          <span className="font-medium italic instrument">Gabriel</span> Renostro
          <br />
          <span className="font-light tracking-tight text-foreground">Developer</span>
        </h1>

        <p className="glassy shader-clock text-xs font-light text-muted-foreground mb-4 leading-relaxed">
          Crafting exceptional digital experiences through clean code, innovative solutions, and modern web
          technologies. Specializing in React, Next.js, and full-stack development with a passion for beautiful,
          functional design.
        </p>

        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={handleViewProjects}
            className="glassy shader-clock px-8 py-3 rounded-full bg-transparent border border-border text-foreground font-normal text-xs transition-all duration-200 hover:bg-accent hover:border-accent-foreground cursor-pointer"
          >
            View Projects
          </button>
          <ButtonGlobal onClick={handleContactMe} />
        </div>
      </div>
    </main>
  )
}
