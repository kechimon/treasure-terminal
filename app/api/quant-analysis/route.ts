export async function GET() {
  try {
    return Response.json({
     usdjpy: {
  signal: "🟢 BUY",
  overall: "強気",
  outlook: "押し目買い優勢",
  confidence: 83,
  strength: "★★★★☆",
  riskLevel: "★★★★☆",
  trend: "上昇トレンド",
  volatility: "中〜高",
  sentiment: "ドル買い継続",

  analysis: [
    "USIDXが高値圏を維持",
    "FRBの高金利観測がドルを支援",
    "円安基調継続で押し目買い優勢"
  ],

  beginnerComment:
    "ドル円は上昇トレンドを維持。短期的な調整はあっても、現状は押し目買い優勢の流れです。"
},

xauusd: {
  signal: "🟡 HOLD",
  overall: "中立",
  outlook: "USIDX・NASDAQ監視",
  confidence: 65,
  strength: "★★★☆☆",
  riskLevel: "★★★★☆",
  trend: "高値圏調整",
  volatility: "高ボラティリティ",
  sentiment: "方向感模索",

  analysis: [
    "USIDX高止まりが上値を抑制",
    "NASDAQとの同方向相場が継続",
    "米指標待ちで方向感不足"
  ],

  beginnerComment:
    "ゴールドはドル高が重石となる一方で買い支えも強く、方向感を探る展開。USIDXの動きに注目です。"
},

marketMood: "🟡 CAUTION",

marketComment:
  "市場の主導権は依然としてUSIDX。USDJPYは押し目買い優勢を維持している一方、XAUUSDはUSIDXとNASDAQの影響を受けやすい展開。KINZANではUSIDXを最重要指標とし、NASDAQ相関フィルターを補助判断として活用する。",

updatedAt: new Date().toLocaleTimeString("ja-JP", {
  timeZone: "Asia/Tokyo",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
}),
    });
  } catch (error) {
    return Response.json({
      error: "analysis failed",
    });
  }
}