"use client";

import { useEffect, useState } from "react";

export default function StocksPage() {
  const [usNews, setUsNews] = useState<any[]>([]);
  const [jpNews, setJpNews] = useState<any[]>([]);
  const [symbol, setSymbol] = useState("NASDAQ:AAPL");

  useEffect(() => {

    // 米国株ニュース

    fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss/search%3Fq%3Dus+stock+market"
    )
      .then((res) => res.json())
      .then((data) => {
        setUsNews(data.items || []);
      });

    // 日本株ニュース

    fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss/search%3Fq%3Djapan+stock+market"
    )
      .then((res) => res.json())
      .then((data) => {
        setJpNews(data.items || []);
      });

    // 自動更新

    const interval = setInterval(() => {

      fetch(
        "https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss/search%3Fq%3Dus+stock+market"
      )
        .then((res) => res.json())
        .then((data) => {
          setUsNews(data.items || []);
        });

      fetch(
        "https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss/search%3Fq%3Djapan+stock+market"
      )
        .then((res) => res.json())
        .then((data) => {
          setJpNews(data.items || []);
        });

    }, 30000);

    return () => clearInterval(interval);

  }, []);

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}

      <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <a href="/" className="text-2xl font-black tracking-[0.3em]">
            TREASURE
          </a>

          <nav className="flex gap-6 text-sm text-gray-400">

            <a href="/" className="hover:text-white">
              TOP
            </a>

            <a href="/fx" className="hover:text-white">
              FX速報
            </a>

            <a href="/stocks" className="text-white">
              株速報
            </a>

            <a href="/news" className="hover:text-white">
              市場ニュース
            </a>

          </nav>

        </div>

      </header>

      {/* HERO */}

      <section className="relative h-[70vh] overflow-hidden flex items-center justify-center">

        <img
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1800&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/75" />

        <div className="relative z-10 text-center px-6">

          <p className="text-cyan-400 tracking-[0.3em] text-sm">
            GLOBAL STOCK MARKET
          </p>

          <h1 className="mt-6 text-6xl md:text-8xl font-black">
            STOCKS LIVE
          </h1>

          <p className="mt-8 text-gray-300 text-xl">
            米国株・日本株ニュースをリアルタイム更新
          </p>

        </div>

      </section>

      {/* CHART BUTTON */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="flex flex-wrap gap-4 mb-10">

          <button
            onClick={() => setSymbol("NASDAQ:AAPL")}
            className="bg-white text-black px-6 py-3 rounded-full font-bold"
          >
            APPLE
          </button>

          <button
            onClick={() => setSymbol("NASDAQ:NVDA")}
            className="bg-zinc-900 px-6 py-3 rounded-full"
          >
            NVIDIA
          </button>

          <button
            onClick={() => setSymbol("NASDAQ:TSLA")}
            className="bg-zinc-900 px-6 py-3 rounded-full"
          >
            TESLA
          </button>

          <button
            onClick={() => setSymbol("TSE:7203")}
            className="bg-zinc-900 px-6 py-3 rounded-full"
          >
            TOYOTA
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

      {/* US STOCK NEWS */}

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="flex items-center justify-between mb-12">

          <h2 className="text-5xl font-black">
            US STOCK NEWS
          </h2>

          <p className="text-gray-500">
            AUTO UPDATE
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {usNews.slice(0, 9).map((item, index) => (

            <a
              key={index}
              href={item.link}
              target="_blank"
              className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden hover:border-cyan-400 transition"
            >

              <img
                src="https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1200&auto=format&fit=crop"
                alt=""
                className="w-full h-56 object-cover"
              />

              <div className="p-6">

                <p className="text-cyan-400 text-sm">
                  US MARKET
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

      {/* JAPAN STOCK NEWS */}

      <section className="max-w-7xl mx-auto px-6 pb-32">

        <div className="flex items-center justify-between mb-12">

          <h2 className="text-5xl font-black">
            JAPAN STOCK NEWS
          </h2>

          <p className="text-gray-500">
            AUTO UPDATE
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {jpNews.slice(0, 9).map((item, index) => (

            <a
              key={index}
              href={item.link}
              target="_blank"
              className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden hover:border-red-400 transition"
            >

              <img
                src="https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=1200&auto=format&fit=crop"
                alt=""
                className="w-full h-56 object-cover"
              />

              <div className="p-6">

                <p className="text-red-400 text-sm">
                  JAPAN MARKET
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