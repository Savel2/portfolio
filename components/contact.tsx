"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const socialLinks = [
  { label: "Email", href: "mailto:saveliy2105@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/savnev/", external: true },
  { label: "GitHub", href: "https://github.com/Savel2/portfolio", external: true },
]

export function ContactSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        setStatus("success")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-card text-foreground font-mono text-sm px-4 py-2.5 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00ff41]/40 focus:border-[#00ff41]/60 transition-colors"

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

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-full max-w-md mb-10"
          >
            {status === "success" ? (
              <p className="font-mono text-sm text-[#00ff41] py-6">
                Thanks — I&apos;ll get back to you within 48 hours.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-left">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={inputClass}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputClass}
                />
                <textarea
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  required
                  className={`${inputClass} resize-y`}
                />
                {status === "error" && (
                  <p className="font-mono text-xs text-red-400">
                    Something went wrong — try the email link above instead.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="self-start px-6 py-2.5 rounded-lg font-mono text-sm font-semibold bg-[#00ff41] text-black hover:opacity-90 transition-opacity disabled:opacity-40"
                >
                  {status === "sending" ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </motion.div>

          <motion.a
            href="https://calendar.app.google/78mAh6aSNL54JqD19"
            target="_blank"
            rel="noopener noreferrer"
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
                  {...('external' in link ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
