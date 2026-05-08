"use client"

import Link from "next/link"

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#lab", label: "Lab" },
  { href: "#contact", label: "Contact" },
]

export function Navigation() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-foreground font-medium text-lg tracking-tight hover:text-primary transition-colors"
        >
          Sava Nievierov
        </Link>
        
        <ul className="flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
