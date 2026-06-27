"use client";

import React, { useState, useEffect } from "react";
import { Copy, RefreshCw, KeyRound, ShieldAlert, ShieldCheck } from "lucide-react";
import { useToast } from "../ToastProvider";
import { copyToClipboard } from "../../lib/utils";

export default function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState({ label: "Weak", color: "bg-red-500", percent: 25 });
  const { toast } = useToast();

  const generatePassword = () => {
    let charset = "";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!charset) {
      setPassword("");
      toast("Please select at least one character type.", "error");
      return;
    }

    // Cryptographically secure random values
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    
    let generated = "";
    for (let i = 0; i < length; i++) {
      const idx = array[i] % charset.length;
      generated += charset.charAt(idx);
    }
    
    setPassword(generated);
  };

  // Run initial password generation
  useEffect(() => {
    generatePassword();
  }, [length, includeLowercase, includeUppercase, includeNumbers, includeSymbols]);

  // Calculate Password Strength Meter
  useEffect(() => {
    if (!password) {
      setStrength({ label: "None", color: "bg-border", percent: 0 });
      return;
    }

    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    
    let types = 0;
    if (/[a-z]/.test(password)) types += 1;
    if (/[A-Z]/.test(password)) types += 1;
    if (/\d/.test(password)) types += 1;
    if (/[^A-Za-z0-9]/.test(password)) types += 1;

    score += Math.max(0, types - 1);

    if (score <= 2) {
      setStrength({ label: "Weak", color: "bg-red-500", percent: 25 });
    } else if (score === 3) {
      setStrength({ label: "Medium", color: "bg-amber-500", percent: 50 });
    } else if (score === 4) {
      setStrength({ label: "Strong", color: "bg-emerald-500", percent: 75 });
    } else {
      setStrength({ label: "Very Secure", color: "bg-indigo-500", percent: 100 });
    }
  }, [password]);

  const handleCopy = () => {
    if (!password) return;
    copyToClipboard(password);
    toast("Copied secure password!");
  };

  return (
    <div className="space-y-6">
      {/* Visual password display */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between border border-border bg-indigo-500/5 rounded-xl p-5">
        <div className="truncate flex items-center gap-3">
          <KeyRound className="h-5 w-5 text-indigo-500 flex-shrink-0" />
          <div className="truncate">
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-0.5">
              Secure Generated Password
            </span>
            <span className="font-mono text-lg font-bold text-foreground select-all break-all leading-none">
              {password || <span className="text-muted-foreground/40 italic">Select options to generate...</span>}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={generatePassword}
            className="p-2.5 bg-secondary border border-border rounded-lg text-muted-foreground hover:text-foreground transition-all"
            title="Regenerate"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={handleCopy}
            disabled={!password}
            className="flex items-center gap-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold px-4 py-2.5 hover:bg-indigo-500 disabled:opacity-50 transition-colors shadow-sm"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>Copy Password</span>
          </button>
        </div>
      </div>

      {/* Strength indicator */}
      <div className="space-y-2 border border-border bg-secondary/10 p-4 rounded-xl">
        <div className="flex justify-between items-center text-xs">
          <span className="text-[10px] font-bold text-muted-foreground uppercase">Password Strength</span>
          <span className="font-bold text-foreground">{strength.label}</span>
        </div>
        <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
          <div
            style={{ width: `${strength.percent}%` }}
            className={`h-full ${strength.color} transition-all duration-300`}
          />
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Length Control */}
        <div className="border border-border bg-secondary/5 rounded-xl p-5 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block border-b border-border pb-2">
            Password Length ({length})
          </span>
          <div className="space-y-2 pt-2">
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground font-mono font-semibold">
              <span>8 chars</span>
              <span>64 chars</span>
            </div>
          </div>
        </div>

        {/* Characters selectors */}
        <div className="md:col-span-2 border border-border bg-secondary/5 rounded-xl p-5 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block border-b border-border pb-2">
            Character Settings
          </span>
          <div className="grid grid-cols-2 gap-4 pt-1">
            {[
              { id: "lower", label: "Lowercase (a-z)", val: includeLowercase, setter: setIncludeLowercase },
              { id: "upper", label: "Uppercase (A-Z)", val: includeUppercase, setter: setIncludeUppercase },
              { id: "numbers", label: "Numbers (0-9)", val: includeNumbers, setter: setIncludeNumbers },
              { id: "symbols", label: "Symbols (!@#$%)", val: includeSymbols, setter: setIncludeSymbols }
            ].map((opt) => (
              <label key={opt.id} className="flex items-center gap-2.5 text-xs font-semibold text-foreground cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={opt.val}
                  onChange={(e) => opt.setter(e.target.checked)}
                  className="rounded bg-secondary/50 border-border text-indigo-600 focus:ring-indigo-500"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
