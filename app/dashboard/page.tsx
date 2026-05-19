"use client";
import Link from "next/link";
import { performance } from "../data/performance"
import { trades } from "../data/trades"
import { chartData } from "../data/chart"
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

type Stat = {
  id: string;
  label: string;
  value: string;
  hint: string;
  borderClass: string;
  valueClass: string;
};

const stats: Stat[] = [
  {
    id: "equity",
    label: "現在の純資産",
    value: performance.equity,
    borderClass: "border-sky-400/15",
    valueClass: "text-sky-300",
  },
  {
    id: "pnl",
    label: "トータルの損益",
    value: performance.pnl,
    borderClass: "border-lime-400/15",
    valueClass: "text-lime-300",
  },
  {
    id: "winrate",
    label: "現在の収益率",
    value: performance.winrate,
    borderClass: "border-yellow-400/15",
    valueClass: "text-yellow-300",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070b] text-white">

      {/* Background */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="absolute -top-40 left-[-10%] h-[460px] w-[460px] rounded-full bg-sky-500/12 blur-[150px]" />

        <div className="absolute bottom-[-10%] right-[-10%] h-[480px] w-[480px] rounded-full bg-amber-400/12 blur-[170px]" />

        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[180px]" />

      </div>

      {/* Header */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/45 backdrop-blur-3xl">

        <div className="mx-auto flex h-[74px] max-w-[1200px] items-center justify-between px-4 md:px-5">

          <div>

            <p className="text-[10px] font-medium tracking-[0.4em] text-gray-500 uppercase">
              TREASURE TERMINAL
            </p>

            <h1 className="mt-1 text-xl font-black tracking-[0.12em] text-white md:text-2xl">
              ヌシ PERFORMANCE
            </h1>

            <p className="mt-2 text-[10px] font-bold tracking-[0.25em] text-emerald-400 animate-pulse uppercase">
              ● LIVE PERFORMANCE
            </p>

          </div>

          <Link
            href="/"
            className="group rounded-2xl border border-white/10 bg-white/5 px-4 py-2 outline-none ring-sky-400/40 transition hover:bg-white/10 focus-visible:ring-2"
          >

            <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">
              Back
            </p>

            <p className="mt-1 text-sm font-black text-white transition group-hover:text-sky-200">
              Home
            </p>

          </Link>

        </div>

      </header>

      {/* Body */}

      <section className="relative z-10 mx-auto max-w-[1200px] px-4 py-6 pb-16 md:py-8">

        <div className="overflow-hidden rounded-[34px] border border-white/10 bg-black/40 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-3xl">

          <div className="h-[4px] bg-gradient-to-r from-sky-400 via-yellow-300 to-lime-300" />

          <div className="p-5 md:p-10">

            <p className="text-[11px] font-semibold tracking-[0.35em] text-sky-300 uppercase">
              Real Result
            </p>

            <h2 className="mt-5 max-w-[980px] text-[44px] font-black leading-tight tracking-tight text-white md:text-[76px]">
              FX&GOLD（XAUUSD）成績
              <span className="bg-gradient-to-r from-sky-300 via-white to-amber-200 bg-clip-text text-transparent">
                公開中。
              </span>
            </h2>

            <p className="mt-8 max-w-[760px] text-sm leading-7 text-gray-300 md:text-lg md:leading-8">
              弱小トレーダー。
              <br className="hidden md:block" />
              <span className="md:ml-1">
                勝っては負けて（　＾ω＾）……行ったり来たり。
              </span>
            </p>

            {/* Stats */}

            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">

              {stats.map((s) => (

                <section
                  key={s.id}
                  className={`rounded-[28px] border ${s.borderClass} bg-[#0b1118]/90 p-5 md:p-7 shadow-inner shadow-black/30 transition hover:-translate-y-0.5 hover:border-white/15 hover:bg-[#0b1118]`}
                >

                  <h3 className="text-sm font-medium text-gray-500">
                    {s.label}
                  </h3>

                  <p className={`mt-4 text-4xl font-black tabular-nums md:text-5xl ${s.valueClass}`}>
                    {s.value}
                  </p>

                  

                </section>

              ))}

            </div>

            {/* Comment */}

            <section className="mt-10 rounded-[30px] border border-white/10 bg-[#0b1118]/90 p-5 shadow-inner shadow-black/25 md:p-8">

              <p className="text-[11px] font-semibold tracking-[0.35em] text-amber-300 uppercase">
                Comment
              </p>

              <h2 className="mt-5 text-2xl font-black leading-snug text-white md:text-[34px]">
                一気に稼ぐより、
                <br className="md:hidden" />
                まずは退場しない。
              </h2>

              <div className="mt-6 space-y-5 text-sm leading-7 text-gray-300 md:text-base md:leading-8">

                <p>
                  FXはまだ分からないことだらけ。
                </p>

                <p>
                  でも毎日チャートを見て、少しずつ経験を積んでいきたい。
                </p>

                <p>
                  とりあえず目標は、
                  <span className="font-semibold text-white">
                    「長く相場に残ること」
                  </span>
                  。
                </p>

              </div>

            </section>

            <section className="mt-10 rounded-[30px] border border-white/10 bg-[#0b1118]/90 p-5 shadow-inner shadow-black/25 md:p-8">

  <p className="text-[11px] font-semibold tracking-[0.35em] text-sky-300 uppercase">
    Equity Chart
  </p>

  <h2 className="mt-3 text-2xl font-black text-white md:text-3xl">
    資産推移グラフ
  </h2>

  <div className="mt-8 h-[260px] w-full">

    <ResponsiveContainer width="100%" height="100%">

      <LineChart data={chartData}>

        <XAxis dataKey="date" stroke="#888" />

        <YAxis stroke="#888" />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="equity"
          stroke="#38bdf8"
          strokeWidth={3}
        />

      </LineChart>

    </ResponsiveContainer>

  </div>

</section>

            {/* TRADE HISTORY */}

            <section className="mt-10 rounded-[30px] border border-white/10 bg-[#0b1118]/90 p-5 shadow-inner shadow-black/25 md:p-8">

              <div className="flex items-center justify-between gap-4">

                <div>

                  <p className="text-[11px] font-semibold tracking-[0.35em] text-lime-300 uppercase">
                    Trade History
                  </p>

                  <h2 className="mt-3 text-2xl font-black text-white md:text-3xl">
                    取引実績
                  </h2>

                </div>

                <p className="text-xs font-bold text-emerald-400 animate-pulse md:text-sm">
                  ● MANUAL UPDATE
                </p>

              </div>

              <div className="mt-8 overflow-x-auto rounded-[24px] border border-white/10">

                <table className="w-full min-w-[620px] text-left">

                  <thead className="bg-white/5">

                    <tr className="text-sm text-gray-400">

                      <th className="px-5 py-4">
                        日時
                      </th>

                      <th className="px-5 py-4">
                        通貨
                      </th>

                      <th className="px-5 py-4">
                        方向
                      </th>

                      <th className="px-5 py-4">
                        損益
                      </th>

                    </tr>

                  </thead>

    <tbody>

  {trades.map((trade, index) => (

    <tr key={index} className="border-t border-white/5">

      <td className="px-5 py-4 text-gray-400">
        {trade.date}
      </td>

      <td
        className={`px-5 py-4 font-bold ${
          trade.pair === "USDJPY"
            ? "text-sky-300"
            : "text-yellow-300"
        }`}
      >
        {trade.pair} {trade.type}
      </td>

      <td
        className={`px-5 py-4 font-black ${
          trade.profit.includes("-")
            ? "text-red-400"
            : "text-emerald-400"
        }`}
      >
        {trade.profit}
      </td>

    </tr>

  ))}

</tbody>

                </table>

              </div>

            </section>

            <footer className="mt-10 border-t border-white/10 pt-6 text-xs leading-relaxed text-gray-500">

              数値・コメントは自己記録用の例です。
              投資判断や勧誘ではありません。

            </footer>

          </div>

        </div>

      </section>

    </main>
  );
}