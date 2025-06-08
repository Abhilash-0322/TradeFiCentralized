const AboutSection = () => {
  const team = [
    { name: "Dr. Julia Kim", role: "CEO & Head of AI Research" },
    { name: "Marcus Johnson", role: "CTO & Blockchain Expert" },
    { name: "Elena Petrova", role: "Head of Trading Strategies" },
    { name: "David Wong", role: "Chief Security Officer" },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About DeFiAI
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Founded in 2023, DeFiAI was created to democratize access to sophisticated trading algorithms previously available only to institutional investors.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our team combines expertise in artificial intelligence, blockchain technology, and traditional finance to build a platform that leverages the best of all these fields.
            </p>
            <p className="text-lg text-gray-600">
              Our mission is to provide individual investors with institutional-grade AI tools that maximize returns while minimizing risks in volatile cryptocurrency markets.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">{member.name}</h4>
                <p className="text-gray-600 text-xs">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;