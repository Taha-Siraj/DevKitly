"use client";

import React, { useState, useEffect } from "react";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "../ToastProvider";
import { copyToClipboard } from "../../lib/utils";

export default function HexToRgb() {
  const [hex, setHex] = useState("#6366f1");
  const [rgb, setRgb] = useState("rgb(99, 102, 241)");
  const [rgba, setRgba] = useState("rgba(99, 102, 241, 1)");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    let clean = hex.trim().replace(/^#/, "");
    if (clean.length === 3) {
      clean = clean.split("").map((c) => c + c).join("");
    }

    if (clean.length !== 6 && clean.length !== 8) {
      setError("Hex code must be 3, 6, or 8 characters.");
      setRgb("");
      setRgba("");
      return;
    }

    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    
    let a = 1;
    if (clean.length === 8) {
      const alphaHex = parseInt(clean.substring(6, 8), 16);
      a = Math.round((alphaHex / 255) * 100) / 100;
    }

    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
      setError("Invalid hex values.");
      setRgb("");
      setRgba("");
      return;
    }

    setError(null);
    setRgb(`rgb(${r}, ${g}, ${b})`);
    setRgba(`rgba(${r}, ${g}, ${b}, ${a})`);
  }, [hex]);

  const handleCopy = (text: string, label: string) => {
    copyToClipboard(text);
    toast(`Copied ${label}!`);
  };

  const handleReset = () => {
    setHex("#6366f1");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hex Input */}
        <div className="border border-border bg-secondary/5 rounded-xl p-5 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block border-b border-border pb-2">
            HEX Code Input
          </span>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                placeholder="#6366f1"
                className="flex-1 bg-card border border-border rounded-lg text-xs font-mono px-3 py-2 outline-none focus:border-indigo-500 font-bold"
              />
              <button
                onClick={handleReset}
                className="p-2 bg-secondary border border-border rounded-lg hover:bg-secondary/80 text-muted-foreground hover:text-foreground"
                title="Reset"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
            {error && <p className="text-[10px] text-red-500 font-mono font-semibold">{error}</p>}
          </div>
        </div>

        {/* RGB Output */}
        <div className="border border-border bg-secondary/5 rounded-xl p-5 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block border-b border-border pb-2">
            Converted Values
          </span>
          <div className="space-y-3">
            {rgb && (
              <div className="flex items-center justify-between bg-card border border-border p-3 rounded-lg text-xs">
                <div>
                  <span className="text-[9px] text-muted-foreground block uppercase font-bold">RGB</span>
                  <span className="font-mono font-bold">{rgb}</span>
                </div>
                <button
                  onClick={() => handleCopy(rgb, "RGB")}
                  className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-foreground"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
            {rgba && (
              <div className="flex items-center justify-between bg-card border border-border p-3 rounded-lg text-xs">
                <div>
                  <span className="text-[9px] text-muted-foreground block uppercase font-bold">RGBA</span>
                  <span className="font-mono font-bold">{rgba}</span>
                </div>
                <button
                  onClick={() => handleCopy(rgba, "RGBA")}
                  className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-foreground"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
