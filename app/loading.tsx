import React from "react";

export default function Loading() {
  return (
    <div className="space-y-12 max-w-5xl mx-auto animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-4">
        <div className="h-4 w-24 rounded-md bg-secondary border border-border/30" />
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-secondary border border-border/30" />
          <div className="space-y-2 flex-1">
            <div className="h-7 w-48 rounded-md bg-secondary" />
            <div className="h-4 w-96 rounded-md bg-secondary" />
          </div>
        </div>
      </div>

      {/* Main Tool Container Card Skeleton */}
      <div className="h-80 w-full rounded-3xl border border-border/80 bg-card p-5 sm:p-7 space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-4 w-32 rounded-md bg-secondary" />
          <div className="h-4 w-16 rounded-md bg-secondary" />
        </div>
        <div className="h-48 w-full rounded-2xl bg-secondary/50 border border-border/40" />
      </div>

      {/* Split Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="h-5 w-32 rounded-md bg-secondary" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded-md bg-secondary" />
            <div className="h-4 w-5/6 rounded-md bg-secondary" />
            <div className="h-4 w-4/5 rounded-md bg-secondary" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-5 w-40 rounded-md bg-secondary" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded-md bg-secondary" />
            <div className="h-4 w-11/12 rounded-md bg-secondary" />
            <div className="h-4 w-3/4 rounded-md bg-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
}
