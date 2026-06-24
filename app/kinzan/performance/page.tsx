"use client";

import { useState } from "react";
import Link from "next/link";
import tradesData from "./performance-data.json";

type Trade = {
  time_open: string;
  ticket: string;
  symbol: string;
  type: string;
  lot: string;
  price_open: string;
  sl: string;
  tp: string;
  time_close: string;
  price_close: string;
  commission: number;
  swap: number;
  profit: number;
};

type DailyStat = {
  date: string;
  profit: number;
  cumulative: number;
};

function calcStats(trades: Trade[]) {
  let wins = 0, losses = 0, totalProfit = 0, totalFee = 0;
  const dailyMap: Record<string, number> = {};
  for (const t of trades) {
    totalProfit += t.profit;
    totalFee += t.commission + t.swap;
    if (t.profit > 0) wins++;
    else if (t.profit < 0) losses++;
    const date = t.time_open.slice(0, 10);
    dailyMap[date] = (dailyMap[date] ?? 0) + t.profit;
  }
  const dailyStats: DailyStat[] = [];
  let cum = 0;
  for (const date of Object.keys(dailyMap).sort()) {
    cum += dailyMap[date];
    dailyStats.push({ date, profit: dailyMap[date], cumulative: cum });
  }
  const winRate = wins + losses > 0 ? (wins / (wins + losses)) * 100 : 0;
  return { wins, losses, totalProfit, totalFee, net: totalProfit + totalFee, winRate, dailyStats };
}

function CumulativeChart({ data }: { data: DailyStat[] }) {
  if (data.length < 2) return null;
  const W = 600, H = 120, PAD = 16;
  const values = data.map((d) => d.cumulative);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = data.map((d, i) => {
    const x = PAD + ((W - PAD * 2) * i) / (data.length - 1);
    const y = PAD + ((H - PAD * 2) * (1 - (d.cumulative - min) / range));
    return `${x},${y}`;
  });
  const polyline = points.join(" ");
  const area = `${PAD},${H - PAD} ${polyline} ${W - PAD},${H - PAD}`;
  const lastVal = values[values.length - 1];
  const color = lastVal >= 0 ? "#34d399" : "#f87171";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#chartGrad)" />
      <polyline points={polyline} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {min < 0 && max > 0 && (
        <line
          x1={PAD} y1={PAD + ((H - PAD * 2) * (1 - (0 - min) / range))}
          x2={W - PAD} y2={PAD + ((H - PAD * 2) * (1 - (0 - min) / range))}
          stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" strokeWidth="1"
        />
      )}
    </svg>
  );
}

const PAGE_SIZE = 50;

export default function KinzanPerformancePage() {
  const trades = tradesData as Trade[];
  const stats = calcStats(trades);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(trades.length / PAGE_SIZE);
  const paginated = trades.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#05070b] text-white antialiased">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />
        <div className="absolute -top-40 left-[-10%] h-[460px] w-[460px] rounded-full bg-amber-500/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[480px] w-[480px] rounded-full bg-yellow-400/8 blur-[170px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/45 backdrop-blur-3xl">
        <div className="mx-auto flex h-[74px] max-w-[1200px] items-center justify-between px-4 md:px-5">
          <div>
            <p className="text-[10px] font-medium tracking-[0.4em] text-gray-500 uppercase">TREASURE TERMINAL</p>
            <h1 className="mt-1 text-xl font-black tracking-[0.12em] text-white md:text-2xl">KINZAN 実績</h1>
            <p className="mt-1.5 text-[10px] font-bold tracking-[0.25em] text-amber-400 flex items-center gap-1.5 uppercase">
              <span className="inline-block h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              LIVE PERFORMANCE
            </p>
          </div>
          <Link href="/dashboard" className="group rounded-2xl border border-white/10 bg-white/5 px-4 py-2 outline-none transition hover:bg-white/10">
            <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">Back</p>
            <p className="mt-0.5 text-sm font-black text-white transition group-hover:text-amber-200">Dashboard</p>
          </Link>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-[1200px] px-4 py-8 pb-16">
        <div className="mb-8">
          <p className="text-[11px] font-semibold tracking-[0.35em] text-amber-400 uppercase">Real Result</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-white md:text-6xl">
            KINZAN{" "}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-white bg-clip-text text-transparent">
              Performance
            </span>
          </h2>
          <p className="mt-2 text-xs text-gray-600">最終更新: {trades[trades.length - 1]?.time_close?.slice(0, 10)}</p>
        </div>

        <div className="space-y-6">
          {/* KPIカード */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "総取引数", value: `${trades.length}件`, color: "text-sky-300", border: "border-sky-400/15" },
              { label: "勝率", value: `${stats.winRate.toFixed(1)}%`, color: "text-lime-300", border: "border-lime-400/15" },
              { label: "勝 / 負", value: `${stats.wins} / ${stats.losses}`, color: "text-white", border: "border-white/10" },
              {
                label: "純損益",
                value: `${stats.net >= 0 ? "+" : ""}${Math.round(stats.net).toLocaleString()}円`,
                color: stats.net >= 0 ? "text-emerald-300" : "text-red-400",
                border: stats.net >= 0 ? "border-emerald-400/15" : "border-red-400/15",
              },
            ].map((k) => (
              <div key={k.label} className={`rounded-[24px] border ${k.border} bg-[#0b1118]/90 p-5 shadow-inner shadow-black/30`}>
                <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">{k.label}</p>
                <p className={`mt-3 text-3xl font-black tabular-nums md:text-4xl ${k.color}`}>{k.value}</p>
              </div>
            ))}
          </div>

          {/* グラフ */}
          <div className="rounded-[28px] border border-white/10 bg-[#0b1118]/90 p-6">
            <p className="text-[10px] font-semibold tracking-[0.35em] text-amber-400 uppercase mb-1">Cumulative P&L</p>
            <h3 className="text-lg font-bold text-white mb-4">累積損益推移</h3>
            <CumulativeChart data={stats.dailyStats} />
            <div className="mt-4 flex gap-6 flex-wrap text-xs text-gray-500">
              {stats.dailyStats.map((d) => (
                <div key={d.date} className="text-center">
                  <p>{d.date.slice(5)}</p>
                  <p className={d.profit >= 0 ? "text-emerald-400" : "text-red-400"}>
                    {d.profit >= 0 ? "+" : ""}{Math.round(d.profit).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* テーブル */}
          <div className="rounded-[28px] border border-white/10 bg-[#0b1118]/90 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.35em] text-amber-400 uppercase mb-1">Trade History</p>
                <h3 className="text-lg font-bold text-white">
                  取引履歴 <span className="text-gray-500 text-sm font-normal">全{trades.length}件</span>
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs text-gray-400 disabled:opacity-30 hover:bg-white/10 transition">←</button>
                <span className="text-xs text-gray-500">{page} / {totalPages}</span>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs text-gray-400 disabled:opacity-30 hover:bg-white/10 transition">→</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-gray-500">
                    <th className="pb-2 text-left pr-4">開始時間</th>
                    <th className="pb-2 text-left pr-4">タイプ</th>
                    <th className="pb-2 text-left pr-4">銘柄</th>
                    <th className="pb-2 text-right pr-4">lot</th>
                    <th className="pb-2 text-right pr-4">開始価格</th>
                    <th className="pb-2 text-right pr-4">決済価格</th>
                    <th className="pb-2 text-right">損益(円)</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((t, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="py-2 pr-4 text-gray-400">{t.time_open.slice(0, 16)}</td>
                      <td className="py-2 pr-4">
                        <span className={`font-bold uppercase ${t.type === "buy" ? "text-sky-400" : "text-pink-400"}`}>{t.type}</span>
                      </td>
                      <td className="py-2 pr-4 text-gray-300">{t.symbol}</td>
                      <td className="py-2 pr-4 text-right text-gray-400">{t.lot}</td>
                      <td className="py-2 pr-4 text-right text-gray-400">{t.price_open}</td>
                      <td className="py-2 pr-4 text-right text-gray-400">{t.price_close}</td>
                      <td className={`py-2 text-right font-bold tabular-nums ${t.profit > 0 ? "text-emerald-400" : t.profit < 0 ? "text-red-400" : "text-gray-400"}`}>
                        {t.profit > 0 ? "+" : ""}{Math.round(t.profit).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ページネーション下部 */}
            <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
              <button onClick={() => setPage(1)} disabled={page === 1}
                className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs text-gray-400 disabled:opacity-30 hover:bg-white/10 transition">最初</button>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs text-gray-400 disabled:opacity-30 hover:bg-white/10 transition">←</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                .reduce<(number | string)[]>((acc, p, idx, arr) => {
                  if (idx > 0 && (arr[idx - 1] as number) !== p - 1) acc.push("...");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, idx) =>
                  p === "..." ? (
                    <span key={`d${idx}`} className="text-gray-600 text-xs">...</span>
                  ) : (
                    <button key={p} onClick={() => setPage(p as number)}
                      className={`w-8 h-8 rounded-xl text-xs font-bold transition ${
                        p === page ? "bg-amber-400/20 border border-amber-400/50 text-amber-300" : "border border-white/10 bg-white/5 text-gray-500 hover:bg-white/10"
                      }`}>{p}</button>
                  )
                )}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs text-gray-400 disabled:opacity-30 hover:bg-white/10 transition">→</button>
              <button onClick={() => setPage(totalPages)} disabled={page === totalPages}
                className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs text-gray-400 disabled:opacity-30 hover:bg-white/10 transition">最後</button>
            </div>
          </div>
        </div>

        <footer className="mt-10 border-t border-white/10 pt-6 text-xs leading-relaxed text-gray-600">
          数値は自己記録用です。投資勧誘ではありません。
        </footer>
      </section>
    </main>
  );
}
