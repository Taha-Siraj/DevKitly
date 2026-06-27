"use client";

import React, { useState } from "react";
import { Copy, Trash2, RotateCcw, Download, AlertCircle } from "lucide-react";
import { useToast } from "../ToastProvider";
import { copyToClipboard, downloadAsFile } from "../../lib/utils";

const SAMPLE_HTML = `<div class="card" style="margin-top: 20px; border-radius: 8px;">
  <label for="username">Username</label>
  <input type="text" id="username" class="input-field">
  <br>
  <button onclick="submitForm()">Submit</button>
</div>`;

export default function HtmlToJsx() {
  const [input, setInput] = useState(SAMPLE_HTML);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const convertStyle = (styleStr: string): string => {
    const declarations = styleStr.split(";").filter((d) => d.trim() !== "");
    const styleObjArr = declarations.map((d) => {
      const parts = d.split(":");
      if (parts.length < 2) return null;
      const key = parts[0].trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      const val = parts.slice(1).join(":").trim();
      return `${key}: "${val.replace(/"/g, '\\"')}"`;
    }).filter(Boolean);
    return `style={{ ${styleObjArr.join(", ")} }}`;
  };

  const handleConvert = () => {
    if (!input.trim()) {
      setError("Please input some HTML code.");
      return;
    }
    try {
      let jsx = input;

      // Class and attributes maps
      jsx = jsx.replace(/\bclass=/g, "className=");
      jsx = jsx.replace(/\bfor=/g, "htmlFor=");
      jsx = jsx.replace(/\btabindex=/g, "tabIndex=");
      jsx = jsx.replace(/\breadonly=/g, "readOnly=");
      jsx = jsx.replace(/\bmaxlength=/g, "maxLength=");
      jsx = jsx.replace(/\bautocomplete=/g, "autoComplete=");
      
      // Events mapping
      jsx = jsx.replace(/\bonclick=/g, "onClick=");
      jsx = jsx.replace(/\bonsubmit=/g, "onSubmit=");
      jsx = jsx.replace(/\bonchange=/g, "onChange=");

      // Convert inline style attribute
      jsx = jsx.replace(/style="([^"]*)"/g, (match, styleStr) => convertStyle(styleStr));

      // Force self closing tags
      const selfClosingTags = ["img", "input", "br", "hr", "link", "meta", "source"];
      selfClosingTags.forEach((tag) => {
        const regex = new RegExp(`<(${tag})([^>]*?)(?<!\\/)>`, "gi");
        jsx = jsx.replace(regex, `<$1$2 />`);
      });

      setOutput(jsx);
      setError(null);
      toast("Successfully converted to JSX!");
    } catch (e: any) {
      setError(e.message || "Conversion failed.");
      setOutput("");
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    const success = await copyToClipboard(output);
    if (success) {
      toast("Copied JSX!");
    }
  };

  const handleDownload = () => {
    if (!output) return;
    downloadAsFile("component.jsx", output, "text/javascript");
    toast("Downloaded JSX file!");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const handleReset = () => {
    setInput(SAMPLE_HTML);
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
          Convert to JSX
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

      {/* Editors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">HTML Input</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your HTML elements here..."
            className="flex-1 min-h-[350px] w-full font-mono text-xs p-4 bg-secondary/20 border border-border rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 outline-none resize-y transition-all"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center h-5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">JSX Output</span>
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
            placeholder="React JSX code will appear here..."
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
