"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    setTheme("figma")
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full glassy bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent hover:border-accent-foreground transition-all duration-200"
      aria-label="Toggle theme"
    >
      <Sun className="w-5 h-5" />
    </button>
  )
}