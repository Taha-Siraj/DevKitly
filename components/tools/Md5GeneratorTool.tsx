"use client";

import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { Copy, Trash2, RotateCcw, Upload, File } from "lucide-react";
import { useToast } from "../ToastProvider";
import { copyToClipboard } from "../../lib/utils";

export default function Md5GeneratorTool() {
  const [inputText, setInputText] = useState("DevKitly MD5");
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [hash, setHash] = useState("");
  const { toast } = useToast();

  const arrayBufferToWordArray = (ab: ArrayBuffer): CryptoJS.lib.WordArray => {
    const i8a = new Uint8Array(ab);
    const a: number[] = [];
    for (let i = 0; i < i8a.length; i += 4) {
      a.push(
        (i8a[i] << 24) |
        (i8a[i + 1] << 16) |
        (i8a[i + 2] << 8) |
        i8a[i + 3]
      );
    }
    return CryptoJS.lib.WordArray.create(a, i8a.length);
  };

  useEffect(() => {
    if (fileName) return; // Keep file hash if active
    if (!inputText) {
      setHash("");
      return;
    }
    const md5Val = CryptoJS.MD5(inputText).toString();
    setHash(md5Val);
  }, [inputText, fileName]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileSize(file.size);
    setInputText(`[File Checksum: ${file.name}]`);

    const reader = new FileReader();
    reader.onload = (event) => {
      const ab = event.target?.result as ArrayBuffer;
      if (ab) {
        const wordArray = arrayBufferToWordArray(ab);
        const md5Val = CryptoJS.MD5(wordArray).toString();
        setHash(md5Val);
        toast("File MD5 checksum calculated!");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleCopy = async () => {
    if (!hash) return;
    const success = await copyToClipboard(hash);
    if (success) {
      toast("Copied MD5 hash!");
    }
  };

  const handleClear = () => {
    setInputText("");
    setHash("");
    setFileName(null);
    setFileSize(null);
  };

  const handleReset = () => {
    setInputText("DevKitly MD5");
    setFileName(null);
    setFileSize(null);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs font-semibold bg-secondary border border-border rounded-lg px-3 py-1.5 hover:bg-secondary/80 text-muted-foreground hover:text-foreground cursor-pointer transition-all">
            <Upload className="h-3.5 w-3.5" />
            <span>Select File Checksum</span>
            <input type="file" onChange={handleFileUpload} className="hidden" />
          </label>
          {fileName && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono truncate max-w-[200px]">
              <File className="h-3.5 w-3.5 flex-shrink-0" />
              <span>{fileName} ({Math.round(fileSize! / 1024)} KB)</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
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

      {/* Editor layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Input Text</span>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={!!fileName}
            placeholder="Type or paste your text to calculate MD5 checksum..."
            className="flex-1 min-h-[150px] w-full font-mono text-xs p-4 bg-secondary/20 border border-border rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 outline-none resize-y disabled:opacity-75 disabled:bg-secondary/10 transition-all"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center h-5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">MD5 Hex Digest</span>
            {hash && (
              <button
                onClick={handleCopy}
                className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors"
                title="Copy"
              >
                <Copy className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex-1 min-h-[150px] p-4 bg-secondary/10 border border-border rounded-xl font-mono text-xs text-foreground flex items-center justify-center select-all break-all text-center">
            {hash || <span className="text-muted-foreground/50 italic">Waiting for input...</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
