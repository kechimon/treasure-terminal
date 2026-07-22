export function calculateEMA(
  prices: number[],
  period: number
): number {
  if (prices.length < period) {
  return prices[prices.length - 1];
}

  const multiplier = 2 / (period + 1);

  let ema =
    prices
      .slice(0, period)
      .reduce((a, b) => a + b, 0) / period;

  for (let i = period; i < prices.length; i++) {
    ema =
      (prices[i] - ema) * multiplier +
      ema;
  }

  return Number(ema.toFixed(2));
}

export function calculateRSI(prices: number[], period = 14): number {
  if (prices.length < period + 1) return 50;

  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const diff = prices[i] - prices[i - 1];
    if (diff >= 0) {
      gains += diff;
    } else {
      losses -= diff;
    }
  }

  const avgGain = gains / period;
  const avgLoss = losses / period;

  if (avgLoss === 0) return 100;

  const rs = avgGain / avgLoss;
  return Number((100 - 100 / (1 + rs)).toFixed(2));
}

export function calculateMACD(prices: number[]) {
  const ema12 = calculateEMA(prices, 12);
  const ema26 = calculateEMA(prices, 26);

  const macd = ema12 - ema26;

  return {
    macd: Number(macd.toFixed(2)),
    signal: Number((macd * 0.9).toFixed(2)), // 仮シグナル
  };
}

export function calculateATR(prices: number[], period = 14): number {
  if (prices.length < period + 1) return 0;

  let total = 0;

  for (let i = prices.length - period; i < prices.length; i++) {
    total += Math.abs(prices[i] - prices[i - 1]);
  }

  return Number((total / period).toFixed(2));
}
export function calculateBollingerBands(
  prices: number[],
  period = 20,
  multiplier = 2
) {
  if (prices.length < period) {
    throw new Error("価格データ不足");
  }

  const slice = prices.slice(-period);

  const sma =
    slice.reduce((a, b) => a + b, 0) / period;

  const variance =
    slice.reduce(
      (sum, price) => sum + Math.pow(price - sma, 2),
      0
    ) / period;

  const stdDev = Math.sqrt(variance);

  return {
    upper: Number((sma + stdDev * multiplier).toFixed(2)),
    middle: Number(sma.toFixed(2)),
    lower: Number((sma - stdDev * multiplier).toFixed(2)),
  };
}

export function calculateTrendStrength(
  prices: number[],
  period = 14
): number {
  if (prices.length < period + 1) return 20;

  let movement = 0;

  for (let i = prices.length - period; i < prices.length; i++) {
    movement += Math.abs(prices[i] - prices[i - 1]);
  }

  const range =
    Math.max(...prices.slice(-period)) -
    Math.min(...prices.slice(-period));

  if (range === 0) return 20;

  return Number(
    Math.min(100, (movement / range) * 25).toFixed(2)
  );
}