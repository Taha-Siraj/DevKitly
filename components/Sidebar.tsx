"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toolsRegistry, CATEGORIES } from "../lib/registry";
import * as Icons from "lucide-react";

export function ToolIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) {
    return <Icons.Terminal className={className || "h-4 w-4"} />;
  }
  return <IconComponent className={className || "h-4 w-4"} />;
}

interface SidebarProps {
  onOpenSearch: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export default function Sidebar({ onOpenSearch, isOpenMobile, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();

  // Group tools by category
  const groupedTools = Object.entries(CATEGORIES).reduce((acc, [_, catName]) => {
    acc[catName] = toolsRegistry.filter((t) => t.category === catName);
    return acc;
  }, {} as Record<string, typeof toolsRegistry>);

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full bg-card border-r border-border/80">
      {/* Brand Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400 shadow-sm border border-indigo-500/10">
            <Icons.Terminal className="h-5 w-5" />
          </div>
          <div>
            <Link
              href="/"
              onClick={onCloseMobile}
              className="font-bold text-base tracking-tight text-foreground hover:text-indigo-600 transition-colors"
            >
              DevKitly
            </Link>
            <span className="block text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
              100% Offline Utilities
            </span>
          </div>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
          aria-label="Close sidebar"
        >
          <Icons.X className="h-4.5 w-4.5" />
        </button>
      </div>

      {/* Quick Search Shortcut */}
      <div className="px-4 py-3">
        <button
          onClick={onOpenSearch}
          className="flex w-full items-center justify-between rounded-xl border border-border bg-secondary/30 px-3.5 py-2 text-left text-xs text-muted-foreground hover:bg-secondary/75 hover:text-foreground transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Icons.Search className="h-3.5 w-3.5" />
            <span>Search offline tools...</span>
          </div>
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-card px-1.5 font-mono text-[9px] font-medium text-muted-foreground">
            <span className="text-[10px]">⌘</span>K
          </kbd>
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-5 no-scrollbar">
        {Object.entries(groupedTools).map(([catName, tools]) => (
          <div key={catName} className="space-y-1.5">
            <h3 className="px-3 text-[10px] font-bold text-muted-foreground/80 uppercase tracking-wider">
              {catName}
            </h3>
            <ul className="space-y-0.5">
              {tools.map((tool) => {
                const isActive = pathname === `/${tool.slug}`;
                return (
                  <li key={tool.slug}>
                    <Link
                      href={`/${tool.slug}`}
                      onClick={onCloseMobile}
                      className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10 dark:shadow-indigo-950/20"
                          : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                      }`}
                    >
                      <ToolIcon
                        name={tool.icon}
                        className={`h-4 w-4 flex-shrink-0 ${
                          isActive ? "text-white" : "text-muted-foreground"
                        }`}
                      />
                      <span className="truncate">{tool.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-border/50 text-[10px] text-muted-foreground/60 text-center font-medium bg-secondary/10">
        Secure & Local • v1.0
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Left side, fixed) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-20">
        {renderSidebarContent()}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Mobile Drawer Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform lg:hidden transition-transform duration-300 ease-in-out ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {renderSidebarContent()}
      </aside>
    </>
  );
}
