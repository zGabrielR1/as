"use client"

import Header from "@/components/header"
import HeroContent from "@/components/hero-content"
import PulsingCircle from "@/components/pulsing-circle"
import dynamic from 'next/dynamic';
const ShaderBackground = dynamic(() => import('@/components/shader-background'), { ssr: false });
import PortfolioProjects from "@/components/portfolio-projects"
import AboutSkills from "@/components/about-skills"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import { useTheme } from "next-themes"

export default function GabrielPortfolio() {
  const { theme } = useTheme()

  return (
    <>
      <Header />
      {theme === 'shader-clock' ? (
        <ShaderBackground className="shader-clock">
          <HeroContent />
          <PulsingCircle />
        </ShaderBackground>
      ) : (
        <>
          <HeroContent />
          <PulsingCircle />
        </>
      )}
      <PortfolioProjects />
      <AboutSkills />
      <ContactSection />
      <Footer />
    </>
  )
}
