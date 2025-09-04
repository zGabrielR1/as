"use client"

export default function HeroContent() {
  const handleViewProjects = () => {
    const element = document.getElementById("projects")
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const handleContactMe = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <main className="absolute bottom-8 left-8 z-20 max-w-lg">
      <div className="text-left">
        <div
          className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 relative"
          style={{
            filter: "url(#glass-effect)",
          }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
          <span className="text-white/90 text-xs font-light relative z-10">💻 Full-Stack Developer</span>
        </div>

        <h1 className="text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-white mb-4">
          <span className="font-medium italic instrument">Gabriel</span> Renostro
          <br />
          <span className="font-light tracking-tight text-white">Developer</span>
        </h1>

        <p className="text-xs font-light text-white/70 mb-4 leading-relaxed">
          Crafting exceptional digital experiences through clean code, innovative solutions, and modern web
          technologies. Specializing in React, Next.js, and full-stack development with a passion for beautiful,
          functional design.
        </p>

        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={handleViewProjects}
            className="px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer"
          >
            View Projects
          </button>
          <button
            onClick={handleContactMe}
            className="px-8 py-3 rounded-full bg-white text-black font-normal text-xs transition-all duration-200 hover:bg-white/90 cursor-pointer"
          >
            Contact Me
          </button>
        </div>
      </div>
    </main>
  )
}
