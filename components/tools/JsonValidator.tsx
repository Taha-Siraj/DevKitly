"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, RotateCcw, Trash2 } from "lucide-react";
import { useToast } from "../ToastProvider";

const SAMPLE_INVALID_JSON = `{
  "name": "DevKitly",
  "version": 1.0.0,
  "description": "JSON Validator"
  "active": true
}`;

export default function JsonValidator() {
  const [input, setInput] = useState(SAMPLE_INVALID_JSON);
  const [result, setResult] = useState<{ isValid: boolean; message: string; line?: number; col?: number } | null>(null);
  const { toast } = useToast();

  const handleValidate = () => {
    if (!input.trim()) {
      setResult({ isValid: false, message: "Input is empty. Please enter JSON." });
      return;
    }

    try {
      JSON.parse(input);
      setResult({ isValid: true, message: "Valid JSON! Your JSON syntax is perfectly formatted." });
      toast("Valid JSON!", "success");
    } catch (e: any) {
      const message = e.message || "Invalid JSON syntax.";
      let line: number | undefined;
      let col: number | undefined;

      // Extract position if available in standard browser error message
      const match = message.match(/at position (\d+)/) || message.match(/column (\d+) /);
      if (match) {
        const pos = parseInt(match[1]);
        const linesBefore = input.slice(0, pos).split("\n");
        line = linesBefore.length;
        col = linesBefore[linesBefore.length - 1].length + 1;
      } else {
        // Fallback checks for Chrome/Edge or other engines
        const lineMatch = message.match(/line (\d+)/);
        const colMatch = message.match(/column (\d+)/);
        if (lineMatch) line = parseInt(lineMatch[1]);
        if (colMatch) col = parseInt(colMatch[1]);
      }

      setResult({
        isValid: false,
        message,
        line,
        col
      });
      toast("JSON validation failed.", "error");
    }
  };

  const handleClear = () => {
    setInput("");
    setResult(null);
  };

  const handleReset = () => {
    setInput(SAMPLE_INVALID_JSON);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap justify-end gap-2 border-b border-border/60 pb-4">
        <button
          onClick={handleValidate}
          className="bg-indigo-600 text-white rounded-lg text-xs font-semibold px-4 py-2 hover:bg-indigo-500 transition-colors shadow-sm"
        >
          Validate JSON
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

      {/* Editor & Report layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Editor panel */}
        <div className="md:col-span-2 flex flex-col space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">JSON Input</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON content to validate..."
            className="flex-1 min-h-[350px] w-full font-mono text-xs p-4 bg-secondary/20 border border-border rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 outline-none resize-y transition-all"
          />
        </div>

        {/* Validation Result Box */}
        <div className="flex flex-col space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Validation Report</span>
          
          {result === null ? (
            <div className="flex flex-col items-center justify-center p-6 border border-dashed border-border rounded-xl bg-secondary/5 flex-1 min-h-[200px]">
              <AlertCircle className="h-7 w-7 text-muted-foreground/60 mb-2" />
              <p className="text-xs text-muted-foreground text-center">
                Paste JSON and click Validate to review its syntax.
              </p>
            </div>
          ) : result.isValid ? (
            <div className="flex flex-col p-5 border border-emerald-500/20 bg-emerald-500/5 rounded-xl flex-1 space-y-3">
              <div className="flex items-center gap-2 text-emerald-500">
                <CheckCircle2 className="h-5 w-5" />
                <h3 className="text-xs font-bold uppercase">Success</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{result.message}</p>
            </div>
          ) : (
            <div className="flex flex-col p-5 border border-red-500/20 bg-red-500/5 rounded-xl flex-1 space-y-4">
              <div className="flex items-center gap-2 text-red-500">
                <AlertCircle className="h-5 w-5" />
                <h3 className="text-xs font-bold uppercase">Syntax Error</h3>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-mono text-foreground leading-relaxed break-words bg-secondary/40 p-2.5 rounded border border-border">
                  {result.message}
                </p>
                {(result.line !== undefined || result.col !== undefined) && (
                  <div className="grid grid-cols-2 gap-2 text-xs bg-red-500/10 p-2.5 rounded border border-red-500/15">
                    <div>
                      <span className="text-[10px] text-muted-foreground block uppercase font-bold">Line</span>
                      <span className="font-mono font-bold text-red-500">{result.line}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground block uppercase font-bold">Column</span>
                      <span className="font-mono font-bold text-red-500">{result.col}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
