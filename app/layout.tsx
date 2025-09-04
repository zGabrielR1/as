import type React from "react"
import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Instrument_Serif } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Gabriel Renostro - Full-Stack Developer",
  description:
    "Portfolio of Gabriel Renostro, a passionate full-stack developer specializing in React, Next.js, and modern web technologies. Creating exceptional digital experiences through clean code and innovative solutions.",
  generator: "v0.app",
  keywords: ["Gabriel Renostro", "Full-Stack Developer", "React", "Next.js", "Web Development", "Portfolio"],
  authors: [{ name: "Gabriel Renostro" }],
  openGraph: {
    title: "Gabriel Renostro - Full-Stack Developer",
    description: "Portfolio showcasing modern web development projects and expertise",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${figtree.variable} ${GeistMono.variable} ${instrumentSerif.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
