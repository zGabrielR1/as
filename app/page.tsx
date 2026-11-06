"use client"

import Header from "@/components/header"
import HeroContent from "@/components/hero-content"
import PulsingCircle from "@/components/pulsing-circle"
import ShaderBackground from "@/components/shader-background"
import PortfolioProjects from "@/components/portfolio-projects"
import AboutSkills from "@/components/about-skills"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function GabrielPortfolio() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const showShader = mounted && theme !== "figma"

  return (
    <>
      <Header />
      {showShader ? (
        <ShaderBackground>
          <HeroContent />
          <PulsingCircle />
        </ShaderBackground>
      ) : (
        <div className="pastel-fallback relative min-h-screen w-full overflow-hidden">
          <HeroContent />
          <PulsingCircle />
        </div>
      )}
      <PortfolioProjects />
      <AboutSkills />
      <ContactSection />
      <Footer />
    </>
  )
}
