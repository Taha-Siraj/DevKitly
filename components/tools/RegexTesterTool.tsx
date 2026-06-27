"use client";

import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle, Search, Info } from "lucide-react";
import { useToast } from "../ToastProvider";

export default function RegexTesterTool() {
  const [pattern, setPattern] = useState("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
  const [flags, setFlags] = useState({ g: true, i: true, m: false, s: false });
  const [testText, setTestText] = useState("Contact us at tahasiraj610@gmail.com or admin@example.org for inquiries.");
  const [highlightedHtml, setHighlightedHtml] = useState("");
  const [matchCount, setMatchCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!pattern) {
      setHighlightedHtml(testText);
      setMatchCount(0);
      setError(null);
      return;
    }

    try {
      const activeFlags = Object.entries(flags)
        .filter(([_, active]) => active)
        .map(([flag]) => flag)
        .join("");

      const regex = new RegExp(pattern, activeFlags);
      setError(null);

      // Escape HTML entities to prevent XSS
      const escapedText = testText
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      let count = 0;
      let highlighted = "";

      if (activeFlags.includes("g")) {
        // Global matching
        count = (testText.match(regex) || []).length;
        highlighted = escapedText.replace(regex, (match) => {
          return `<mark class="bg-indigo-500/25 border-b border-indigo-500 text-foreground font-semibold px-0.5 py-0.5 rounded font-mono">${match}</mark>`;
        });
      } else {
        // Non-global: highlights first match only
        const match = testText.match(regex);
        if (match && match.index !== undefined) {
          count = 1;
          const matchValue = match[0];
          const before = escapedText.substring(0, match.index);
          const after = escapedText.substring(match.index + matchValue.length);
          highlighted = before + `<mark class="bg-indigo-500/25 border-b border-indigo-500 text-foreground font-semibold px-0.5 py-0.5 rounded font-mono">${matchValue}</mark>` + after;
        } else {
          highlighted = escapedText;
        }
      }

      setMatchCount(count);
      setHighlightedHtml(highlighted);
    } catch (e: any) {
      setError(e.message || "Invalid RegExp pattern.");
      setMatchCount(0);
      setHighlightedHtml(testText);
    }
  }, [pattern, flags, testText]);

  const toggleFlag = (flag: "g" | "i" | "m" | "s") => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  };

  return (
    <div className="space-y-6">
      {/* Editor top row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-border/60 pb-4">
        {/* Pattern Input */}
        <div className="md:col-span-2 flex flex-col space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Regular Expression</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-muted-foreground font-mono text-sm">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="e.g. [a-z]+"
              className="w-full bg-secondary/20 border border-border rounded-lg pl-6 pr-12 py-2 text-xs font-mono outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 transition-all text-foreground"
            />
            <span className="absolute right-3 top-2.5 text-muted-foreground font-mono text-sm">/</span>
          </div>
        </div>

        {/* Flags Selector */}
        <div className="flex flex-col space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Flags</label>
          <div className="flex items-center gap-3 py-1.5 px-3 border border-border rounded-lg bg-secondary/10">
            {[
              { id: "g", label: "g", desc: "global" },
              { id: "i", label: "i", desc: "ignore case" },
              { id: "m", label: "m", desc: "multiline" },
              { id: "s", label: "s", desc: "dotAll" }
            ].map((f) => (
              <label
                key={f.id}
                title={f.desc}
                className="flex items-center gap-1.5 text-xs font-mono font-bold cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={(flags as any)[f.id]}
                  onChange={() => toggleFlag(f.id as any)}
                  className="rounded bg-secondary/50 border-border text-indigo-600 focus:ring-indigo-500"
                />
                <span>{f.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 border border-red-500/20 bg-red-500/10 rounded-xl p-4 text-red-500 text-xs">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p className="font-mono">{error}</p>
        </div>
      )}

      {/* Test Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Test Text input */}
        <div className="flex flex-col space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Test Text</span>
          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            placeholder="Type your test sentences here..."
            className="flex-1 min-h-[220px] w-full font-mono text-xs p-4 bg-secondary/20 border border-border rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 outline-none resize-y transition-all"
          />
        </div>

        {/* Highlights Display */}
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center h-5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Matches Highlight</span>
            {matchCount > 0 && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                <Search className="h-3 w-3" /> {matchCount} {matchCount === 1 ? "match" : "matches"}
              </span>
            )}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: highlightedHtml || `<span class="text-muted-foreground/50 italic">No matches.</span>` }}
            className="flex-1 min-h-[220px] p-4 bg-secondary/10 border border-border rounded-xl font-mono text-xs whitespace-pre-wrap break-all overflow-y-auto max-h-[350px] leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
