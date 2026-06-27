"use client";

import React, { useState, useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
import { Download, RotateCcw, Trash2, Barcode, AlertCircle } from "lucide-react";
import { useToast } from "../ToastProvider";
import { downloadAsFile } from "../../lib/utils";

type BarcodeFormat = "CODE128" | "EAN13" | "EAN8" | "UPC" | "CODE39";

export default function BarcodeGeneratorTool() {
  const [text, setText] = useState("DEVKITLY-12345");
  const [format, setFormat] = useState<BarcodeFormat>("CODE128");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [error, setError] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const { toast } = useToast();

  const generateBarcode = () => {
    if (!svgRef.current || !text.trim()) return;

    try {
      JsBarcode(svgRef.current, text, {
        format: format,
        lineColor: fgColor,
        background: bgColor,
        width: 2,
        height: 80,
        displayValue: true,
        fontOptions: "bold",
        fontSize: 14,
        margin: 10
      });
      setError(null);
    } catch (e: any) {
      setError("Invalid code characters or length for the selected barcode format.");
    }
  };

  useEffect(() => {
    generateBarcode();
  }, [text, format, fgColor, bgColor]);

  const handleDownload = () => {
    if (!svgRef.current || error) return;
    try {
      const svgString = new XMLSerializer().serializeToString(svgRef.current);
      downloadAsFile("barcode.svg", svgString, "image/svg+xml");
      toast("Downloaded Barcode SVG!");
    } catch (e) {
      toast("Failed to download SVG file", "error");
    }
  };

  const handleClear = () => {
    setText("");
    setError(null);
  };

  const handleReset = () => {
    setText("DEVKITLY-12345");
    setFormat("CODE128");
    setFgColor("#000000");
    setBgColor("#ffffff");
    setError(null);
  };

  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Input parameters */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <Barcode className="h-3.5 w-3.5 text-indigo-500" />
              <span>Barcode Value</span>
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. 123456789012"
              className="w-full bg-secondary/20 border border-border rounded-lg px-3 py-2 text-xs font-mono outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 transition-all text-foreground font-bold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-border bg-secondary/5 rounded-xl p-4">
            <div className="flex flex-col space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Symbology Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as BarcodeFormat)}
                className="bg-card border border-border rounded-lg text-xs px-2 py-1.5 outline-none focus:border-indigo-500 font-semibold text-foreground"
              >
                <option value="CODE128">CODE128 (Alphanumeric)</option>
                <option value="CODE39">CODE39 (Basic Alphanumeric)</option>
                <option value="EAN13">EAN-13 (13 numbers)</option>
                <option value="EAN8">EAN-8 (8 numbers)</option>
                <option value="UPC">UPC-A (12 numbers)</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Bar Color</label>
              <div className="flex items-center gap-2 border border-border rounded bg-card px-2.5 py-1">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-6 h-6 border-none bg-transparent cursor-pointer"
                />
                <span className="font-mono text-[10px] font-bold">{fgColor}</span>
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Background Color</label>
              <div className="flex items-center gap-2 border border-border rounded bg-card px-2.5 py-1">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-6 h-6 border-none bg-transparent cursor-pointer"
                />
                <span className="font-mono text-[10px] font-bold">{bgColor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Barcode Render display */}
        <div className="border border-border bg-secondary/5 rounded-xl p-5 flex flex-col items-center justify-center gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block border-b border-border w-full pb-2 text-center">
            Generated Code
          </span>
          
          <div className="bg-white p-4 rounded-xl border border-border shadow-md flex items-center justify-center min-h-[150px] w-full overflow-x-auto">
            {text.trim() && !error ? (
              <svg ref={svgRef} className="max-w-full" />
            ) : (
              <span className="text-xs text-muted-foreground/60 italic text-center p-4">
                {error || "Waiting for text..."}
              </span>
            )}
          </div>

          {error && (
            <div className="flex items-start gap-2 border border-red-500/20 bg-red-500/10 rounded-lg p-3 text-red-500 text-[10px] w-full">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <p className="font-mono">{error}</p>
            </div>
          )}

          {text.trim() && !error && (
            <button
              onClick={handleDownload}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold py-2.5 flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download SVG Vector</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
