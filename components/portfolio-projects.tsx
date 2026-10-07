"use client"

import { Button } from "@/components/ui/button"

export default function PortfolioProjects() {
  const profileUrl = "https://github.com/gabrielrenostro"
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and Stripe integration",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      status: "Live",
      link: profileUrl,
    },
    {
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates and team features",
      tech: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
      status: "In Development",
      link: profileUrl,
    },
    {
      title: "AI Content Generator",
      description: "AI-powered content creation platform using OpenAI API and modern web technologies",
      tech: ["Next.js", "OpenAI API", "Tailwind", "Vercel"],
      status: "Live",
      link: profileUrl,
    },
  ]

  return (
    <section id="projects" className="relative z-10 scroll-mt-24 px-8 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div
            className="inline-flex items-center px-3 py-1 rounded-full glassy mb-4 relative"
          >
            <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-border to-transparent rounded-full" />
            <span className="text-muted-foreground text-xs font-light relative z-10">Featured Work</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            <span className="font-medium italic instrument">Selected</span> Projects
          </h2>

          <p className="text-sm font-light text-muted-foreground max-w-2xl">
            A showcase of recent projects demonstrating expertise in modern web development, from concept to deployment.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative glassy shader-clock rounded-2xl p-6"
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-light glassy shader-clock ${
                    project.status === "Live"
                      ? "bg-primary/15 text-foreground border border-primary/40"
                      : "bg-muted/50 text-muted-foreground border border-muted"
                  }`}
                >
                  {project.status}
                </span>

                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-6 w-6 p-0 glassy shader-clock"
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} on GitHub`}
                    className="text-muted-foreground hover:text-foreground"
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
                </Button>
              </div>

              {/* Project Info */}
              <h3 className="text-xl font-medium text-foreground mb-2 group-hover:text-accent-foreground transition-colors">
                {project.title}
              </h3>

              <p className="text-sm font-light text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 rounded-full bg-muted/50 text-muted-foreground text-xs font-light border border-border shader-clock hover:bg-primary/10 transition-colors"
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
          <Button variant="glassy" size="lg" className="px-8 shader-clock" asChild>
            <a href="https://github.com/gabrielrenostro" target="_blank" rel="noopener noreferrer">
              View All Projects
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
