import { useEffect, useRef } from 'react';

const ChartComponent = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          container_id: "tradingview_chart_container",
          symbol: "NASDAQ:AAPL",
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          enable_publishing: false,
          allow_symbol_change: true,
          hideideas: true,
          autosize: true,
        });
      }
    };

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div id="tradingview_chart_container" ref={containerRef} style={{ height: "500px", width: "100%" }} />
  );
};

export default ChartComponent;