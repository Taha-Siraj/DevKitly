"use client";

import React, { useState, useEffect } from "react";
import { Copy, Pipette, RefreshCw } from "lucide-react";
import { useToast } from "../ToastProvider";
import { copyToClipboard } from "../../lib/utils";

export default function ColorConverterTool() {
  const [color, setColor] = useState("#6366f1"); // default indigo-500
  const [rgb, setRgb] = useState({ r: 99, g: 102, b: 241 });
  const [hsl, setHsl] = useState({ h: 239, s: 84, l: 67 });
  const { toast } = useToast();

  const parseHex = (hex: string) => {
    let clean = hex.trim().replace(/^#/, "");
    if (clean.length === 3) {
      clean = clean.split("").map((c) => c + c).join("");
    }
    if (clean.length !== 6) return null;
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return isNaN(r) || isNaN(g) || isNaN(b) ? null : { r, g, b };
  };

  const rgbToHslStr = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const hslToRgbStr = (h: number, s: number, l: number) => {
    h /= 360; s /= 100; l /= 100;
    let r = l, g = l, b = l;

    if (s !== 0) {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  // Sync inputs on Hex Pick
  useEffect(() => {
    const rgbVal = parseHex(color);
    if (rgbVal) {
      setRgb(rgbVal);
      const hslVal = rgbToHslStr(rgbVal.r, rgbVal.g, rgbVal.b);
      setHsl(hslVal);
    }
  }, [color]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith("#") && val.length > 0) val = "#" + val;
    setColor(val);
  };

  const handleRgbChange = (key: "r" | "g" | "b", val: number) => {
    const clamped = Math.max(0, Math.min(255, val || 0));
    const nextRgb = { ...rgb, [key]: clamped };
    setRgb(nextRgb);

    // Convert to hex
    const nextHex = "#" + [nextRgb.r, nextRgb.g, nextRgb.b].map((x) => x.toString(16).padStart(2, "0")).join("");
    setColor(nextHex);

    // Convert to hsl
    const nextHsl = rgbToHslStr(nextRgb.r, nextRgb.g, nextRgb.b);
    setHsl(nextHsl);
  };

  const handleHslChange = (key: "h" | "s" | "l", val: number) => {
    const clampMax = key === "h" ? 360 : 100;
    const clamped = Math.max(0, Math.min(clampMax, val || 0));
    const nextHsl = { ...hsl, [key]: clamped };
    setHsl(nextHsl);

    // Convert to rgb
    const nextRgb = hslToRgbStr(nextHsl.h, nextHsl.s, nextHsl.l);
    setRgb(nextRgb);

    // Convert to hex
    const nextHex = "#" + [nextRgb.r, nextRgb.g, nextRgb.b].map((x) => x.toString(16).padStart(2, "0")).join("");
    setColor(nextHex);
  };

  const handleCopy = (text: string, label: string) => {
    copyToClipboard(text);
    toast(`Copied ${label} color code!`);
  };

  const handleRandom = () => {
    const randomHex = "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, "0");
    setColor(randomHex);
    toast("Generated random color!");
  };

  return (
    <div className="space-y-6">
      {/* Settings Toolbar */}
      <div className="flex flex-wrap justify-end gap-2 border-b border-border/60 pb-4">
        <button
          onClick={handleRandom}
          className="flex items-center gap-1 bg-secondary border border-border rounded-lg text-xs font-semibold px-3 py-2 hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-all"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Random Color</span>
        </button>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Color Picker & Preview Box */}
        <div className="border border-border bg-secondary/5 rounded-xl p-5 flex flex-col items-center gap-4 justify-center">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block border-b border-border w-full pb-2 text-center">
            Color Preview
          </span>
          <div
            style={{ backgroundColor: color }}
            className="w-32 h-32 rounded-2xl shadow-inner border border-white/10 transition-colors duration-200"
          />
          <div className="flex items-center gap-2">
            <Pipette className="h-4 w-4 text-muted-foreground" />
            <input
              type="color"
              value={color.length === 7 ? color : "#6366f1"}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-7 rounded border border-border bg-transparent outline-none cursor-pointer"
            />
            <span className="text-xs font-mono font-semibold">{color}</span>
          </div>
        </div>

        {/* Input sliders and values */}
        <div className="md:col-span-2 space-y-5">
          {/* HEX Color Input */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between border border-border bg-secondary/15 p-4 rounded-xl">
            <div className="flex-1">
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">HEX Code</span>
              <input
                type="text"
                value={color}
                onChange={handleHexChange}
                placeholder="#ffffff"
                className="bg-card border border-border rounded-lg text-xs font-mono px-3 py-1.5 outline-none focus:border-indigo-500 w-full max-w-[150px] font-bold"
              />
            </div>
            <button
              onClick={() => handleCopy(color, "HEX")}
              className="flex items-center gap-1 bg-secondary border border-border hover:bg-secondary/85 text-xs font-semibold px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground self-end sm:self-center transition-all"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>Copy HEX</span>
            </button>
          </div>

          {/* RGB Values */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between border border-border bg-secondary/15 p-4 rounded-xl">
            <div className="flex-1 space-y-3">
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block">RGB Code</span>
              <div className="grid grid-cols-3 gap-2 max-w-[300px]">
                {["r", "g", "b"].map((k) => (
                  <div key={k} className="flex items-center gap-1 border border-border rounded bg-card px-2 py-1 text-xs">
                    <span className="font-mono text-muted-foreground uppercase">{k}:</span>
                    <input
                      type="number"
                      min="0"
                      max="255"
                      value={(rgb as any)[k]}
                      onChange={(e) => handleRgbChange(k as any, parseInt(e.target.value) || 0)}
                      className="w-full bg-transparent border-none outline-none font-mono text-center font-bold"
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => handleCopy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "RGB")}
              className="flex items-center gap-1 bg-secondary border border-border hover:bg-secondary/85 text-xs font-semibold px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground self-end sm:self-center transition-all"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>Copy RGB</span>
            </button>
          </div>

          {/* HSL Values */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between border border-border bg-secondary/15 p-4 rounded-xl">
            <div className="flex-1 space-y-3">
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block">HSL Code</span>
              <div className="grid grid-cols-3 gap-2 max-w-[300px]">
                {["h", "s", "l"].map((k) => (
                  <div key={k} className="flex items-center gap-1 border border-border rounded bg-card px-2 py-1 text-xs">
                    <span className="font-mono text-muted-foreground uppercase">{k}:</span>
                    <input
                      type="number"
                      min="0"
                      max={k === "h" ? 360 : 100}
                      value={(hsl as any)[k]}
                      onChange={(e) => handleHslChange(k as any, parseInt(e.target.value) || 0)}
                      className="w-full bg-transparent border-none outline-none font-mono text-center font-bold"
                    />
                    <span className="text-[10px] text-muted-foreground font-semibold">{k === "h" ? "°" : "%"}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => handleCopy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "HSL")}
              className="flex items-center gap-1 bg-secondary border border-border hover:bg-secondary/85 text-xs font-semibold px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground self-end sm:self-center transition-all"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>Copy HSL</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
