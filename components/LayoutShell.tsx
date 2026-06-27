"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import SearchCommand from "./SearchCommand";
import Footer from "./Footer";

interface LayoutShellProps {
  children: React.ReactNode;
}

export default function LayoutShell({ children }: LayoutShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global Keyboard listener for Ctrl+K / Cmd+K to open Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200" suppressHydrationWarning>
      
      {/* Search Modal */}
      <SearchCommand
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Navbar (Top) */}
      <Navbar
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Shell Body Wrapper */}
      <div className="flex-1 flex relative">
        
        {/* Sidebar (Left panel - Desktop: fixed, Mobile: drawer) */}
        <Sidebar
          onOpenSearch={() => setIsSearchOpen(true)}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Pane */}
        <main className="flex-1 min-w-0 lg:pl-64 flex flex-col">
          <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-6xl w-full mx-auto">
            {children}
          </div>
          <Footer />
        </main>

      </div>
    </div>
  );
}
