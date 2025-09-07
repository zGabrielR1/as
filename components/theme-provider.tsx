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
    if (theme === 'figma') {
      return 'figma'
    }
    if (theme === 'shader-clock') {
      return 'shader-clock'
    }
    return theme || 'dark'
  }, [theme])

  React.useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    const root = document.documentElement
    const classes = [resolvedTheme]
    if (className) {
      classes.push(...className.trim().split(/\s+/))
    }
    root.className = classes.join(' ')
  }, [resolvedTheme, className])

  return <>{children}</>
}

export function ThemeProvider({ children, ...props }: any) {
  return (
    <NextThemesProvider
      defaultTheme="dark"
      {...props}
    >
      <ThemeClassApplier className={props.className}>
        {children}
      </ThemeClassApplier>
    </NextThemesProvider>
  )
}
