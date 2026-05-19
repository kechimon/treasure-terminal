"use client"

import { useEffect, useState } from "react"

export default function MarketPage() {

  const [quantData, setQuantData] = useState<any>(null)

  const fetchAnalysis = async () => {

    try {

      const res = await fetch("/api/quant-analysis")

      const data = await res.json()

      setQuantData(data)

    } catch (err) {

      console.log(err)

    }

  }

  useEffect(() => {

    fetchAnalysis()

    const interval = setInterval(() => {

      fetchAnalysis()

    }, 600000)

    return () => clearInterval(interval)

  }, [])

  return (

    <main className="min-h-screen overflow-hidden bg-[#030507] text-white">

      {/* BACKGROUND */}

      <div className="fixed inset-0 overflow-hidden">

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="absolute -top-32 left-[-120px] h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[150px]" />

        <div className="absolute bottom-[-100px] right-[-100px] h-[500px] w-[500px] rounded-full bg-yellow-400/10 blur-[170px]" />

      </div>

      {/* MAIN */}

      <section className="relative z-10 mx-auto max-w-[1800px] px-4 py-6 md:px-5 md:py-10">

        {/* TITLE */}

        <div className="mb-10">

          <p className="text-sm font-black tracking-[0.35em] text-lime-300 uppercase">
            Quant Analysis
          </p>

          <h1 className="mt-4 bg-gradient-to-r from-sky-300 via-white to-yellow-200 bg-clip-text text-4xl font-black leading-tight text-transparent md:text-7xl">
            オレ的クオンツ分析
          </h1>

          <p className="mt-3 text-sm font-bold tracking-wide text-emerald-400 animate-pulse">
            ● LIVE 更新：
            {quantData?.updatedAt
              ? new Date(quantData.updatedAt).toLocaleTimeString("ja-JP", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "取得中"}
          </p>

          <p className="mt-5 max-w-[950px] text-sm leading-7 text-gray-400 md:text-lg md:leading-9">
            USDJPY・XAUUSD の方向性、
            値動き、
            市場心理を簡易分析。
          </p>

        </div>

        {/* GRID */}

        <div className="grid gap-7 xl:grid-cols-2">

          {/* USDJPY */}

          <div className="overflow-hidden rounded-[34px] border border-sky-400/20 bg-[#07111c]/95 shadow-[0_0_80px_rgba(0,180,255,0.08)]">

            <div className="border-b border-white/5 px-5 py-5 md:px-7 md:py-6">

              <p className="text-xs font-black tracking-[0.35em] text-sky-300 uppercase">
                USDJPY QUANT
              </p>

              <h2 className="mt-4 text-3xl font-black md:text-5xl">
                ドル円
              </h2>

            </div>

            <div className="p-5 md:p-7">

              {/* STATUS */}

              <div className="grid gap-5 md:grid-cols-3">

                <div className="rounded-[26px] border border-sky-400/20 bg-sky-500/5 p-5 md:p-6">

                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-400/20 text-2xl">
                      📈
                    </div>

                    <p className="text-[15px] font-bold tracking-[0.15em] text-sky-200">
                      相場方向
                    </p>

                  </div>

                  <h3 className="mt-6 text-3xl font-black text-sky-300 md:text-5xl">
                    {quantData?.usdjpy?.trend || "取得中"}
                  </h3>

                  <p className="mt-5 text-lg text-gray-300 md:text-2xl">
                    ドル買い優勢。
                  </p>

                </div>

                <div className="rounded-[26px] border border-cyan-400/20 bg-cyan-500/5 p-5 md:p-6">

                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/20 text-2xl">
                      📊
                    </div>

                    <p className="text-[15px] font-bold tracking-[0.15em] text-cyan-200">
                      値動き
                    </p>

                  </div>

                  <h3 className="mt-6 text-3xl font-black text-cyan-300 md:text-5xl">
                    {quantData?.usdjpy?.volatility || "取得中"}
                  </h3>

                  <p className="mt-5 text-lg text-gray-300 md:text-2xl">
                    値幅が広がっています。
                  </p>

                </div>

                <div className="rounded-[26px] border border-blue-400/20 bg-blue-500/5 p-5 md:p-6">

                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-400/20 text-2xl">
                      👤
                    </div>

                    <p className="text-[15px] font-bold tracking-[0.15em] text-blue-200">
                      市場心理
                    </p>

                  </div>

                  <h3 className="mt-6 text-3xl font-black text-blue-300 md:text-5xl">
                    {quantData?.usdjpy?.sentiment || "取得中"}
                  </h3>

                  <p className="mt-5 text-lg text-gray-300 md:text-2xl">
                    円売り継続。
                  </p>

                </div>

              </div>

              {/* ANALYSIS */}

              <div className="mt-7 min-h-[260px] rounded-[28px] border border-sky-400/10 bg-black/30 p-5 md:p-7">

                <p className="text-sm font-black tracking-[0.35em] text-sky-300 uppercase">
                  MARKET ANALYSIS
                </p>

                <div className="mt-8 space-y-6 text-sm leading-7 text-gray-200 md:text-[20px] md:leading-10">

                  {quantData?.usdjpy?.analysis?.map((item: string, index: number) => (
                    <p key={index}>・{item}</p>
                  ))}

                </div>

              </div>

              {/* CHART */}

              <div className="mt-7 overflow-hidden rounded-[28px] border border-white/10">

                <iframe
                  src="https://s.tradingview.com/widgetembed/?symbol=FX%3AUSDJPY&interval=60&theme=dark&style=1&timezone=Asia%2FTokyo"
                  width="100%"
                  height="340"
                  frameBorder="0"
                />

              </div>

            </div>

          </div>

          {/* GOLD */}

          <div className="overflow-hidden rounded-[34px] border border-yellow-400/20 bg-[#11140d]/95 shadow-[0_0_80px_rgba(255,200,0,0.06)]">

            <div className="border-b border-white/5 px-5 py-5 md:px-7 md:py-6">

              <p className="text-xs font-black tracking-[0.35em] text-yellow-300 uppercase">
                XAUUSD QUANT
              </p>

              <h2 className="mt-4 text-3xl font-black text-yellow-50 md:text-5xl">
                GOLD
              </h2>

            </div>

            <div className="p-5 md:p-7">

              {/* STATUS */}

              <div className="grid gap-5 md:grid-cols-3">

                <div className="rounded-[26px] border border-yellow-500/20 bg-yellow-500/5 p-5 md:p-6">

                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400/20 text-2xl">
                      📉
                    </div>

                    <p className="text-[15px] font-bold tracking-[0.15em] text-yellow-100">
                      相場方向
                    </p>

                  </div>

                  <h3 className="mt-6 text-3xl font-black text-yellow-200 md:text-5xl">
                    {quantData?.xauusd?.trend || "取得中"}
                  </h3>

                  <p className="mt-5 text-lg text-gray-300 md:text-2xl">
                    利確売り優勢。
                  </p>

                </div>

                <div className="rounded-[26px] border border-amber-400/20 bg-amber-500/5 p-5 md:p-6">

                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/20 text-2xl">
                      📊
                    </div>

                    <p className="text-[15px] font-bold tracking-[0.15em] text-amber-100">
                      値動き
                    </p>

                  </div>

                  <h3 className="mt-6 text-3xl font-black text-amber-200 md:text-5xl">
                    {quantData?.xauusd?.volatility || "取得中"}
                  </h3>

                  <p className="mt-5 text-lg text-gray-300 md:text-2xl">
                    値動きが非常に大きい状態。
                  </p>

                </div>

                <div className="rounded-[26px] border border-yellow-300/20 bg-yellow-300/5 p-5 md:p-6">

                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-200/20 text-2xl">
                      🛡️
                    </div>

                    <p className="text-[15px] font-bold tracking-[0.15em] text-yellow-50">
                      市場心理
                    </p>

                  </div>

                  <h3 className="mt-6 text-3xl font-black text-yellow-100 md:text-5xl">
                    {quantData?.xauusd?.sentiment || "取得中"}
                  </h3>

                  <p className="mt-5 text-lg text-gray-300 md:text-2xl">
                    リスク回避の買いが継続。
                  </p>

                </div>

              </div>

              {/* ANALYSIS */}

              <div className="mt-7 min-h-[260px] rounded-[28px] border border-yellow-400/10 bg-black/30 p-5 md:p-7">

                <p className="text-sm font-black tracking-[0.35em] text-yellow-300 uppercase">
                  MARKET ANALYSIS
                </p>

                <div className="mt-8 space-y-6 text-sm leading-7 text-gray-200 md:text-[20px] md:leading-10">

                  {quantData?.xauusd?.analysis?.map((item: string, index: number) => (
                    <p key={index}>・{item}</p>
                  ))}

                </div>

              </div>

              {/* CHART */}

              <div className="mt-7 overflow-hidden rounded-[28px] border border-white/10">

                <iframe
                  src="https://s.tradingview.com/widgetembed/?symbol=OANDA%3AXAUUSD&interval=60&theme=dark&style=1&timezone=Asia%2FTokyo"
                  width="100%"
                  height="340"
                  frameBorder="0"
                />

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>

  )

}