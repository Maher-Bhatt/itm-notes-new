import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  themeVariables: {
    primaryColor: "#f5f5f5",
    primaryTextColor: "#000",
    primaryBorderColor: "#d4d4d4",
    lineColor: "#000",
    secondaryColor: "#fafafa",
    tertiaryColor: "#fff",
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "13px",
  },
  flowchart: { htmlLabels: true, curve: "basis" },
  securityLevel: "loose",
});

let mermaidCounter = 0;

export function MermaidDiagram({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
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
          // Clean up any leftover DOM from mermaid
          const el = document.getElementById(id);
          el?.remove();
        }
      }
    })();

    return () => { cancelled = true; };
  }, [chart]);

  if (error) {
    return (
      <div className="my-4 p-4 border border-destructive/20 bg-destructive/5 rounded text-[13px] text-destructive">
        Diagram rendering error: {error}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-6 flex justify-center overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
