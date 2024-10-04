interface GetTickerPairData {
  a: [string, string, string]; // Ask: [price, whole lot volume, lot volume]
  b: [string, string, string]; // Bid: [price, whole lot volume, lot volume]
  c: [string, string]; // Last trade closed: [price, lot volume]
  v: [string, string]; // Volume: [today, last 24 hours]
  p: [string, string]; // Volume weighted average price: [today, last 24 hours]
  t: [number, number]; // Number of trades: [today, last 24 hours]
  l: [string, string]; // Low: [today, last 24 hours]
  h: [string, string]; // High: [today, last 24 hours]
  o: string; // Today's opening price
}

export interface GetTickerSchema {
  error: string[];
  result: {
    [pair: string]: GetTickerPairData;
  };
}
