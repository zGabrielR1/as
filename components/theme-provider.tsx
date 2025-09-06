'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useTheme } from 'next-themes'

export function ThemeProvider({ children, ...props }: any) {
  const { theme } = useTheme()
  const resolvedTheme = React.useMemo(() => {
    if (theme === 'figma') {
      return 'figma'
    }
    return theme
  }, [theme])

  return (
    <NextThemesProvider
      {...props}
      className={resolvedTheme === 'figma' ? `figma ${props.className || ''}`.trim() : props.className || ''}
    >
      {children}
    </NextThemesProvider>
  )
}
