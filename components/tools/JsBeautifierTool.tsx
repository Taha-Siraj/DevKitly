"use client";

import React, { useState } from "react";
import { Copy, Trash2, RotateCcw, Download, AlertCircle } from "lucide-react";
import { useToast } from "../ToastProvider";
import { copyToClipboard, downloadAsFile } from "../../lib/utils";

const SAMPLE_JS = `function calculateSum(a,b){if(a===null||b===null){return 0;}let sum=a+b;console.log("Calculated sum:",sum);return sum;}const result=calculateSum(10,20);`;

export default function JsBeautifierTool() {
  const [input, setInput] = useState(SAMPLE_JS);
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState("2");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const beautifyJs = (js: string, indentStr: string): string => {
    let formatted = "";
    let depth = 0;

    // Clean basic tokens
    let clean = js
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

      if (line.startsWith("}") || line.startsWith("]")) {
        depth = Math.max(0, depth - 1);
      }

      const spaces = indentStr.repeat(depth);
      
      // Polish operators spacing
      let formattedLine = line
        .replace(/\s*(=|\+|-|\*|\/|<|>|===|!==|==|!=)\s*/g, " $1 ")
        .replace(/\s*(=>)\s*/g, " => ")
        .replace(/\s*(,)\s*/g, ", ")
        .replace(/\s*(\+ \+)\s*/g, "++")
        .replace(/\s*(- -)\s*/g, "--")
        .replace(/  +/g, " ")
        .trim();

      formatted += `${spaces}${formattedLine}\n`;

      if (line.endsWith("{") || line.endsWith("[")) {
        depth++;
      }
    }

    return formatted.trim();
  };

  const handleBeautify = () => {
    if (!input.trim()) {
      setError("Please input some JavaScript/TypeScript code.");
      return;
    }
    try {
      const indentVal = indent === "tab" ? "\t" : " ".repeat(parseInt(indent));
      const result = beautifyJs(input, indentVal);
      setOutput(result);
      setError(null);
      toast("JS beautified successfully!");
    } catch (e: any) {
      setError(e.message || "Invalid syntax.");
      setOutput("");
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    const success = await copyToClipboard(output);
    if (success) {
      toast("Copied JS script!");
    }
  };

  const handleDownload = () => {
    if (!output) return;
    downloadAsFile("script.js", output, "application/javascript");
    toast("Downloaded JS script file!");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const handleReset = () => {
    setInput(SAMPLE_JS);
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
            Beautify JS
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
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Minified JS Input</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste raw minified JavaScript code here..."
            className="flex-1 min-h-[350px] w-full font-mono text-xs p-4 bg-secondary/20 border border-border rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 outline-none resize-y transition-all"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center h-5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Beautified JS Output</span>
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
            placeholder="Beautified JavaScript code will appear here..."
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
