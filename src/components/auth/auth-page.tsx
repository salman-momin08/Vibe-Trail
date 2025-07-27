
"use client";

import React, { useState } from "react";
import { LoginForm } from "./login-form";
import { AuthGraphic } from "./auth-graphic";
import { SignUpForm } from "./signup-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle";
import { useParallax } from "@/hooks/use-parallax";


export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const parallax = useParallax(20);

  const toggleView = () => setIsLoginView(!isLoginView);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center p-2 sm:p-4 animate-fade-in overflow-hidden bg-splash-gradient">
      <div 
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}
      >
        <div className="stars"></div>
        <div className="stars-sm"></div>
        <div className="stars-md"></div>
      </div>
      
      <div className="container relative group grid min-h-[95vh] sm:min-h-[650px] w-full max-w-6xl flex-grow grid-cols-1 overflow-hidden rounded-2xl bg-card/60 shadow-2xl backdrop-blur-xl lg:grid-cols-2 lg:p-0 animate-float">
        <div className="absolute top-4 left-4 z-20">
          <ThemeToggle />
        </div>
        <div className="absolute top-4 right-4 z-20 hidden lg:block">
            <Button variant="ghost" onClick={toggleView} className="group/button text-sm font-semibold">
              <span className="text-white/80 group-hover/button:text-white transition-colors duration-300">
                {isLoginView ? "Don't have an account?" : "Already have an account?"}
              </span>
              <span className="text-accent ml-2 group-hover/button:text-primary underline-offset-4 group-hover/button:underline">{isLoginView ? "Sign Up" : "Login"}</span>
            </Button>
        </div>
        
        <div className="relative flex h-full flex-col justify-center p-6 sm:p-8 lg:p-12 z-10 bg-transparent rounded-l-2xl">
          <div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-6 animate-[slide-in_0.5s_ease-out_forwards]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                {isLoginView ? "Welcome Back" : "Create an Account"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isLoginView ? "Enter your credentials to access your account" : "Enter your details to get started"}
              </p>
            </div>
            
            <div className={cn("transition-opacity duration-300", !isLoginView && "hidden")}>
               <LoginForm />
            </div>
             <div className={cn("transition-opacity duration-300", isLoginView && "hidden")}>
                <SignUpForm />
            </div>

            <div className="pt-6 text-center lg:hidden">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); toggleView(); }}
                  className="text-sm text-white/80 underline underline-offset-4 hover:text-primary"
                >
                  {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                </a>
            </div>
          </div>
          <div className="absolute bottom-4 left-0 right-0 px-8 text-center text-xs text-muted-foreground">
                <a href="/terms" className="underline underline-offset-4 hover:text-primary">
                  Terms of use
                </a>
                .{" "}
                <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
                  Privacy policy
                </a>
                .
           </div>
        </div>
        <div className="relative hidden rounded-r-2xl overflow-hidden lg:block">
          <AuthGraphic />
        </div>
      </div>
    </div>
  );
}
