const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid submission.' }, { status: 400 })
  }

  const { name, email, message } = (body ?? {}) as Record<string, unknown>

  if (
    !name || typeof name !== 'string' || !name.trim() ||
    !email || typeof email !== 'string' || !EMAIL_RE.test(email.trim()) ||
    !message || typeof message !== 'string' ||
    message.trim().length < 5 || message.trim().length > 2000
  ) {
    return Response.json({ error: 'Invalid submission.' }, { status: 400 })
  }

  const controller = new AbortController()
  setTimeout(() => controller.abort(), 10_000)

  try {
    const res = await fetch('https://formsubmit.co/ajax/saveliy2105@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        _subject: `Portfolio contact from ${name.trim()}`,
      }),
      signal: controller.signal,
    })

    if (!res.ok) {
      return Response.json({ error: 'Submission failed.' }, { status: 502 })
    }

    return Response.json({ ok: true })
  } catch {
    return Response.json({ error: 'Submission failed.' }, { status: 502 })
  }
}
