// src/components/FeatureModal.jsx
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

// Register Chart.js components (if needed in future enhancements)
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const FeatureModal = ({ isOpen, onClose, feature, availableCoins, account, provider }) => {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [priceThreshold, setPriceThreshold] = useState('');
  const [currentPrice, setCurrentPrice] = useState(null);
  const [riskTolerance, setRiskTolerance] = useState('medium');
  const [sentimentScore, setSentimentScore] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [scanResult, setScanResult] = useState('');
  const [yieldProtocol, setYieldProtocol] = useState('');

  useEffect(() => {
    if (isOpen && selectedCoin && feature.title === 'AI Smart Trading Bots') {
      const fetchPrice = async () => {
        try {
          const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${selectedCoin.id}`
          );
          const [data] = await response.json();
          setCurrentPrice(data.current_price);
          if (priceThreshold && data.current_price < parseFloat(priceThreshold)) {
            alert(`Bot Signal: Buy ${selectedCoin.symbol.toUpperCase()} at $${data.current_price} (below $${priceThreshold})`);
          }
        } catch (err) {
          console.error('Failed to fetch price:', err);
        }
      };
      fetchPrice();
      const interval = setInterval(fetchPrice, 60000);
      return () => clearInterval(interval);
    }
  }, [isOpen, selectedCoin, priceThreshold, feature]);

  useEffect(() => {
    if (isOpen && selectedCoin && feature.title === 'Real-time Sentiment Analytics') {
      // Mock sentiment based on price change
      const score = selectedCoin.price_change_percentage_24h > 0
        ? 75 + Math.min(selectedCoin.price_change_percentage_24h * 5, 25)
        : 25 + Math.max(selectedCoin.price_change_percentage_24h * 5, -25);
      setSentimentScore(score.toFixed(0));
    }
  }, [isOpen, selectedCoin, feature]);

  useEffect(() => {
    if (isOpen && selectedCoin && feature.title === 'Predictive Analytics') {
      const fetchHistoricalData = async () => {
        try {
          const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${selectedCoin.id}/market_chart?vs_currency=usd&days=30`
          );
          const data = await response.json();
          const prices = data.prices.map(([, price]) => price);
          const avg = prices.reduce((sum, p) => sum + p, 0) / prices.length;
          const trend = prices[prices.length - 1] > avg ? 'rise' : 'fall';
          const change = Math.abs((prices[prices.length - 1] - avg) / avg * 100).toFixed(2);
          setPrediction(`${selectedCoin.symbol.toUpperCase()} likely to ${trend} ${change}% in 7 days`);
        } catch (err) {
          setPrediction('Unable to generate prediction');
        }
      };
      fetchHistoricalData();
    }
  }, [isOpen, selectedCoin, feature]);

  const getAdvisorRecommendations = () => {
    if (!availableCoins.length) return [];
    const recommendations = availableCoins.map(coin => {
      const volatility = Math.abs(coin.price_change_percentage_24h);
      let score = 0;
      let rationale = [];
      if (riskTolerance === 'low' && volatility < 5) {
        score += 50;
        rationale.push('Low volatility suits low-risk profile');
      } else if (riskTolerance === 'medium' && volatility < 10) {
        score += 30;
        rationale.push('Moderate volatility aligns with medium-risk profile');
      } else if (riskTolerance === 'high' && volatility >= 10) {
        score += 40;
        rationale.push('High volatility matches high-risk profile');
      }
      if (coin.price_change_percentage_24h > 0) {
        score += coin.price_change_percentage_24h * 2;
        rationale.push(`Positive 24h performance: ${coin.price_change_percentage_24h.toFixed(2)}%`);
      }
      if (coin.market_cap > 100000000000) {
        score += 20;
        rationale.push('High market cap indicates stability');
      }
      return { coin, score, rationale };
    });
    return recommendations.sort((a, b) => b.score - a.score).slice(0, 3);
  };

  const handleSecurityScan = () => {
    setScanResult(account ? 'No suspicious activity detected in wallet transactions' : 'Please connect wallet to scan');
  };

  const handleYieldSelection = () => {
    if (selectedCoin) {
      const protocols = [
        { name: 'Aave', apy: 8 },
        { name: 'Compound', apy: 6 },
        { name: 'Yearn Finance', apy: 10 },
      ];
      const selected = protocols[Math.floor(Math.random() * protocols.length)];
      setYieldProtocol(`Stake ${selectedCoin.symbol.toUpperCase()} on ${selected.name} for ${selected.apy}% APY`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        <div className="space-y-4">
          {feature.title === 'AI Smart Trading Bots' && (
            <>
              <select
                onChange={(e) => setSelectedCoin(availableCoins.find(c => c.id === e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Coin</option>
                {availableCoins.map(coin => (
                  <option key={coin.id} value={coin.id}>{coin.name}</option>
                ))}
              </select>
              {selectedCoin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Threshold (USD)</label>
                    <input
                      type="number"
                      value={priceThreshold}
                      onChange={(e) => setPriceThreshold(e.target.value)}
                      placeholder="e.g., 50000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Current Price: {currentPrice ? `$${currentPrice.toFixed(2)}` : 'Loading...'}
                  </p>
                  <button
                    className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    onClick={() => alert('Bot configured! Monitoring price...')}
                  >
                    Start Bot
                  </button>
                </>
              )}
            </>
          )}
          {feature.title === 'AI Investment Advisor' && (
            <>
              <select
                value={riskTolerance}
                onChange={(e) => setRiskTolerance(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>
              <div className="space-y-2">
                {getAdvisorRecommendations().map(({ coin, score, rationale }, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium">{coin.name} ({coin.symbol.toUpperCase()})</p>
                    <p className="text-sm text-gray-600">Score: {score.toFixed(0)}/100</p>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {rationale.map((reason, i) => <li key={i}>{reason}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}
          {feature.title === 'Real-time Sentiment Analytics' && (
            <>
              <select
                onChange={(e) => setSelectedCoin(availableCoins.find(c => c.id === e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Coin</option>
                {availableCoins.map(coin => (
                  <option key={coin.id} value={coin.id}>{coin.name}</option>
                ))}
              </select>
              {selectedCoin && (
                <>
                  <p className="text-lg font-medium">
                    Sentiment: {sentimentScore}% {sentimentScore > 50 ? 'Positive' : 'Negative'}
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm italic">"Great news for {selectedCoin.symbol.toUpperCase()} adoption!"</p>
                    <p className="text-xs text-gray-500">~Mock Twitter Post</p>
                  </div>
                </>
              )}
            </>
          )}
          {feature.title === 'Advanced Security' && (
            <>
              <p className="text-sm text-gray-600">
                Wallet: {account ? `${account.substring(0, 6)}...${account.substring(38)}` : 'Not connected'}
              </p>
              <p className="text-sm text-gray-600">Network: {provider ? 'Ethereum' : 'N/A'}</p>
              <button
                onClick={handleSecurityScan}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Run Security Scan
              </button>
              {scanResult && <p className="text-sm text-green-600">{scanResult}</p>}
            </>
          )}
          {feature.title === 'Predictive Analytics' && (
            <>
              <select
                onChange={(e) => setSelectedCoin(availableCoins.find(c => c.id === e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Coin</option>
                {availableCoins.map(coin => (
                  <option key={coin.id} value={coin.id}>{coin.name}</option>
                ))}
              </select>
              {prediction && <p className="text-lg font-medium">{prediction}</p>}
            </>
          )}
          {feature.title === 'Automated Yield Farming' && (
            <>
              <select
                onChange={(e) => setSelectedCoin(availableCoins.find(c => c.id === e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Coin</option>
                {availableCoins.map(coin => (
                  <option key={coin.id} value={coin.id}>{coin.name}</option>
                ))}
              </select>
              {selectedCoin && (
                <>
                  <button
                    onClick={handleYieldSelection}
                    className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Find Yield Opportunities
                  </button>
                  {yieldProtocol && (
                    <p className="text-sm text-green-600">{yieldProtocol}</p>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureModal;