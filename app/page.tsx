"use client"

import { useEffect, useState } from "react"

// ──────────────────────────────────────────────
// 型定義
// ──────────────────────────────────────────────
type NewsItem = {
  source: string
  title: string
  link: string
  image: string
}

type MarketAnalysis = {
  updated: string

  USDJPY: {
    signal: string
    confidence: number
    trend: string
    volatility: string
    comment: string
  }

  XAUUSD: {
    signal: string
    confidence: number
    trend: string
    volatility: string
    comment: string
  }

  NAS100: {
    signal: string
    confidence: number
    trend: string
    volatility: string
    comment: string
  }

  JP225: {
    signal: string
    confidence: number
    trend: string
    volatility: string
    comment: string
  }
}
type AnalysisResult = {
  signal: string;
  confidence: number;
  trend: string;
  volatility: string;
  comment: string;
};

type AnalysisSymbol = "USDJPY" | "XAUUSD" | "NAS100" | "JP225";

type MarketCard = {
  symbol: string
  tvSymbol: string
  label: string
  category: string
  borderClass: string
  textClass: string
  signal: "BUY" | "HOLD" | "SELL"
  signalBgClass: string
  signalTextClass: string
  trend: string
  trendArrow: string
  trendClass: string
  confidence: string
  confidenceClass: string
  metricLabel: string
  metricValue: string
  metricClass: string
}

// AIマーケットカード表示用に正規化したデータ（confidenceは表示都合上string統一）
type MarketMetrics = {
  signal: string
  trend: string
  confidence: string
  volatility: string
  comment: string
}

// ──────────────────────────────────────────────
// Market Status (日本語化)
// ──────────────────────────────────────────────
const MARKET_STATUS = [
  { key: "risk",       label: "リスク",     value: "リスクオン",     color: "text-green-400" },
  { key: "usd",        label: "米ドル強度", value: "強い",           color: "text-sky-300"   },
  { key: "nasdaq",     label: "NASDAQ",     value: "強気",           color: "text-lime-300"  },
  { key: "gold",       label: "ゴールド",   value: "中立",           color: "text-yellow-300"},
  { key: "market_mood",label: "市場心理",   value: "楽観的",         color: "text-white"     },
] as const

// ──────────────────────────────────────────────
// LIVEマーケットカード定義 (無料 widgetembed 対応版)
// ──────────────────────────────────────────────
const LIVE_MARKETS: MarketCard[] = [
  {
    symbol: "USDJPY",
    tvSymbol: "FX%3AUSDJPY",
    label: "USDJPY",
    category: "FX / 為替",
    borderClass: "border-sky-400/20",
    textClass: "text-sky-300",
    signal: "BUY",
    signalBgClass: "bg-green-500/15",
    signalTextClass: "text-green-300",
    trend: "強気",
    trendArrow: "▲",
    trendClass: "text-green-300",
    confidence: "89%",
    confidenceClass: "text-sky-300",
    metricLabel: "ボラティリティ",
    metricValue: "中",
    metricClass: "text-yellow-300",
  },
  {
    symbol: "NAS100",
    tvSymbol: "OANDA%3ANAS100USD",
    label: "NAS100",
    category: "米国指数 (CFD)",
    borderClass: "border-violet-400/20",
    textClass: "text-violet-300",
    signal: "BUY",
    signalBgClass: "bg-green-500/15",
    signalTextClass: "text-green-300",
    trend: "強気",
    trendArrow: "▲",
    trendClass: "text-green-300",
    confidence: "92%",
    confidenceClass: "text-violet-300",
    metricLabel: "モメンタム",
    metricValue: "強い",
    metricClass: "text-cyan-300",
  },
  {
    symbol: "JP225",
    tvSymbol: "OANDA%3AJP225USD",
    label: "NIKKEI225",
    category: "日本指数",
    borderClass: "border-red-400/20",
    textClass: "text-red-300",
    signal: "HOLD",
    signalBgClass: "bg-yellow-500/15",
    signalTextClass: "text-yellow-300",
    trend: "中立",
    trendArrow: "→",
    trendClass: "text-yellow-300",
    confidence: "84%",
    confidenceClass: "text-red-300",
    metricLabel: "モメンタム",
    metricValue: "安定",
    metricClass: "text-orange-300",
  },
  {
    symbol: "XAUUSD",
    tvSymbol: "OANDA%3AXAUUSD",
    label: "GOLD",
    category: "貴金属",
    borderClass: "border-yellow-400/20",
    textClass: "text-yellow-300",
    signal: "HOLD",
    signalBgClass: "bg-yellow-500/15",
    signalTextClass: "text-yellow-300",
    trend: "中立",
    trendArrow: "→",
    trendClass: "text-yellow-300",
    confidence: "76%",
    confidenceClass: "text-yellow-300",
    metricLabel: "ボラティリティ",
    metricValue: "高",
    metricClass: "text-red-300",
  },
]

// analysisがまだ無い場合のフォールバックを含め、表示用データを正規化する
// （毎レンダーの map 内で再定義していたのをトップレベルに移動）
function getMarketData(
  symbol: AnalysisSymbol,
  analysis: MarketAnalysis | null
): MarketMetrics {
  if (!analysis) {
    return {
      signal: "HOLD",
      trend: "-",
      confidence: "-",
      volatility: "-",
      comment: "読み込み中...",
    }
  }

  const data = analysis[symbol]

  return {
    signal: data.signal,
    trend: data.trend,
    confidence: String(data.confidence),
    volatility: data.volatility,
    comment: data.comment,
  }
}

// ──────────────────────────────────────────────
// ページ本体
// ──────────────────────────────────────────────
export default function Home() {
  const [japanNews, setJapanNews] = useState<NewsItem[]>([])
  const [usNews, setUsNews] = useState<NewsItem[]>([])
  const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null)
  const [newsLoading, setNewsLoading] = useState(true)
  const [hasNewsError, setHasNewsError] = useState(false)

  useEffect(() => {
    const loadAll = () => {
      Promise.allSettled([
        fetch("/api/japan-news").then((r) => r.json()),
        fetch("/api/us-news").then((r) => r.json()),
      ])
        .then(([jp, us]) => {
          if (jp.status === "fulfilled") setJapanNews(jp.value as NewsItem[])
          if (us.status === "fulfilled") setUsNews(us.value as NewsItem[])
          if (jp.status === "rejected" || us.status === "rejected") {
            setHasNewsError(true)
          }
        })
        .catch(() => setHasNewsError(true))
        .finally(() => setNewsLoading(false))

      fetch("/api/ai-market-analysis")
        .then((r) => {
          if (!r.ok) throw new Error("AI分析取得失敗")
          return r.json()
        })
        .then((data: MarketAnalysis) => setAnalysis(data))
        .catch(console.error)
    }

    // 初回実行
    loadAll()

    // 5分ごとに更新
    const timer = setInterval(loadAll, 5 * 60 * 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#030507] text-white antialiased">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-yellow-400/10 blur-[160px]" />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-3xl">
        <div className="mx-auto flex min-h-[72px] max-w-[1800px] items-center justify-between gap-2 px-3 py-3 md:gap-3 md:px-5">
          <div className="min-w-0 flex-1">
            <p className="text-[9px] uppercase tracking-[0.35em] text-gray-500 md:text-[10px]">
              弱小トレーダーの悪足掻き!
            </p>

            <h1 className="mt-1 bg-gradient-to-r from-sky-300 via-white to-lime-200 bg-clip-text text-base font-black tracking-[0.02em] text-transparent drop-shadow-[0_0_18px_rgba(125,211,252,0.35)] sm:text-lg md:text-2xl md:tracking-[0.18em]">
              TREASURE TERMINAL
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 md:gap-3">
            <a
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-2xl border border-lime-400/50 bg-gradient-to-r from-lime-500/20 to-emerald-500/20 px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-black tracking-[0.15em] text-lime-300 transition-all duration-300 hover:scale-105 hover:border-lime-300 hover:bg-lime-500/20 hover:text-white"
            >
              📈 KINZAN開発ログ
            </a>
            <a
              href="/market"
              className="hidden md:inline-flex relative group items-center justify-center rounded-2xl bg-gradient-to-r from-lime-500/25 via-emerald-500/20 to-lime-500/25 px-3 py-2.5 md:px-9 md:py-4 text-[11px] md:text-base font-black tracking-[0.15em] text-lime-300 border-2 border-lime-400/60 shadow-[0_0_20px_rgba(163,230,53,0.25)] transition-all duration-300"
            >
              <span className="relative z-10 whitespace-nowrap">
                KINZAN的分析
              </span>
            </a>

            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-sky-400/40 bg-sky-500/10 px-3 py-2 text-xs font-black tracking-[0.08em] text-sky-300 transition hover:bg-sky-500/20 hover:text-white md:rounded-2xl md:px-5 md:py-3 md:text-sm md:tracking-[0.15em]"
            >
              CONTACT
            </a>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <section className="relative z-10 mx-auto max-w-[1800px] px-4 py-6">
        {/* HERO */}
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-black/40 backdrop-blur-3xl">
          <div className="h-[3px] bg-gradient-to-r from-sky-400 via-cyan-300 to-lime-300" />

          <div className="p-6 md:p-10">
            <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
              {/* LEFT */}
              <div>
                <p className="text-[11px] uppercase tracking-[0.45em] text-sky-300">
                  AI MARKET TERMINAL
                </p>

                <h2 className="mt-4 leading-none">
                  <span className="block text-[48px] font-black tracking-[-0.08em] text-white md:text-[150px]">
                    TREASURE
                  </span>
                  <span className="block bg-gradient-to-r from-sky-300 via-white to-lime-300 bg-clip-text text-[48px] font-black tracking-[-0.08em] text-transparent md:text-[150px]">
                    TERMINAL
                  </span>
                </h2>

                {/* AI DAILY BRIEF */}
                <div className="mt-8 rounded-[28px] border border-sky-400/20 bg-gradient-to-br from-[#07111b] via-[#0d1624] to-[#121b2b] p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-black tracking-[0.35em] uppercase text-sky-300">
                      AI DAILY BRIEF
                    </p>
                    <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-black text-green-300">
                      ● LIVE
                    </span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <div className="rounded-xl bg-green-500/15 px-4 py-2">
                      <p className="text-xs text-gray-400">シグナル</p>
                      <p className="font-black text-green-300">
                        {analysis?.USDJPY.signal ?? "-"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-sky-500/15 px-4 py-2">
                      <p className="text-xs text-gray-400">信頼度</p>
                      <p className="font-black text-sky-300">
                        {analysis ? `${analysis.USDJPY.confidence}%` : "-"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-yellow-500/15 px-4 py-2">
                      <p className="text-xs text-gray-400">変動率</p>
                      <p className="font-black text-yellow-300">
                        {analysis?.USDJPY.comment ?? "読み込み中..."}
                      </p>
                    </div>
                  </div>

                  <p className="mt-6 text-lg leading-8 text-gray-300">
                    米長期金利の上昇を背景にドル買いが優勢。
                    NASDAQは大型ハイテク株中心に堅調。
                    金は利益確定売りが入りやすい状況です。
                  </p>
                </div>

                {/* MARKET SNAPSHOT */}
                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {[
                    { name: "USDJPY",   signal: "買い", color: "text-green-400" },
                    { name: "GOLD",     signal: "保持", color: "text-yellow-300" },
                    { name: "NAS100",   signal: "買い", color: "text-green-400" },
                    { name: "NIKKEI",   signal: "買い", color: "text-green-400" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="rounded-2xl border border-white/10 bg-[#0b1118] p-5 transition hover:border-sky-400/30"
                    >
                      <p className="text-[10px] tracking-[0.3em] text-gray-500">
                        {item.name}
                      </p>
                      <p className={`mt-4 text-2xl font-black ${item.color}`}>
                        {item.signal}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT ─ Market Status (日本語化済み) */}
              <div className="overflow-hidden rounded-[30px] border border-lime-300/20 bg-gradient-to-br from-[#07111b] via-[#0d1624] to-[#121b2b]">
                <div className="border-b border-white/10 px-6 py-5">
                  <p className="text-xs uppercase tracking-[0.35em] text-lime-300">
                    本日のマーケット
                  </p>
                  <h3 className="mt-3 text-4xl font-black text-white">
                    マーケット概況
                  </h3>
                </div>

                <div className="space-y-5 p-6">
                  {MARKET_STATUS.map((row) => (
                    <div
                      key={row.key}
                      className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-4"
                    >
                      <span className="text-gray-400">{row.label}</span>
                      <span className={`font-black ${row.color}`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 p-6">
                  <a
                    href="/market"
                    className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-lime-500 to-emerald-500 px-6 py-4 font-black tracking-[0.15em] text-black transition hover:scale-[1.02]"
                  >
                    KINZAN的分析を見る →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LIVE MARKET */}
        <div className="mt-10">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-sky-300">
                ライブマーケット
              </p>
              <h2 className="mt-2 text-4xl font-black text-white md:text-6xl">
                リアルタイム相場
              </h2>
            </div>

            <div className="hidden rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 md:block">
              <span className="text-sm font-bold text-emerald-300">
                ● リアルタイム監視中
              </span>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            {LIVE_MARKETS.map((m) => {
             const ai = getMarketData(
  m.symbol as AnalysisSymbol,
  analysis
)

              return (
                <div
                  key={m.symbol}
                  className={`overflow-hidden rounded-[34px] border ${m.borderClass} bg-[#05070b]`}
                >
                  <div className="border-b border-white/10 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.35em] text-gray-500">
                          {m.category}
                        </p>
                        <h3 className={`mt-2 text-5xl font-black ${m.textClass}`}>
                          {m.label}
                        </h3>
                      </div>
                      <div className={`rounded-full ${m.signalBgClass} px-4 py-2`}>
                        <span className={`font-black ${m.signalTextClass}`}>
                          {ai.signal === "BUY"
                            ? "買い"
                            : ai.signal === "SELL"
                            ? "売り"
                            : "保持"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                      <div className="rounded-xl bg-white/[0.03] p-3">
                        <p className="text-xs text-gray-500">トレンド</p>
                        <p className={`mt-2 text-lg font-black ${m.trendClass}`}>
                          {m.trendArrow} {ai.trend}
                        </p>
                      </div>
                      <div className="rounded-xl bg-white/[0.03] p-3">
                        <p className="text-xs text-gray-500">信頼度</p>
                        <p className={`mt-2 text-lg font-black ${m.confidenceClass}`}>
                          {ai.confidence === "-" ? "-" : `${ai.confidence}%`}
                        </p>
                      </div>
                      <div className="rounded-xl bg-white/[0.03] p-3">
                        <p className="text-xs text-gray-500">{m.metricLabel}</p>
                        <p className={`mt-2 text-lg font-black ${m.metricClass}`}>
                          {m.metricValue}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="h-[340px] md:h-[620px]">
                    <iframe
                      src={`https://s.tradingview.com/widgetembed/?symbol=${m.tvSymbol}&interval=15&theme=dark&style=1&timezone=Asia%2FTokyo`}
                      width="100%"
                      height="100%"
                      title={`${m.label} チャート`}
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* NEWS */}
        <div className="mt-8 grid gap-5 xl:grid-cols-2">
          <NewsPanel
            title="🇯🇵 日本マーケットニュース"
            accentClass="text-sky-300"
            borderHoverClass="hover:border-sky-400/30"
            loading={newsLoading}
            error={hasNewsError}
            items={japanNews}
            emptyMessage="表示できる日本ニュースがありません。"
          />
          <NewsPanel
            title="🇺🇸 米国マーケットニュース"
            accentClass="text-red-300"
            borderHoverClass="hover:border-red-400/30"
            loading={newsLoading}
            error={hasNewsError}
            items={usNews}
            emptyMessage="表示できる米国ニュースがありません。"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-white/10 pt-8 pb-12 text-center">
        <p className="text-sm tracking-[0.25em] text-gray-400">
          TREASURE TERMINAL
        </p>

        <p className="mt-2 text-xs text-gray-500">マーケット分析プロジェクト</p>

        <a
          href="mailto:main@actl-m.co.jp"
          className="mt-2 inline-block text-xs tracking-[0.15em] text-sky-300 underline-offset-4 transition hover:text-white hover:underline"
        >
          main@actl-m.co.jp
        </a>

        <p className="mt-6 text-[11px] text-gray-600">
          Operated by ACTL Co., Ltd.
        </p>

        <p className="mt-4 text-[11px] text-gray-600">
          数値・コメントは自己記録用です。
          <br />
          投資勧誘を目的とするものではありません。
        </p>
      </footer>

      {/* 追従 X ボタン */}
      <a
        href="https://x.com/TRETEMI2026"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-sky-400/40 bg-[#030507]/80 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all duration-300 ease-out hover:scale-110 hover:border-sky-300 hover:bg-sky-500/20 hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] active:scale-95 group overflow-hidden"
        aria-label="Xでフォロー"
      >
        <span className="absolute inset-0 rounded-full bg-sky-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="text-xl font-black text-sky-300 transition-colors duration-300 group-hover:text-white relative z-10">
          𝕏
        </span>
      </a>
    </main>
  )
}

// ──────────────────────────────────────────────
// ニュースパネル
// ──────────────────────────────────────────────
function NewsPanel({
  title,
  accentClass,
  borderHoverClass,
  loading,
  error,
  items,
  emptyMessage,
}: {
  title: string
  accentClass: string
  borderHoverClass: string
  loading: boolean
  error: boolean
  items: NewsItem[]
  emptyMessage: string
}) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-black/50 md:rounded-[30px]">
      <div className="border-b border-white/5 px-5 py-4 md:px-6 md:py-5">
        <h2 className="text-2xl font-black text-white md:text-3xl">
          {title}
        </h2>
      </div>

      <div className="space-y-3 p-4">
        {loading && (
          <p className="p-6 text-center text-sm text-gray-500">
            ニュースを読み込み中...
          </p>
        )}

        {!loading && error && (
          <p className="p-6 text-center text-sm text-red-300">
            ニュースを取得できませんでした。
            <br />
            しばらくしてから再度お試しください。
          </p>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="p-6 text-center text-sm text-gray-500">
            {emptyMessage}
          </p>
        )}

        {!loading && !error && items.length > 0 &&
          items.map((news, index) => (
            <a
              key={`${news.link}-${index}`}
              href={news.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block overflow-hidden rounded-[22px] border border-white/5 bg-[#0b1118] transition ${borderHoverClass}`}
            >
              <div className="grid grid-cols-[110px_1fr] md:grid-cols-[170px_1fr]">
                <div className="relative h-full overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col justify-between p-3 md:p-4">
                  <div>
                    <p
                      className={`text-[10px] font-black tracking-[0.2em] uppercase ${accentClass}`}
                    >
                      {news.source}
                    </p>
                    <h3 className="mt-2 line-clamp-2 text-sm font-black leading-6 text-white md:text-lg md:leading-7">
                      {news.title}
                    </h3>
                  </div>
                </div>
              </div>
            </a>
          ))}
      </div>
    </div>
  )
}
