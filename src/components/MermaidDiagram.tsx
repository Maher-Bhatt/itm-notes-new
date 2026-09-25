import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

let mermaidCounter = 0;

/**
 * Pre-sanitizes diagram code to prevent Mermaid 11 lexer syntax errors:
 * - Nested square brackets inside quotes: ["...[...]..."] => ["...(...)"]
 * - Arrows inside quoted labels: "A <- B" => "A ← B"
 */
function sanitizeMermaid(chart: string): string {
  let cleaned = chart.trim();

  // Replace inner square brackets and arrow operators inside double quotes
  cleaned = cleaned.replace(/"([^"]*)"/g, (_, inner) => {
    const fixed = inner
      .replace(/\[/g, "(")
      .replace(/\]/g, ")")
      .replace(/<--/g, "⟵")
      .replace(/-->/g, "⟶")
      .replace(/<-/g, "←")
      .replace(/->/g, "→");
    return `"${fixed}"`;
  });

  return cleaned;
}

export function MermaidDiagram({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    mermaid.initialize({
      startOnLoad: false,
      suppressErrorRendering: true, // Prevents Mermaid from injecting error bombs into DOM
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

    // Purge any stray mermaid error nodes
    const purgeErrorNodes = () => {
      document.querySelectorAll(`[id^="dmermaid"], [id^="mermaid-"][class*="error"], .error-icon, [id="d${id}"]`).forEach(el => el.remove());
      const el = document.getElementById(id);
      el?.remove();
    };

    (async () => {
      try {
        const sanitized = sanitizeMermaid(chart);
        const { svg: rendered } = await mermaid.render(id, sanitized);
        if (!cancelled) {
          setSvg(rendered);
          setHasError(false);
        }
      } catch (err) {
        if (!cancelled) {
          setHasError(true);
          purgeErrorNodes();
        }
      }
    })();

    return () => {
      cancelled = true;
      purgeErrorNodes();
    };
  }, [chart]);

  if (hasError || (!svg && !hasError)) {
    // If mermaid fails or is loading, show a neat architecture card fallback rather than a bomb icon or scary error
    return (
      <div className="my-6 rounded-xl border border-border/70 bg-secondary/15 p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-border/40">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary/60"></span>
            <span className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Concept Flowchart Architecture</span>
          </div>
          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-secondary text-muted-foreground">
            Structured Diagram
          </span>
        </div>
        <pre className="text-xs font-mono text-muted-foreground/90 overflow-x-auto whitespace-pre-wrap leading-relaxed p-3 bg-background/60 rounded-lg border border-border/40">
          {chart.trim()}
        </pre>
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
