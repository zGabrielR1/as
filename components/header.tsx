"use client"

import type React from "react"
import ThemeToggle from "@/components/theme-toggle"

export default function Header() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-20 flex items-center justify-between bg-background/60 p-6 backdrop-blur-md">
      {/* Logo */}
      <div className="flex items-center">
        <div className="text-xl font-bold tracking-tight text-foreground">
          <span className="instrument font-medium">GR</span>
        </div>
      </div>

      <nav className="flex items-center space-x-2" aria-label="Primary">
        <a
          href="#about"
          onClick={(e) => handleNavClick(e, "about")}
          className="rounded-full px-3 py-2 text-xs font-light text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
        >
          About
        </a>
        <a
          href="#projects"
          onClick={(e) => handleNavClick(e, "projects")}
          className="rounded-full px-3 py-2 text-xs font-light text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
        >
          Projects
        </a>
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "contact")}
          className="rounded-full px-3 py-2 text-xs font-light text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
        >
          Contact
        </a>
      </nav>

      {/* Resume Button */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="group relative flex items-center">
          <span
            aria-hidden="true"
            className="absolute right-0 z-0 flex h-8 -translate-x-10 items-center justify-center rounded-full bg-primary px-2.5 py-2 text-primary-foreground transition-all duration-300 group-hover:-translate-x-16"
          >
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </span>
          <a
            href="https://linkedin.com/in/gabrielrenostro"
            target="_blank"
            rel="noopener noreferrer"
            className="z-10 flex h-8 cursor-pointer items-center rounded-full bg-primary px-6 py-2 text-xs font-normal text-primary-foreground transition-all duration-300 hover:opacity-90"
          >
            Resume
          </a>
        </div>
      </div>
    </header>
  )
}
