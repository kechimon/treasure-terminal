"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

export default function Home() {

  const [japanNews, setJapanNews] = useState<any[]>([])
  const [usNews, setUsNews] = useState<any[]>([])

  useEffect(() => {

    fetch("/api/japan-news")
      .then((res) => res.json())
      .then((data) => setJapanNews(data))
      .catch(() => setJapanNews([]))

    fetch("/api/us-news")
      .then((res) => res.json())
      .then((data) => setUsNews(data))
      .catch(() => setUsNews([]))

  }, [])

  return (

    <main className="min-h-screen overflow-hidden bg-[#030507] text-white">

      <Script
        src="https://s3.tradingview.com/tv.js"
        strategy="lazyOnload"
      />

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

        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-[140px]" />

        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-yellow-400/10 blur-[160px]" />

      </div>

      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-3xl">

        <div className="mx-auto flex min-h-[72px] max-w-[1800px] items-center justify-between gap-3 px-4 py-3 md:px-5">

          <div className="min-w-0">

            <p className="text-[9px] tracking-[0.35em] text-gray-500 uppercase md:text-[10px]">
              弱小トレーダーの悪足掻き!
            </p>

            <h1 className="mt-1 bg-gradient-to-r from-sky-300 via-white to-lime-200 bg-clip-text text-xl font-black tracking-[0.1em] text-transparent drop-shadow-[0_0_18px_rgba(125,211,252,0.35)] md:text-2xl md:tracking-[0.18em]">
              ヌシ投資VLOG
            </h1>

          </div>

          <div className="flex justify-center">

            <a
              href="/market"
              className="rounded-2xl border border-lime-400/20 bg-lime-400/10 px-4 py-3 transition hover:bg-lime-400/20 md:px-6 md:py-4"
            >

              <p className="whitespace-nowrap text-xs font-black text-lime-300 md:text-sm">
                オレ的分析
              </p>

            </a>

          </div>

        </div>

      </header>

      {/* MAIN */}

      <section className="relative z-10 mx-auto max-w-[1800px] px-4 py-6">

        {/* HERO */}

        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-black/40 backdrop-blur-3xl md:rounded-[36px]">

          <div className="h-[3px] bg-gradient-to-r from-sky-400 via-yellow-300 to-lime-300" />

          <div className="p-5 md:p-10">

            <div className="grid gap-6 md:gap-8 xl:grid-cols-[1.15fr_0.85fr]">

              {/* LEFT */}

              <div>

                <h2 className="leading-none">

                  <span className="block text-[42px] font-black tracking-[-0.08em] text-white md:text-[160px]">
                    TREASURE
                  </span>

                  <span className="block bg-gradient-to-r from-sky-300 via-white to-lime-300 bg-clip-text text-[42px] font-black tracking-[-0.08em] text-transparent md:text-[160px]">
                    TERMINAL
                  </span>

                </h2>

                <div className="mt-6 rounded-[24px] border border-white/10 bg-gradient-to-br from-[#08111d] via-[#101827] to-[#171717] p-5 md:mt-8 md:rounded-[30px] md:p-8">

                  <p className="text-xs font-black tracking-[0.2em] text-yellow-300 uppercase md:text-sm">
                    Beginner Trader Project
                  </p>

                  <p className="mt-3 text-sm font-bold tracking-[0.12em] text-white/70 md:text-base">
                    トレーダーによる宝探し
                  </p>

                  <p className="mt-6 text-[20px] font-black leading-[1.7] text-white md:mt-7 md:text-[40px]">
                    最初は、
                    <span className="bg-gradient-to-r from-sky-300 via-white to-yellow-300 bg-clip-text text-transparent">
                      誰もが初心者。
                    </span>
                  </p>

                  <p className="mt-5 text-sm leading-[1.9rem] text-gray-300 md:text-lg md:leading-[2.1rem]">
                    チャートの見方も、
                    経済ニュースの意味も、
                    最初はわからなくて当然。
                  </p>

                  <p className="mt-5 text-sm leading-[1.9rem] text-gray-400 md:text-lg md:leading-[2.1rem]">
                    でも、一歩踏み出した瞬間から
                    世界の見え方は変わり始める。
                    ここは、
                    “相場を学び、感じ、追い続ける”
                    ためのマーケットターミナル。
                  </p>

                </div>

              </div>

              {/* RIGHT */}

              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-[#09111a] via-[#101827] to-[#171717] md:rounded-[34px]">

                <div className="px-5 py-6 md:px-7 md:py-8">

                  <p className="text-[10px] tracking-[0.35em] text-sky-300 uppercase md:text-[11px]">
                    MARKET PHILOSOPHY
                  </p>

                  <p className="mt-6 text-[22px] font-black leading-[1.7] text-white md:mt-8 md:text-[34px]">
                    投資とは、
                    <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                      未来を読む力。
                    </span>
                  </p>

                  <p className="mt-6 text-sm leading-[1.9rem] text-gray-300 md:mt-8 md:text-lg md:leading-[2.2rem]">
                    投資は、ただのギャンブルではない。
                    世界情勢、金利、中央銀行、
                    要人発言──
                    あらゆる情報が市場を動かしている。
                  </p>

                  <p className="mt-5 text-sm leading-[1.9rem] text-gray-400 md:mt-6 md:text-lg md:leading-[2.2rem]">
                    相場は数字だけではない。<br />
                    世界の空気、投資家心理、<br />
                    時代の流れまでも価格へ反映される。
                  </p>

                  <div className="mt-5 overflow-hidden rounded-[22px] border border-lime-300/70 bg-[#05070b] shadow-[0_0_18px_rgba(190,242,100,0.16)]">

                    <div className="h-[1px] bg-gradient-to-r from-transparent via-lime-300 to-transparent opacity-70" />

                    <div className="relative px-4 py-5 md:px-6 md:py-6">

                      <div className="relative z-10">

                        <p className="text-sm font-black tracking-wide md:text-lg">

                          <span className="bg-gradient-to-r from-sky-300 via-white to-lime-200 bg-clip-text text-transparent">
                            ヌシ（管理人）
                          </span>

                        </p>

                        <h2 className="mt-3 text-[28px] font-black leading-[1.5] tracking-[-0.04em] text-white md:text-[38px]">

                          <span className="bg-gradient-to-r from-yellow-200 to-lime-300 bg-clip-text text-transparent">
                            10万円
                          </span>

                          <span>
                            という資金からの
                          </span>

                          <br />

                          <span className="bg-gradient-to-r from-yellow-200 to-lime-300 bg-clip-text text-transparent">
                            ポンコツ勝負
                          </span>

                          <span className="text-[20px] md:text-[34px]">
                            を、とくとご覧あれ！
                          </span>

                        </h2>

                        <div className="mt-5">

                          <a
                            href="/dashboard"
                            className="group inline-flex items-center gap-3 rounded-[18px] border border-lime-300/70 bg-lime-300/5 px-4 py-3 shadow-[0_0_14px_rgba(190,242,100,0.14)] transition hover:bg-lime-300/10 md:px-5"
                          >

                            <span className="text-base font-black tracking-wide text-lime-200 md:text-xl">
                              ヌシの挑戦を見る
                            </span>

                          </a>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* LIVE MARKET */}

            <div className="mt-8 grid gap-5 xl:grid-cols-2">

              {/* USDJPY */}

              <div className="overflow-hidden rounded-[28px] border border-sky-400/10 bg-[#05070b] md:rounded-[34px]">

                <div className="border-b border-white/5 px-5 py-4 md:px-6 md:py-5">

                  <p className="text-[10px] tracking-[0.35em] text-gray-500 uppercase">
                    USDJPY REALTIME
                  </p>

                  <h2 className="mt-2 text-3xl font-black text-sky-300 md:text-5xl">
                    ドル円
                  </h2>

                </div>

                <div className="h-[320px] md:h-[620px]">

                  <iframe
                    src="https://s.tradingview.com/widgetembed/?symbol=FX%3AUSDJPY&interval=15&theme=dark&style=1&timezone=Asia%2FTokyo"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                  />

                </div>

              </div>

              {/* GOLD */}

              <div className="overflow-hidden rounded-[28px] border border-yellow-400/10 bg-[#05070b] md:rounded-[34px]">

                <div className="border-b border-white/5 px-5 py-4 md:px-6 md:py-5">

                  <p className="text-[10px] tracking-[0.35em] text-gray-500 uppercase">
                    XAUUSD REALTIME
                  </p>

                  <h2 className="mt-2 text-3xl font-black text-yellow-300 md:text-5xl">
                    GOLD
                  </h2>

                </div>

                <div className="h-[320px] md:h-[620px]">

                  <iframe
                    src="https://s.tradingview.com/widgetembed/?symbol=OANDA%3AXAUUSD&interval=15&theme=dark&style=1&timezone=Asia%2FTokyo"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                  />

                </div>

              </div>

            </div>

            {/* NEWS */}

            <div className="mt-8 grid gap-5 xl:grid-cols-2">

              {/* JAPAN NEWS */}

              <div className="overflow-hidden rounded-[28px] md:rounded-[30px] border border-white/10 bg-black/50">

                <div className="border-b border-white/5 px-5 py-4 md:px-6 md:py-5">

                  <h2 className="text-2xl font-black text-white md:text-3xl">
                    🇯🇵 日本マーケットニュース
                  </h2>

                </div>

                <div className="space-y-3 p-4">

                  {japanNews.map((news: any, index: number) => (

                    <a
                      key={index}
                      href={news.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block overflow-hidden rounded-[22px] border border-white/5 bg-[#0b1118] transition hover:border-sky-400/30"
                    >

                      <div className="grid grid-cols-[110px_1fr] md:grid-cols-[170px_1fr]">

                        <div className="relative h-full overflow-hidden">

                          <img
                            src={news.image}
                            alt={news.title}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          />

                        </div>

                        <div className="flex flex-col justify-between p-3 md:p-4">

                          <div>

                            <p className="text-[10px] font-black tracking-[0.2em] text-sky-300 uppercase">
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

              {/* US NEWS */}

              <div className="overflow-hidden rounded-[28px] md:rounded-[30px] border border-red-400/10 bg-black/50">

                <div className="border-b border-white/5 px-5 py-4 md:px-6 md:py-5">

                  <h2 className="text-2xl font-black text-white md:text-3xl">
                    🇺🇸 米国マーケットニュース
                  </h2>

                </div>

                <div className="space-y-3 p-4">

                  {usNews.map((news: any, index: number) => (

                    <a
                      key={index}
                      href={news.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block overflow-hidden rounded-[22px] border border-white/5 bg-[#0b1118] transition hover:border-red-400/30"
                    >

                      <div className="grid grid-cols-[110px_1fr] md:grid-cols-[170px_1fr]">

                        <div className="relative h-full overflow-hidden">

                          <img
                            src={news.image}
                            alt={news.title}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          />

                        </div>

                        <div className="flex flex-col justify-between p-3 md:p-4">

                          <div>

                            <p className="text-[10px] font-black tracking-[0.2em] text-red-300 uppercase">
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

            </div>

          </div>

        </div>

      </section>

    </main>

  )

}