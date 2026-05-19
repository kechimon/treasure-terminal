export async function GET() {

  try {

    return Response.json({

      usdjpy: {

        trend: "上昇傾向",

        volatility: "値動き大",

        sentiment: "円安優勢",

        analysis: [
          "米金利上昇によりドル買い優勢",
          "日米金利差拡大で円売り継続",
          "短期筋による押し目買い継続",
          "介入警戒で値動き拡大",
        ],

      },

      xauusd: {

        trend: "下落警戒",

        volatility: "超変動",

        sentiment: "安全資産買い",

        analysis: [
          "地政学リスクで金買い継続",
          "リスク回避資金が流入",
          "VIX上昇で安全資産需要増加",
          "高値圏での攻防継続",
        ],

      },

      updatedAt: new Date().toISOString(),

    })

  } catch (error) {

    return Response.json({

      error: "analysis failed",

    })

  }

}