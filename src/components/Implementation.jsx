import { TrendingUp, TrendingDown } from 'lucide-react';

const Ticker = ({ tickerItems, tickerError, onItemClick }) => {
  return (
    <div className="bg-gray-900 text-white py-2 overflow-hidden">
      <div className="animate-scroll flex space-x-8 whitespace-nowrap">
        {tickerError ? (
          <div className="text-gray-400">{tickerError}</div>
        ) : tickerItems.length > 0 ? (
          tickerItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 cursor-pointer hover:text-green-400 transition-colors"
              onClick={onItemClick}
            >
              <span className="font-medium">{item.symbol.toUpperCase()}</span>
              <span className="text-gray-300">
                ${item.current_price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className={`flex items-center space-x-1 ${item.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {item.price_change_percentage_24h >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span>{Math.abs(item.price_change_percentage_24h).toFixed(2)}%</span>
              </span>
            </div>
          ))
        ) : (
          <div className="text-gray-400">Loading market data...</div>
        )}
      </div>
      <style jsx>{`
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Ticker;