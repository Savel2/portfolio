const FLASK_URL = 'https://flask-web-port.vercel.app/get_football_score'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Bad request' }, { status: 400 })
  }

  if (
    !body ||
    typeof body !== 'object' ||
    !('teamName' in body) ||
    typeof (body as Record<string, unknown>).teamName !== 'string' ||
    !(body as Record<string, string>).teamName.trim()
  ) {
    return Response.json({ error: 'Missing teamName' }, { status: 400 })
  }

  const teamName = (body as Record<string, string>).teamName.trim()

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10_000)

    let flaskRes: Response
    try {
      flaskRes = await fetch(FLASK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team_name: teamName }),
        signal: controller.signal,
      })
    } finally {
      clearTimeout(timeout)
    }

    if (!flaskRes.ok) {
      return Response.json(
        { error: 'Unable to retrieve score right now.' },
        { status: 502 }
      )
    }

    const data = await flaskRes.json()
    return Response.json(data)
  } catch {
    return Response.json(
      { error: 'Unable to retrieve score right now.' },
      { status: 502 }
    )
  }
}
