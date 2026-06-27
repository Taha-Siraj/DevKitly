"use client";

import React, { useState } from "react";
import { v4 as uuidv4, v1 as uuidv1 } from "uuid";
import { Copy, Trash2, Download, RefreshCw } from "lucide-react";
import { useToast } from "../ToastProvider";
import { copyToClipboard, downloadAsFile } from "../../lib/utils";

export default function UuidGeneratorTool() {
  const [quantity, setQuantity] = useState(5);
  const [version, setVersion] = useState<"v4" | "v1">("v4");
  const [uppercase, setUppercase] = useState(false);
  const [brackets, setBrackets] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const handleGenerate = () => {
    const list: string[] = [];
    const count = Math.min(100, Math.max(1, quantity));
    
    for (let i = 0; i < count; i++) {
      let id = version === "v4" ? uuidv4() : uuidv1();
      
      if (!hyphens) {
        id = id.replace(/-/g, "");
      }
      
      if (uppercase) {
        id = id.toUpperCase();
      } else {
        id = id.toLowerCase();
      }

      if (brackets) {
        id = `{${id}}`;
      }
      
      list.push(id);
    }

    setOutput(list.join("\n"));
    toast(`Generated ${count} UUIDs!`);
  };

  const handleCopy = async () => {
    if (!output) return;
    const success = await copyToClipboard(output);
    if (success) {
      toast("Copied UUIDs list to clipboard!");
    }
  };

  const handleDownload = () => {
    if (!output) return;
    downloadAsFile("uuids.txt", output, "text/plain");
    toast("Downloaded UUIDs list file!");
  };

  const handleClear = () => {
    setOutput("");
  };

  return (
    <div className="space-y-6">
      {/* Settings bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-muted-foreground">Version:</label>
            <select
              value={version}
              onChange={(e) => setVersion(e.target.value as any)}
              className="bg-secondary/50 border border-border rounded-lg text-xs px-2.5 py-1.5 outline-none focus:border-indigo-500 font-semibold text-foreground"
            >
              <option value="v4">Version 4 (Random)</option>
              <option value="v1">Version 1 (Time-based)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-muted-foreground">Count:</label>
            <input
              type="number"
              min="1"
              max="100"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="bg-secondary/50 border border-border rounded-lg text-xs px-2.5 py-1.5 outline-none focus:border-indigo-500 font-semibold text-foreground max-w-[65px]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerate}
            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold px-4 py-2 flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Generate</span>
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

      {/* Grid: options and output */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Toggle options */}
        <div className="border border-border bg-secondary/5 rounded-xl p-5 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block border-b border-border pb-2">
            Formatting Options
          </span>
          <div className="space-y-3">
            {[
              { id: "uppercase", label: "Uppercase Letters", val: uppercase, setter: setUppercase },
              { id: "hyphens", label: "Include Hyphens", val: hyphens, setter: setHyphens },
              { id: "brackets", label: "Braces Wrap ({...})", val: brackets, setter: setBrackets }
            ].map((opt) => (
              <label key={opt.id} className="flex items-center gap-2.5 text-xs font-semibold text-foreground cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={opt.val}
                  onChange={(e) => opt.setter(e.target.checked)}
                  className="rounded bg-secondary/50 border-border text-indigo-600 focus:ring-indigo-500"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Results output */}
        <div className="md:col-span-2 flex flex-col space-y-2">
          <div className="flex justify-between items-center h-5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Generated UUIDs</span>
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
            placeholder="Click Generate to construct UUID lists..."
            className="flex-1 min-h-[220px] w-full font-mono text-xs p-4 bg-secondary/10 border border-border rounded-xl outline-none resize-y cursor-text select-text"
          />
        </div>
      </div>
    </div>
  );
}
