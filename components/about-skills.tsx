"use client"

export default function AboutSkills() {
  const skills = {
    Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "HTML5/CSS3"],
    Backend: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB", "REST APIs"],
    "Tools & Others": ["Git", "Docker", "AWS", "Vercel", "Figma", "Jest"],
  }

  const experience = [
    {
      role: "Senior Full-Stack Developer",
      company: "Tech Innovations Inc.",
      period: "2022 - Present",
      description: "Leading development of scalable web applications and mentoring junior developers.",
    },
    {
      role: "Frontend Developer",
      company: "Digital Solutions Co.",
      period: "2020 - 2022",
      description: "Built responsive user interfaces and improved application performance by 40%.",
    },
    {
      role: "Junior Developer",
      company: "StartUp Labs",
      period: "2019 - 2020",
      description: "Developed features for multiple client projects using modern web technologies.",
    },
  ]

  return (
    <section id="about" className="relative z-10 px-8 py-16">
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
            <span className="text-white/90 text-xs font-light relative z-10">About Me</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            <span className="font-medium italic instrument">Passionate</span> Developer
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* About Content */}
          <div className="space-y-6">
            <div
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              style={{
                filter: "url(#glass-effect)",
              }}
            >
              <h3 className="text-xl font-medium text-white mb-4">My Story</h3>
              <div className="space-y-4 text-sm font-light text-white/70 leading-relaxed">
                <p>
                  With over 5 years of experience in web development, I specialize in creating exceptional digital
                  experiences that combine beautiful design with robust functionality. My journey began with a curiosity
                  for how things work on the web, which evolved into a passion for building solutions that make a
                  difference.
                </p>
                <p>
                  I thrive on challenges and enjoy working with cutting-edge technologies to deliver high-quality
                  applications. Whether it's optimizing performance, implementing complex features, or collaborating
                  with cross-functional teams, I bring dedication and expertise to every project.
                </p>
              </div>
            </div>

            {/* Experience Timeline */}
            <div
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              style={{
                filter: "url(#glass-effect)",
              }}
            >
              <h3 className="text-xl font-medium text-white mb-6">Experience</h3>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="relative pl-6 border-l border-white/20">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 bg-white rounded-full"></div>
                    <div className="space-y-1">
                      <h4 className="text-white font-medium text-sm">{exp.role}</h4>
                      <p className="text-white/60 text-xs">
                        {exp.company} • {exp.period}
                      </p>
                      <p className="text-white/70 text-xs leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="space-y-6">
            <div
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              style={{
                filter: "url(#glass-effect)",
              }}
            >
              <h3 className="text-xl font-medium text-white mb-6">Technical Skills</h3>
              <div className="space-y-6">
                {Object.entries(skills).map(([category, skillList]) => (
                  <div key={category}>
                    <h4 className="text-white/90 font-medium text-sm mb-3">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-light border border-white/20 hover:bg-white/20 transition-colors duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              style={{
                filter: "url(#glass-effect)",
              }}
            >
              <h3 className="text-xl font-medium text-white mb-6">By the Numbers</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">50+</div>
                  <div className="text-xs text-white/70">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">5+</div>
                  <div className="text-xs text-white/70">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">15+</div>
                  <div className="text-xs text-white/70">Technologies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">100%</div>
                  <div className="text-xs text-white/70">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
