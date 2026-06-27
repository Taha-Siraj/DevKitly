import React from "react";
import Link from "next/link";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center space-y-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 shadow-md animate-bounce">
        <AlertTriangle className="h-8 w-8" />
      </div>
      
      <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-indigo-950 dark:from-white dark:to-indigo-100 bg-clip-text text-transparent sm:text-5xl">
        Page Not Found
      </h1>
      
      <p className="text-sm sm:text-base text-muted-foreground font-semibold max-w-md leading-relaxed">
        The tool or page you are looking for doesn't exist, has been migrated, or is temporarily unavailable.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold px-6 py-2.5 shadow-md shadow-indigo-600/10 transition-all cursor-pointer"
        >
          <Home className="h-4 w-4" />
          <span>Go back Home</span>
        </Link>
      </div>
    </div>
  );
}
