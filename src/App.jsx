import React, { useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';
import Header from './components/Header';
import Ticker from './components/Ticker';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import FeaturesSection from './components/FeaturesSection';
import CtaSection from './components/CtaSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import StockAnalyzer from './components/StockAnalyzer';
import FeatureModal from './components/FeatureModal';
import ErrorToast from './components/ErrorToast';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [networkId, setNetworkId] = useState(null);
  const [connectionError, setConnectionError] = useState('');
  const [provider, setProvider] = useState(null);
  const [tickerItems, setTickerItems] = useState([]);
  const [tickerError, setTickerError] = useState('');
  const [isAnalyzerOpen, setIsAnalyzerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  useEffect(() => {
    const fetchTickerData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,polkadot,binancecoin,cardano,ripple,polygon&order=market_cap_desc&per_page=8&page=1&sparkline=false&price_change_percentage=24h'
        );
        if (!response.ok) throw new Error('Failed to fetch market data');
        const data = await response.json();
        setTickerItems(data);
        setTickerError('');
      } catch (error) {
        console.error('Error fetching ticker data:', error);
        setTickerError('Failed to load market data.');
        setTickerItems([
          // Fallback data (same as original)
          { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', current_price: 102435.24, price_change_percentage_24h: 2.5, market_cap: 2000000000000, total_volume: 50000000000 },
          // ... other fallback coins
        ]);
      }
    };
    fetchTickerData();
    const interval = setInterval(fetchTickerData, 60000);
    return () => clearInterval(interval);
  }, []);

  const connectWallet = async () => {
    setConnectionError('');
    if (!window.ethereum) {
      setConnectionError('MetaMask not detected. Please install it.');
      return;
    }
    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      setWalletConnected(true);
      setProvider(provider);
      const network = await provider.getNetwork();
      setNetworkId(Number(network.chainId));
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    } catch (error) {
      setConnectionError(error.code === 4001 ? 'Wallet connection rejected.' : `Error: ${error.message}`);
      setWalletConnected(false);
      setAccount('');
      setNetworkId(null);
      setProvider(null);
    }
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setAccount('');
    setNetworkId(null);
    setConnectionError('');
    setProvider(null);
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setAccount(accounts[0]);
    }
  };

  const handleChainChanged = (chainId) => {
    setNetworkId(parseInt(chainId, 16));
  };

  const handleStartTrading = () => {
    if (walletConnected) {
      setIsAnalyzerOpen(true);
    } else {
      connectWallet();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Ticker
        tickerItems={tickerItems}
        tickerError={tickerError}
        onItemClick={handleStartTrading}
      />
      <Header
        walletConnected={walletConnected}
        account={account}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <HeroSection handleStartTrading={handleStartTrading} />
      <StatsSection />
      <FeaturesSection
        setSelectedFeature={setSelectedFeature}
        setIsFeatureModalOpen={setIsFeatureModalOpen}
      />
      <CtaSection handleStartTrading={handleStartTrading} />
      <HowItWorksSection />
      <TestimonialsSection />
      <AboutSection />
      <Footer />
      {connectionError && <ErrorToast message={connectionError} />}
      <StockAnalyzer
        isOpen={isAnalyzerOpen}
        onClose={() => setIsAnalyzerOpen(false)}
        availableCoins={tickerItems}
        account={account}
        provider={provider}
      />
      <FeatureModal
        isOpen={isFeatureModalOpen}
        onClose={() => {
          setIsFeatureModalOpen(false);
          setSelectedFeature(null);
        }}
        feature={selectedFeature || {}}
        availableCoins={tickerItems}
        account={account}
        provider={provider}
      />
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}

export default App;

// import React from 'react'
// import ChartComponent from './components/ChartComponent'

// const App = () => {
//   return (
//     <div style={{ height: '800vh', width: '100vw' }}>
//       <ChartComponent />
//     </div>
//   )
// }

// export default App