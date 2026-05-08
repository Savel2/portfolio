"use client"

import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            #00ff41 0px,
            #00ff41 1px,
            transparent 1px,
            transparent 80px
          )`,
        }}
      />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <p 
          className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-6 animate-fade-in opacity-0"
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          <span className="text-primary">&gt;</span> Product Manager · AI Builder
        </p>
        
        {/* Headline */}
        <h1 
          className="font-mono text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards", color: "#d4d4d4" }}
        >
          <span className="text-balance">PM who ships with AI</span>
          <span className="text-primary animate-blink">_</span>
        </h1>
        
        {/* Subhead */}
        <p 
          className="font-mono text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in opacity-0"
          style={{ animationDelay: "0.5s", animationFillMode: "forwards", color: "#737373" }}
        >
          Building real products with modern AI tools — fast, polished, shipped.
        </p>
        
        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in opacity-0"
          style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
        >
          <Button 
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-all duration-300 font-medium px-8"
          >
            Book a 15-min intro call
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(0,255,65,0.15)] transition-all duration-300 font-medium px-8"
          >
            See my work
          </Button>
        </div>
      </div>
    </section>
  )
}
