import { Brain, Target, MessageSquare, Lock, BarChart2, Leaf, Play } from 'lucide-react';

const FeaturesSection = ({ setSelectedFeature, setIsFeatureModalOpen }) => {
  const features = [
    {
      icon: <Brain size={32} />,
      title: 'AI Smart Trading Bots',
      description: 'Our reinforcement learning algorithms continuously adapt to market conditions, recognizing patterns and making trades with precision timing.',
      action: () => setIsFeatureModalOpen(true),
    },
    {
      icon: <Target size={32} />,
      title: 'AI Investment Advisor',
      description: 'Receive personalized portfolio recommendations based on your risk tolerance, investment goals, and market conditions—all powered by neural networks.',
      action: () => setIsFeatureModalOpen(true),
    },
    {
      icon: <MessageSquare size={32} />,
      title: 'Real-time Sentiment Analytics',
      description: 'Our natural language processing models analyze thousands of social media posts, news articles, and forums to assess market sentiment and predict price movements.',
      action: () => setIsFeatureModalOpen(true),
    },
    {
      icon: <Lock size={32} />,
      title: 'Advanced Security',
      description: 'Institutional-grade security with multi-signature wallets, encrypted communications, and AI-based fraud detection systems.',
      action: () => setIsFeatureModalOpen(true),
    },
    {
      icon: <BarChart2 size={32} />,
      title: 'Predictive Analytics',
      description: 'Our proprietary machine learning models analyze historical data and market indicators to forecast potential price movements with high accuracy.',
      action: () => setIsFeatureModalOpen(true),
    },
    {
      icon: <Leaf size={32} />,
      title: 'Automated Yield Farming',
      description: 'Our algorithm automatically allocates assets to the highest-yielding DeFi protocols while managing risks and gas costs.',
      action: () => setIsFeatureModalOpen(true),
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful AI Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge AI algorithms with DeFi protocols to maximize your returns while minimizing risks.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-green-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <button
                onClick={() => {
                  setSelectedFeature(feature);
                  feature.action();
                }}
                className="flex items-center space-x-2 text-green-500 hover:text-green-600"
              >
                <Play size={16} />
                <span>Try It Now</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;