'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const INTRO: Message = {
  role: 'assistant',
  content: "Hi! Ask me anything about Sava — his experience, projects, or skills.",
}

export function ChatBubble() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INTRO])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [isRedirect, setIsRedirect] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open) setTimeout(() => textareaRef.current?.focus(), 150)
  }, [open])

  const userCount = messages.filter((m) => m.role === 'user').length
  const charCount = input.length
  const charWarn = charCount > 1800
  const canSend =
    !isStreaming && !isRedirect && input.trim().length >= 3 && charCount <= 2000

  async function sendMessage() {
    if (!canSend) return
    const content = input.trim()
    const outgoing: Message[] = [...messages, { role: 'user', content }]
    setMessages([...outgoing, { role: 'assistant', content: '' }])
    setInput('')
    setIsStreaming(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: outgoing }),
      })

      const redirectFlag = res.headers.get('x-chat-redirect')

      if (!res.ok || !res.body) {
        const text = await res.text().catch(() => '')
        throw new Error(text || 'Request failed')
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const copy = [...prev]
          copy[copy.length - 1] = { role: 'assistant', content: accumulated }
          return copy
        })
      }

      if (redirectFlag === 'fit') setIsRedirect(true)
    } catch {
      setMessages((prev) => {
        const copy = [...prev]
        copy[copy.length - 1] = {
          role: 'assistant',
          content: 'Something went wrong — please try again.',
        }
        return copy
      })
    } finally {
      setIsStreaming(false)
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="
              fixed bottom-[88px] z-50
              left-4 right-4
              sm:left-auto sm:right-6 sm:w-[360px]
              h-[480px] flex flex-col
              rounded-xl border border-border bg-background/95 backdrop-blur-md
              shadow-[0_8px_40px_rgba(0,0,0,0.6)]
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-[#00ff41] text-[10px] select-none">●</span>
                <span className="font-mono text-sm font-medium text-foreground">
                  Ask about Sava
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scroll-smooth">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`
                      max-w-[85%] rounded-lg px-3 py-2 font-mono text-xs leading-relaxed
                      ${
                        msg.role === 'user'
                          ? 'bg-[#00ff41]/10 border border-[#00ff41]/20 text-[#d4d4d4]'
                          : 'bg-card border border-border text-[#d4d4d4]'
                      }
                    `}
                  >
                    {msg.content === '' && isStreaming && i === messages.length - 1 ? (
                      <span className="text-muted-foreground animate-pulse">● ● ●</span>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}

              {/* Redirect CTA */}
              {isRedirect && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-1"
                >
                  <a
                    href="/fit"
                    className="
                      block w-full text-center font-mono text-xs font-semibold
                      py-2.5 px-4 rounded-lg
                      bg-[#00ff41] text-black hover:opacity-90 transition-opacity
                    "
                  >
                    Open JD-fit demo →
                  </a>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="shrink-0 border-t border-border px-3 py-3">
              <div className="flex gap-2 items-end">
                <div className="flex-1 relative">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isRedirect || isStreaming}
                    placeholder={
                      isRedirect
                        ? 'Try the JD-fit demo above ↑'
                        : 'Ask a question… (Enter to send)'
                    }
                    rows={2}
                    className="
                      w-full resize-none rounded-lg border border-border bg-card
                      text-[#d4d4d4] font-mono text-xs px-3 py-2
                      placeholder:text-muted-foreground
                      focus:outline-none focus:ring-1 focus:ring-[#00ff41]/40
                      disabled:opacity-40
                    "
                  />
                  {charCount > 0 && (
                    <span
                      className={`
                        absolute bottom-1.5 right-2 font-mono text-[10px] pointer-events-none
                        ${charWarn ? 'text-red-400' : 'text-muted-foreground/40'}
                      `}
                    >
                      {charCount}/2000
                    </span>
                  )}
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!canSend}
                  aria-label="Send message"
                  className="
                    shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                    bg-[#00ff41] text-black hover:opacity-90 transition-opacity
                    disabled:opacity-30
                  "
                >
                  <Send size={13} />
                </button>
              </div>

              {/* Message limit hint */}
              {userCount >= 2 && !isRedirect && (
                <p className="mt-1.5 font-mono text-[10px] text-muted-foreground/50">
                  {3 - userCount} question{3 - userCount === 1 ? '' : 's'} remaining
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close chat' : 'Chat with CV'}
          className="
            w-12 h-12 rounded-full bg-[#00ff41] text-black
            flex items-center justify-center
            shadow-[0_4px_20px_rgba(0,255,65,0.3)]
            hover:opacity-90 transition-opacity
          "
          animate={
            !open
              ? {
                  boxShadow: [
                    '0 0 0 0px rgba(0,255,65,0.45)',
                    '0 0 0 10px rgba(0,255,65,0)',
                    '0 0 0 0px rgba(0,255,65,0)',
                  ],
                }
              : { boxShadow: '0 0 0 0px rgba(0,255,65,0)' }
          }
          transition={
            !open
              ? { duration: 2, repeat: Infinity, ease: 'easeOut', repeatDelay: 1 }
              : { duration: 0.2 }
          }
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={19} />
              </motion.span>
            ) : (
              <motion.span
                key="msg"
                initial={{ rotate: 45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -45, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <MessageCircle size={19} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  )
}
