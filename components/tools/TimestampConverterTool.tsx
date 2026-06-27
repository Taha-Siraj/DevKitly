"use client";

import React, { useState, useEffect } from "react";
import { Copy, Trash2, Clock, Calendar, RefreshCw } from "lucide-react";
import { useToast } from "../ToastProvider";
import { copyToClipboard } from "../../lib/utils";

export default function TimestampConverterTool() {
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [epochInput, setEpochInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [epochOutput, setEpochOutput] = useState("");
  
  // Date conversion output states
  const [localTime, setLocalTime] = useState("");
  const [utcTime, setUtcTime] = useState("");
  const [relativeTime, setRelativeTime] = useState("");
  
  const { toast } = useToast();

  // Run live clock
  useEffect(() => {
    setCurrentEpoch(Math.floor(Date.now() / 1000));
    const interval = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Set initial inputs
  useEffect(() => {
    const now = new Date();
    setEpochInput(String(Math.floor(now.getTime() / 1000)));
    
    // Format to local ISO format yyyy-MM-ddThh:mm for datetime-local picker
    const tzOffset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now.getTime() - tzOffset).toISOString().slice(0, 16);
    setDateInput(localISOTime);
  }, []);

  // Compute Epoch -> Date
  useEffect(() => {
    if (!epochInput) {
      setLocalTime("");
      setUtcTime("");
      setRelativeTime("");
      return;
    }

    try {
      // Check if milliseconds (usually 13 digits) vs seconds (usually 10 digits)
      const isMs = epochInput.length > 11;
      const num = parseInt(epochInput);
      if (isNaN(num)) throw new Error();

      const date = new Date(isMs ? num : num * 1000);
      setLocalTime(date.toLocaleString());
      setUtcTime(date.toUTCString());

      // Simple relative format
      const diffMs = Date.now() - date.getTime();
      const diffSecs = Math.floor(diffMs / 1000);
      const diffMins = Math.floor(diffSecs / 60);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (Math.abs(diffSecs) < 60) {
        setRelativeTime(diffSecs >= 0 ? `${diffSecs} seconds ago` : `in ${Math.abs(diffSecs)} seconds`);
      } else if (Math.abs(diffMins) < 60) {
        setRelativeTime(diffMins >= 0 ? `${diffMins} minutes ago` : `in ${Math.abs(diffMins)} minutes`);
      } else if (Math.abs(diffHours) < 24) {
        setRelativeTime(diffHours >= 0 ? `${diffHours} hours ago` : `in ${Math.abs(diffHours)} hours`);
      } else {
        setRelativeTime(diffDays >= 0 ? `${diffDays} days ago` : `in ${Math.abs(diffDays)} days`);
      }
    } catch (e) {
      setLocalTime("Invalid Epoch Value");
      setUtcTime("Invalid Epoch Value");
      setRelativeTime("-");
    }
  }, [epochInput]);

  // Compute Date -> Epoch
  useEffect(() => {
    if (!dateInput) {
      setEpochOutput("");
      return;
    }
    try {
      const date = new Date(dateInput);
      const stamp = Math.floor(date.getTime() / 1000);
      setEpochOutput(isNaN(stamp) ? "" : String(stamp));
    } catch (e) {
      setEpochOutput("");
    }
  }, [dateInput]);

  const handleCopy = (text: string, label: string) => {
    if (!text) return;
    copyToClipboard(text);
    toast(`Copied ${label}!`);
  };

  const handleUseCurrent = () => {
    setEpochInput(String(currentEpoch));
    toast("Loaded current epoch timestamp!");
  };

  return (
    <div className="space-y-8">
      {/* Live Clock Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between border border-border bg-indigo-500/5 rounded-xl p-5 gap-4">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-indigo-500 animate-spin" />
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block">Live Epoch Timestamp</span>
            <span className="font-mono text-lg font-bold text-foreground select-all">{currentEpoch}</span>
          </div>
        </div>
        <button
          onClick={handleUseCurrent}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold px-4 py-2 transition-colors shadow-sm whitespace-nowrap self-end sm:self-center"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Insert Current Time</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Epoch -> Date */}
        <div className="border border-border bg-card/30 rounded-xl p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2 flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-indigo-500" />
            <span>Epoch Timestamp to Date</span>
          </h3>
          <div className="space-y-3">
            <div className="flex flex-col space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Unix Epoch Timestamp</label>
              <input
                type="text"
                value={epochInput}
                onChange={(e) => setEpochInput(e.target.value)}
                placeholder="1782390230"
                className="bg-secondary/20 border border-border rounded-lg px-3 py-2 text-xs font-mono outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 transition-all text-foreground"
              />
            </div>
            
            {/* Conversion Details */}
            <div className="space-y-3 pt-2">
              {[
                { label: "Local Time", val: localTime },
                { label: "UTC Time", val: utcTime },
                { label: "Relative Time", val: relativeTime }
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center bg-secondary/10 border border-border/60 p-2.5 rounded-lg text-xs">
                  <div>
                    <span className="text-[9px] text-muted-foreground block uppercase font-bold">{item.label}</span>
                    <span className="font-mono font-medium text-foreground">{item.val || "-"}</span>
                  </div>
                  {item.val && item.val !== "Invalid Epoch Value" && (
                    <button
                      onClick={() => handleCopy(item.val, item.label)}
                      className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-foreground"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Date -> Epoch */}
        <div className="border border-border bg-card/30 rounded-xl p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2 flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-indigo-500" />
            <span>Date to Epoch Timestamp</span>
          </h3>
          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Local Date & Time</label>
              <input
                type="datetime-local"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="bg-secondary/20 border border-border rounded-lg px-3 py-2 text-xs font-mono outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 transition-all text-foreground cursor-pointer"
              />
            </div>

            {epochOutput && (
              <div className="space-y-3 pt-2">
                {[
                  { label: "Epoch Seconds", val: epochOutput },
                  { label: "Epoch Milliseconds", val: String(Number(epochOutput) * 1000) }
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center bg-secondary/15 border border-border p-3 rounded-lg text-xs">
                    <div>
                      <span className="text-[9px] text-muted-foreground block uppercase font-bold">{item.label}</span>
                      <span className="font-mono font-bold text-foreground text-sm">{item.val}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(item.val, item.label)}
                      className="p-1.5 hover:bg-secondary rounded text-muted-foreground hover:text-foreground"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
