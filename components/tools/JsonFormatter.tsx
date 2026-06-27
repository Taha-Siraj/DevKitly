"use client";

import React, { useState } from "react";
import { Copy, Trash2, RotateCcw, Download, Check, AlertCircle } from "lucide-react";
import { useToast } from "../ToastProvider";
import { copyToClipboard, downloadAsFile } from "../../lib/utils";

const SAMPLE_JSON = `{
  "project": "DevKitly",
  "status": "active",
  "details": {
    "offline": true,
    "speed": "instant",
    "cost": 0
  },
  "tags": ["developer", "utility", "browser-based"]
}`;

export default function JsonFormatter() {
  const [input, setInput] = useState(SAMPLE_JSON);
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState("2");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFormat = () => {
    if (!input.trim()) {
      setError("Please enter some JSON data.");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const indentVal = indent === "tab" ? "\t" : parseInt(indent);
      const formatted = JSON.stringify(parsed, null, indentVal);
      setOutput(formatted);
      setError(null);
      toast("JSON formatted successfully!");
    } catch (e: any) {
      setError(e.message || "Invalid JSON syntax.");
      setOutput("");
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    const success = await copyToClipboard(output);
    if (success) {
      toast("Copied formatted JSON to clipboard!");
    } else {
      toast("Failed to copy", "error");
    }
  };

  const handleDownload = () => {
    if (!output) return;
    downloadAsFile("formatted.json", output, "application/json");
    toast("Downloaded JSON file!");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    toast("Inputs cleared", "info");
  };

  const handleReset = () => {
    setInput(SAMPLE_JSON);
    setOutput("");
    setError(null);
    toast("Reset to sample JSON", "info");
  };

  return (
    <div className="space-y-6">
      {/* Settings toolbar */}
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
            onClick={handleFormat}
            className="bg-indigo-600 text-white rounded-lg text-xs font-semibold px-4 py-2 hover:bg-indigo-500 transition-colors shadow-sm"
          >
            Format
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 bg-secondary border border-border rounded-lg text-xs font-semibold px-3 py-2 hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-all"
            title="Reset"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-1 bg-secondary border border-border rounded-lg text-xs font-semibold px-3 py-2 hover:bg-secondary/80 text-muted-foreground hover:text-destructive transition-all"
            title="Clear"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Editor panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input pane */}
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Raw Input</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your raw JSON code here..."
            className="flex-1 min-h-[350px] w-full font-mono text-xs p-4 bg-secondary/20 border border-border rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 outline-none resize-y transition-all"
          />
        </div>

        {/* Output pane */}
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center h-5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Formatted Output</span>
            {output && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors"
                  title="Copy formatted JSON"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={handleDownload}
                  className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors"
                  title="Download formatted JSON"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="Formatted JSON will appear here..."
            className="flex-1 min-h-[350px] w-full font-mono text-xs p-4 bg-secondary/10 border border-border/80 rounded-xl outline-none resize-y cursor-text select-text"
          />
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-center gap-3 border border-red-500/20 bg-red-500/10 rounded-xl p-4 text-red-500 text-xs">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p className="font-mono">{error}</p>
        </div>
      )}
    </div>
  );
}
