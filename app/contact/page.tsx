export default function ContactPage() {
  return (
   <main className="relative min-h-screen overflow-hidden bg-[#030507] text-white">

  <div
  className="absolute inset-0 bg-cover"
  style={{
    backgroundImage: "url('/nushi-quon.png')",
    backgroundPosition: "center 15%",
  }}
/>

  <div className="absolute inset-0 bg-[#030507]/75" />

  <div className="relative z-10">
    <div className="mx-auto max-w-5xl px-6 py-20">

    <p className="text-sky-300 tracking-[0.35em] text-xs font-semibold">
      TREASURE TERMINAL
    </p>

    <h1 className="mt-4 text-4xl md:text-7xl font-black">
      CONTACT
    </h1>

    <p className="mt-8 max-w-3xl text-base leading-8 text-gray-400 md:text-lg">
      TREASURE TERMINALへのご意見・ご要望、
      市場情報の提供、共同開発のご相談、
      ビジネスに関するお問い合わせを受け付けています。
    </p>

    <div className="mt-14 grid gap-6 md:grid-cols-2">

      {/* CONTACT CARD */}
      <div className="rounded-[32px] border border-sky-400/20 bg-sky-500/5 p-5 md:p-8">

        <p className="text-sky-300 text-sm font-black tracking-[0.25em]">
          お問い合わせ
        </p>

        <a
          href="mailto:main@actl-m.co.jp"
          className="mt-6 block break-all text-lg font-black text-white transition hover:text-sky-300 md:text-3xl"
        >
          main@actl-m.co.jp
        </a>

        <div className="mt-8 h-px bg-white/10" />

        <div className="mt-8 space-y-3 text-sm leading-7 text-gray-400">
          <p>・ご意見・ご要望</p>
          <p>・市場情報の提供</p>
          <p>・共同開発のご相談</p>
          <p>・ビジネスのお問い合わせ</p>
        </div>

      </div>

      {/* ABOUT CARD */}
      <div className="rounded-[32px] border border-lime-400/20 bg-lime-500/5 p-5 md:p-8">

        <p className="text-lime-300 text-sm font-black tracking-[0.25em]">
          TREASURE TERMINALについて
        </p>

        <div className="mt-8 space-y-5 text-gray-300 leading-8">
          <p>
            TREASURE TERMINALは、
            市場分析とKINZAN開発を中心とした
            自社研究開発プロジェクトです。
          </p>

          <p>
            市場データ・ニュース・マクロ環境を分析し、
            独自ロジックの研究と検証を行っています。
          </p>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-xs tracking-[0.2em] text-gray-500">
            OPERATED BY
          </p>

          <p className="mt-2 text-white font-semibold">
            ACTL Co., Ltd.
          </p>
        </div>

      </div>

    </div>

    <div className="mt-16 border-t border-white/10 pt-8 text-center">
      <p className="text-sm tracking-[0.25em] text-gray-400">
        TREASURE TERMINAL
      </p>

      <p className="mt-2 text-xs text-gray-500">
        Market Analysis Project
      </p>

      <p className="mt-6 text-xs text-gray-600">
        運営：ACTL Co., Ltd.
      </p>
    </div>

        </div>
    </div>
  </main>
  );
}