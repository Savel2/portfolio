import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { AboutSection } from "@/components/about"
import { ProjectsSection } from "@/components/projects"
import { ContactSection } from "@/components/contact"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </main>
  )
}
