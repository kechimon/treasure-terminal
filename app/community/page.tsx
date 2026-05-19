"use client";

import Link from "next/link";

const rooms = [

  {
    name: "ドル円監視所",
    desc: "ドル円・クロス円のリアルタイム考察",
  },

  {
    name: "GOLD司令室",
    desc: "XAUUSD・ゴールド専用部屋",
  },

  {
    name: "有事速報",
    desc: "戦争・地政学・原油・リスクオフ",
  },

  {
    name: "雑談所",
    desc: "トレーダー達の雑談スペース",
  },

  {
    name: "ヌシ観察",
    desc: "ヌシのポンコツトレード監視",
  },

  {
    name: "初心者相談室",
    desc: "初心者歓迎・質問OK",
  },

]

export default function CommunityPage() {

  return (

    <main className="min-h-screen bg-[#05070b] text-white overflow-hidden">

      {/* BACKGROUND */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="absolute top-[-120px] left-[-80px] w-[400px] h-[400px] rounded-full bg-sky-500/10 blur-[140px]" />

        <div className="absolute bottom-[-120px] right-[-80px] w-[420px] h-[420px] rounded-full bg-yellow-400/10 blur-[150px]" />

      </div>

      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-3xl">

        <div className="max-w-[1200px] mx-auto px-4 h-[74px] flex items-center justify-between">

          <div>

            <p className="text-[10px] tracking-[0.35em] text-gray-500 uppercase">
              TREASURE TERMINAL
            </p>

            <h1 className="mt-1 text-2xl font-black tracking-[0.1em]">
              COMMUNITY
            </h1>

          </div>

          <Link
            href="/"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10 transition"
          >

            HOME

          </Link>

        </div>

      </header>

      {/* BODY */}

      <section className="relative z-10 max-w-[1200px] mx-auto px-4 py-8">

        <div className="rounded-[32px] border border-white/10 bg-black/40 backdrop-blur-3xl p-6 md:p-10">

          <div className="flex items-center justify-between flex-wrap gap-4">

            <div>

              <p className="text-[10px] tracking-[0.35em] text-gray-500 uppercase">
                Trader Community
              </p>

              <h2 className="mt-3 text-4xl md:text-6xl font-black leading-tight">

                トレーダー達の
                <span className="bg-gradient-to-r from-sky-300 via-white to-yellow-200 bg-clip-text text-transparent">
                  情報交換所
                </span>

              </h2>

            </div>

            <p className="text-sm text-emerald-400 animate-pulse">

              ● ONLINE

            </p>

          </div>

          <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-4">

            {rooms.map((room) => (

              <Link
  href={`/community/${room.name}`}
  key={room.name}
  className="group rounded-[26px] border border-white/10 bg-white/[0.03] p-5 text-left hover:bg-white/[0.06] hover:border-sky-400/30 transition block"
>

  <p className="text-xl font-black text-white group-hover:text-sky-300 transition">

    {room.name}

  </p>

  <p className="mt-3 text-sm leading-6 text-gray-400">

    {room.desc}

  </p>

</Link>

            ))}

          </div>

        </div>

      </section>

    </main>

  )

}