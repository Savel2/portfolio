"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "5+", label: "Years in delivery" },
  { value: "5", label: "Enterprise clients delivered for" },
  { value: "50+", label: "Projects successfully launched" },
  { value: "1", label: "Hardware startup co-founded" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid gap-12 md:grid-cols-2 md:gap-16"
        >
          {/* Left: Bio */}
          <div>
            <span className="mb-4 block text-sm text-muted-foreground">
              {">"} ABOUT
            </span>
            <h2 className="mb-6 text-3xl font-medium text-foreground md:text-4xl">
              {"Hey, I'm Sava."}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I run delivery for technology teams — turning ambiguous problems into
                structured plans, building the operational frameworks that keep things
                predictable, and shipping outcomes that actually move the needle. Over
                the past 5+ years I&apos;ve owned delivery across AI startups, enterprise
                community platforms, and digital agencies — working with clients ranging
                from AWS and Tesco Bank to early-stage founders.
              </p>
              <p>
                When I&apos;m not running standups or writing playbooks, you&apos;ll find me
                training somewhere between calisthenics, tennis, football, surfing, BJJ, and chess.
              </p>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-baseline gap-4"
                >
                  <span className="text-3xl font-medium text-primary md:text-4xl">
                    {stat.value}
                  </span>
                  <span className="text-muted-foreground">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
