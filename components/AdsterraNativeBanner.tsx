"use client";

import React, { useEffect, useRef, useState } from "react";

export default function AdsterraNativeBanner() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const container = containerRef.current;
    if (!container) return;

    // Clear container to prevent duplicate script tags inside this container
    container.innerHTML = "";

    // Create ad container element
    const adContainer = document.createElement("div");
    adContainer.id = "container-27ebf93733f0fbdf0bf97702b4787f61";
    container.appendChild(adContainer);

    // Create script element
    const script = document.createElement("script");
    script.src = "https://pl30128619.effectivecpmnetwork.com/27ebf93733f0fbdf0bf97702b4787f61/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    container.appendChild(script);

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [mounted]);

  if (!mounted) {
    // Avoid hydration mismatch by rendering an empty block of same dimension
    return <div className="w-full min-h-[90px] bg-transparent" />;
  }

  return (
    <div 
      ref={containerRef} 
      className="w-full flex justify-center items-center overflow-hidden my-6 min-h-[90px] bg-secondary/5 border border-border/40 rounded-2xl p-4 sm:p-6"
    />
  );
}
