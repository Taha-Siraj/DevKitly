"use client";

import React, { useState, useRef } from "react";
import { Copy, Trash2, RotateCcw, Download, Upload, AlertCircle, FileCode } from "lucide-react";
import { useToast } from "../ToastProvider";
import { copyToClipboard, downloadAsFile } from "../../lib/utils";

export default function Base64Encoder() {
  const [inputText, setInputText] = useState("Hello World!");
  const [outputText, setOutputText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [urlSafe, setUrlSafe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleEncode = () => {
    if (!inputText.trim()) {
      setError("Please input some text to encode.");
      return;
    }
    try {
      // Handles UTF-8 Unicode characters safely in browser btoa
      const bytes = new TextEncoder().encode(inputText);
      let base64 = btoa(String.fromCharCode(...bytes));

      if (urlSafe) {
        base64 = base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      }

      setOutputText(base64);
      setError(null);
      toast("Text encoded successfully!");
    } catch (e: any) {
      setError(e.message || "Encoding failed.");
      setOutputText("");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      let result = reader.result as string;
      if (urlSafe) {
        result = result.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      }
      setOutputText(result);
      setInputText(`[File: ${file.name} - ${file.size} bytes]`);
      setError(null);
      toast("File encoded to Base64 Data URL!");
    };
    reader.onerror = () => {
      setError("Failed to read file.");
      toast("File upload failed", "error");
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = async () => {
    if (!outputText) return;
    const success = await copyToClipboard(outputText);
    if (success) {
      toast("Copied Base64 string!");
    }
  };

  const handleDownload = () => {
    if (!outputText) return;
    downloadAsFile("encoded.txt", outputText, "text/plain");
    toast("Downloaded Base64 text!");
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setFileName(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleReset = () => {
    setInputText("Hello World!");
    setOutputText("");
    setFileName(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-6">
      {/* Configuration */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={urlSafe}
              onChange={(e) => setUrlSafe(e.target.checked)}
              className="rounded bg-secondary/50 border-border text-indigo-600 focus:ring-indigo-500"
            />
            <span>URL-Safe Base64</span>
          </label>

          <label className="flex items-center gap-1.5 text-xs font-semibold bg-secondary border border-border rounded-lg px-3 py-1.5 hover:bg-secondary/80 text-muted-foreground hover:text-foreground cursor-pointer transition-all">
            <Upload className="h-3.5 w-3.5" />
            <span>Upload File</span>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          {fileName && <span className="text-xs font-mono text-muted-foreground truncate max-w-[150px]">{fileName}</span>}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleEncode}
            disabled={!!fileName}
            className="bg-indigo-600 text-white rounded-lg text-xs font-semibold px-4 py-2 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            Encode Text
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

      {/* Editors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Text Input</span>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={!!fileName}
            placeholder="Type or paste your text to encode..."
            className="flex-1 min-h-[350px] w-full font-mono text-xs p-4 bg-secondary/20 border border-border rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 outline-none resize-y disabled:opacity-75 disabled:bg-secondary/10 transition-all"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center h-5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Base64 Output</span>
            {outputText && (
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
            value={outputText}
            placeholder="Base64 encoded string will appear here..."
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
