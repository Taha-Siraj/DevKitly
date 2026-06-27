"use client";

import React, { useEffect } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center space-y-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive border border-destructive/20 shadow-md animate-pulse">
        <AlertCircle className="h-8 w-8" />
      </div>
      
      <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-indigo-950 dark:from-white dark:to-indigo-100 bg-clip-text text-transparent sm:text-5xl">
        Something went wrong!
      </h1>
      
      <p className="text-sm sm:text-base text-muted-foreground font-semibold max-w-md leading-relaxed">
        An unexpected error occurred while executing the local utility engine. Don't worry, your data remains safe and sandboxed.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold px-6 py-2.5 shadow-md shadow-indigo-600/10 transition-all cursor-pointer"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Try Again</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-secondary hover:bg-secondary/80 text-foreground text-xs sm:text-sm font-bold px-6 py-2.5 border border-border transition-all cursor-pointer"
        >
          <Home className="h-4 w-4" />
          <span>Go back Home</span>
        </Link>
      </div>
    </div>
  );
}
