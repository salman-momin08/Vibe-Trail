
"use client";

import React, { useState, useEffect } from "react";
import AuthPage from "@/components/auth/auth-page";
import { SplashScreen } from "@/components/auth/splash-screen";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      // Wait for exit animation to complete before removing the component
      setTimeout(() => setShowSplash(false), 800);
    }, 2200); // Splash screen visible for 2.2s before exit animation starts

    return () => clearTimeout(timer);
  }, []);
  
  if (showSplash) {
    return <SplashScreen isExiting={isExiting} />;
  }

  return <AuthPage />;
}
