"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Command, CornerDownLeft, Sparkles, Terminal } from "lucide-react";
import { toolsRegistry, ToolEntry } from "../lib/registry";
import { AnimatePresence, motion } from "framer-motion";

interface SearchCommandProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchCommand({ isOpen, onClose }: SearchCommandProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter tools based on query
  const filteredTools = toolsRegistry.filter(
    (tool) =>
      tool.name.toLowerCase().includes(query.toLowerCase()) ||
      tool.description.toLowerCase().includes(query.toLowerCase()) ||
      tool.keywords.some((kw) => kw.toLowerCase().includes(query.toLowerCase()))
  );

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery("");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredTools.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredTools.length) % Math.max(1, filteredTools.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredTools[selectedIndex]) {
          navigate(filteredTools[selectedIndex].slug);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredTools, onClose]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const navigate = (slug: string) => {
    router.push(`/${slug}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search offline developer tools"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
          >
            {/* Search Input Bar */}
            <div className="flex items-center border-b border-border px-4 py-3 bg-secondary/50">
              <Search className="mr-3 h-5 w-5 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search offline developer tools... (e.g. JSON Formatter, UUID)"
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground border-none outline-none focus:ring-0 text-sm"
              />
              <div className="flex items-center gap-1 text-[10px] bg-secondary border border-border text-muted-foreground rounded px-1.5 py-0.5 ml-2 font-mono">
                <Command className="h-3 w-3" />
                <span>K</span>
              </div>
            </div>

            {/* List Results */}
            <div className="max-h-[60vh] overflow-y-auto p-2 no-scrollbar">
              {filteredTools.length > 0 ? (
                <div className="space-y-0.5">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Tools ({filteredTools.length})
                  </div>
                  {filteredTools.map((tool, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={tool.slug}
                        onClick={() => navigate(tool.slug)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`flex items-center justify-between rounded-lg px-3 py-2.5 cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-secondary/80 text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`p-1.5 rounded-md ${
                            isSelected ? "bg-white/10 text-white" : "bg-secondary text-muted-foreground"
                          }`}>
                            <Terminal className="h-4 w-4" />
                          </div>
                          <div className="truncate">
                            <p className="text-sm font-medium">{tool.name}</p>
                            <p className={`text-xs truncate ${
                              isSelected ? "text-white/70" : "text-muted-foreground"
                            }`}>
                              {tool.description}
                            </p>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="flex items-center gap-1 text-[10px] opacity-80 font-mono">
                            <span>Open</span>
                            <CornerDownLeft className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Sparkles className="h-8 w-8 text-muted-foreground mb-3 animate-pulse" />
                  <p className="text-sm font-medium text-muted-foreground">No tools found matching "{query}"</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Try checking your spelling or search keyword</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[11px] text-muted-foreground bg-secondary/35">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <span className="bg-secondary px-1 border border-border rounded font-mono">↑↓</span> Move
                </span>
                <span className="flex items-center gap-1">
                  <span className="bg-secondary px-1 border border-border rounded font-mono">Enter</span> Select
                </span>
                <span className="flex items-center gap-1">
                  <span className="bg-secondary px-1 border border-border rounded font-mono">Esc</span> Close
                </span>
              </div>
              <span className="font-mono text-xs opacity-75">DevKitly v1.0</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
