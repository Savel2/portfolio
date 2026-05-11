"use client"

import { motion } from "framer-motion"

const socialLinks = [
  { label: "Email", href: "mailto:hello@example.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <span className="mb-4 block text-sm text-muted-foreground">
            {">"} CONTACT
          </span>
          <h2 className="mb-4 text-3xl font-medium text-foreground md:text-4xl">
            {"Let's talk."}
          </h2>
          <p className="mb-10 max-w-md text-muted-foreground">
            Got a project in mind, want to collaborate, or just want to say hi?
            I&apos;d love to hear from you.
          </p>

          <motion.a
            href="#"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-10 inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]"
          >
            Book a 15-min intro call
          </motion.a>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 text-sm text-muted-foreground"
          >
            {socialLinks.map((link, index) => (
              <span key={link.label} className="flex items-center gap-6">
                <a
                  href={link.href}
                  className="transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
                {index < socialLinks.length - 1 && (
                  <span className="text-border">·</span>
                )}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
