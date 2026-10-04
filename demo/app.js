(function () {
  const { SERIES, sma, hqMarkers, symbols } = window.TradingPlusDemoData;

  const chartEl = document.getElementById("chart");
  const symbolSelect = document.getElementById("symbol");
  const lastLabel = document.getElementById("last-price");

  symbols.forEach((sym) => {
    const opt = document.createElement("option");
    opt.value = sym;
    opt.textContent = sym;
    symbolSelect.appendChild(opt);
  });

  const chart = LightweightCharts.createChart(chartEl, {
    layout: {
      background: { type: "solid", color: "transparent" },
      textColor: "#9aabc4",
      fontFamily: "IBM Plex Sans, sans-serif",
    },
    grid: {
      vertLines: { color: "rgba(255,255,255,0.04)" },
      horzLines: { color: "rgba(255,255,255,0.04)" },
    },
    crosshair: {
      mode: LightweightCharts.CrosshairMode.Normal,
    },
    rightPriceScale: {
      borderColor: "rgba(255,255,255,0.08)",
    },
    timeScale: {
      borderColor: "rgba(255,255,255,0.08)",
      timeVisible: false,
    },
  });

  const candleSeries = chart.addCandlestickSeries({
    upColor: "#22c55e",
    downColor: "#ef4444",
    borderUpColor: "#22c55e",
    borderDownColor: "#ef4444",
    wickUpColor: "#86efac",
    wickDownColor: "#fca5a5",
  });

  const smaSeries = chart.addLineSeries({
    color: "#3d8bfd",
    lineWidth: 2,
    priceLineVisible: false,
    lastValueVisible: false,
  });

  function loadSymbol(sym) {
    const candles = SERIES[sym];
    candleSeries.setData(candles);
    smaSeries.setData(sma(candles, 20));
    candleSeries.setMarkers(hqMarkers(candles));
    const last = candles[candles.length - 1];
    lastLabel.textContent = `${sym} · last ${last.close.toLocaleString()}`;
    chart.timeScale().fitContent();
  }

  symbolSelect.addEventListener("change", () => loadSymbol(symbolSelect.value));
  loadSymbol(symbols[0]);

  const ro = new ResizeObserver(() => {
    chart.applyOptions({ width: chartEl.clientWidth, height: chartEl.clientHeight });
  });
  ro.observe(chartEl);
})();
