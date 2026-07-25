import { Navigation } from '@/components/navigation'

const GITHUB_RELEASES = 'https://github.com/Savel2/your-next-move/releases/latest'
const GITHUB_SOURCE = 'https://github.com/Savel2/your-next-move'

const stack = [
  { name: 'Tauri 2', description: 'Lighter than Electron, closer-to-native macOS feel' },
  { name: 'React + TypeScript', description: 'Familiar frontend with hot-reload dev cycle' },
  { name: 'Rust backend', description: 'Handles tray, OS integrations, and secure token storage' },
  { name: 'Chessground', description: "Lichess's own board rendering library" },
  { name: 'Lichess OAuth 2.0 PKCE', description: 'Auth without a paid app registration' },
  { name: 'Tauri auto-updater', description: 'Signed update bundles — future versions install themselves' },
]

const limitations = [
  {
    title: 'Unsigned binary',
    body: 'The app is not signed with an Apple Developer certificate. macOS Gatekeeper will block the first launch — see the install guide above for the xattr bypass.',
  },
  {
    title: 'No system notifications',
    body: "macOS silences notification-permission requests from unsigned apps, so there's no push alert when it's your turn. You'll need to check the tray icon manually.",
  },
  {
    title: 'macOS only',
    body: 'Tauri supports Windows and Linux builds, but those targets haven\'t been compiled or tested yet. PRs welcome.',
  },
  {
    title: 'All three resolve with Apple Developer signing',
    body: "A $99/yr Apple Developer account would enable proper signing, notarization, and notification entitlements. Planned for v2 if the project gets traction.",
  },
]

export default function YourNextMovePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      <div className="pt-28 pb-24 px-6 max-w-3xl mx-auto">

        {/* Hero */}
        <section className="mb-20">
          <p className="font-mono text-xs tracking-widest uppercase text-[#00ff41] mb-4">
            {'>'} PROJECT
          </p>
          <h1 className="text-4xl md:text-5xl font-medium text-foreground mb-4 leading-tight">
            Your Next Move
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Play Lichess correspondence chess from your menu bar.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={GITHUB_RELEASES}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2.5 rounded-lg font-mono text-sm font-semibold bg-[#00ff41] text-black hover:opacity-90 transition-opacity"
            >
              Download for macOS
            </a>
            <a
              href={GITHUB_SOURCE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2.5 rounded-lg font-mono text-sm font-semibold border border-border text-foreground hover:border-[#00ff41] hover:text-[#00ff41] transition-colors"
            >
              View source
            </a>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-border mb-20" />

        {/* What it is */}
        <section className="mb-12">
          <p className="font-mono text-xs tracking-widest uppercase text-[#00ff41] mb-4">
            {'>'} WHAT IT IS
          </p>
          <p className="text-muted-foreground leading-relaxed">
            A native macOS menu bar app for Lichess correspondence players who don't want to
            context-switch. Click the tray icon, see the games waiting on you, make a move,
            back to work. It fetches your active games from the Lichess API, renders the board
            with Chessground, and submits moves over the Lichess Board API — all without opening
            a browser tab. Built for players who prefer 1 day per move over blitz.
          </p>
        </section>

        {/* Expandables */}
        <section className="flex flex-col gap-3 mb-20">

          {/* Installation — open by default */}
          <details open className="group rounded-lg border border-border bg-card overflow-hidden">
            <summary className="flex cursor-pointer select-none items-center justify-between px-5 py-4 font-mono text-sm text-foreground hover:text-[#00ff41] transition-colors list-none">
              <span>Installation guide (macOS)</span>
              <span className="text-muted-foreground text-xs transition-transform group-open:rotate-180">▾</span>
            </summary>
            <div className="px-5 pb-6 pt-2 text-sm text-muted-foreground leading-relaxed border-t border-border space-y-6">

              <div>
                <h3 className="font-mono text-xs tracking-widest uppercase text-foreground mb-3">Step 1 — Download</h3>
                <p>
                  Go to{' '}
                  <a href={GITHUB_RELEASES} target="_blank" rel="noopener noreferrer" className="text-[#00ff41] underline underline-offset-4">
                    Releases
                  </a>{' '}
                  and download the <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">.dmg</code> file for your Mac:
                </p>
                <ul className="mt-2 space-y-1 list-none pl-0">
                  <li className="flex gap-2"><span className="text-[#00ff41] shrink-0">—</span><span><code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">_aarch64.dmg</code> for Apple Silicon (M1/M2/M3/M4)</span></li>
                  <li className="flex gap-2"><span className="text-[#00ff41] shrink-0">—</span><span><code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">_x64.dmg</code> for Intel Mac</span></li>
                </ul>
              </div>

              <div>
                <h3 className="font-mono text-xs tracking-widest uppercase text-foreground mb-3">Step 2 — Install</h3>
                <ol className="space-y-1 list-none pl-0">
                  <li className="flex gap-2"><span className="text-[#00ff41] shrink-0">1.</span><span>Open the <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">.dmg</code> file</span></li>
                  <li className="flex gap-2"><span className="text-[#00ff41] shrink-0">2.</span><span>Drag <strong className="text-foreground">Your Next Move</strong> into your <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">/Applications</code> folder</span></li>
                  <li className="flex gap-2"><span className="text-[#00ff41] shrink-0">3.</span><span>Eject the disk image</span></li>
                </ol>
              </div>

              <div>
                <h3 className="font-mono text-xs tracking-widest uppercase text-foreground mb-3">Step 3 — First-launch bypass</h3>
                <p className="mb-3">
                  Because the app isn't signed with an Apple Developer certificate, macOS Gatekeeper will block it.
                  You only need to do this once.
                </p>
                <p className="font-mono text-xs uppercase text-foreground mb-2">Option A — right-click method (no Terminal)</p>
                <ol className="space-y-1 list-none pl-0 mb-4">
                  <li className="flex gap-2"><span className="text-[#00ff41] shrink-0">1.</span><span>Right-click the app icon in <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">/Applications</code> → <strong className="text-foreground">Open</strong></span></li>
                  <li className="flex gap-2"><span className="text-[#00ff41] shrink-0">2.</span><span>Click <strong className="text-foreground">Open</strong> in the Gatekeeper dialog</span></li>
                </ol>
                <p className="font-mono text-xs uppercase text-foreground mb-2">Option B — Terminal</p>
                <p className="mb-3">
                  macOS blocks unsigned apps by adding an invisible "quarantine" flag to any file downloaded
                  from the internet. The command below strips that flag from Your Next Move so macOS will let
                  it launch normally — it doesn't disable any security elsewhere on your system.
                </p>
                <ol className="space-y-2 list-none pl-0 mb-4">
                  <li className="flex gap-2">
                    <span className="text-[#00ff41] shrink-0">1.</span>
                    <span>Open Terminal: press <kbd className="bg-muted border border-border rounded px-1.5 py-0.5 font-mono text-xs">⌘ Space</kbd> → type <strong className="text-foreground">Terminal</strong> → hit <kbd className="bg-muted border border-border rounded px-1.5 py-0.5 font-mono text-xs">Enter</kbd>.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#00ff41] shrink-0">2.</span>
                    <span>Paste this command exactly and press <kbd className="bg-muted border border-border rounded px-1.5 py-0.5 font-mono text-xs">Enter</kbd>:</span>
                  </li>
                </ol>
                <pre className="bg-muted rounded-lg px-4 py-3 font-mono text-xs overflow-x-auto mb-4"><code>xattr -cr "/Applications/Your Next Move.app"</code></pre>
                <ol className="space-y-2 list-none pl-0" start={3}>
                  <li className="flex gap-2">
                    <span className="text-[#00ff41] shrink-0">3.</span>
                    <span>Nothing visible happens — that's expected. The quarantine flag has been cleared.</span>
                  </li>
                  <li className="flex gap-2 mt-2">
                    <span className="text-[#00ff41] shrink-0">4.</span>
                    <span>Launch Your Next Move normally from Applications or Spotlight.</span>
                  </li>
                </ol>
                <p className="mt-3 text-xs opacity-70">You only need to run this command once per install. Future auto-updates handle themselves without any terminal steps.</p>
              </div>

              <div>
                <h3 className="font-mono text-xs tracking-widest uppercase text-foreground mb-3">Step 4 — Sign in</h3>
                <p>
                  Click the chess icon in your macOS menu bar → <strong className="text-foreground">Log in with Lichess</strong>.
                  Your browser will open to the Lichess authorisation page. Approve it and you're in — no password is stored anywhere.
                </p>
              </div>

            </div>
          </details>

          {/* Tech stack */}
          <details className="group rounded-lg border border-border bg-card overflow-hidden">
            <summary className="flex cursor-pointer select-none items-center justify-between px-5 py-4 font-mono text-sm text-foreground hover:text-[#00ff41] transition-colors list-none">
              <span>Tech stack</span>
              <span className="text-muted-foreground text-xs transition-transform group-open:rotate-180">▾</span>
            </summary>
            <div className="border-t border-border divide-y divide-border">
              {stack.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 bg-card px-5 py-4"
                >
                  <span className="font-mono text-sm text-foreground shrink-0 w-48">
                    {item.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {item.description}
                  </span>
                </div>
              ))}
            </div>
          </details>

          {/* Known limitations */}
          <details className="group rounded-lg border border-border bg-card overflow-hidden">
            <summary className="flex cursor-pointer select-none items-center justify-between px-5 py-4 font-mono text-sm text-foreground hover:text-[#00ff41] transition-colors list-none">
              <span>Known limitations</span>
              <span className="text-muted-foreground text-xs transition-transform group-open:rotate-180">▾</span>
            </summary>
            <div className="px-5 pb-6 pt-2 border-t border-border space-y-4">
              {limitations.map((item) => (
                <div key={item.title}>
                  <p className="font-mono text-xs text-foreground mb-1">{item.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </details>

          {/* How I built it */}
          <details className="group rounded-lg border border-border bg-card overflow-hidden">
            <summary className="flex cursor-pointer select-none items-center justify-between px-5 py-4 font-mono text-sm text-foreground hover:text-[#00ff41] transition-colors list-none">
              <span>How I built it</span>
              <span className="text-muted-foreground text-xs transition-transform group-open:rotate-180">▾</span>
            </summary>
            <div className="px-5 pb-6 pt-4 border-t border-border space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                The whole thing shipped in roughly four days, with Claude Code as the coding partner
                for most of the Rust and Tauri plumbing. I came in with a clear spec — menu bar tray,
                Lichess OAuth, board rendering, move submission — and used Claude to move fast through
                the parts I'd never touched before: Tauri's Rust command layer, the keychain API for
                token storage, and the Tauri updater plugin.
              </p>
              <p>
                The auto-updater was the biggest friction point. Tauri's updater requires a signing
                key and a JSON manifest that lists the binary hash and download URL for each platform.
                Getting the signing pipeline right — generating the key, passing it to the build,
                producing a correct <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">latest.json</code>,
                and having the app verify and auto-relaunch — took a full day of iteration.
                Once it clicked it was elegant; getting there was not.
              </p>
              <p>
                The unsigned-app problem turned out to be a real UX hit. I knew Gatekeeper would
                complain, but I underestimated how many people simply don't know the right-click trick
                and give up at the "app is damaged" message. That's the most common support question I get,
                and it's fixable only with $99/yr — a cost I'm deferring until there's clear user interest.
              </p>
              <p>
                Correspondence chess is a niche; the app is a tool I personally use daily. If you're
                a Lichess player who keeps their games open in a pinned tab and wishes there was a
                less disruptive way — this is it.
              </p>
            </div>
          </details>

        </section>

        {/* Footer nav */}
        <a
          href="/#projects"
          className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
        >
          ← Back to projects
        </a>

      </div>
    </main>
  )
}
