"use client";

import React, { useState } from "react";
import { Copy, Trash2, RotateCcw, Download, AlertCircle } from "lucide-react";
import { useToast } from "../ToastProvider";
import { copyToClipboard, downloadAsFile } from "../../lib/utils";

const SAMPLE_HTML = `<div class="container" id="main"><header><h1>Welcome to DevKitly</h1><p>The developer tools suite</p></header><main><section><h2>Offline Tools</h2><ul><li>Fast</li><li>Private</li><li>Free</li></ul><img src="/logo.png" alt="logo"></section></main></div>`;

export default function HtmlFormatterTool() {
  const [input, setInput] = useState(SAMPLE_HTML);
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState("2");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const formatHtmlNode = (node: Node, indentStr = "  ", depth = 0): string => {
    const spaces = indentStr.repeat(depth);
    
    if (node.nodeType === Node.TEXT_NODE) {
      const val = node.nodeValue?.trim();
      return val ? `${spaces}${val}` : "";
    }
    
    if (node.nodeType === Node.COMMENT_NODE) {
      return `${spaces}<!--${node.nodeValue}-->`;
    }
    
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();
      
      const selfClosing = ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"];
      
      let attrs = "";
      if (element.attributes.length > 0) {
        attrs = " " + Array.from(element.attributes).map(a => `${a.nodeName}="${a.nodeValue}"`).join(" ");
      }
      
      if (selfClosing.includes(tagName)) {
        return `${spaces}<${tagName}${attrs}>`;
      }
      
      const children = Array.from(element.childNodes);
      const childStrings = children
        .map((c) => formatHtmlNode(c, indentStr, depth + 1))
        .filter((s) => s.trim() !== "");
        
      if (childStrings.length === 0) {
        return `${spaces}<${tagName}${attrs}></${tagName}>`;
      }
      
      if (childStrings.length === 1 && children[0].nodeType === Node.TEXT_NODE && children[0].nodeValue && children[0].nodeValue.trim().length < 50) {
        return `${spaces}<${tagName}${attrs}>${children[0].nodeValue.trim()}</${tagName}>`;
      }
      
      return `${spaces}<${tagName}${attrs}>\n${childStrings.join("\n")}\n${spaces}</${tagName}>`;
    }
    
    return "";
  };

  const handleFormat = () => {
    if (!input.trim()) {
      setError("Please input some HTML code.");
      return;
    }
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, "text/html");
      
      const parserError = doc.querySelector("parsererror");
      if (parserError) {
        setError(parserError.textContent || "HTML syntax parser error.");
        setOutput("");
        return;
      }

      const body = doc.body;
      const indentVal = indent === "tab" ? "\t" : " ".repeat(parseInt(indent));
      
      const formatted = Array.from(body.childNodes)
        .map((node) => formatHtmlNode(node, indentVal, 0))
        .filter((s) => s.trim() !== "")
        .join("\n");

      setOutput(formatted);
      setError(null);
      toast("HTML formatted successfully!");
    } catch (e: any) {
      setError(e.message || "Invalid HTML syntax.");
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
    setInput(SAMPLE_HTML);
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
            onClick={handleFormat}
            className="bg-indigo-600 text-white rounded-lg text-xs font-semibold px-4 py-2 hover:bg-indigo-500 transition-colors shadow-sm"
          >
            Format HTML
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
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Raw HTML Input</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste messy HTML code here..."
            className="flex-1 min-h-[350px] w-full font-mono text-xs p-4 bg-secondary/20 border border-border rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 outline-none resize-y transition-all"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center h-5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Formatted HTML Output</span>
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
            placeholder="Formatted HTML will appear here..."
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
