"use client"

import Header from "@/components/header"
import HeroContent from "@/components/hero-content"
import PulsingCircle from "@/components/pulsing-circle"
import ShaderBackground from "@/components/shader-background"
import PortfolioProjects from "@/components/portfolio-projects"
import AboutSkills from "@/components/about-skills"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function GabrielPortfolio() {
  return (
    <ShaderBackground>
      <Header />
      <HeroContent />
      <PulsingCircle />
      <PortfolioProjects />
      <AboutSkills />
      <ContactSection />
      <Footer />
    </ShaderBackground>
  )
}
