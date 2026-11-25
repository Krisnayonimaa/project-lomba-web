"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const dummyStressData = [
  { periode: "Minggu 1", skor: 42, zona: "Aman" },
  { periode: "Minggu 2", skor: 58, zona: "Realistis" },
  { periode: "Minggu 3", skor: 71, zona: "Menantang" },
  { periode: "Minggu 4", skor: 51, zona: "Realistis" },
];

export default function StressTrendData() {
  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-base font-semibold text-slate-800">
        Uji Grafik Skor Stres (Data Dummy)
      </h2>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dummyStressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="periode" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="skor"
              stroke="#2563eb"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
