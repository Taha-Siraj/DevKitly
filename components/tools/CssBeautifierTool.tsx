"use client";

import React, { useState } from "react";
import { Copy, Trash2, RotateCcw, Download, AlertCircle } from "lucide-react";
import { useToast } from "../ToastProvider";
import { copyToClipboard, downloadAsFile } from "../../lib/utils";

const SAMPLE_CSS = `.container{margin:0 auto;max-width:1200px;padding:2rem}header h1{color:#3b82f6;font-size:2.5rem;font-weight:700}header p{color:#6b7280;margin-top:.5rem}@media (max-width:768px){.container{padding:1rem}header h1{font-size:2rem}}`;

export default function CssBeautifierTool() {
  const [input, setInput] = useState(SAMPLE_CSS);
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState("2");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const beautifyCss = (css: string, indentStr: string): string => {
    let formatted = "";
    let depth = 0;

    // Remove comments temporarily to avoid format breaking
    const comments: string[] = [];
    let cssNoComments = css.replace(/\/\*[\s\S]*?\*\//g, (match) => {
      comments.push(match);
      return `___COMMENT_${comments.length - 1}___`;
    });

    let clean = cssNoComments
      .replace(/\s+/g, " ")
      .replace(/\{\s*/g, " {\n")
      .replace(/\}\s*/g, "\n}\n")
      .replace(/;\s*/g, ";\n")
      .replace(/,\s*/g, ", ")
      .trim();

    const lines = clean.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      if (line.startsWith("}")) {
        depth = Math.max(0, depth - 1);
      }

      const spaces = indentStr.repeat(depth);

      if (line.includes(":") && !line.includes("{") && !line.includes("}")) {
        const parts = line.split(":");
        const prop = parts[0].trim();
        const val = parts.slice(1).join(":").trim();
        formatted += `${spaces}${prop}: ${val}\n`;
      } else {
        formatted += `${spaces}${line}\n`;
      }

      if (line.endsWith("{")) {
        depth++;
      }
    }

    // Restore comments
    let finalCss = formatted.replace(/\n\s*\n/g, "\n").trim();
    comments.forEach((comment, idx) => {
      finalCss = finalCss.replace(`___COMMENT_${idx}___`, comment);
    });

    return finalCss;
  };

  const handleBeautify = () => {
    if (!input.trim()) {
      setError("Please input some CSS rules.");
      return;
    }
    try {
      const indentVal = indent === "tab" ? "\t" : " ".repeat(parseInt(indent));
      const result = beautifyCss(input, indentVal);
      setOutput(result);
      setError(null);
      toast("CSS beautified successfully!");
    } catch (e: any) {
      setError(e.message || "Invalid CSS syntax.");
      setOutput("");
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    const success = await copyToClipboard(output);
    if (success) {
      toast("Copied CSS stylesheet!");
    }
  };

  const handleDownload = () => {
    if (!output) return;
    downloadAsFile("styles.css", output, "text/css");
    toast("Downloaded CSS file!");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const handleReset = () => {
    setInput(SAMPLE_CSS);
    setOutput("");
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-muted-foreground">Indentation:</label>
          <select
            value={indent}
            onChange={(e) => setIndent(e.target.value)}
            className="bg-secondary/50 border border-border rounded-lg text-xs px-2.5 py-1.5 outline-none focus:border-indigo-500 font-semibold"
          >
            <option value="2">2 Spaces</option>
            <option value="4">4 Spaces</option>
            <option value="tab">Tab</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleBeautify}
            className="bg-indigo-600 text-white rounded-lg text-xs font-semibold px-4 py-2 hover:bg-indigo-500 transition-colors shadow-sm"
          >
            Beautify CSS
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 bg-secondary border border-border rounded-lg text-xs font-semibold px-3 py-2 hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-all"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-1 bg-secondary border border-border rounded-lg text-xs font-semibold px-3 py-2 hover:bg-secondary/80 text-muted-foreground hover:text-destructive transition-all"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Editor panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Minified CSS Input</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste raw minified CSS styles here..."
            className="flex-1 min-h-[350px] w-full font-mono text-xs p-4 bg-secondary/20 border border-border rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 outline-none resize-y transition-all"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center h-5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Beautified CSS Output</span>
            {output && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors"
                  title="Copy"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={handleDownload}
                  className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors"
                  title="Download"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Formatted CSS will appear here..."
            className="flex-1 min-h-[350px] w-full font-mono text-xs p-4 bg-secondary/10 border border-border rounded-xl outline-none resize-y cursor-text select-text"
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 border border-red-500/20 bg-red-500/10 rounded-xl p-4 text-red-500 text-xs">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p className="font-mono">{error}</p>
        </div>
      )}
    </div>
  );
}
