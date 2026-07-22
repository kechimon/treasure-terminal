export async function GET() {
  try {
    return Response.json({
   usdjpy: {
  signal: "🟡 HOLD",
  overall: "中立",
  outlook: "円安進行・介入警戒",
  confidence: 78,
  strength: "★★★★☆",
  riskLevel: "★★★★★",
  trend: "上昇トレンド",
  volatility: "超高ボラティリティ",
  sentiment: "ドル優勢",

  analysis: [
    "ドル円は163円台で円安が進行",
    "日本政府の介入警戒が一段と高まる",
    "FOMCを前に様子見ムード"
  ],

  beginnerComment:
    "ドル円は円安が続いていますが、介入への警戒も強まっています。FOMCを控えて大きな値動きが出やすいため、慎重な取引を心掛けましょう。"
},

xauusd: {
  signal: "🟢 BUY",
  overall: "やや強気",
  outlook: "安全資産需要",
  confidence: 80,
  strength: "★★★★☆",
  riskLevel: "★★★★☆",
  trend: "上昇トレンド",
  volatility: "高ボラティリティ",
  sentiment: "買い優勢",

  analysis: [
    "中東情勢で安全資産需要が継続",
    "FOMC前の買いが入りやすい",
    "ドル高でも底堅い推移"
  ],

  beginnerComment:
    "ゴールドは地政学リスクを背景に買われやすい状況です。FOMCの結果次第でさらに値動きが大きくなる可能性があります。"
},

marketMood: "🟡 CAUTION",

marketComment:
  "市場はFOMCを目前に控え様子見姿勢が強まる一方、円安進行で為替介入への警戒感が高まっている。USDJPYは163円台まで上昇し高値圏を維持。XAUUSDは中東情勢を背景とした安全資産需要に支えられ底堅く推移しており、今後はFOMCの政策判断と日銀の動向が相場の方向性を左右する重要材料となる。",

updatedAt: "2026/07/22",
    });
  } catch (error) {
    return Response.json({
      error: "analysis failed",
    });
  }
}