"use client";

import React from "react";
import Link from "next/link";
import { Terminal, Shield, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/50 bg-card text-muted-foreground transition-colors mt-auto select-none">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
        
        {/* Upper footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand/Pitch */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400 border border-indigo-500/10">
                <Terminal className="h-4 w-4" />
              </div>
              <span className="font-bold text-foreground text-sm tracking-tight">DevKitly</span>
            </div>
            <p className="text-xs font-semibold leading-relaxed max-w-sm">
              DevKitly provides fast, free, privacy-first offline developer tools that work directly in your browser. 
              No signup. No API. No tracking.
            </p>
            <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 border-l-2 border-indigo-500 pl-2 py-0.5">
              Built for developers. Fast. Free. Privacy-first.
            </div>
            <div className="flex items-center gap-1.5 text-[10px] bg-secondary/60 border border-border px-3 py-1.5 rounded-xl max-w-fit font-bold">
              <Shield className="h-3.5 w-3.5 text-emerald-500" />
              <span>100% Local Sandboxed Operations</span>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3.5">
            <h4 className="text-[10px] font-bold text-foreground uppercase tracking-widest">Developer Tools</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <Link href="/category/json-utilities" className="hover:text-indigo-600 transition-colors">JSON Utilities</Link>
              </li>
              <li>
                <Link href="/category/formatters-beautifiers" className="hover:text-indigo-600 transition-colors">Formatters & Beautifiers</Link>
              </li>
              <li>
                <Link href="/category/data-conversions" className="hover:text-indigo-600 transition-colors">Data Conversions</Link>
              </li>
              <li>
                <Link href="/category/encoding-encryption" className="hover:text-indigo-600 transition-colors">Encoding & Encryption</Link>
              </li>
              <li>
                <Link href="/category/generators-utilities" className="hover:text-indigo-600 transition-colors">Generators & Utilities</Link>
              </li>
            </ul>
          </div>

          {/* Legal / EEAT Links */}
          <div className="space-y-3.5">
            <h4 className="text-[10px] font-bold text-foreground uppercase tracking-widest">Trust & Legal</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <Link href="/about" className="hover:text-indigo-600 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-indigo-600 transition-colors">Disclaimer</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-3.5">
            <h4 className="text-[10px] font-bold text-foreground uppercase tracking-widest">Connect</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <a href="mailto:pikachugaming899@gmail.com" className="hover:text-indigo-600 transition-colors">pikachugaming899@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower footer / copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/40 pt-6 text-[10px] font-semibold text-muted-foreground/60">
          <p>© {new Date().getFullYear()} DevKitly. Built client-side for developer privacy.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-indigo-600 transition-colors font-bold">Powered by DevKitly</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
