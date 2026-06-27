"use client";

import React, { useState, useEffect } from "react";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "../ToastProvider";
import { copyToClipboard } from "../../lib/utils";

export default function RgbToHsl() {
  const [r, setR] = useState(99);
  const [g, setG] = useState(102);
  const [b, setB] = useState(241);
  const [hsl, setHsl] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const clampedR = Math.max(0, Math.min(255, r || 0)) / 255;
    const clampedG = Math.max(0, Math.min(255, g || 0)) / 255;
    const clampedB = Math.max(0, Math.min(255, b || 0)) / 255;

    const max = Math.max(clampedR, clampedG, clampedB);
    const min = Math.min(clampedR, clampedG, clampedB);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case clampedR:
          h = (clampedG - clampedB) / d + (clampedG < clampedB ? 6 : 0);
          break;
        case clampedG:
          h = (clampedB - clampedR) / d + 2;
          break;
        case clampedB:
          h = (clampedR - clampedG) / d + 4;
          break;
      }
      h /= 6;
    }

    const roundedH = Math.round(h * 360);
    const roundedS = Math.round(s * 100);
    const roundedL = Math.round(l * 100);

    setHsl(`hsl(${roundedH}, ${roundedS}%, ${roundedL}%)`);
  }, [r, g, b]);

  const handleCopy = () => {
    copyToClipboard(hsl);
    toast("Copied HSL color string!");
  };

  const handleReset = () => {
    setR(99);
    setG(102);
    setB(241);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="border border-border bg-secondary/5 rounded-xl p-5 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block border-b border-border pb-2">
            RGB Values Input
          </span>
          <div className="space-y-3">
            {[
              { label: "Red (0-255)", val: r, setter: setR },
              { label: "Green (0-255)", val: g, setter: setG },
              { label: "Blue (0-255)", val: b, setter: setB }
            ].map((k) => (
              <div key={k.label} className="flex flex-col space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">{k.label}</label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={k.val}
                  onChange={(e) => k.setter(parseInt(e.target.value) || 0)}
                  className="bg-card border border-border rounded-lg text-xs font-mono px-3 py-2 outline-none focus:border-indigo-500 font-bold"
                />
              </div>
            ))}
            <button
              onClick={handleReset}
              className="w-full bg-secondary border border-border text-xs font-semibold py-2 rounded-lg hover:bg-secondary/80 flex items-center justify-center gap-1.5 transition-all text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="border border-border bg-secondary/5 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block border-b border-border pb-2">
              Converted HSL String
            </span>
            <div className="mt-6 flex flex-col items-center justify-center gap-4">
              <div
                style={{ backgroundColor: hsl || "hsl(239, 84%, 67%)" }}
                className="w-24 h-24 rounded-xl border border-white/10 shadow-inner"
              />
              <span className="font-mono text-lg font-bold text-foreground text-center">{hsl}</span>
            </div>
          </div>
          {hsl && (
            <button
              onClick={handleCopy}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold py-2.5 flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>Copy HSL String</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
