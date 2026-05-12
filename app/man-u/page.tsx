'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation } from '@/components/navigation'

export default function ManUPage() {
  const [teamName, setTeamName] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const name = teamName.trim()
    if (!name) return

    setIsLoading(true)
    setResult(null)
    setError(null)

    try {
      const res = await fetch('/api/football', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamName: name }),
      })

      const data: { result?: string; noresult?: string; error?: string } =
        await res.json()

      if (!res.ok || data.error) {
        setError(data.error ?? 'Unable to retrieve score right now.')
      } else if (data.result) {
        setResult(data.result)
      } else if (data.noresult) {
        setResult(data.noresult)
      } else {
        setError('No data returned.')
      }
    } catch {
      setError('Unable to retrieve score right now.')
    } finally {
      setIsLoading(false)
    }
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
            &gt; PASSION
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Man U vs...</h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            When did your team last play mine? Pick a side.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name (e.g. Liverpool)..."
            className="w-full rounded-lg border border-border bg-card text-foreground font-mono text-sm p-4 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-accent,#00ff41)] focus:ring-opacity-50"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="self-start px-6 py-2.5 rounded-lg font-mono text-sm font-semibold bg-[var(--color-accent,#00ff41)] text-black hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            {isLoading ? 'Checking...' : 'Check the score'}
          </button>
        </motion.form>

        {/* Result area */}
        <AnimatePresence>
          {(result || error) && (
            <motion.div
              key={result ?? error}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-8"
            >
              <div
                className={`rounded-lg border font-mono text-sm p-5 leading-relaxed ${
                  error
                    ? 'border-red-900/50 bg-red-950/20 text-red-400'
                    : 'border-border bg-card text-[#d4d4d4]'
                }`}
              >
                {error ? (
                  <span>{error}</span>
                ) : (
                  <span>
                    <span className="text-[var(--color-accent,#00ff41)] mr-1 select-none">
                      &gt;{' '}
                    </span>
                    {result}
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footnote */}
        <p className="mt-16 text-xs text-muted-foreground font-mono opacity-60">
          Powered by API-Football · Backend: Flask on Vercel
        </p>
      </div>
    </main>
  )
}
