import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartData } from "../types";
import { generateChartFromText } from "../services/api";
import LoadingSkeleton from "./LoadingSkeleton";

interface ChartPanelProps {
  datasetId: number;
}

const COLORS = ["#0F6B5C", "#C98A2B", "#1E8A73", "#DA9E1F", "#083F36", "#A56E1D"];

function ChartRenderer({ chart }: { chart: ChartData }) {
  const { chart_type, x_key, y_key, data } = chart;

  if (chart_type === "bar" || chart_type === "histogram") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#D7DCD3" />
          <XAxis dataKey={x_key} tick={{ fontSize: 11, fontFamily: "IBM Plex Mono" }} interval={0} angle={-15} textAnchor="end" height={60} />
          <YAxis tick={{ fontSize: 11, fontFamily: "IBM Plex Mono" }} />
          <Tooltip />
          <Bar dataKey={y_key ?? "value"} fill="#0F6B5C" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (chart_type === "pie") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie data={data} dataKey={y_key ?? "value"} nameKey={x_key} outerRadius={100} label>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (chart_type === "line") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#D7DCD3" />
          <XAxis dataKey={x_key} tick={{ fontSize: 11, fontFamily: "IBM Plex Mono" }} />
          <YAxis tick={{ fontSize: 11, fontFamily: "IBM Plex Mono" }} />
          <Tooltip />
          <Line type="monotone" dataKey={y_key ?? "value"} stroke="#C98A2B" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (chart_type === "scatter") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="#D7DCD3" />
          <XAxis dataKey="x" tick={{ fontSize: 11, fontFamily: "IBM Plex Mono" }} />
          <YAxis dataKey="y" tick={{ fontSize: 11, fontFamily: "IBM Plex Mono" }} />
          <Tooltip />
          <Scatter data={data} fill="#0F6B5C" />
        </ScatterChart>
      </ResponsiveContainer>
    );
  }

  if (chart_type === "box") {
    const row = data[0] as Record<string, number>;
    return (
      <div className="grid grid-cols-5 gap-px bg-line border border-line font-mono text-sm">
        {["min", "q1", "median", "q3", "max"].map((k) => (
          <div key={k} className="bg-card py-3 text-center">
            <p className="text-[10px] uppercase text-ink-500">{k}</p>
            <p className="text-ink-900 mt-1">{row[k]?.toFixed?.(2) ?? row[k]}</p>
          </div>
        ))}
      </div>
    );
  }

  return <p className="text-sm text-ink-500">Unsupported chart type.</p>;
}

export default function ChartPanel({ datasetId }: ChartPanelProps) {
  const [activeChart, setActiveChart] = useState<ChartData | null>(null);
  const [nlInput, setNlInput] = useState("");
  const [nlLoading, setNlLoading] = useState(false);

  async function handleNlSubmit() {
    if (!nlInput.trim()) return;
    setNlLoading(true);
    try {
      const chart = await generateChartFromText(datasetId, nlInput.trim());
      setActiveChart(chart);
    } finally {
      setNlLoading(false);
    }
  }

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <input
          value={nlInput}
          onChange={(e) => setNlInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleNlSubmit()}
          placeholder='e.g. "show sales by category"'
          className="flex-1 border border-line bg-card px-3 py-2 text-sm font-mono focus:outline-none focus:border-pine-500"
        />
        <button className="btn-primary" onClick={handleNlSubmit} disabled={nlLoading}>
          {nlLoading ? "Thinking…" : "Ask"}
        </button>
      </div>

      {nlLoading && <LoadingSkeleton lines={4} />}

      {activeChart && !nlLoading && (
        <div className="border border-line p-4 reveal">
          <ChartRenderer chart={activeChart} />
        </div>
      )}
    </div>
  );
}
