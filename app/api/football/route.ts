import { findTeamId } from '@/lib/teams'

const BASE_URL = 'https://v3.football.api-sports.io'
const MAN_UTD_ID = 33

async function apiFetch(path: string): Promise<{ res: Response; preview: string }> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15_000)

  let res: Response
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      headers: { 'x-apisports-key': process.env.API_FOOTBALL_KEY ?? '' },
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeout)
  }

  const raw = await res.text()
  const preview = raw.slice(0, 200)
  console.log(`[football] ${path} → status ${res.status}`)
  console.log(`[football] body preview: ${preview}`)

  const cloned = new Response(raw, { status: res.status, headers: res.headers })
  return { res: cloned, preview }
}

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
  console.log(`[football] teamName: ${teamName}`)
  console.log(`[football] key present: ${!!process.env.API_FOOTBALL_KEY}`)

  const teamId = findTeamId(teamName)
  if (teamId === null) {
    return Response.json({
      noresult: "Oooops, it looks like I don't have this team in my database.",
    })
  }

  console.log(`[football] resolved teamId: ${teamId}`)

  try {
    const { res: h2hRes } = await apiFetch(
      `/fixtures/headtohead?h2h=${teamId}-${MAN_UTD_ID}`
    )

    if (!h2hRes.ok) {
      return Response.json({ error: 'Unable to retrieve score right now.' }, { status: 502 })
    }

    const h2hData = await h2hRes.json() as {
      errors: Record<string, string> | []
      response: Array<{
        fixture: { timestamp: number; status: { short: string } }
        teams: { home: { name: string }; away: { name: string } }
        goals: { home: number; away: number }
      }>
    }

    const errors = h2hData.errors
    if (errors && !Array.isArray(errors) && Object.keys(errors).length > 0) {
      console.log(`[football] API errors: ${JSON.stringify(errors)}`)
      return Response.json(
        { error: `API issue: ${JSON.stringify(errors)}` },
        { status: 502 }
      )
    }

    if (!h2hData.response?.length) {
      return Response.json({
        noresult: 'No head-to-head matches found for that team.',
      })
    }

    const COMPLETED = ['FT', 'AET', 'PEN']
    const completed = h2hData.response.filter(f =>
      COMPLETED.includes(f.fixture.status.short)
    )

    if (!completed.length) {
      return Response.json({
        noresult: 'No completed matches between these teams yet.',
      })
    }

    const sorted = [...completed].sort(
      (a, b) => b.fixture.timestamp - a.fixture.timestamp
    )
    const fixture = sorted[0]
    const { home, away } = fixture.teams
    const { home: homeGoals, away: awayGoals } = fixture.goals

    return Response.json({
      result: `${home.name} - ${away.name} - ${homeGoals}:${awayGoals}`,
    })
  } catch {
    return Response.json({ error: 'Unable to retrieve score right now.' }, { status: 502 })
  }
}
