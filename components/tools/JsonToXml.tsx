"use client";

import React, { useState } from "react";
import { Copy, Trash2, RotateCcw, Download, AlertCircle } from "lucide-react";
import { useToast } from "../ToastProvider";
import { copyToClipboard, downloadAsFile } from "../../lib/utils";

const SAMPLE_JSON = `{
  "note": {
    "to": "Tove",
    "from": "Jani",
    "heading": "Reminder",
    "body": "Don't forget me this weekend!",
    "items": ["Milk", "Bread", "Eggs"]
  }
}`;

export default function JsonToXml() {
  const [input, setInput] = useState(SAMPLE_JSON);
  const [output, setOutput] = useState("");
  const [rootTag, setRootTag] = useState("root");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const jsonToXmlStr = (obj: any, tagName: string, indent = "  ", depth = 0): string => {
    const spaces = indent.repeat(depth);
    
    if (obj === null || obj === undefined) {
      return `${spaces}<${tagName} />`;
    }
    
    if (typeof obj !== "object") {
      const escaped = String(obj)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
      return `${spaces}<${tagName}>${escaped}</${tagName}>`;
    }
    
    if (Array.isArray(obj)) {
      return obj.map((item) => jsonToXmlStr(item, "item", indent, depth)).join("\n");
    }
    
    const children: string[] = [];
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const val = obj[key];
        const cleanTag = key.replace(/[^a-zA-Z0-9_-]/g, "_");
        if (Array.isArray(val)) {
          val.forEach((item) => {
            children.push(jsonToXmlStr(item, cleanTag, indent, depth + 1));
          });
        } else {
          children.push(jsonToXmlStr(val, cleanTag, indent, depth + 1));
        }
      }
    }
    
    if (children.length === 0) {
      return `${spaces}<${tagName} />`;
    }
    
    return `${spaces}<${tagName}>\n${children.join("\n")}\n${spaces}</${tagName}>`;
  };

  const handleConvert = () => {
    if (!input.trim()) {
      setError("Please input some JSON content.");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const cleanRoot = rootTag.trim().replace(/[^a-zA-Z0-9_-]/g, "_") || "root";
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` + jsonToXmlStr(parsed, cleanRoot);
      setOutput(xml);
      setError(null);
      toast("Successfully converted to XML!");
    } catch (e: any) {
      setError(e.message || "Invalid JSON syntax.");
      setOutput("");
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    const success = await copyToClipboard(output);
    if (success) {
      toast("Copied XML output!");
    }
  };

  const handleDownload = () => {
    if (!output) return;
    downloadAsFile("data.xml", output, "application/xml");
    toast("Downloaded XML file!");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const handleReset = () => {
    setInput(SAMPLE_JSON);
    setOutput("");
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-muted-foreground">Root Element Name:</label>
          <input
            type="text"
            value={rootTag}
            onChange={(e) => setRootTag(e.target.value)}
            placeholder="root"
            className="bg-secondary/50 border border-border rounded-lg text-xs px-2.5 py-1.5 outline-none focus:border-indigo-500 font-semibold max-w-[120px]"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleConvert}
            className="bg-indigo-600 text-white rounded-lg text-xs font-semibold px-4 py-2 hover:bg-indigo-500 transition-colors shadow-sm"
          >
            Convert to XML
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

      {/* Editor grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">JSON Input</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste raw JSON here..."
            className="flex-1 min-h-[350px] w-full font-mono text-xs p-4 bg-secondary/20 border border-border rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 outline-none resize-y transition-all"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center h-5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">XML Output</span>
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
            placeholder="XML output will appear here..."
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
