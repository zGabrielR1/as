'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useTheme } from 'next-themes'

function ThemeClassApplier({ 
  children, 
  className 
}: { 
  children: React.ReactNode 
  className?: string 
}) {
  const { theme } = useTheme()

  const resolvedTheme = React.useMemo(() => {
    if (theme === 'figma') return 'figma'
    if (theme === 'shader-clock') return 'shader-clock'
    return theme || 'shader-clock'
  }, [theme])

  React.useEffect(() => {
    if (typeof document === 'undefined') return

    const root = document.documentElement
    const knownThemes = new Set(['dark', 'figma', 'shader-clock'])

    // Preserve existing non-theme classes
    const existing = new Set(root.className.trim().split(/\s+/).filter(Boolean))
    for (const cls of Array.from(existing)) {
      if (knownThemes.has(cls)) existing.delete(cls)
    }

    const classes = [resolvedTheme]
    if (className) {
      classes.push(...className.trim().split(/\s+/))
    }

    for (const cls of classes) existing.add(cls)
    root.className = Array.from(existing).join(' ')
  }, [resolvedTheme, className])

  return <>{children}</>
}

export function ThemeProvider({ children, ...props }: any) {
  return (
    <NextThemesProvider
      defaultTheme="shader-clock"
      {...props}
    >
      <ThemeClassApplier className={props.className}>
        {children}
      </ThemeClassApplier>
    </NextThemesProvider>
  )
}
