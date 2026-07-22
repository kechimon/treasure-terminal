import { NextResponse } from "next/server";

import * as Market from "@/lib/market";

import {
  calculateEMA,
  calculateRSI,
  calculateMACD,
  calculateATR,
  calculateBollingerBands,
  calculateTrendStrength,
} from "@/lib/indicators";

import { analyze } from "@/lib/analysis-engine";
function analyzeMarket(prices: number[]) {
  const ema20 = calculateEMA(prices, 20);
  const ema50 = calculateEMA(prices, 50);
  const ema200 =
    prices.length >= 200
      ? calculateEMA(prices, 200)
      : calculateEMA(prices, 50);

  const rsi = calculateRSI(prices);
  const { macd, signal: macdSignal } = calculateMACD(prices);
  const atr = calculateATR(prices);

  const trendStrength = calculateTrendStrength(prices);
  const bb = calculateBollingerBands(prices);

  return analyze({
    ema20,
    ema50,
    ema200,
    rsi,
    macd,
    macdSignal,
    atr,
    trendStrength,
    bbUpper: bb.upper,
    bbMiddle: bb.middle,
    bbLower: bb.lower,
  });
}
export async function GET() {
  const usdjpyPrices = await Market.getClosePrices("USDJPY");
const xauusdPrices = await Market.getClosePrices("XAUUSD");
const nas100Prices = await Market.getClosePrices("NAS100");
const jp225Prices = await Market.getClosePrices("JP225");
  const usdjpy = analyzeMarket(usdjpyPrices);
  const xauusd = analyzeMarket(xauusdPrices);
  const nas100 = analyzeMarket(nas100Prices);
  const jp225 = analyzeMarket(jp225Prices);

  return NextResponse.json({
    updated: new Date().toLocaleString("ja-JP"),

    USDJPY: usdjpy,
    XAUUSD: xauusd,
    NAS100: nas100,
    JP225: jp225,
  });
}
