"use client"

import { motion } from "framer-motion"

const projects = [
  {
    tag: "AI · API",
    title: "Football Fixtures API",
    description: "Live head-to-head match data, built with Python + API-Football.",
    link: "#",
  },
  {
    tag: "AI · Demo",
    title: "JD-Fit Analyzer",
    description: "AI demo: paste a job description, get instant fit analysis.",
    link: "#",
  },
  {
    tag: "Meta · Portfolio",
    title: "This Site",
    description: "Vibe-coded portfolio. Built in a weekend with v0, Claude Code, and Vercel.",
    link: "#",
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="mb-4 block text-sm text-muted-foreground">
            {">"} PROJECTS
          </span>
          <h2 className="mb-12 text-3xl font-medium text-foreground md:text-4xl">
            {"Things I've built."}
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative flex flex-col rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_0_20px_rgba(0,255,65,0.15)]"
            >
              <span className="mb-3 text-xs text-muted-foreground">
                {project.tag}
              </span>
              <h3 className="mb-2 text-lg font-medium text-foreground">
                {project.title}
              </h3>
              <p className="mb-6 flex-1 text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>
              <span className="text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                View →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
