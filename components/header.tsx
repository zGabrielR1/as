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
    <header className="relative z-20 flex items-center justify-between p-6 absolute top-0 left-0 right-0">
      {/* Logo */}
      <div className="flex items-center">
        <div className="text-white font-bold text-xl tracking-tight">
          <span className="font-medium instrument">GR</span>
        </div>
      </div>

      <nav className="flex items-center space-x-2">
        <a
          href="#about"
          onClick={(e) => handleNavClick(e, "about")}
          className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          About
        </a>
        <a
          href="#projects"
          onClick={(e) => handleNavClick(e, "projects")}
          className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          Projects
        </a>
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "contact")}
          className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          Contact
        </a>
      </nav>

      {/* Resume Button */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div id="gooey-btn" className="relative flex items-center group" style={{ filter: "url(#gooey-filter)" }}>
        <button className="absolute right-0 px-2.5 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center justify-center -translate-x-10 group-hover:-translate-x-19 z-0">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </button>
        <button className="px-6 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center z-10">
          Resume
        </button>
        </div>
      </div>
    </header>
  )
}
