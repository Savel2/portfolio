"use client"

import { motion } from "framer-motion"

const projects = [
  {
    tag: "MACOS · TAURI · RUST",
    title: "Your Next Move",
    description: "A macOS menu bar app for Lichess correspondence chess. Play a move without leaving your workflow.",
    subtitle: "Tauri + React + Rust. OAuth PKCE, auto-updater, native tray.",
    link: "/projects/your-next-move",
    external: false,
    cta: "View project →",
  },
  {
    tag: "AI · API",
    title: "Football Fixtures API",
    description: "Live head-to-head match data, built with Python + API-Football.",
    link: "/man-u",
    external: false,
    cta: "View →",
  },
  {
    tag: "AI · Demo",
    title: "JD-Fit Analyser",
    description: "AI demo: paste a job description, get instant fit analysis.",
    link: "/fit",
    external: false,
    cta: "View →",
  },
  {
    tag: "Meta · Portfolio",
    title: "This Site",
    description: "Vibe-coded portfolio. Built in a weekend with v0, Claude Code, and Vercel.",
    link: "https://github.com/Savel2/portfolio",
    external: true,
    cta: "View →",
  },
  {
    tag: "Hardware · Startup",
    title: "Zaryadka",
    description: "Co-founded power bank sharing service. 10 active stations across Moscow before we shut it down.",
    link: "https://www.youtube.com/watch?v=B1GxGkvgMVA",
    external: true,
    cta: "Watch demo →",
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

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              {...(project.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
              <div className="mb-6 flex-1">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                {'subtitle' in project && project.subtitle && (
                  <p className="mt-1.5 text-xs text-muted-foreground italic opacity-70">
                    {project.subtitle}
                  </p>
                )}
              </div>
              <span className="text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                {project.cta}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
