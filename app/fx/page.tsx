"use client";

import { useEffect, useState } from "react";

export default function FXPage() {
  const [news, setNews] = useState<any[]>([]);
  const [symbol, setSymbol] = useState("FX:USDJPY");

  useEffect(() => {
    fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss/search%3Fq%3Dforex"
    )
      .then((res) => res.json())
      .then((data) => {
        setNews(data.items || []);
      });

    const interval = setInterval(() => {
      fetch(
        "https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss/search%3Fq%3Dforex"
      )
        .then((res) => res.json())
        .then((data) => {
          setNews(data.items || []);
        });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const ticker = [
    "USDJPY 151.82 ▲",
    "EURUSD 1.084 ▼",
    "GOLD 2345 ▲",
    "NASDAQ 18221 ▼",
    "BTCUSD 63450 ▲",
  ];

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}

      <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <a href="/" className="text-2xl font-black tracking-widest">
            TREASURE
          </a>

          <nav className="flex gap-6 text-sm text-gray-400">

            <a href="/fx" className="text-white">
              FX速報
            </a>

            <a href="/news" className="hover:text-white">
              市場ニュース
            </a>

          </nav>

        </div>

      </header>

      {/* TICKER */}

      <div className="pt-20 overflow-hidden border-b border-white/10">

        <div className="flex gap-10 py-3 text-sm text-gray-400 animate-pulse whitespace-nowrap">

          {ticker.map((item, index) => (
            <span key={index}>{item}</span>
          ))}

        </div>

      </div>

      {/* HERO */}

      <section className="relative h-[75vh] overflow-hidden flex items-center">

        <img
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1800&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">

          <p className="text-yellow-400 tracking-[0.3em] text-sm">
            LIVE FOREX MARKET
          </p>

          <h1 className="mt-6 text-6xl md:text-8xl font-black leading-none">
            FX LIVE
          </h1>

          <p className="mt-8 text-gray-300 text-xl leading-9 max-w-3xl">
            為替・GOLD・NASDAQ・BTCを
            リアルタイム監視。
          </p>

        </div>

      </section>

      {/* BUTTONS */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="flex flex-wrap gap-4 mb-10">

          <button
            onClick={() => setSymbol("FX:USDJPY")}
            className="bg-white text-black px-6 py-3 rounded-full font-bold"
          >
            USDJPY
          </button>

          <button
            onClick={() => setSymbol("FX:EURUSD")}
            className="bg-zinc-900 px-6 py-3 rounded-full"
          >
            EURUSD
          </button>

          <button
            onClick={() => setSymbol("OANDA:XAUUSD")}
            className="bg-zinc-900 px-6 py-3 rounded-full"
          >
            GOLD
          </button>

          <button
            onClick={() => setSymbol("BITSTAMP:BTCUSD")}
            className="bg-zinc-900 px-6 py-3 rounded-full"
          >
            BTC
          </button>

        </div>

        {/* CHART */}

        <div className="rounded-3xl overflow-hidden border border-white/10">

          <iframe
            key={symbol}
            src={`https://s.tradingview.com/widgetembed/?symbol=${symbol}&interval=60&theme=dark&hidesidetoolbar=1`}
            width="100%"
            height="650"
          />

        </div>

      </section>

      {/* BREAKING */}

      {news[0] && (

        <section className="max-w-7xl mx-auto px-6 pb-20">

          <a
            href={news[0].link}
            target="_blank"
            className="relative block rounded-3xl overflow-hidden h-[450px] border border-red-500/30"
          >

            <img
              src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/75" />

            <div className="relative z-10 p-10 flex flex-col justify-end h-full">

              <p className="text-red-500 text-sm tracking-[0.2em]">
                BREAKING NEWS
              </p>

              <h2 className="mt-4 text-4xl md:text-6xl font-black leading-tight">
                {news[0].title}
              </h2>

              <p className="mt-6 text-gray-300">
                {news[0].pubDate}
              </p>

            </div>

          </a>

        </section>

      )}

      {/* NEWS LIST */}

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <h2 className="text-5xl font-black mb-12">
          LIVE NEWS
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {news.slice(1, 10).map((item, index) => (

            <a
              key={index}
              href={item.link}
              target="_blank"
              className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden hover:border-yellow-400 transition"
            >

              <img
                src="https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1200&auto=format&fit=crop"
                alt=""
                className="w-full h-56 object-cover"
              />

              <div className="p-6">

                <p className="text-yellow-400 text-sm">
                  FOREX NEWS
                </p>

                <h3 className="mt-4 text-2xl font-bold leading-snug">
                  {item.title}
                </h3>

                <p className="mt-4 text-gray-500 text-sm">
                  {item.pubDate}
                </p>

              </div>

            </a>

          ))}

        </div>

      </section>

    </main>
  );
}