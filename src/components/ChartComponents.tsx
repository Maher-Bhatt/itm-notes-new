import { useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ScatterChart, Scatter, BarChart, Bar, ResponsiveContainer,
  ReferenceLine, Area, AreaChart,
} from "recharts";

/* ── Normal Distribution Curve ── */
function gaussianPDF(x: number, mean: number, stdDev: number): number {
  const exp = -0.5 * ((x - mean) / stdDev) ** 2;
  return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exp);
}

interface NormalDistProps {
  mean?: number;
  stdDev?: number;
  title?: string;
  showSD?: boolean;
}

export function NormalDistributionChart({ mean = 0, stdDev = 1, title, showSD = true }: NormalDistProps) {
  const data = useMemo(() => {
    const points = [];
    for (let x = mean - 4 * stdDev; x <= mean + 4 * stdDev; x += stdDev * 0.05) {
      points.push({ x: parseFloat(x.toFixed(3)), y: parseFloat(gaussianPDF(x, mean, stdDev).toFixed(6)) });
    }
    return points;
  }, [mean, stdDev]);

  return (
    <div className="my-6">
      {title && <p className="text-[13px] font-semibold text-foreground mb-3">{title}</p>}
      <div className="surface-elevated rounded p-4 border">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 90%)" />
            <XAxis
              dataKey="x"
              type="number"
              domain={[mean - 4 * stdDev, mean + 4 * stdDev]}
              tick={{ fontSize: 11, fill: "hsl(0 0% 50%)" }}
              tickFormatter={(v: number) => v.toFixed(1)}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "hsl(0 0% 50%)" }}
              tickFormatter={(v: number) => v.toFixed(2)}
            />
            <Tooltip
              contentStyle={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: "4px", fontSize: "12px" }}
              formatter={(value: number) => [value.toFixed(4), "f(x)"]}
              labelFormatter={(label: number) => `x = ${label.toFixed(2)}`}
            />
            <Area type="monotone" dataKey="y" stroke="#000" fill="hsl(0 0% 0% / 0.08)" strokeWidth={2} dot={false} />
            {showSD && (
              <>
                <ReferenceLine x={mean} stroke="#000" strokeDasharray="5 5" label={{ value: "μ", position: "top", fontSize: 12, fontWeight: 600 }} />
                <ReferenceLine x={mean - stdDev} stroke="hsl(0 0% 60%)" strokeDasharray="3 3" label={{ value: "-1σ", position: "top", fontSize: 10 }} />
                <ReferenceLine x={mean + stdDev} stroke="hsl(0 0% 60%)" strokeDasharray="3 3" label={{ value: "+1σ", position: "top", fontSize: 10 }} />
                <ReferenceLine x={mean - 2 * stdDev} stroke="hsl(0 0% 75%)" strokeDasharray="3 3" label={{ value: "-2σ", position: "top", fontSize: 10 }} />
                <ReferenceLine x={mean + 2 * stdDev} stroke="hsl(0 0% 75%)" strokeDasharray="3 3" label={{ value: "+2σ", position: "top", fontSize: 10 }} />
              </>
            )}
          </AreaChart>
        </ResponsiveContainer>
        {showSD && (
          <div className="flex justify-center gap-6 mt-2 text-[11px] text-muted-foreground">
            <span>68.27% within ±1σ</span>
            <span>95.45% within ±2σ</span>
            <span>99.73% within ±3σ</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Scatter Plot (for Regression) ── */
interface ScatterPlotProps {
  data: { x: number; y: number }[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
  regressionLine?: { slope: number; intercept: number };
}

export function ScatterPlot({ data, title, xLabel, yLabel, regressionLine }: ScatterPlotProps) {
  const lineData = useMemo(() => {
    if (!regressionLine) return [];
    const xs = data.map(d => d.x);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    return [
      { x: minX, y: regressionLine.slope * minX + regressionLine.intercept },
      { x: maxX, y: regressionLine.slope * maxX + regressionLine.intercept },
    ];
  }, [data, regressionLine]);

  return (
    <div className="my-6">
      {title && <p className="text-[13px] font-semibold text-foreground mb-3">{title}</p>}
      <div className="surface-elevated rounded p-4 border">
        <ResponsiveContainer width="100%" height={260}>
          <ScatterChart margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 90%)" />
            <XAxis
              dataKey="x" type="number" name={xLabel || "X"}
              tick={{ fontSize: 11, fill: "hsl(0 0% 50%)" }}
            />
            <YAxis
              dataKey="y" type="number" name={yLabel || "Y"}
              tick={{ fontSize: 11, fill: "hsl(0 0% 50%)" }}
            />
            <Tooltip
              contentStyle={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: "4px", fontSize: "12px" }}
              formatter={(v: number) => v.toFixed(2)}
            />
            <Scatter data={data} fill="#000" r={4} />
            {regressionLine && (
              <Scatter data={lineData} fill="none" line={{ stroke: "#000", strokeWidth: 2, strokeDasharray: "5 5" }} shape={() => null} />
            )}
          </ScatterChart>
        </ResponsiveContainer>
        {(xLabel || yLabel) && (
          <div className="flex justify-center gap-4 mt-2 text-[11px] text-muted-foreground">
            {xLabel && <span>X: {xLabel}</span>}
            {yLabel && <span>Y: {yLabel}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Bar Chart (Frequency) ── */
interface BarChartProps {
  data: { label: string; value: number }[];
  title?: string;
  color?: string;
}

export function FrequencyBarChart({ data, title, color = "#000" }: BarChartProps) {
  return (
    <div className="my-6">
      {title && <p className="text-[13px] font-semibold text-foreground mb-3">{title}</p>}
      <div className="surface-elevated rounded p-4 border">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 90%)" />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "hsl(0 0% 50%)" }} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(0 0% 50%)" }} />
            <Tooltip
              contentStyle={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: "4px", fontSize: "12px" }}
            />
            <Bar dataKey="value" fill={color} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
