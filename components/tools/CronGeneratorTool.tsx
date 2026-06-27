"use client";

import React, { useState, useEffect } from "react";
import cronstrue from "cronstrue";
import { Copy, RotateCcw, Info, Calendar } from "lucide-react";
import { useToast } from "../ToastProvider";
import { copyToClipboard } from "../../lib/utils";

export default function CronGeneratorTool() {
  const [minMode, setMinMode] = useState<"every" | "specific">("every");
  const [minVal, setMinVal] = useState("5");
  const [hourMode, setHourMode] = useState<"every" | "specific">("every");
  const [hourVal, setHourVal] = useState("12");
  const [dayMode, setDayMode] = useState<"every" | "specific">("every");
  const [dayVal, setDayVal] = useState("1");
  const [monthMode, setMonthMode] = useState<"every" | "specific">("every");
  const [monthVal, setMonthVal] = useState("1");
  const [dayOfWeekMode, setDayOfWeekMode] = useState<"every" | "specific">("every");
  const [dayOfWeekVal, setDayOfWeekVal] = useState("1"); // 1 = Monday

  const [cronExpression, setCronExpression] = useState("* * * * *");
  const [explanation, setExplanation] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const minutes = minMode === "every" ? `*/${minVal}` : minVal;
    const hours = hourMode === "every" ? "*" : hourVal;
    const days = dayMode === "every" ? "*" : dayVal;
    const months = monthMode === "every" ? "*" : monthVal;
    const weekdays = dayOfWeekMode === "every" ? "*" : dayOfWeekVal;

    const expr = `${minutes} ${hours} ${days} ${months} ${weekdays}`;
    setCronExpression(expr);

    try {
      const desc = cronstrue.toString(expr, { use24HourTimeFormat: true });
      setExplanation(desc);
    } catch (err) {
      setExplanation("Could not translate expression.");
    }
  }, [minMode, minVal, hourMode, hourVal, dayMode, dayVal, monthMode, monthVal, dayOfWeekMode, dayOfWeekVal]);

  const handleCopy = async () => {
    const success = await copyToClipboard(cronExpression);
    if (success) {
      toast("Copied cron expression!");
    }
  };

  const handleReset = () => {
    setMinMode("every");
    setMinVal("5");
    setHourMode("every");
    setHourVal("12");
    setDayMode("every");
    setDayVal("1");
    setMonthMode("every");
    setMonthVal("1");
    setDayOfWeekMode("every");
    setDayOfWeekVal("1");
    toast("Reset cron selectors");
  };

  return (
    <div className="space-y-6">
      {/* Visual Configuration Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        {/* Minutes */}
        <div className="border border-border bg-secondary/5 rounded-xl p-4 space-y-3">
          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block">Minutes</span>
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs text-foreground cursor-pointer">
              <input
                type="radio"
                name="minMode"
                checked={minMode === "every"}
                onChange={() => setMinMode("every")}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>Every N mins</span>
            </label>
            {minMode === "every" && (
              <select
                value={minVal}
                onChange={(e) => setMinVal(e.target.value)}
                className="w-full bg-secondary/55 border border-border rounded text-xs px-1.5 py-1 text-foreground"
              >
                {["1", "2", "5", "10", "15", "30"].map((v) => (
                  <option key={v} value={v}>Every {v} mins</option>
                ))}
              </select>
            )}

            <label className="flex items-center gap-1.5 text-xs text-foreground cursor-pointer">
              <input
                type="radio"
                name="minMode"
                checked={minMode === "specific"}
                onChange={() => setMinMode("specific")}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>Specific min</span>
            </label>
            {minMode === "specific" && (
              <select
                value={minVal}
                onChange={(e) => setMinVal(e.target.value)}
                className="w-full bg-secondary/55 border border-border rounded text-xs px-1.5 py-1 text-foreground"
              >
                {Array.from({ length: 60 }).map((_, i) => (
                  <option key={i} value={i}>{String(i).padStart(2, "0")}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Hours */}
        <div className="border border-border bg-secondary/5 rounded-xl p-4 space-y-3">
          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block">Hours</span>
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs text-foreground cursor-pointer">
              <input
                type="radio"
                name="hourMode"
                checked={hourMode === "every"}
                onChange={() => setHourMode("every")}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>Every hour</span>
            </label>

            <label className="flex items-center gap-1.5 text-xs text-foreground cursor-pointer">
              <input
                type="radio"
                name="hourMode"
                checked={hourMode === "specific"}
                onChange={() => setHourMode("specific")}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>Specific hour</span>
            </label>
            {hourMode === "specific" && (
              <select
                value={hourVal}
                onChange={(e) => setHourVal(e.target.value)}
                className="w-full bg-secondary/55 border border-border rounded text-xs px-1.5 py-1 text-foreground"
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <option key={i} value={i}>{String(i).padStart(2, "0")}:00</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Day of Month */}
        <div className="border border-border bg-secondary/5 rounded-xl p-4 space-y-3">
          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block">Day of Month</span>
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs text-foreground cursor-pointer">
              <input
                type="radio"
                name="dayMode"
                checked={dayMode === "every"}
                onChange={() => setDayMode("every")}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>Every day</span>
            </label>

            <label className="flex items-center gap-1.5 text-xs text-foreground cursor-pointer">
              <input
                type="radio"
                name="dayMode"
                checked={dayMode === "specific"}
                onChange={() => setDayMode("specific")}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>Specific day</span>
            </label>
            {dayMode === "specific" && (
              <select
                value={dayVal}
                onChange={(e) => setDayVal(e.target.value)}
                className="w-full bg-secondary/55 border border-border rounded text-xs px-1.5 py-1 text-foreground"
              >
                {Array.from({ length: 31 }).map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Month */}
        <div className="border border-border bg-secondary/5 rounded-xl p-4 space-y-3">
          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block">Month</span>
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs text-foreground cursor-pointer">
              <input
                type="radio"
                name="monthMode"
                checked={monthMode === "every"}
                onChange={() => setMonthMode("every")}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>Every month</span>
            </label>

            <label className="flex items-center gap-1.5 text-xs text-foreground cursor-pointer">
              <input
                type="radio"
                name="monthMode"
                checked={monthMode === "specific"}
                onChange={() => setMonthMode("specific")}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>Specific month</span>
            </label>
            {monthMode === "specific" && (
              <select
                value={monthVal}
                onChange={(e) => setMonthVal(e.target.value)}
                className="w-full bg-secondary/55 border border-border rounded text-xs px-1.5 py-1 text-foreground"
              >
                {[
                  { v: "1", n: "Jan" }, { v: "2", n: "Feb" }, { v: "3", n: "Mar" }, { v: "4", n: "Apr" },
                  { v: "5", n: "May" }, { v: "6", n: "Jun" }, { v: "7", n: "Jul" }, { v: "8", n: "Aug" },
                  { v: "9", n: "Sep" }, { v: "10", n: "Oct" }, { v: "11", n: "Nov" }, { v: "12", n: "Dec" }
                ].map((m) => (
                  <option key={m.v} value={m.v}>{m.n}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Weekday */}
        <div className="border border-border bg-secondary/5 rounded-xl p-4 space-y-3">
          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block">Weekday</span>
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs text-foreground cursor-pointer">
              <input
                type="radio"
                name="dayOfWeekMode"
                checked={dayOfWeekMode === "every"}
                onChange={() => setDayOfWeekMode("every")}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>Every weekday</span>
            </label>

            <label className="flex items-center gap-1.5 text-xs text-foreground cursor-pointer">
              <input
                type="radio"
                name="dayOfWeekMode"
                checked={dayOfWeekMode === "specific"}
                onChange={() => setDayOfWeekMode("specific")}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>Specific day</span>
            </label>
            {dayOfWeekMode === "specific" && (
              <select
                value={dayOfWeekVal}
                onChange={(e) => setDayOfWeekVal(e.target.value)}
                className="w-full bg-secondary/55 border border-border rounded text-xs px-1.5 py-1 text-foreground"
              >
                {[
                  { v: "1", n: "Monday" }, { v: "2", n: "Tuesday" }, { v: "3", n: "Wednesday" },
                  { v: "4", n: "Thursday" }, { v: "5", n: "Friday" }, { v: "6", n: "Saturday" }, { v: "0", n: "Sunday" }
                ].map((d) => (
                  <option key={d.v} value={d.v}>{d.n}</option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Generated Cron display */}
      <div className="space-y-4 pt-4 border-t border-border/60">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between border border-border bg-indigo-500/5 rounded-xl p-5">
          <div className="truncate">
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-0.5">
              Generated Cron Statement
            </span>
            <span className="font-mono text-lg font-bold text-foreground select-all break-all">
              {cronExpression}
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold px-4 py-2 hover:bg-indigo-500 shadow-sm transition-colors"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>Copy Expression</span>
            </button>
            <button
              onClick={handleReset}
              className="p-2 bg-secondary border border-border rounded-lg text-muted-foreground hover:text-foreground transition-all"
              title="Reset"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Translation Banner */}
        <div className="flex items-start gap-3 border border-border bg-secondary/15 rounded-xl p-4 text-xs">
          <Info className="h-4.5 w-4.5 text-indigo-500 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[10px] text-muted-foreground block uppercase font-bold mb-1">Human Readable Schedule</span>
            <p className="font-semibold text-foreground leading-normal">{explanation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
