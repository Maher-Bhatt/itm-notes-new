import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

let mermaidCounter = 0;

export function MermaidDiagram({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? "dark" : "neutral",
      themeVariables: isDark
        ? {
            darkMode: true,
            background: "#09090b",
            primaryColor: "#27272a",
            primaryTextColor: "#f4f4f5",
            primaryBorderColor: "#52525b",
            lineColor: "#a1a1aa",
            secondaryColor: "#18181b",
            tertiaryColor: "#18181b",
            mainBkg: "#18181b",
            nodeBorder: "#52525b",
            clusterBkg: "#18181b",
            clusterBorder: "#3f3f46",
            defaultLinkColor: "#a1a1aa",
            titleColor: "#fafafa",
            edgeLabelBackground: "#27272a",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "13px",
          }
        : {
            darkMode: false,
            background: "#ffffff",
            primaryColor: "#f1f5f9",
            primaryTextColor: "#0f172a",
            primaryBorderColor: "#cbd5e1",
            lineColor: "#475569",
            secondaryColor: "#f8fafc",
            tertiaryColor: "#ffffff",
            mainBkg: "#f8fafc",
            nodeBorder: "#cbd5e1",
            clusterBkg: "#f8fafc",
            clusterBorder: "#e2e8f0",
            defaultLinkColor: "#475569",
            titleColor: "#0f172a",
            edgeLabelBackground: "#f1f5f9",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "13px",
          },
      flowchart: { htmlLabels: true, curve: "basis" },
      securityLevel: "loose",
    });

    const id = `mermaid-${++mermaidCounter}`;
    let cancelled = false;

    (async () => {
      try {
        const { svg: rendered } = await mermaid.render(id, chart.trim());
        if (!cancelled) {
          setSvg(rendered);
          setError("");
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err?.message || "Failed to render diagram");
          const el = document.getElementById(id);
          el?.remove();
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return (
      <div className="my-4 p-4 border border-destructive/20 bg-destructive/5 rounded-xl text-[13px] text-destructive font-mono">
        <p className="font-semibold mb-1">Diagram Rendering Notice</p>
        <p className="text-xs opacity-80">{error}</p>
      </div>
    );
  }

  return (
    <div className="my-6 rounded-xl border border-border/80 bg-card p-4 sm:p-6 shadow-sm overflow-x-auto">
      <div
        ref={containerRef}
        className="flex justify-center min-w-[280px] max-w-full [&>svg]:max-w-full [&>svg]:h-auto transition-all"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <p className="text-center text-[10px] font-mono text-muted-foreground/60 mt-3 uppercase tracking-wider">
        Architecture & Flow Diagram
      </p>
    </div>
  );
}
