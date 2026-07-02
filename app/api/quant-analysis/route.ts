export async function GET() {
  try {
    return Response.json({
    usdjpy: {
  signal: "🟢 BUY",
  overall: "強気",
  outlook: "押し目買い優勢",
  confidence: 85,
  strength: "★★★★☆",
  riskLevel: "★★★★☆",
  trend: "上昇トレンド",
  volatility: "高め",
  sentiment: "ドル買い優勢",

  analysis: [
    "USIDXが年初来高値圏を維持",
    "FRBの高金利観測がドルを支援",
    "円安基調継続で押し目買い優勢"
  ],

  beginnerComment:
    "ドル円は引き続き上昇トレンド。ドル買いが継続しており、押し目買いが優勢な状況です。"
},

xauusd: {
  signal: "🔴 SELL",
  overall: "弱気",
  outlook: "戻り売り優勢",
  confidence: 74,
  strength: "★★☆☆☆",
  riskLevel: "★★★★★",
  trend: "下落トレンド",
  volatility: "高ボラティリティ",
  sentiment: "ドル高圧力",

  analysis: [
    "USIDX高騰がゴールドを圧迫",
    "NASDAQ・US500も下落しリスクオフ",
    "戻り売り優勢の展開"
  ],

  beginnerComment:
    "ゴールドはドル高の影響を強く受けて下落。短期反発には注意しつつ、現状は戻り売りが優勢です。"
},

marketMood: "🔴 RISK OFF",

marketComment:
  "市場の主導権はUSIDX。ドル高が継続する中、USDJPYは押し目買い優勢。一方でXAUUSDはドル高に加え、NASDAQ・US500の下落も重なり軟調推移。KINZAN Ver36ではUSIDXを最重要指標とし、NASDAQ・US500相関フィルターを組み合わせてリスク管理を強化する。",

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