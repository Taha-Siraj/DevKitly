"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getToolBySlug } from "../lib/registry";
import { useTheme } from "./ThemeProvider";
import { Menu, Sun, Moon, Search, ChevronRight, Home } from "lucide-react";

interface NavbarProps {
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
}

export default function Navbar({ onOpenMobileMenu, onOpenSearch }: NavbarProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  
  const slug = pathname.replace(/^\//, "");
  const tool = getToolBySlug(slug);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/50 bg-background/85 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Side: Hamburger & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground lg:hidden transition-colors cursor-pointer"
            aria-label="Open mobile menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Breadcrumb Navigation */}
          <nav className="flex items-center text-xs font-semibold text-muted-foreground/90 select-none">
            <Link
              href="/"
              className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors text-foreground/80"
            >
              <Home className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            
            {tool && (
              <>
                <ChevronRight className="h-3.5 w-3.5 mx-1 text-muted-foreground/45" />
                <span className="hidden sm:inline truncate text-muted-foreground/70">
                  {tool.category}
                </span>
                <ChevronRight className="hidden sm:inline h-3.5 w-3.5 mx-1 text-muted-foreground/45" />
                <span className="font-bold text-foreground truncate max-w-[150px] sm:max-w-none">
                  {tool.name}
                </span>
              </>
            )}
          </nav>
        </div>

        {/* Right Side: Quick Actions */}
        <div className="flex items-center gap-2">
          {/* Header Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
            title="Search Tools"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline text-xs font-bold">Search</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-300 cursor-pointer"
            aria-label="Toggle color theme"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-500 rotate-0 transition-transform duration-500" />
            ) : (
              <Moon className="h-4 w-4 text-indigo-600 rotate-0 transition-transform duration-500" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
