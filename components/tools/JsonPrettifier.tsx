"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronDown, Copy, Trash2, RotateCcw, FileText, AlertCircle } from "lucide-react";
import { useToast } from "../ToastProvider";
import { copyToClipboard } from "../../lib/utils";

const SAMPLE_JSON = {
  appName: "DevKitly",
  releaseYear: 2026,
  features: {
    offlineCapable: true,
    privacyOriented: true,
    additionalServices: null
  },
  supportedFormats: ["JSON", "YAML", "XML", "CSV"]
};

// Tree node component
interface TreeNodeProps {
  label?: string;
  value: any;
  depth: number;
}

function TreeNode({ label, value, depth }: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState(depth < 2); // Auto-expand first 2 levels

  const isObject = value !== null && typeof value === "object";
  const indentStyle = { paddingLeft: `${depth * 16}px` };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  if (isObject) {
    const isArray = Array.isArray(value);
    const keys = Object.keys(value);
    const isEmpty = keys.length === 0;

    return (
      <div className="font-mono text-xs select-none">
        <div 
          onClick={handleToggle}
          className="flex items-center gap-1 py-1 hover:bg-secondary/40 rounded px-1.5 cursor-pointer group"
          style={indentStyle}
        >
          {!isEmpty && (
            <span>
              {isOpen ? (
                <ChevronDown className="h-3 w-3 text-muted-foreground group-hover:text-foreground" />
              ) : (
                <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-foreground" />
              )}
            </span>
          )}
          {label && <span className="text-indigo-400 font-semibold">{label}: </span>}
          <span className="text-muted-foreground">
            {isArray ? `Array[${keys.length}]` : `Object {${keys.length}}`}
          </span>
        </div>

        {isOpen && !isEmpty && (
          <div className="space-y-0.5 border-l border-border/40 ml-2">
            {keys.map((key) => (
              <TreeNode key={key} label={key} value={value[key]} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Primitive Values rendering
  let valueSpan = null;
  if (value === null) {
    valueSpan = <span className="text-red-400 font-semibold">null</span>;
  } else if (typeof value === "boolean") {
    valueSpan = <span className="text-amber-500 font-semibold">{value ? "true" : "false"}</span>;
  } else if (typeof value === "number") {
    valueSpan = <span className="text-violet-400 font-medium">{value}</span>;
  } else {
    valueSpan = <span className="text-emerald-400">"{value}"</span>;
  }

  return (
    <div className="flex items-start gap-1 py-0.5 hover:bg-secondary/20 rounded px-1.5 font-mono text-xs" style={indentStyle}>
      <span className="h-3 w-3 inline-block" /> {/* Alignment placeholder */}
      {label && <span className="text-indigo-400/90 font-medium">{label}: </span>}
      {valueSpan}
    </div>
  );
}

export default function JsonPrettifier() {
  const [input, setInput] = useState(JSON.stringify(SAMPLE_JSON, null, 2));
  const [parsedData, setParsedData] = useState<any>(SAMPLE_JSON);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePrettify = () => {
    if (!input.trim()) {
      setError("Please input some JSON.");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setParsedData(parsed);
      setError(null);
      toast("JSON prettified!");
    } catch (e: any) {
      setError(e.message || "Invalid JSON syntax.");
      setParsedData(null);
    }
  };

  const handleCopyText = async () => {
    try {
      const formatted = JSON.stringify(parsedData || JSON.parse(input), null, 2);
      await copyToClipboard(formatted);
      toast("Copied formatted JSON text!");
    } catch (e) {
      toast("Failed to copy", "error");
    }
  };

  const handleClear = () => {
    setInput("");
    setParsedData(null);
    setError(null);
  };

  const handleReset = () => {
    setInput(JSON.stringify(SAMPLE_JSON, null, 2));
    setParsedData(SAMPLE_JSON);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Action triggers */}
      <div className="flex flex-wrap justify-end gap-2 border-b border-border/60 pb-4">
        <button
          onClick={handlePrettify}
          className="bg-indigo-600 text-white rounded-lg text-xs font-semibold px-4 py-2 hover:bg-indigo-500 transition-colors shadow-sm"
        >
          Prettify & Parse
        </button>
        <button
          onClick={handleCopyText}
          className="flex items-center gap-1 bg-secondary border border-border rounded-lg text-xs font-semibold px-3 py-2 hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-all"
        >
          <Copy className="h-3.5 w-3.5" />
          <span>Copy JSON Text</span>
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

      {/* Editor & Colorized tree split view */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Raw JSON Editor</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste raw JSON code here..."
            className="flex-1 min-h-[380px] w-full font-mono text-xs p-4 bg-secondary/20 border border-border rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 outline-none resize-y transition-all"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Colorized Interactive Tree</span>
          <div className="flex-1 min-h-[380px] w-full p-4 bg-secondary/10 border border-border/80 rounded-xl overflow-y-auto max-h-[500px]">
            {parsedData ? (
              <div className="space-y-1">
                <TreeNode value={parsedData} depth={0} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <FileText className="h-8 w-8 text-muted-foreground/45 mb-2" />
                <p className="text-xs text-muted-foreground/60">
                  Prettified collapsible structure will render here.
                </p>
              </div>
            )}
          </div>
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
