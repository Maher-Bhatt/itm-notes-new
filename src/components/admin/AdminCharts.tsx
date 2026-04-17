import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip as RTooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

interface Props {
  growth: { day: string; count: number }[];
  subjectPop: { name: string; users: number }[];
  quizScores: { date: string; avg: number }[];
  metrics: {
    total_downloads: number;
    total_reviews: number;
    avg_rating: number;
    retention: number;
  };
}

const tooltipStyle = {
  background: "hsl(var(--background))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 6,
  fontSize: 12,
};

export default function AdminCharts({ growth, subjectPop, quizScores, metrics }: Props) {
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <ChartCard title="User growth">
        {growth.length === 0 ? <Empty /> : (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={growth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} allowDecimals={false} />
              <RTooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard title="Subject popularity (unique learners)">
        {subjectPop.every((s) => s.users === 0) ? <Empty /> : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={subjectPop}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} allowDecimals={false} />
              <RTooltip contentStyle={tooltipStyle} />
              <Bar dataKey="users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard title="Avg quiz score over time (%)">
        {quizScores.length === 0 ? <Empty /> : (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={quizScores}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} domain={[0, 100]} />
              <RTooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="avg" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard title="Engagement">
        <div className="grid grid-cols-2 gap-4 h-[220px] content-center px-2">
          <Metric label="Total downloads" value={metrics.total_downloads} />
          <Metric label="Total reviews"   value={metrics.total_reviews} />
          <Metric label="Avg rating"      value={metrics.avg_rating ? `${metrics.avg_rating} / 5` : "—"} />
          <Metric label="Retention"       value={`${metrics.retention}%`} />
        </div>
      </ChartCard>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="surface-elevated rounded p-4">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="text-xl font-bold tabular-nums">{value}</div>
    </div>
  );
}

function Empty() {
  return (
    <div className="h-[220px] flex items-center justify-center text-xs text-muted-foreground">
      No data yet
    </div>
  );
}
