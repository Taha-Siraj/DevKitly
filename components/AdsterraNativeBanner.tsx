"use client";

import React, { useEffect, useState } from "react";

export default function AdsterraNativeBanner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Create script element
    const script = document.createElement("script");
    script.src = "https://pl30128619.effectivecpmnetwork.com/27ebf93733f0fbdf0bf97702b4787f61/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    // Append script to document body so it executes in the global context
    document.body.appendChild(script);

    return () => {
      // Clean up script from body when unmounting
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      
      // Clear container contents to prevent duplicate/leftover rendering
      const container = document.getElementById("container-27ebf93733f0fbdf0bf97702b4787f61");
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
    <div className="w-full flex justify-center items-center overflow-hidden my-6 min-h-[90px] bg-secondary/5 border border-border/40 rounded-2xl p-4 sm:p-6">
      <div id="container-27ebf93733f0fbdf0bf97702b4787f61" className="w-full text-center" />
    </div>
  );
}
