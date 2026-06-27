"use client";

import React, { useState, useEffect } from "react";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "../ToastProvider";
import { copyToClipboard } from "../../lib/utils";

export default function HslToRgb() {
  const [h, setH] = useState(239);
  const [s, setS] = useState(84);
  const [l, setL] = useState(67);
  const [rgb, setRgb] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const hue = Math.max(0, Math.min(360, h || 0)) / 360;
    const sat = Math.max(0, Math.min(100, s || 0)) / 100;
    const lit = Math.max(0, Math.min(100, l || 0)) / 100;

    let r = lit;
    let g = lit;
    let b = lit;

    if (sat !== 0) {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = lit < 0.5 ? lit * (1 + sat) : lit + sat - lit * sat;
      const p = 2 * lit - q;
      r = hue2rgb(p, q, hue + 1/3);
      g = hue2rgb(p, q, hue);
      b = hue2rgb(p, q, hue - 1/3);
    }

    const roundedR = Math.round(r * 255);
    const roundedG = Math.round(g * 255);
    const roundedB = Math.round(b * 255);

    setRgb(`rgb(${roundedR}, ${roundedG}, ${roundedB})`);
  }, [h, s, l]);

  const handleCopy = () => {
    copyToClipboard(rgb);
    toast("Copied RGB color string!");
  };

  const handleReset = () => {
    setH(239);
    setS(84);
    setL(67);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="border border-border bg-secondary/5 rounded-xl p-5 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block border-b border-border pb-2">
            HSL Values Input
          </span>
          <div className="space-y-3">
            {[
              { label: "Hue (0-360°)", val: h, setter: setH, max: 360 },
              { label: "Saturation (0-100%)", val: s, setter: setS, max: 100 },
              { label: "Lightness (0-100%)", val: l, setter: setL, max: 100 }
            ].map((k) => (
              <div key={k.label} className="flex flex-col space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">{k.label}</label>
                <input
                  type="number"
                  min="0"
                  max={k.max}
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
              Converted RGB String
            </span>
            <div className="mt-6 flex flex-col items-center justify-center gap-4">
              <div
                style={{ backgroundColor: `hsl(${h}, ${s}%, ${l}%)` }}
                className="w-24 h-24 rounded-xl border border-white/10 shadow-inner"
              />
              <span className="font-mono text-lg font-bold text-foreground text-center">{rgb}</span>
            </div>
          </div>
          {rgb && (
            <button
              onClick={handleCopy}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold py-2.5 flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>Copy RGB String</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
