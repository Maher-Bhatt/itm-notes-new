import { useState, useCallback, useMemo, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import "katex/dist/katex.min.css";
import { Copy, Check } from "lucide-react";
import { MermaidDiagram } from "./MermaidDiagram";
import { NormalDistributionChart, ScatterPlot, FrequencyBarChart } from "./ChartComponents";

/* ── Code block with copy button ── */
function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [code]);

  return (
    <div className="xcode-block my-4">
      <div className="xcode-block-header">
        <span className="text-[11px] font-mono text-muted-foreground">{language || "Code"}</span>
        <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition-colors apple-press p-1 -m-1">
          {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
      <div className="xcode-block-body">
        <pre className="!bg-transparent !border-none !p-0 !m-0 !shadow-none">
          <code className="text-[13px] leading-relaxed">{code}</code>
        </pre>
      </div>
    </div>
  );
}

/* ── Chart embed parser ── */
function parseChartDirective(value: string): ReactNode | null {
  try {
    const trimmed = value.trim();
    if (trimmed.startsWith("chart:normal-distribution")) {
      const json = trimmed.replace(/^chart:normal-distribution\s*/, "").trim();
      const props = json ? JSON.parse(json) : {};
      return <NormalDistributionChart {...props} />;
    }
    if (trimmed.startsWith("chart:scatter")) {
      const json = trimmed.replace(/^chart:scatter\s*/, "").trim();
      const props = json ? JSON.parse(json) : {};
      return <ScatterPlot {...props} />;
    }
    if (trimmed.startsWith("chart:bar")) {
      const json = trimmed.replace(/^chart:bar\s*/, "").trim();
      const props = json ? JSON.parse(json) : {};
      return <FrequencyBarChart {...props} />;
    }
  } catch {
    return null;
  }
  return null;
}

/* ── Table of Contents extraction ── */
export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function extractTOC(markdown: string): TOCItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TOCItem[] = [];
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const text = match[2].replace(/[*_`~]/g, "");
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    items.push({ id, text, level: match[1].length });
  }
  return items;
}

/* ── Heading with anchor ── */
function HeadingWithAnchor({ level, children }: { level: number; children: ReactNode }) {
  const text = typeof children === "string" ? children : getTextFromChildren(children);
  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const styles: Record<number, string> = {
    2: "text-xl font-bold mt-10 mb-4 pb-2 border-b border text-foreground scroll-mt-16",
    3: "text-lg font-semibold mt-8 mb-3 text-foreground scroll-mt-16",
    4: "text-base font-semibold mt-6 mb-2 text-foreground scroll-mt-16",
    5: "text-sm font-semibold mt-4 mb-1.5 text-foreground scroll-mt-16",
    6: "text-sm font-medium mt-3 mb-1 text-muted-foreground scroll-mt-16",
  };

  return <Tag id={id} className={styles[level] || styles[4]}>{children}</Tag>;
}

function getTextFromChildren(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(getTextFromChildren).join("");
  if (children && typeof children === "object" && "props" in children) {
    return getTextFromChildren((children as any).props.children);
  }
  return "";
}

/* ── Main MarkdownRenderer ── */
interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeKatex]}
      components={{
        h2: ({ children }) => <HeadingWithAnchor level={2}>{children}</HeadingWithAnchor>,
        h3: ({ children }) => <HeadingWithAnchor level={3}>{children}</HeadingWithAnchor>,
        h4: ({ children }) => <HeadingWithAnchor level={4}>{children}</HeadingWithAnchor>,
        h5: ({ children }) => <HeadingWithAnchor level={5}>{children}</HeadingWithAnchor>,

        p: ({ children }) => (
          <p className="text-[15px] leading-[1.85] text-muted-foreground mb-4">{children}</p>
        ),

        ul: ({ children }) => (
          <ul className="my-3 space-y-1.5 pl-5 list-disc marker:text-muted-foreground/40">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="my-3 space-y-1.5 pl-5 list-decimal marker:text-muted-foreground/60">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="text-[15px] leading-[1.8] text-muted-foreground">{children}</li>
        ),

        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">{children}</strong>
        ),

        em: ({ children }) => (
          <em className="italic text-muted-foreground">{children}</em>
        ),

        blockquote: ({ children }) => (
          <blockquote className="my-4 border-l-2 border-foreground/20 pl-4 py-1 text-[14px] text-muted-foreground italic">
            {children}
          </blockquote>
        ),

        hr: () => <hr className="my-8 border-t border" />,

        table: ({ children }) => (
          <div className="my-6 overflow-x-auto border rounded">
            <table className="w-full text-[13px]">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-card">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="text-left px-3 py-2.5 font-semibold text-foreground border-b">{children}</th>
        ),
        td: ({ children }) => (
          <td className="px-3 py-2 text-muted-foreground border-b border-border/50">{children}</td>
        ),

        a: ({ href, children }) => (
          <a href={href} className="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">{children}</a>
        ),

        code: ({ className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          const lang = match?.[1];
          const value = String(children).replace(/\n$/, "");

          // Inline code (no language)
          if (!lang && !value.includes("\n")) {
            return (
              <code className="px-1.5 py-0.5 rounded text-[13px] bg-secondary text-secondary-foreground font-mono">
                {children}
              </code>
            );
          }

          // Mermaid diagram
          if (lang === "mermaid") {
            return <MermaidDiagram chart={value} />;
          }

          // Chart directive
          if (lang === "chart") {
            const chartNode = parseChartDirective(value);
            if (chartNode) return <>{chartNode}</>;
          }

          // Regular code block
          return <CodeBlock code={value} language={lang} />;
        },

        pre: ({ children }) => {
          // Just pass through — code component handles rendering
          return <>{children}</>;
        },

        img: ({ src, alt }) => (
          <figure className="my-6">
            <img src={src} alt={alt || ""} className="rounded border max-w-full" loading="lazy" />
            {alt && <figcaption className="text-[12px] text-muted-foreground text-center mt-2">{alt}</figcaption>}
          </figure>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
