"use client";

import React, { useState } from "react";
import { Copy, Trash2, RotateCcw, AlertCircle, ShieldAlert, ShieldCheck } from "lucide-react";
import { useToast } from "../ToastProvider";
import { copyToClipboard } from "../../lib/utils";

// Standard Test JWT (Base64 encoded payload: {"sub":"1234567890","name":"John Doe","admin":true,"iat":1516239022,"exp":2555555555})
const SAMPLE_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoyNTU1NTU1NTU1fQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export default function JwtDecoderTool() {
  const [token, setToken] = useState(SAMPLE_JWT);
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [meta, setMeta] = useState<{ expDate?: string; isExpired?: boolean; algorithm?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const decodePart = (str: string): string => {
    let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const padLength = (4 - (base64.length % 4)) % 4;
    base64 += "=".repeat(padLength);
    return decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  };

  const handleDecode = () => {
    if (!token.trim()) {
      setError("Please paste a JWT token.");
      return;
    }

    const parts = token.trim().split(".");
    if (parts.length !== 3) {
      setError("Invalid JWT token format. JWT must have exactly 3 parts separated by dots.");
      setHeader("");
      setPayload("");
      setMeta(null);
      return;
    }

    try {
      const decodedHeader = decodePart(parts[0]);
      const decodedPayload = decodePart(parts[1]);

      const parsedHeader = JSON.parse(decodedHeader);
      const parsedPayload = JSON.parse(decodedPayload);

      setHeader(JSON.stringify(parsedHeader, null, 2));
      setPayload(JSON.stringify(parsedPayload, null, 2));
      setError(null);

      // Metadata calculations
      const metadata: typeof meta = {
        algorithm: parsedHeader.alg || "Unknown",
      };

      if (parsedPayload.exp) {
        const date = new Date(parsedPayload.exp * 1000);
        metadata.expDate = date.toLocaleString();
        metadata.isExpired = Date.now() > date.getTime();
      }

      setMeta(metadata);
      toast("JWT decoded successfully!");
    } catch (e: any) {
      setError("Failed to decode JWT payload. Make sure it's valid Base64URL encoded JSON.");
      setHeader("");
      setPayload("");
      setMeta(null);
    }
  };

  const handleCopyHeader = () => {
    if (!header) return;
    copyToClipboard(header);
    toast("Copied JWT Header!");
  };

  const handleCopyPayload = () => {
    if (!payload) return;
    copyToClipboard(payload);
    toast("Copied JWT Payload!");
  };

  const handleClear = () => {
    setToken("");
    setHeader("");
    setPayload("");
    setMeta(null);
    setError(null);
  };

  const handleReset = () => {
    setToken(SAMPLE_JWT);
    setHeader("");
    setPayload("");
    setMeta(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="flex flex-col space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Encoded JWT Token</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            className="flex-1 bg-secondary/20 border border-border rounded-lg px-3 py-2 text-xs font-mono outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 transition-all"
          />
          <button
            onClick={handleDecode}
            className="bg-indigo-600 text-white rounded-lg text-xs font-semibold px-4 py-2 hover:bg-indigo-500 transition-colors shadow-sm whitespace-nowrap"
          >
            Decode Token
          </button>
          <button
            onClick={handleReset}
            className="p-2 bg-secondary border border-border rounded-lg text-muted-foreground hover:text-foreground"
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={handleClear}
            className="p-2 bg-secondary border border-border rounded-lg text-muted-foreground hover:text-destructive"
            title="Clear"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 border border-red-500/20 bg-red-500/10 rounded-xl p-4 text-red-500 text-xs">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p className="font-mono">{error}</p>
        </div>
      )}

      {/* Reports Split Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Header Block */}
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center h-5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Header (Decoded)</span>
            {header && (
              <button
                onClick={handleCopyHeader}
                className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors"
                title="Copy"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <textarea
            readOnly
            value={header}
            placeholder="Header values will appear here..."
            className="flex-1 min-h-[220px] w-full font-mono text-xs p-4 bg-secondary/15 border border-border rounded-xl outline-none resize-none cursor-text select-text"
          />
        </div>

        {/* Payload Block */}
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center h-5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Payload (Decoded)</span>
            {payload && (
              <button
                onClick={handleCopyPayload}
                className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors"
                title="Copy"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <textarea
            readOnly
            value={payload}
            placeholder="Payload claims will appear here..."
            className="flex-1 min-h-[220px] w-full font-mono text-xs p-4 bg-secondary/15 border border-border rounded-xl outline-none resize-none cursor-text select-text"
          />
        </div>

        {/* Expiry / Sign Info */}
        <div className="flex flex-col space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Token Metadata</span>
          {meta ? (
            <div className="border border-border bg-secondary/10 rounded-xl p-5 space-y-4 flex-1">
              <div>
                <span className="text-[10px] text-muted-foreground block uppercase font-bold">Algorithm</span>
                <span className="font-mono text-xs font-semibold">{meta.algorithm}</span>
              </div>

              {meta.expDate && (
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold">Expiration Time</span>
                  <span className="font-mono text-xs font-semibold block">{meta.expDate}</span>
                  <div className="mt-2 flex items-center gap-1.5 text-[10px]">
                    {meta.isExpired ? (
                      <span className="inline-flex items-center gap-1 text-red-500 bg-red-500/10 px-2 py-0.5 rounded font-bold">
                        <ShieldAlert className="h-3.5 w-3.5" /> Expired
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">
                        <ShieldCheck className="h-3.5 w-3.5" /> Valid / Active
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="border border-dashed border-border rounded-xl p-5 flex items-center justify-center flex-1 text-center text-xs text-muted-foreground/60 italic min-h-[220px]">
              Decode a token to inspect signature and expiry metadata.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
