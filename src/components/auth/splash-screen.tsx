
"use client";

import { cn } from '@/lib/utils';
import { useParallax } from '@/hooks/use-parallax';

export function SplashScreen({ isExiting }: { isExiting: boolean }) {
  const letters = "Vibe Trail".split("");
  const parallax = useParallax(50);
  
  return (
    <div 
        className={cn(
            "flex min-h-screen items-center justify-center overflow-hidden bg-splash-gradient",
            "relative",
            isExiting && "animate-paper-crumple"
        )}
    >
       <div 
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}
      >
        <div className="stars"></div>
        <div className="stars-sm"></div>
        <div className="stars-md"></div>
      </div>

      <div className="relative z-10">
        <h1 className="text-6xl md:text-8xl font-bold text-white/90 font-headline select-none">
          {letters.map((letter, index) => (
            <span
              key={index}
              className="animate-letter-reveal inline-block"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}
