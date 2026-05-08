import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <Hero />
      </div>
    </main>
  )
}
