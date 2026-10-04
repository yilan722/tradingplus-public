/**
 * Synthetic OHLCV for the public demo only — not real market data.
 */
(function (global) {
  function seededRandom(seed) {
    let s = seed >>> 0;
    return function () {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  function generateCandles({
    startTs = Math.floor(Date.UTC(2025, 0, 1) / 1000),
    count = 180,
    startPrice = 42000,
    intervalSec = 86400,
    seed = 42,
    volatility = 0.018,
  } = {}) {
    const rand = seededRandom(seed);
    const candles = [];
    let price = startPrice;

    for (let i = 0; i < count; i++) {
      const drift = (rand() - 0.48) * volatility;
      const open = price;
      const close = Math.max(100, open * (1 + drift));
      const wick = Math.abs(open - close) * (0.4 + rand() * 1.2) + open * 0.002;
      const high = Math.max(open, close) + wick * rand();
      const low = Math.min(open, close) - wick * rand();
      const volume = Math.round(800 + rand() * 4200);

      candles.push({
        time: startTs + i * intervalSec,
        open: round(open),
        high: round(high),
        low: round(low),
        close: round(close),
        volume,
      });
      price = close;
    }
    return candles;
  }

  function round(n) {
    return Math.round(n * 100) / 100;
  }

  function sma(candles, period) {
    const out = [];
    let sum = 0;
    for (let i = 0; i < candles.length; i++) {
      sum += candles[i].close;
      if (i >= period) sum -= candles[i - period].close;
      if (i >= period - 1) {
        out.push({ time: candles[i].time, value: round(sum / period) });
      }
    }
    return out;
  }

  /** Fake “HQ entry” markers — illustrative only */
  function hqMarkers(candles) {
    const picks = [48, 92, 131, 158];
    return picks
      .filter((i) => i < candles.length)
      .map((i) => ({
        time: candles[i].time,
        position: candles[i].close >= candles[i].open ? "belowBar" : "aboveBar",
        color: candles[i].close >= candles[i].open ? "#16a34a" : "#dc2626",
        shape: candles[i].close >= candles[i].open ? "arrowUp" : "arrowDown",
        text: "HQ",
      }));
  }

  const SERIES = {
    "BTCUSDT.P": generateCandles({ startPrice: 43250, seed: 7 }),
    "ETHUSDT.P": generateCandles({ startPrice: 2450, seed: 19, volatility: 0.022 }),
    "AAPL": generateCandles({ startPrice: 198, seed: 33, volatility: 0.012 }),
  };

  global.TradingPlusDemoData = {
    SERIES,
    sma,
    hqMarkers,
    symbols: Object.keys(SERIES),
  };
})(typeof window !== "undefined" ? window : globalThis);
