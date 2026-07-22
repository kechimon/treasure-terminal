const API_KEY = process.env.ALPHA_VANTAGE_API_KEY!;

export async function getClosePrices(symbol: string): Promise<number[]> {
  let url = "";

switch (symbol) {
  case "USDJPY":
    url =
      `https://www.alphavantage.co/query` +
      `?function=FX_INTRADAY` +
      `&from_symbol=USD` +
      `&to_symbol=JPY` +
      `&interval=5min` +
      `&outputsize=full` +
      `&apikey=${API_KEY}`;
    break;

  case "XAUUSD":
    url =
      `https://www.alphavantage.co/query` +
      `?function=FX_INTRADAY` +
      `&from_symbol=XAU` +
      `&to_symbol=USD` +
      `&interval=5min` +
      `&outputsize=full` +
      `&apikey=${API_KEY}`;
    break;

  case "NAS100":
    url =
      `https://www.alphavantage.co/query` +
      `?function=TIME_SERIES_INTRADAY` +
      `&symbol=QQQ` +
      `&interval=5min` +
      `&outputsize=full` +
      `&apikey=${API_KEY}`;
    break;

  case "JP225":
    url =
      `https://www.alphavantage.co/query` +
      `?function=TIME_SERIES_INTRADAY` +
      `&symbol=EWJ` +
      `&interval=5min` +
      `&outputsize=full` +
      `&apikey=${API_KEY}`;
    break;

  default:
    throw new Error(`未対応シンボル: ${symbol}`);
}
  

  const res = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("API取得失敗");
  }

  const json = await res.json();

  const series = json["Time Series FX (5min)"];

  if (!series) {
  console.warn("Alpha Vantage:", json);

  // フォールバック（ダミーデータ）
  return [
    151.10,151.15,151.18,151.22,151.28,
    151.35,151.41,151.39,151.45,151.50,
    151.58,151.61,151.66,151.72,151.75,
    151.82,151.88,151.92,151.95,152.01,
    152.08,152.12,152.18,152.25,152.31,
    152.28,152.35,152.40,152.44,152.51,
    152.58,152.63,152.69,152.75,152.80,
    152.86,152.90,152.95,153.02,153.06,
    153.10,153.14,153.18,153.22,153.25,
    153.29,153.34,153.39,153.44,153.49,
    153.53,153.57,153.61,153.65,153.70,
    153.74,153.79,153.84,153.88,153.92
  ];
}

  return Object.values(series)
    .map((v: any) => Number(v["4. close"]))
    .reverse();
}