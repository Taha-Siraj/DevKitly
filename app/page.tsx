"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toolsRegistry, CATEGORIES } from "../lib/registry";
import { ToolIcon } from "../components/Sidebar";
import { Search, X, ShieldCheck, Zap, Coins, ArrowRight, Sparkles } from "lucide-react";
import AdsterraNativeBanner from "../components/AdsterraNativeBanner";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Read search query parameter (?q=) on mount for SEO search action integration
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q") || params.get("search");
      if (q) {
        setSearchQuery(q);
      }
    }
  }, []);

  const categoryList = ["All", ...Object.values(CATEGORIES)];

  const filteredTools = toolsRegistry.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.keywords.some((kw) => kw.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-16">
      
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto pt-8 pb-4 space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400 border border-indigo-500/20 dark:border-indigo-400/20 shadow-[0_0_12px_rgba(99,102,241,0.05)] transition-all duration-300 hover:scale-105 select-none">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />
            <span>100% Client-Side & Private</span>
          </div>
        </div>
        
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight select-none bg-gradient-to-r from-slate-950 via-indigo-600 to-slate-950 dark:from-white dark:via-indigo-400 dark:to-white bg-clip-text text-transparent leading-none py-1">
            DevKitly
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium max-w-2xl mx-auto">
            A premium, privacy-first suite of offline developer tools designed to run completely sandboxed inside your browser. <span className="text-foreground font-semibold">No signup. No API keys. Zero tracking.</span>
          </p>
        </div>

        {/* Value Proposition Points */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-semibold text-foreground/80 pt-2 select-none">
          <span className="flex items-center gap-1.5 bg-indigo-500/5 dark:bg-indigo-400/5 border border-indigo-500/10 dark:border-indigo-400/10 px-3 py-1.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Free Developer Tools
          </span>
          <span className="flex items-center gap-1.5 bg-indigo-500/5 dark:bg-indigo-400/5 border border-indigo-500/10 dark:border-indigo-400/10 px-3 py-1.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Privacy-First
          </span>
          <span className="flex items-center gap-1.5 bg-indigo-500/5 dark:bg-indigo-400/5 border border-indigo-500/10 dark:border-indigo-400/10 px-3 py-1.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Works Completely in Your Browser
          </span>
          <span className="flex items-center gap-1.5 bg-indigo-500/5 dark:bg-indigo-400/5 border border-indigo-500/10 dark:border-indigo-400/10 px-3 py-1.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            No API Keys / Sign Up
          </span>
          <span className="flex items-center gap-1.5 bg-indigo-500/5 dark:bg-indigo-400/5 border border-indigo-500/10 dark:border-indigo-400/10 px-3 py-1.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Fast & Secure
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-xs flex flex-col items-center justify-center text-center h-36 w-full">
            <div className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400 leading-none">{toolsRegistry.length}+</div>
            <div className="text-xs sm:text-sm font-semibold text-foreground/90 mt-2">Total Tools</div>
            <div className="text-[10px] sm:text-[11px] text-muted-foreground mt-1 max-w-[150px] mx-auto">100% free & open-source</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-xs flex flex-col items-center justify-center text-center h-36 w-full">
            <div className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400 leading-none">{Object.keys(CATEGORIES).length}</div>
            <div className="text-xs sm:text-sm font-semibold text-foreground/90 mt-2">Categories</div>
            <div className="text-[10px] sm:text-[11px] text-muted-foreground mt-1 max-w-[150px] mx-auto">Organized workflows</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-xs flex flex-col items-center justify-center text-center h-36 w-full">
            <div className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400 leading-none">100%</div>
            <div className="text-xs sm:text-sm font-semibold text-foreground/90 mt-2">Local Processing</div>
            <div className="text-[10px] sm:text-[11px] text-muted-foreground mt-1 max-w-[150px] mx-auto">Runs in browser memory</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-xs flex flex-col items-center justify-center text-center h-36 w-full">
            <div className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400 leading-none">Zero</div>
            <div className="text-xs sm:text-sm font-semibold text-foreground/90 mt-2">Data Shared</div>
            <div className="text-[10px] sm:text-[11px] text-muted-foreground mt-1 max-w-[150px] mx-auto">No server logs or tracking</div>
          </div>
        </div>
      </section>

      {/* Adsterra Native Banner Ad */}
      <AdsterraNativeBanner />

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/10">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-foreground">Private & Secure</h3>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
            No servers, no tracking, and no database logs. Your keys and JSON code remain entirely on your local machine.
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/10">
            <Zap className="h-5 w-5" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-foreground">Sub-millisecond Speed</h3>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
            Instant in-browser calculations using highly optimized local JavaScript parser libraries and routines.
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/10">
            <Coins className="h-5 w-5" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-foreground">Zero Dependency Costs</h3>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
            Works 100% offline. Ideal for secure corporate intranets, high-speed formatting, or sandbox testing.
          </p>
        </div>

      </section>

      {/* Popular Tools Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <Sparkles className="h-4.5 w-4.5 text-indigo-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Most Popular Tools
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "JSON Formatter", slug: "json-formatter", icon: "Braces", desc: "Format and clean JSON code" },
            { name: "JSON Validator", slug: "json-validator", icon: "FileCheck", desc: "Validate syntax in real time" },
            { name: "HTML to JSX", slug: "html-to-jsx", icon: "Component", desc: "Convert HTML elements to JSX" },
            { name: "SQL Formatter", slug: "sql-formatter", icon: "Database", desc: "Format database SQL queries" },
            { name: "UUID Generator", slug: "uuid-generator", icon: "FileCheck2", desc: "Generate RFC v4 UUIDs" },
            { name: "Password Generator", slug: "password-generator", icon: "KeyRound", desc: "Generate high-entropy keys" },
            { name: "Base64 Encoder", slug: "base64-encoder", icon: "Binary", desc: "Encode text to Base64 format" },
            { name: "JWT Decoder", slug: "jwt-decoder", icon: "Key", desc: "Decode JWT payloads locally" },
          ].map((pop) => (
            <Link
              key={pop.slug}
              href={`/${pop.slug}`}
              className="group flex flex-col justify-between rounded-xl border border-border bg-card p-4 shadow-2xs hover:border-indigo-500/40 hover:shadow-xs transition-all duration-300"
            >
              <div className="space-y-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/15 dark:text-indigo-400 border border-indigo-500/10">
                  <ToolIcon name={pop.icon} className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {pop.name}
                  </h3>
                  <p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5 font-medium">
                    {pop.desc}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-0.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 mt-4 group-hover:translate-x-1 transition-transform duration-200">
                <span>Open</span>
                <ArrowRight className="h-2.5 w-2.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
          {/* Categories select pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {categoryList.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/80" />
            <input
              type="text"
              placeholder="Search offline tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 rounded-full border border-border bg-card text-xs sm:text-sm placeholder:text-muted-foreground outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all font-semibold"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground rounded-full hover:bg-secondary transition-all cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Tools Cards Grid */}
        <div>
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs hover:border-indigo-500/40 hover:shadow-md hover:shadow-indigo-500/[0.02] transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* Icon and Category */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/15 dark:text-indigo-400 border border-indigo-500/10">
                        <ToolIcon name={tool.icon} className="h-4.5 w-4.5" />
                      </div>
                      <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground/85 px-2 py-0.5 rounded-md bg-secondary/80 border border-border/30">
                        {tool.category.split(" ")[0]}
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="space-y-1">
                      <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium line-clamp-2">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 mt-6 pt-4 border-t border-border/30">
                    <span>Launch Tool</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1.5 transition-transform duration-200" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border rounded-3xl bg-secondary/10">
              <Sparkles className="h-10 w-10 text-muted-foreground mb-4 animate-pulse" />
              <h3 className="text-base font-bold text-foreground">No tools found</h3>
              <p className="text-xs sm:text-sm text-muted-foreground/80 mt-1 max-w-xs font-medium">
                We couldn't find any tools matching your keywords or filter parameters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-5 py-2 shadow-sm transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

      </section>

    </div>
  );
}
