"use client";

import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { Copy, Trash2, RotateCcw } from "lucide-react";
import { useToast } from "../ToastProvider";
import { copyToClipboard } from "../../lib/utils";

export default function HashGeneratorTool() {
  const [input, setInput] = useState("DevKitly");
  const [hashes, setHashes] = useState({ md5: "", sha1: "", sha256: "" });
  const { toast } = useToast();

  useEffect(() => {
    if (!input) {
      setHashes({ md5: "", sha1: "", sha256: "" });
      return;
    }

    try {
      const md5Val = CryptoJS.MD5(input).toString();
      const sha1Val = CryptoJS.SHA1(input).toString();
      const sha256Val = CryptoJS.SHA256(input).toString();

      setHashes({ md5: md5Val, sha1: sha1Val, sha256: sha256Val });
    } catch (e) {
      // Ignore
    }
  }, [input]);

  const handleCopy = async (text: string, label: string) => {
    if (!text) return;
    const success = await copyToClipboard(text);
    if (success) {
      toast(`Copied ${label} hash!`);
    }
  };

  const handleClear = () => {
    setInput("");
    toast("Inputs cleared", "info");
  };

  const handleReset = () => {
    setInput("DevKitly");
    toast("Reset to default string", "info");
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap justify-end gap-2 border-b border-border/60 pb-4">
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

      {/* Input area */}
      <div className="flex flex-col space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste your text to calculate hashes in real time..."
          className="w-full min-h-[120px] font-mono text-xs p-4 bg-secondary/20 border border-border rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 outline-none resize-y transition-all"
        />
      </div>

      {/* Output Hashes list */}
      <div className="space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
          Calculated Digests
        </span>
        {[
          { label: "MD5", hash: hashes.md5 },
          { label: "SHA-1", hash: hashes.sha1 },
          { label: "SHA-256", hash: hashes.sha256 }
        ].map((item) => (
          <div key={item.label} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-border bg-secondary/15 rounded-xl p-4">
            <div className="truncate">
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-0.5">{item.label}</span>
              <span className="font-mono text-xs text-foreground break-all select-all">
                {item.hash || <span className="text-muted-foreground/50 italic">Waiting for input...</span>}
              </span>
            </div>
            {item.hash && (
              <button
                onClick={() => handleCopy(item.hash, item.label)}
                className="flex items-center gap-1 bg-secondary border border-border hover:bg-secondary/85 text-xs font-semibold px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground self-end sm:self-center transition-all"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
