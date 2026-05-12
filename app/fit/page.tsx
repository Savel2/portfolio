'use client'

import { useCompletion } from '@ai-sdk/react'
import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { Navigation } from '@/components/navigation'

export default function FitPage() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [submitted, setSubmitted] = useState(false)

  const { complete, completion, isLoading, error } = useCompletion({
    api: '/api/fit',
    streamProtocol: 'text',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const jd = textareaRef.current?.value.trim()
    if (!jd) return
    setSubmitted(true)
    await complete(jd, { body: { jobDescription: jd } })
  }

  function handleReset() {
    setSubmitted(false)
    if (textareaRef.current) textareaRef.current.value = ''
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      <div className="pt-24 pb-16 px-4 max-w-3xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="font-mono text-[var(--color-accent,#00ff41)] text-sm mb-3 tracking-widest uppercase">
            AI Demo
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            JD–CV Fit Analyser
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Paste a job description and Claude will cross-reference it against my
            CV in real time — streaming a structured fit analysis back to you.
          </p>
        </motion.div>

        {/* Form */}
        <AnimatePresence>
          {!submitted && (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4"
            >
              <textarea
                ref={textareaRef}
                rows={12}
                placeholder="Paste the full job description here…"
                className="w-full rounded-lg border border-border bg-card text-foreground font-mono text-sm p-4 resize-y placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-accent,#00ff41)] focus:ring-opacity-50"
                required
              />
              <button
                type="submit"
                className="self-start px-6 py-2.5 rounded-lg font-mono text-sm font-semibold bg-[var(--color-accent,#00ff41)] text-black hover:opacity-90 transition-opacity disabled:opacity-40"
                disabled={isLoading}
              >
                Analyse Fit →
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {isLoading && !completion && (
                <p className="font-mono text-sm text-muted-foreground animate-pulse mb-6">
                  Analysing…
                </p>
              )}

              {error && (
                <p className="font-mono text-sm text-red-400 mb-6">
                  Something went wrong. Please try again.
                </p>
              )}

              {completion && (
                <div className="prose prose-invert prose-sm max-w-none mb-8">
                  <ReactMarkdown
                    components={{
                      h2: ({ children }) => (
                        <h2 className="font-mono text-base font-semibold text-[var(--color-accent,#00ff41)] mt-8 mb-3">
                          {children}
                        </h2>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-none space-y-2 pl-0">{children}</ul>
                      ),
                      li: ({ children }) => (
                        <li className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                          <span className="text-[var(--color-accent,#00ff41)] shrink-0">—</span>
                          <span>{children}</span>
                        </li>
                      ),
                      p: ({ children }) => (
                        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                          {children}
                        </p>
                      ),
                    }}
                  >
                    {completion}
                  </ReactMarkdown>
                </div>
              )}

              {!isLoading && (
                <button
                  onClick={handleReset}
                  className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                >
                  ← Try another JD
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footnote */}
        <p className="mt-16 text-xs text-muted-foreground font-mono opacity-60">
          Powered by Claude via the Anthropic API. CV data is embedded server-side
          — your JD is never stored.
        </p>
      </div>
    </main>
  )
}
