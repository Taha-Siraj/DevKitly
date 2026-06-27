import React from "react";
import { Terminal, Shield, Cpu, Zap } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - DevKitly",
  description: "Learn more about DevKitly, our mission, and why our offline-first approach makes developer workflows 100% private and secure.",
};

export default function AboutPage() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      
      {/* Page Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          About DevKitly
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground font-semibold">
          Bridging the gap between developer efficiency and absolute data privacy.
        </p>
      </div>

      <hr className="border-border/60" />

      {/* Main Content */}
      <article className="space-y-10 text-xs sm:text-sm text-muted-foreground leading-relaxed font-semibold">
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">Our Philosophy</h2>
          <p>
            As developers, we frequently need to format JSON, decode tokens, convert timestamps, and validate configuration files. Many online utilities process this data on their servers, introducing risks of data leakages, key exposure, and logging sensitive corporate configurations.
          </p>
          <p>
            <strong>DevKitly</strong> is a free collection of privacy-first developer tools. Every tool on our site is designed to run <strong>100% locally inside your browser sandbox</strong>. No APIs, no signup, no tracking. Fast, secure, and offline-first.
          </p>
        </section>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          
          <div className="border border-border bg-secondary/5 rounded-2xl p-5 space-y-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-foreground text-xs sm:text-sm">100% Sandboxed</h3>
            <p className="text-xs text-muted-foreground font-semibold">
              All code execution occurs locally in your browser memory space.
            </p>
          </div>

          <div className="border border-border bg-secondary/5 rounded-2xl p-5 space-y-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-foreground text-xs sm:text-sm">Sub-millisecond Speed</h3>
            <p className="text-xs text-muted-foreground font-semibold">
              Instant computations without waiting for network requests or API response limits.
            </p>
          </div>

          <div className="border border-border bg-secondary/5 rounded-2xl p-5 space-y-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-foreground text-xs sm:text-sm">Works Offline</h3>
            <p className="text-xs text-muted-foreground font-semibold">
              Works perfectly in secure intranets, private sandboxes, or remote offline environments.
            </p>
          </div>

        </section>

        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">How It Works</h2>
          <p>
            When you visit DevKitly, the entire code suite loads directly into your browser. The formatting engine (Next.js & standard parser dependencies) processes your inputs on-the-fly inside memory heaps.
          </p>
          <p>
            This setup is perfect for corporate compliance, financial institutions, and security-conscious individuals working on proprietary source code.
          </p>
        </section>
      </article>

    </div>
  );
}
