"use client";

import React, { useState, useEffect } from "react";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "../ToastProvider";
import { copyToClipboard } from "../../lib/utils";

export default function RgbToHex() {
  const [r, setR] = useState(99);
  const [g, setG] = useState(102);
  const [b, setB] = useState(241);
  const [hex, setHex] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const clampedR = Math.max(0, Math.min(255, r || 0));
    const clampedG = Math.max(0, Math.min(255, g || 0));
    const clampedB = Math.max(0, Math.min(255, b || 0));

    const hexVal =
      "#" +
      [clampedR, clampedG, clampedB]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("");
    setHex(hexVal);
  }, [r, g, b]);

  const handleCopy = () => {
    copyToClipboard(hex);
    toast("Copied HEX code!");
  };

  const handleReset = () => {
    setR(99);
    setG(102);
    setB(241);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* RGB input */}
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

        {/* HEX output */}
        <div className="border border-border bg-secondary/5 rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block border-b border-border pb-2">
              Converted HEX Code
            </span>
            <div className="mt-6 flex flex-col items-center justify-center gap-4">
              <div
                style={{ backgroundColor: hex || "#6366f1" }}
                className="w-24 h-24 rounded-xl border border-white/10 shadow-inner"
              />
              <span className="font-mono text-lg font-bold text-foreground">{hex}</span>
            </div>
          </div>
          {hex && (
            <button
              onClick={handleCopy}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold py-2.5 flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>Copy HEX Code</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
