"use client"

export default function PortfolioProjects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and Stripe integration",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      status: "Live",
      link: "#",
    },
    {
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates and team features",
      tech: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
      status: "In Development",
      link: "#",
    },
    {
      title: "AI Content Generator",
      description: "AI-powered content creation platform using OpenAI API and modern web technologies",
      tech: ["Next.js", "OpenAI API", "Tailwind", "Vercel"],
      status: "Live",
      link: "#",
    },
  ]

  return (
    <section id="projects" className="relative z-20 px-8 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div
            className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 relative"
            style={{
              filter: "url(#glass-effect)",
            }}
          >
            <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
            <span className="text-white/90 text-xs font-light relative z-10">Featured Work</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            <span className="font-medium italic instrument">Selected</span> Projects
          </h2>

          <p className="text-sm font-light text-white/70 max-w-2xl">
            A showcase of recent projects demonstrating expertise in modern web development, from concept to deployment.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
              style={{
                filter: "url(#glass-effect)",
              }}
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-light ${
                    project.status === "Live"
                      ? "bg-green-500/20 text-green-300 border border-green-500/30"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}
                >
                  {project.status}
                </span>

                <a
                  href={project.link}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white/60 hover:text-white"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>

              {/* Project Info */}
              <h3 className="text-xl font-medium text-white mb-2 group-hover:text-white/90 transition-colors">
                {project.title}
              </h3>

              <p className="text-sm font-light text-white/70 mb-4 leading-relaxed">{project.description}</p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 rounded-full bg-white/10 text-white/80 text-xs font-light border border-white/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="flex justify-center mt-12">
          <button className="px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-sm transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  )
}
