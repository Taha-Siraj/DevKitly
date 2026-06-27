"use client";

import React, { useState } from "react";
import { Copy, Trash2, RotateCcw, Download, AlertCircle } from "lucide-react";
import { useToast } from "../ToastProvider";
import { copyToClipboard, downloadAsFile } from "../../lib/utils";

const SAMPLE_JSX = `<div className="card" style={{ marginTop: "20px", borderRadius: "8px" }}>
  <label htmlFor="username">Username</label>
  <input type="text" id="username" className="input-field" />
  <br />
  <button onClick={submitForm}>Submit</button>
</div>`;

export default function JsxToHtml() {
  const [input, setInput] = useState(SAMPLE_JSX);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const convertJsxStyle = (styleStr: string): string => {
    try {
      const declarations = styleStr.split(",").filter((d) => d.trim() !== "");
      const cssRules = declarations.map((d) => {
        const parts = d.split(":");
        if (parts.length < 2) return null;
        const key = parts[0].trim().replace(/([A-Z])/g, "-$1").toLowerCase();
        const val = parts.slice(1).join(":").trim().replace(/^['"]|['"]$/g, "");
        return `${key}: ${val};`;
      }).filter(Boolean);
      return `style="${cssRules.join(" ")}"`;
    } catch (e) {
      return `style=""`;
    }
  };

  const handleConvert = () => {
    if (!input.trim()) {
      setError("Please input some JSX code.");
      return;
    }
    try {
      let html = input;

      // Attributes mapping
      html = html.replace(/\bclassName=/g, "class=");
      html = html.replace(/\bhtmlFor=/g, "for=");
      html = html.replace(/\btabIndex=/g, "tabindex=");
      html = html.replace(/\breadOnly=/g, "readonly=");
      html = html.replace(/\bmaxLength=/g, "maxlength=");
      html = html.replace(/\bautoComplete=/g, "autocomplete=");
      
      // Events mapping
      html = html.replace(/\bonClick=\{[^}]+\}/g, 'onclick=""');
      html = html.replace(/\bonSubmit=\{[^}]+\}/g, 'onsubmit=""');
      html = html.replace(/\bonChange=\{[^}]+\}/g, 'onchange=""');

      // Convert style objects
      html = html.replace(/style=\{\{\s*([\s\S]*?)\s*\}\}/g, (match, styleStr) => convertJsxStyle(styleStr));

      // Expand self closing tags for non-void elements
      const normalTags = ["div", "span", "p", "h1", "h2", "h3", "h4", "h5", "h6", "button", "label", "section", "main", "header", "footer", "a", "ul", "ol", "li", "textarea", "select"];
      normalTags.forEach((tag) => {
        const regex = new RegExp(`<(${tag})([^>]*?)\\s*\\/>`, "gi");
        html = html.replace(regex, `<$1$2></$1>`);
      });

      setOutput(html);
      setError(null);
      toast("Successfully converted to HTML!");
    } catch (e: any) {
      setError(e.message || "Conversion failed.");
      setOutput("");
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    const success = await copyToClipboard(output);
    if (success) {
      toast("Copied HTML!");
    }
  };

  const handleDownload = () => {
    if (!output) return;
    downloadAsFile("index.html", output, "text/html");
    toast("Downloaded HTML file!");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const handleReset = () => {
    setInput(SAMPLE_JSX);
    setOutput("");
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap justify-end gap-2 border-b border-border/60 pb-4">
        <button
          onClick={handleConvert}
          className="bg-indigo-600 text-white rounded-lg text-xs font-semibold px-4 py-2 hover:bg-indigo-500 transition-colors shadow-sm"
        >
          Convert to HTML
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

      {/* Editor panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">JSX Input</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your React JSX here..."
            className="flex-1 min-h-[350px] w-full font-mono text-xs p-4 bg-secondary/20 border border-border rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 outline-none resize-y transition-all"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center h-5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">HTML Output</span>
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
            placeholder="HTML code will appear here..."
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
