"use client";

import React, { useState } from "react";
import { Copy, Trash2, RotateCcw, Download, AlertCircle } from "lucide-react";
import { useToast } from "../ToastProvider";
import { copyToClipboard, downloadAsFile } from "../../lib/utils";

const SAMPLE_CSV = `id,name,username,email,address.street,address.city,active
1,Leanne Graham,Bret,Sincere@april.biz,Kulas Light,Gwenborough,true
2,Ervin Howell,Antonette,Shanna@melissa.tv,Victor Plains,Wisokyburgh,false`;

export default function CsvToJson() {
  const [input, setInput] = useState(SAMPLE_CSV);
  const [output, setOutput] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const parseCsvLine = (text: string, delim: string): string[] => {
    const result = [];
    let inQuotes = false;
    let currentVal = "";
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '"') {
        if (inQuotes && text[i + 1] === '"') {
          currentVal += '"';
          i++; // skip next char
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === delim && !inQuotes) {
        result.push(currentVal.trim());
        currentVal = "";
      } else {
        currentVal += char;
      }
    }
    result.push(currentVal.trim());
    return result;
  };

  const handleConvert = () => {
    if (!input.trim()) {
      setError("Please input some CSV content.");
      return;
    }
    try {
      const lines = input.split(/\r?\n/).filter((l) => l.trim() !== "");
      if (lines.length < 2) {
        setError("CSV must contain at least a header row and one data row.");
        return;
      }

      const headers = parseCsvLine(lines[0], delimiter);
      const jsonArr: any[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = parseCsvLine(lines[i], delimiter);
        const obj: any = {};

        for (let j = 0; j < headers.length; j++) {
          const key = headers[j];
          if (!key) continue;
          
          let val = values[j] !== undefined ? values[j] : "";
          
          // Parse primitive types
          let parsedVal: any = val;
          if (val.toLowerCase() === "true") {
            parsedVal = true;
          } else if (val.toLowerCase() === "false") {
            parsedVal = false;
          } else if (val.toLowerCase() === "null") {
            parsedVal = null;
          } else if (val !== "" && !isNaN(Number(val))) {
            parsedVal = Number(val);
          }

          // Unflatten nested objects if using dot notation (e.g. address.city)
          if (key.includes(".")) {
            const parts = key.split(".");
            let current = obj;
            for (let k = 0; k < parts.length - 1; k++) {
              const part = parts[k];
              if (!current[part]) current[part] = {};
              current = current[part];
            }
            current[parts[parts.length - 1]] = parsedVal;
          } else {
            obj[key] = parsedVal;
          }
        }
        jsonArr.push(obj);
      }

      setOutput(JSON.stringify(jsonArr, null, 2));
      setError(null);
      toast("Successfully converted to JSON!");
    } catch (e: any) {
      setError(e.message || "Invalid CSV layout.");
      setOutput("");
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    const success = await copyToClipboard(output);
    if (success) {
      toast("Copied JSON output!");
    }
  };

  const handleDownload = () => {
    if (!output) return;
    downloadAsFile("data.json", output, "application/json");
    toast("Downloaded JSON file!");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const handleReset = () => {
    setInput(SAMPLE_CSV);
    setOutput("");
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Settings bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-muted-foreground">Delimiter:</label>
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            className="bg-secondary/50 border border-border rounded-lg text-xs px-2.5 py-1.5 outline-none focus:border-indigo-500 font-semibold"
          >
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="&#9;">Tab (\t)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleConvert}
            className="bg-indigo-600 text-white rounded-lg text-xs font-semibold px-4 py-2 hover:bg-indigo-500 transition-colors shadow-sm"
          >
            Convert to JSON
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
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">CSV Input</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your CSV data here..."
            className="flex-1 min-h-[350px] w-full font-mono text-xs p-4 bg-secondary/20 border border-border rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 outline-none resize-y transition-all"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center h-5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">JSON Output</span>
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
            placeholder="JSON output array will appear here..."
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
