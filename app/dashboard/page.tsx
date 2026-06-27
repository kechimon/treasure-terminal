"use client";

import Link from "next/link";
import { updates } from "../data/updates";

type Stat = {
  id: string;
  label: string;
  value: string;
  hint: string;
  borderClass: string;
  valueClass: string;
};

export default function DashboardPage() {
  const latestVersion =
    updates[0]?.title.match(/Ver\d+/)?.[0] ?? "Ver--";

  const stats: Stat[] = [
    {
      id: "version",
      label: "EA VERSION",
      value: ,
      hint: "CURRENT",
      borderClass: "border-sky-400/15",
      valueClass: "text-sky-300",
    },
    {
      id: "status",
      label: "STATUS",
      value: "ACTIVE",
      hint: "SYSTEM",
      borderClass: "border-lime-400/15",
      valueClass: "text-lime-300",
    },
    {
      id: "progress",
      label: "DEVELOPMENT",
      value: "99%",
      hint: "PROGRESS",
      borderClass: "border-yellow-400/15",
      valueClass: "text-yellow-300",
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#05070b] text-white antialiased">
      <a
        href="https://x.com/TRETEMI2026"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-sky-400/40 bg-[#05070b]/80 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all duration-300 ease-out hover:scale-110 hover:border-sky-300 hover:bg-sky-500/20 hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] active:scale-95 group overflow-hidden"
        aria-label="Follow on X"
      >
        <span className="absolute inset-0 rounded-full bg-sky-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="text-xl font-black text-sky-300 transition-colors duration-300 group-hover:text-white relative z-10">
          𝕏
        </span>
      </a>

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute -top-40 left-[-10%] h-[460px] w-[460px] rounded-full bg-sky-500/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[480px] w-[480px] rounded-full bg-amber-400/10 blur-[170px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/45 backdrop-blur-3xl">
        <div className="mx-auto flex h-[74px] max-w-[1200px] items-center justify-between px-4 md:px-5">
          <div>
            <p className="text-[10px] font-medium tracking-[0.4em] text-gray-500 uppercase">
              TREASURE TERMINAL
            </p>
            <h1 className="mt-1 text-xl font-black tracking-[0.12em] text-white md:text-2xl">
              KINZANプロジェクト
            </h1>
            <p className="mt-1.5 flex items-center gap-1.5 text-[10px] font-bold tracking-[0.25em] text-emerald-400 uppercase">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE PERFORMANCE
            </p>
          </div>

          <Link
            href="/"
            className="group rounded-2xl border border-white/10 bg-white/5 px-4 py-2 outline-none ring-sky-400/40 transition hover:bg-white/10 focus-visible:ring-2"
          >
            <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">
              Back
            </p>
            <p className="mt-0.5 text-sm font-black text-white transition group-hover:text-sky-200">
              Home
            </p>
          </Link>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-[1200px] px-4 py-6 pb-16 md:py-8">
        <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-black/40 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-3xl">
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-300/20 to-transparent blur-md scan-animation" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-400/10 to-transparent blur-2xl scan-animation" />
          </div>

          <div className="relative z-10 h-[4px] bg-gradient-to-r from-sky-400 via-yellow-300 to-lime-300" />

          <div className="relative z-10 p-5 md:p-10">
            <div className="flex flex-col sm:flex-row justify-center gap-12 sm:gap-8 md:gap-20 items-center sm:items-start pt-12 pb-8">
              <div className="relative text-center w-full max-w-[200px]">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[180px] z-20">
                  <div className="relative rounded-2xl bg-sky-500/20 border border-sky-400/40 backdrop-blur-md p-2.5 shadow-lg shadow-sky-950/20">
                    <p className="text-xs md:text-sm text-sky-100 font-medium">
                      開発どこまで進んだ？
                    </p>
                    <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent border-t-sky-400/40" />
                  </div>
                </div>
                <img
                  src="/nushi.png"
                  alt="ヌシ"
                  className="w-32 md:w-44 mx-auto drop-shadow-[0_0_25px_rgba(56,189,248,0.45)]"
                />
                <p className="mt-3 text-2xl md:text-3xl font-black tracking-[0.15em] text-sky-300">
                  ヌシ
                </p>
                <p className="text-xs md:text-sm tracking-[0.25em] text-sky-100/70">
                  短期目線担当
                </p>
              </div>

              <div className="relative text-center w-full max-w-[200px]">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[180px] z-20">
                  <div className="relative rounded-2xl bg-pink-500/20 border border-pink-400/40 backdrop-blur-md p-2.5 shadow-lg shadow-pink-950/20">
                    <p className="text-xs md:text-sm text-pink-100 font-medium">
                      {latestVersion}実装完了♪
                    </p>
                    <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent border-t-pink-400/40" />
                  </div>
                </div>
                <img
                  src="/kuon.png"
                  alt="クオン"
                  className="w-32 md:w-44 mx-auto drop-shadow-[0_0_25px_rgba(236,72,153,0.45)]"
                />
                <p className="mt-3 text-2xl md:text-3xl font-black tracking-[0.15em] text-pink-300">
                  クオン
                </p>
                <p className="text-xs md:text-sm tracking-[0.25em] text-pink-100/70 mb-4">
                  市場分析担当
                </p>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-[11px] font-semibold tracking-[0.35em] text-sky-300 uppercase">
                Real Result
              </p>
              <h2 className="mt-3 text-[40px] font-black leading-tight tracking-tight text-white md:text-[72px]">
                KINZAN EA{" "}
                <span className="bg-gradient-to-r from-sky-300 via-white to-amber-200 bg-clip-text text-transparent">
                  開発中。
                </span>
              </h2>
              <p className="mt-6 max-w-[760px] text-sm leading-7 text-gray-300 md:text-base md:leading-8">
                KINZANはTREASURE TERMINAL専用に開発中のXAUUSD特化EA。
                <br className="hidden md:block" />
                <span className="md:ml-1">
                  USIDX、USDJPY、NASDAQ、S&P500、WTI原油など複数市場を分析し、市場環境に応じた売買判断を行います。
                </span>
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {stats.map((s) => (
                <section
                  key={s.id}
                  className={`rounded-[28px] border ${s.borderClass} bg-[#0b1118]/90 p-5 md:p-7 shadow-inner shadow-black/30`}
                >
                  <p className="text-[10px] tracking-[0.25em] text-gray-400 uppercase">
                    {s.hint}
                  </p>
                  <h3 className="mt-2 text-xs md:text-sm font-medium text-gray-500">
                    {s.label}
                  </h3>
                  <p className={`mt-3 text-4xl font-black tabular-nums md:text-5xl ${s.valueClass}`}>
                    {s.value}
                  </p>
                </section>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/kinzan/performance"
                className="group relative overflow-hidden flex items-center justify-between rounded-[28px] border border-amber-400/30 bg-gradient-to-r from-amber-950/40 via-yellow-950/20 to-amber-950/40 p-5 md:p-7 transition-all duration-300 hover:border-amber-400/60 hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 overflow-hidden rounded-[28px] pointer-events-none">
                  <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent -translate-y-full group-hover:translate-y-[400%] transition-transform duration-700" />
                </div>

                <div className="relative z-10">
                  <p className="text-[10px] font-semibold tracking-[0.4em] text-amber-400/70 uppercase">
                    ◆ KINZAN ANALYTICS
                  </p>
                  <p className="mt-2 text-xl font-black tracking-wide text-white">
                    取引実績{" "}
                    <span className="bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
                      PERFORMANCE
                    </span>
                  </p>
                  <p className="mt-1.5 text-xs text-gray-500 tracking-wider">
                    勝率 · 累積損益 · 取引履歴を確認
                  </p>
                </div>

                <div className="relative z-10 flex flex-col items-center gap-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10 transition-all duration-300 group-hover:border-amber-400/60 group-hover:bg-amber-400/20">
                    <span className="text-sm font-black text-amber-400 transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </div>
                  <span className="text-[9px] tracking-widest text-amber-400/50 uppercase">
                    VIEW
                  </span>
                </div>
              </Link>
            </div>

            <section className="mt-10 rounded-[30px] border border-white/10 bg-[#0b1118]/90 p-5 md:p-8">
              <p className="text-[11px] font-semibold tracking-[0.35em] text-sky-300 uppercase">
                DEVELOPMENT LOG
              </p>
              <h3 className="mt-2 text-xl font-bold text-white tracking-wide">
                KINZAN 開発進捗
              </h3>

              <div className="mt-6 space-y-4">
                {updates.map((update) => (
                  <div
                    key={`${update.date}-${update.title}`}
                    className="rounded-2xl border border-sky-400/10 bg-black/30 p-4"
                  >
                    <p className="text-xs text-sky-300">{update.date}</p>
                    <p className="mt-2 font-bold text-white">{update.title}</p>
                  </div>
                ))}

                <div className="rounded-2xl border border-lime-400/20 bg-lime-500/5 p-5">
                  <p className="font-black text-lime-300">KINZAN開発履歴</p>

                  <div className="mt-4 text-sm leading-7 text-gray-300">
                    <p className="text-sky-300">～2026/06/09</p>
                    <p>V1〜V48 FULL：基礎構築・マクロ分析・USIDX逆相関・多重ポジション</p>

                    <p className="mt-3 text-sky-300">2026/06/10</p>
                    <p>Ver1〜Ver13：シンプル設計作り直し・SmartExit・500円利益確保・市場状態判断</p>

                    <p className="mt-3 text-sky-300">2026/06/11</p>
                    <p>Ver14〜Ver15：H4廃止・スコア差3へ緩和</p>

                    <p className="mt-3 text-sky-300">2026/06/12</p>
                    <p>Ver16〜Ver18：TP拡大・スイング寄り・M30導入・H1/H4完全廃止</p>

                    <p className="mt-3 text-sky-300">2026/06/15</p>
                    <p>Ver19〜Ver20：SL1200円・TP2000円（現行）</p>

                    <p className="mt-3 text-sky-300">2026/06/15</p>
                    <p>Ver19：SL1500円→1200円へ変更</p>
                    <p>Ver20：TP3000円→2000円へ変更</p>

                    <p className="mt-3 text-sky-300">2026/06/16〜06/17</p>
                    <p>取引履歴PDF化・TT実績ページ構築</p>
                    <p>Excel集計により勝率66.5%ながら純損益マイナスを確認</p>
                    <p>損大利小問題を発見</p>

                    <p className="mt-3 text-sky-300">Ver21</p>
                    <p>取引停止時間帯機能導入</p>
                    <p>21:15〜06:00取引停止へ確定</p>

                    <p className="mt-3 text-sky-300">Ver22〜Ver25</p>
                    <p>Ver22：利確閾値500円→1000円</p>
                    <p>Ver23：5段階トレーリングストップ</p>
                    <p>Ver24：時間帯別スコア・ポートフォリオ管理・連勝連敗ロット調整</p>
                    <p>Ver25：髭フィルター追加</p>

                    <p className="mt-3 text-sky-300">ロールバック</p>
                    <p>Ver22〜25を破棄</p>
                    <p>Ver21ベースへ回帰</p>

                    <p className="mt-3 text-sky-300">2026/06/22</p>
                    <p>Ver26：利確早期化＋損切り厳格化</p>
                    <p>Ver27：SLのみへ戻し単体検証</p>
                    <p>Ver28：2条件利確へ復帰</p>

                    <p className="mt-3 font-bold text-lime-300">
                      現在のベースライン：Ver28（実質Ver21）
                    </p>
                    <p>
                      SL1200円 / TP2000円 / 21:15〜06:00停止 / USIDX重視 / 2条件利確
                    </p>

                    <div className="mt-5 border-t border-white/10 pt-4">
                      <p className="text-2xl font-black text-lime-300">
                        KINZAN Ver28
                      </p>
                      <p className="mt-2 text-gray-300">ベースライン確定</p>
                    </div>

                    <p className="mt-3 text-sky-300">2026/06/18</p>
                    <p>Ver29：ロンドン・アジア特化へ最適化</p>
                    <p>取引停止時間 21:00〜翌10:00へ拡大</p>
                    <p>Lot_Size 0.02化（input対応）</p>

                    <p className="mt-3 font-bold text-lime-300">
                      現在のベースライン：Ver29
                    </p>
                    <p>
                      SL1200円 / TP2000円 / 21:00〜翌10:00停止 / Lot0.02 / USIDX重視 / 2条件利確
                    </p>

                    <p className="mt-3 text-sky-300">2026/06/23</p>
                    <p>Ver31：NASDAQ相関フィルター追加</p>
                    <p>NASDAQ_Same_Direction切替機能実装</p>
                    <p>通常相場：NASDAQ逆相関</p>
                    <p>異例相場：NASDAQ同方向相関</p>
                    <p>現在は株高×金高相場に対応し同方向モードで運用中</p>

                    <p className="mt-3 font-bold text-lime-300">
                      現在のベースライン：Ver31
                    </p>

                    <p className="mt-3 text-sky-300">2026/06/27</p>
                    <p>Ver32：US500相関フィルター追加</p>
                    <p>（NASDAQ相関フィルターと同様の判定ロジック）</p>

                    <p className="mt-2">Ver33：USIDX正常時のエントリー改善</p>
                    <p>・スコア閾値 3 → 2</p>
                    <p>・Align判定 M30 → M15</p>

                    <p className="mt-2">Ver34：利確・逆張りロジック改善</p>
                    <p>・2条件利確 → 1条件利確</p>
                    <p>・USIDX異常相関時の逆張り追加</p>

                    <p className="mt-2">Ver35：精度重視へ調整</p>
                    <p>・Align判定 M15＋M30一致</p>
                    <p>・スコア重み M30(+3)・M15(+2)</p>

                    <p className="mt-2">Ver36：金曜強制クローズ停止</p>
                    <p>Close_Fri = false</p>

                    <p className="mt-3 font-bold text-lime-300">
                      現在のベースライン：Ver36
                    </p>
                    <p>
                      SL1200円 / TP2000円 / 21:00〜翌10:00停止 / Lot0.02 / USIDX重視 / NASDAQ・US500相関対応 / M15＋M30 Align / 金曜強制決済OFF
                    </p>

                    <div className="mt-5 border-t border-white/10 pt-4">
                      <p className="text-2xl font-black text-lime-300">
                        KINZAN Ver36
                      </p>
                      <p className="mt-2 text-gray-300">
                        US500相関対応・Ver36 Baseline
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <footer className="mt-10 border-t border-white/10 pt-6 text-xs leading-relaxed text-gray-500">
              数値・コメントは自己記録用です。
              <br />
              投資勧誘ではありません。
            </footer>
          </div>
        </div>

        <footer className="mt-16 border-t border-white/10 pt-8 text-center">
          <p className="text-sm tracking-[0.25em] text-gray-400">
            TREASURE TERMINAL
          </p>

          <p className="mt-2 text-xs text-gray-500">
            Market Analysis Project
          </p>

          <a href="mailto:main@actl-m.co.jp">main@actl-m.co.jp</a>

          <p className="mt-6 text-[11px] text-gray-600">
            Operated by ACTL Co., Ltd.
          </p>

          <p className="mt-4 text-[11px] text-gray-600">
            数値・コメントは自己記録用です。
            <br />
            投資勧誘を目的とするものではありません。
          </p>
        </footer>
      </section>
    </main>
  );
}
