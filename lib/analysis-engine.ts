export type MarketData = {
  ema20: number
  ema50: number
  ema200: number
  rsi: number
  macd: number
  macdSignal: number
  atr: number
  trendStrength: number
  bbUpper: number
  bbMiddle: number
  bbLower: number
}

export type AnalysisResult = {
  signal: "BUY" | "SELL" | "HOLD"
  confidence: number
  trend: "強気" | "弱気"
  volatility: "低" | "中" | "高"
  comment: string
}

export function analyze(data: MarketData): AnalysisResult {
  let score = 50

  // EMA Trend
if (
  data.ema20 > data.ema50 &&
  data.ema50 > data.ema200
) {
  score += 30
} else if (
  data.ema20 < data.ema50 &&
  data.ema50 < data.ema200
) {
  score -= 30
}

  // MACD
  if (data.macd > data.macdSignal) {
    score += 20
  } else {
    score -= 20
  }

  // RSI
  if (data.rsi >= 45 && data.rsi <= 65) {
    score += 10
  } else if (data.rsi > 70) {
    score -= 15
  }

    // ATR
  if (data.atr < 3) {
    score += 5
  }

  // Trend Strength
  if (data.trendStrength > 30) {
    score += 10
  }

  // Bollinger Bands
  if (data.bbMiddle > data.ema20) {
    score += 5
  }

  let signal: "BUY" | "SELL" | "HOLD" = "HOLD"

  if (score >= 80) {
    signal = "BUY"
  } else if (score <= 35) {
    signal = "SELL"
  }

  const confidence = Math.max(1, Math.min(score, 99))

  return {
    signal,
    confidence,
    trend: data.ema20 > data.ema50 ? "強気" : "弱気",
    volatility:
      data.atr >= 5 ? "高" :
      data.atr >= 2 ? "中" : "低",
    comment:
      signal === "BUY"
        ? "EMAとMACDが上昇を示しており、買い優勢です。"
        : signal === "SELL"
        ? "下降圧力が強く、売り優勢です。"
        : "方向感が乏しいため様子見が望まれます。"
  }
}