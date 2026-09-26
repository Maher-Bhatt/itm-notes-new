import { Skeleton } from "@/components/ui/skeleton";

export function PageFallback() {
  return (
    <div className="min-h-screen bg-background flex flex-col p-6 space-y-6 animate-pulse max-w-6xl mx-auto w-full">
      <div className="h-16 w-full rounded-2xl bg-secondary/40" />
      <div className="h-44 w-full rounded-3xl bg-secondary/30" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-64 rounded-2xl bg-secondary/20" />
        <div className="h-64 rounded-2xl bg-secondary/20" />
        <div className="h-64 rounded-2xl bg-secondary/20" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="h-16 border-b border-border/40 bg-card/50" />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Banner Skeleton */}
        <div className="p-6 sm:p-8 rounded-3xl border border-border/60 bg-secondary/20 space-y-3">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-10 w-3/4 rounded-xl" />
          <Skeleton className="h-4 w-1/2 rounded-lg" />
        </div>

        {/* Heatmap & Continue Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-44 rounded-2xl lg:col-span-2" />
          <Skeleton className="h-44 rounded-2xl" />
        </div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="p-5 rounded-2xl border border-border/60 bg-card space-y-3">
              <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-24 rounded-lg" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <Skeleton className="h-6 w-4/5 rounded-lg" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export function SubjectDashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="h-16 border-b border-border/40 bg-card/50" />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
        <Skeleton className="h-4 w-48 rounded-md" />
        <div className="p-6 sm:p-8 rounded-3xl border border-border/60 bg-secondary/20 space-y-4">
          <Skeleton className="h-8 w-64 rounded-xl" />
          <Skeleton className="h-4 w-3/4 rounded-lg" />
          <Skeleton className="h-3 w-full rounded-full" />
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-2xl" />
          ))}
        </div>
      </main>
    </div>
  );
}

export function CodingLabSkeleton() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="h-16 border-b border-border/40 bg-card/50" />
      <div className="flex-1 flex flex-col lg:flex-row p-4 gap-4 max-w-7xl mx-auto w-full">
        <div className="w-full lg:w-96 space-y-3">
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
        <div className="flex-1 space-y-3">
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-[500px] w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
