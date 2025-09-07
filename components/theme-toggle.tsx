"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon, Clock } from "lucide-react"

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
    const themes = ['dark', 'figma', 'shader-clock']
    const currentIndex = themes.indexOf(theme!)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full glassy bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent hover:border-accent-foreground transition-all duration-200"
      aria-label={`Toggle to ${theme === 'dark' ? 'figma' : theme === 'figma' ? 'shader-clock' : 'dark'} theme`}
    >
      {theme === 'dark' && <Moon className="w-5 h-5" />}
      {theme === 'figma' && <Sun className="w-5 h-5" />}
      {theme === 'shader-clock' && <Clock className="w-5 h-5" />}
    </button>
  )
}