"use client"

import { useEffect, useRef, useState } from "react"

type MarketTicker = {
  symbol: string
  price: string
  change: string
  up: boolean
  flash: "up" | "down" | ""
}

type NewsItem = {
  title: string
  desc: string
  url: string
  image: string
  source: string
}

type EconomicEvent = {
  time: string
  title: string
  level: string
}

export default function NewsPage() {

  // =========================
  // STATE
  // =========================

  const [tickerData, setTickerData] =
    useState<MarketTicker[]>([])

  const [articles, setArticles] =
    useState<NewsItem[]>(([]))

  const [economicEvents, setEconomicEvents] =
    useState<EconomicEvent[]>([])

  const [loading, setLoading] =
    useState(true)

  const [lastUpdate, setLastUpdate] =
    useState("")

  const prevPrices =
    useRef<any>({})

  // =========================
  // API
  // =========================

  const API_KEY =
    process.env
      .NEXT_PUBLIC_TWELVEDATA_API_KEY

  // =========================
  // CHANGE %
  // =========================

  const calcChange = (
    prev: number,
    current: number
  ) => {

    if (!prev) return 0

    return (
      ((current - prev) / prev) * 100
    )

  }

  // =========================
  // MARKET FETCH
  // =========================

  const fetchMarketData = async () => {

    try {

      const res = await fetch(

        `https://api.twelvedata.com/price?symbol=USD/JPY,EUR/JPY,GBP/JPY,AUD/JPY,XAU/USD&apikey=${API_KEY}`,

        {
          cache: "no-store",
        }

      )

      const data = await res.json()

      const rawData = [

        {
          symbol: "USDJPY",
          value:
            parseFloat(
              data?.["USD/JPY"]?.price || 0
            ),
        },

        {
          symbol: "EURJPY",
          value:
            parseFloat(
              data?.["EUR/JPY"]?.price || 0
            ),
        },

        {
          symbol: "GBPJPY",
          value:
            parseFloat(
              data?.["GBP/JPY"]?.price || 0
            ),
        },

        {
          symbol: "AUDJPY",
          value:
            parseFloat(
              data?.["AUD/JPY"]?.price || 0
            ),
        },

        {
          symbol: "XAUUSD",
          value:
            parseFloat(
              data?.["XAU/USD"]?.price || 0
            ),
        },

      ]

      const formatted =
        rawData.map((item) => {

          const prev =
            prevPrices.current[
              item.symbol
            ]

          const change =
            calcChange(
              prev,
              item.value
            )

          let flash: "up" | "down" | "" = ""

          if (prev) {

            if (item.value > prev) {

              flash = "up"

            } else if (
              item.value < prev
            ) {

              flash = "down"

            }

          }

          prevPrices.current[
            item.symbol
          ] = item.value

          return {

            symbol: item.symbol,

            price:
              item.symbol.includes(
                "JPY"
              )
                ? item.value.toFixed(3)
                : item.value.toFixed(2),

            change:
              `${Math.abs(change).toFixed(3)}%`,

            up: change >= 0,

            flash,

          }

        })

      setTickerData(formatted)

      setLastUpdate(
        new Date().toLocaleTimeString(
          "ja-JP"
        )
      )

    } catch (err) {

      console.error(err)

    }

  }

  // =========================
  // NEWS
  // =========================

  const fetchNews = async () => {

    try {

      const res = await fetch(
        "https://api.rss2json.com/v1/api.json?rss_url=https://feeds.bbci.co.uk/news/business/rss.xml"
      )

      const data = await res.json()

      const formatted =
        data.items
          ?.slice(0, 8)
          ?.map((item: any) => ({

            title: item.title,

            desc:
              item.description
                ?.replace(/<[^>]+>/g, "")
                ?.slice(0, 120) + "...",

            url: item.link,

            image:
              item.thumbnail ||
              "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop",

            source: "BBC NEWS",

          })) || []

      setArticles(formatted)

    } catch (err) {

      console.error(err)

    }

  }

  // =========================
  // EVENTS
  // =========================

  const generateEconomicEvents = () => {

    setEconomicEvents([

      {
        time: "21:30",
        title: "米国 消費者物価指数（CPI）",
        level: "★★★",
      },

      {
        time: "21:30",
        title: "米国 コアCPI",
        level: "★★★",
      },

      {
        time: "27:00",
        title: "FOMC関連発言",
        level: "★★★",
      },

    ])

  }

  // =========================
  // INIT
  // =========================

  useEffect(() => {

    Promise.all([
      fetchMarketData(),
      fetchNews(),
    ]).finally(() => {

      setLoading(false)

    })

    generateEconomicEvents()

    // 5秒更新
    const marketInterval =
      setInterval(() => {

        fetchMarketData()

      }, 5000)

    // ニュース
    const newsInterval =
      setInterval(() => {

        fetchNews()

      }, 300000)

    return () => {

      clearInterval(
        marketInterval
      )

      clearInterval(
        newsInterval
      )

    }

  }, [])

  return (

    <main className="min-h-screen overflow-hidden bg-[#020305] text-white">

      {/* STYLE */}

      <style>{`

        @keyframes tickerMove {

          0% {
            transform: translateX(0%);
          }

          100% {
            transform: translateX(-50%);
          }

        }

        @keyframes flashGreen {

          0% {
            background: rgba(132,204,22,0.45);
          }

          100% {
            background: transparent;
          }

        }

        @keyframes flashRed {

          0% {
            background: rgba(239,68,68,0.45);
          }

          100% {
            background: transparent;
          }

        }

        .ticker-track {

          animation:
            tickerMove 38s linear infinite;

        }

        .ticker-track:hover {

          animation-play-state: paused;

        }

        .flash-up {

          animation:
            flashGreen 0.8s ease;

        }

        .flash-down {

          animation:
            flashRed 0.8s ease;

        }

      `}</style>

      {/* HEADER */}

      <header className="border-b border-white/10 px-6 py-6">

        <div className="flex flex-wrap items-start justify-between gap-6">

          <div>

            <div className="flex flex-wrap items-center gap-4">

              <h1 className="text-7xl font-black tracking-[-0.08em] text-lime-400">

                NEWS

              </h1>

              <div className="max-w-[620px] rounded-3xl border border-yellow-400/20 bg-yellow-400/10 px-5 py-4 backdrop-blur-3xl">

                <p className="text-[11px] leading-7 text-yellow-200">

                  ※ CNBC・CNN・BBC・Yahoo Finance など
                  海外メディア速報をリアルタイム掲載。

                  <br />

                  為替・金価格など
                  リアルタイム市場データを自動更新。

                  <br />

                  記事カードクリックで
                  最新ニュースへ直接移動できます。

                </p>

              </div>

            </div>

            <p className="mt-4 text-xs font-black tracking-[0.35em] text-lime-300/70">

              REALTIME GLOBAL NEWS SYSTEM

            </p>

          </div>

          <div className="rounded-3xl border border-lime-400/20 bg-lime-400/10 px-5 py-4 text-right backdrop-blur-3xl">

            <div className="flex items-center justify-end gap-2">

              <div className="h-2 w-2 animate-pulse rounded-full bg-lime-400" />

              <p className="text-xs font-black text-lime-400">

                LIVE

              </p>

            </div>

            <p className="mt-3 text-[11px] text-gray-300">

              UPDATED {lastUpdate}

            </p>

            <p className="mt-1 text-[10px] tracking-[0.25em] text-lime-400/70">

              AUTO REALTIME STREAM

            </p>

          </div>

        </div>

      </header>

      {/* MARKET */}

      <section className="overflow-hidden border-b border-white/10 bg-black/40 py-5">

        <div className="ticker-track flex w-max">

          {[...tickerData, ...tickerData].map(
            (item, index) => (

              <div
                key={index}
                className={`mr-14 flex items-center gap-4 whitespace-nowrap rounded-xl px-3 py-2 transition-all duration-300 ${
                  item.flash === "up"
                    ? "flash-up"
                    : item.flash === "down"
                    ? "flash-down"
                    : ""
                }`}
              >

                <span className="text-sm font-black tracking-[0.2em] text-white">

                  {item.symbol}

                </span>

                <span
                  className={`text-xl font-black ${
                    item.up
                      ? "text-lime-400"
                      : "text-red-400"
                  }`}
                >

                  {item.price}

                </span>

                <span
                  className={`text-sm font-black ${
                    item.up
                      ? "text-lime-300"
                      : "text-red-300"
                  }`}
                >

                  {item.up ? "▲" : "▼"}

                  {item.change}

                </span>

                <div
                  className={`h-2 w-2 rounded-full animate-pulse ${
                    item.up
                      ? "bg-lime-400"
                      : "bg-red-400"
                  }`}
                />

                <div className="ml-5 h-6 w-px bg-white/10" />

              </div>

            )
          )}

        </div>

      </section>

      {/* EVENTS */}

      <section className="px-6 pt-8">

        <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">

          <p className="text-xs font-black tracking-[0.25em] text-cyan-300">

            本日の重要指標

          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-2">

            {economicEvents.map(
              (event, index) => (

                <div
                  key={index}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-4"
                >

                  <div>

                    <p className="text-xs text-gray-400">

                      {event.time}

                    </p>

                    <h3 className="mt-1 text-lg font-black">

                      {event.title}

                    </h3>

                  </div>

                  <div className="text-lg font-black text-yellow-300">

                    {event.level}

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </section>

      {/* NEWS */}

      <section className="px-6 py-8">

        {loading ? (

          <div className="flex h-[300px] items-center justify-center">

            <p className="animate-pulse text-gray-500">

              ニュース取得中...

            </p>

          </div>

        ) : (

          <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-4">

            {articles.map(
              (item, index) => (

                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-[30px] border border-white/10 bg-black/40 backdrop-blur-3xl transition duration-300 hover:scale-[1.02] hover:border-lime-400/30"
                >

                  <div className="overflow-hidden">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-[220px] w-full object-cover transition duration-500 group-hover:scale-110"
                    />

                  </div>

                  <div className="p-5">

                    <div className="flex items-center justify-between">

                      <p className="text-[10px] font-black tracking-[0.3em] uppercase text-lime-400">

                        {item.source}

                      </p>

                      <div className="h-2 w-2 animate-pulse rounded-full bg-lime-400" />

                    </div>

                    <h2 className="mt-4 text-2xl font-black leading-tight transition group-hover:text-lime-300">

                      {item.title}

                    </h2>

                    <p className="mt-4 text-sm leading-7 text-gray-400">

                      {item.desc}

                    </p>

                    <div className="mt-6 flex items-center justify-between">

                      <p className="text-[10px] tracking-[0.2em] text-gray-500">

                        LIVE NEWS

                      </p>

                      <div className="rounded-xl bg-lime-400 px-4 py-2 text-xs font-black text-black">

                        READ

                      </div>

                    </div>

                  </div>

                </a>

              )
            )}

          </div>

        )}

      </section>

    </main>

  )

}