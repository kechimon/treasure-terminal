export async function GET() {
  try {
    return Response.json({
   usdjpy: {
  signal: "🟢 BUY",
  overall: "強気",
  outlook: "押し目買い優勢",
  confidence: 84,
  strength: "★★★★☆",
  riskLevel: "★★★★☆",
  trend: "上昇トレンド",
  volatility: "高め",
  sentiment: "ドル買い継続",

  analysis: [
    "USIDXが年初来高値圏を維持",
    "FRBのタカ派観測がドルを支援",
    "円安継続で買い優勢"
  ],

  beginnerComment:
    "ドル円は依然として強い上昇トレンド。介入警戒感はあるものの、流れはドル買い優勢の状況です。"
},

xauusd: {
  signal: "🔴 SELL",
  overall: "弱気",
  outlook: "戻り売り優勢",
  confidence: 72,
  strength: "★★☆☆☆",
  riskLevel: "★★★★☆",
  trend: "下落調整",
  volatility: "高ボラティリティ",
  sentiment: "ドル高圧力",

  analysis: [
    "USIDX上昇がゴールドを圧迫",
    "米金利高が金の重石",
    "安全資産需要よりドル需要が優勢"
  ],

  beginnerComment:
    "ゴールドはドル高と高金利環境が逆風。短期反発はあっても現状は戻り売り優勢の地合いです。"
},

marketMood: "🟠 RISK ON",

marketComment:
  "市場の主導権は引き続きドル側。USDJPYは押し目買い優勢を維持している一方、XAUUSDはドル高・金利高が重石となり軟調推移。KINZANではUSIDXとNASDAQの相関変化を最重要ポイントとして監視し、ゴールドは戻り売り優勢シナリオを継続する。",
    });
  } catch (error) {
    return Response.json({
      error: "analysis failed",
    });
  }
}

