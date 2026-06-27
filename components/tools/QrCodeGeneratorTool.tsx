"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { Download, RotateCcw, Trash2, Link as LinkIcon, Palette } from "lucide-react";
import { useToast } from "../ToastProvider";

export default function QrCodeGeneratorTool() {
  const [text, setText] = useState("https://devkitly.vercel.app/");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(256);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const generateQr = () => {
    if (!canvasRef.current || !text.trim()) return;

    QRCode.toCanvas(
      canvasRef.current,
      text,
      {
        width: size,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      },
      (error) => {
        if (error) {
          toast("Failed to generate QR Code", "error");
        }
      }
    );
  };

  useEffect(() => {
    generateQr();
  }, [text, fgColor, bgColor, size]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    try {
      const url = canvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast("Downloaded QR Code PNG!");
    } catch (e) {
      toast("Failed to download image", "error");
    }
  };

  const handleClear = () => {
    setText("");
  };

  const handleReset = () => {
    setText("https://devkitly.vercel.app/");
    setFgColor("#000000");
    setBgColor("#ffffff");
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
        {/* Left Side: Input config */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <LinkIcon className="h-3.5 w-3.5 text-indigo-500" />
              <span>QR Code Payload Link / Text</span>
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter URL, contact details or secret message..."
              className="w-full min-h-[140px] font-sans text-xs p-4 bg-secondary/20 border border-border rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 outline-none resize-y transition-all"
            />
          </div>

          {/* Color pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-border bg-secondary/5 rounded-xl p-4">
            <span className="col-span-full text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2 flex items-center gap-1.5">
              <Palette className="h-4 w-4 text-indigo-500" />
              <span>Color Customs</span>
            </span>
            <div className="flex items-center justify-between bg-card border border-border px-3 py-2 rounded-lg text-xs">
              <span className="font-semibold text-muted-foreground">Foreground (Dark)</span>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-8 h-7 rounded border border-border bg-transparent cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between bg-card border border-border px-3 py-2 rounded-lg text-xs">
              <span className="font-semibold text-muted-foreground">Background (Light)</span>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-8 h-7 rounded border border-border bg-transparent cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Side: QR Render box */}
        <div className="border border-border bg-secondary/5 rounded-xl p-5 flex flex-col items-center justify-center gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block border-b border-border w-full pb-2 text-center">
            Generated Graphic
          </span>
          <div className="bg-white p-4 rounded-xl border border-border shadow-md flex items-center justify-center min-h-[180px]">
            {text.trim() ? (
              <canvas ref={canvasRef} className="max-w-full" />
            ) : (
              <span className="text-xs text-muted-foreground/60 italic">Waiting for text...</span>
            )}
          </div>
          {text.trim() && (
            <button
              onClick={handleDownload}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold py-2.5 flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download PNG Image</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
