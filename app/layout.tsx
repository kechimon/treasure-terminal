import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TREASURE TERMINAL | トレーダーによる宝探し",
  description:
    "TREASURE TERMINAL公式サイト。ゴールド・為替・マーケット分析やKINZANプロジェクトの情報を発信。",
  keywords: [
    "TREASURE TERMINAL",
    "KINZAN",
    "ゴールド",
    "XAUUSD",
    "FX",
    "トレード",
    "USDJPY",
    "トレジャーターミナル",
    "EA",
    "自動売買",
  ],
  verification: {
    google: "LrgFiHHa1TlWZQeXvsP4c5_t8Kx6LmifwSj8FkNva6E",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}