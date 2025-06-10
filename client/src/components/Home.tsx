import { useState, useEffect } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [visibleStats, setVisibleStats] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 800) setVisibleStats(true);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTimeline((prev) => (prev + 1) % 5);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const timeline = [
    { year: "1985", event: "Founded as First Digital Bank", icon: "🏦", desc: "Started with a vision to revolutionize banking" },
    { year: "1995", event: "First Online Banking Platform", icon: "💻", desc: "Pioneered internet banking services" },
    { year: "2005", event: "Mobile Banking Launch", icon: "📱", desc: "First bank to offer full mobile services" },
    { year: "2015", event: "AI Integration", icon: "🤖", desc: "Introduced AI-powered financial insights" },
    { year: "2024", event: "Quantum Security", icon: "🔮", desc: "Next-gen quantum encryption technology" }
  ];

  const achievements = [
    { number: "40", suffix: "Years", label: "of Innovation", icon: "🏆" },
    { number: "15M", suffix: "+", label: "Happy Customers", icon: "👥" },
    { number: "200", suffix: "+", label: "Countries Served", icon: "🌍" },
    { number: "99.99", suffix: "%", label: "Uptime Record", icon: "⚡" }
  ];

  const awards = [
    { title: "Best Digital Bank 2024", org: "Financial Times", icon: "🥇" },
    { title: "Innovation Award", org: "Banking Summit", icon: "💡" },
    { title: "Customer Choice", org: "TrustPilot", icon: "⭐" },
    { title: "Security Excellence", org: "CyberSec Awards", icon: "🛡️" }
  ];

  const testimonials = [
    { name: "Sarah Chen", role: "Tech Entrepreneur", text: "NeoBank's AI insights helped me grow my startup by 300%", avatar: "👩💼" },
    { name: "Marcus Johnson", role: "Investment Banker", text: "The most innovative banking platform I've ever used", avatar: "👨💼" },
    { name: "Elena Rodriguez", role: "Small Business Owner", text: "Their support turned my dream into a million-dollar business", avatar: "👩🚀" }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20"></div>
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle at ${20 + scrollY * 0.02}% ${30 + scrollY * 0.01}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at ${80 - scrollY * 0.01}% ${70 - scrollY * 0.02}%, rgba(147, 51, 234, 0.12) 0%, transparent 50%),
              radial-gradient(circle at ${50 + Math.sin(scrollY * 0.01) * 20}% ${50 + Math.cos(scrollY * 0.01) * 20}%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)
            `
          }}
        ></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
            </div>
          ))}
        </div>
      </div>

      

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-20 pb-32">
        <div className="max-w-7xl mx-auto text-center">
          <div 
            className="transform transition-all duration-1000"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <div className="text-6xl mb-8 animate-bounce">🏦</div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                40 Years
              </span>
              <br />
              of Innovation
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              From humble beginnings to global fintech leadership, discover the extraordinary journey 
              that transformed how the world thinks about banking.
            </p>
          </div>

          {/* Floating Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {achievements.map((stat, index) => (
              <div
                key={index}
                className={`transform transition-all duration-1000 ${
                  visibleStats ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="group p-6 rounded-3xl backdrop-blur-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-500 hover:scale-105">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-400">
                    {stat.number}<span className="text-purple-400">{stat.suffix}</span>
                  </div>
                  <div className="text-gray-400 mt-2">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="relative z-10 px-6 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Our
              <span className="block bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
            <p className="text-xl text-gray-400">Four decades of banking revolution</p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Central Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500"></div>
            
            <div className="space-y-20">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {/* Timeline Node */}
                  <div 
                    className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 transition-all duration-500 ${
                      activeTimeline === index 
                        ? 'bg-blue-400 border-blue-400 scale-150 shadow-lg shadow-blue-400/50' 
                        : 'bg-gray-800 border-gray-600'
                    }`}
                  ></div>

                  {/* Content */}
                  <div 
                    className={`w-5/12 ${index % 2 === 0 ? 'pr-16' : 'pl-16'}`}
                    onClick={() => setActiveTimeline(index)}
                  >
                    <div className={`group cursor-pointer p-8 rounded-3xl backdrop-blur-lg border transition-all duration-500 hover:scale-105 ${
                      activeTimeline === index 
                        ? 'border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-purple-500/10' 
                        : 'border-gray-800 bg-gray-900/20'
                    }`}>
                      <div className="text-6xl mb-4">{item.icon}</div>
                      <div className="text-2xl font-bold text-blue-400 mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold mb-3">{item.event}</h3>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Global
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Recognition
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {awards.map((award, index) => (
              <div
                key={index}
                className="group p-6 rounded-3xl backdrop-blur-lg border border-yellow-500/20 hover:border-yellow-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/10"
                style={{
                  background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.05), rgba(245, 158, 11, 0.05))'
                }}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {award.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-yellow-400">{award.title}</h3>
                <p className="text-gray-400 text-sm">{award.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Stories */}
      <section className="relative z-10 px-6 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Success
              <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Stories
              </span>
            </h2>
            <p className="text-xl text-gray-400">Real people, real transformations</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group p-8 rounded-3xl backdrop-blur-lg border border-gray-800 hover:border-green-500/50 transition-all duration-500 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(59, 130, 246, 0.05))'
                }}
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {testimonial.avatar}
                </div>
                <blockquote className="text-lg italic mb-6 text-gray-300">
                  "{testimonial.text}"
                </blockquote>
                <div>
                  <div className="font-semibold text-green-400">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Vision */}
      <section className="relative z-10 px-6 py-32 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-8xl mb-8">👨💼</div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Visionary Leadership
            </span>
          </h2>
          <blockquote className="text-2xl md:text-3xl text-gray-300 italic leading-relaxed mb-8">
            "We don't just follow financial trends — we create them. Our mission has always been 
            to democratize banking and make financial services accessible to everyone, everywhere."
          </blockquote>
          <div className="text-lg">
            <div className="font-semibold text-blue-400">Alex Rivera</div>
            <div className="text-gray-400">Founder & CEO</div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative overflow-hidden rounded-3xl p-12 backdrop-blur-lg border border-gray-800">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20"></div>
            
            <div className="relative z-10">
              <div className="text-6xl mb-6">🚀</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Be Part of
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Our Story
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join millions who've trusted us to transform their financial future. 
                Your success story starts here.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                  Join Our Legacy
                </button>
                <button className="px-10 py-4 border border-gray-600 rounded-full font-semibold text-lg hover:border-white transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-gray-800 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                NeoBank
              </div>
              <p className="text-gray-400 text-sm">
                Pioneering the future of banking since 1985. FDIC insured. Equal opportunity lender.
              </p>
            </div>
            
            {[
              { title: "Company", items: ["About Us", "Careers", "Press", "Investors"] },
              { title: "Support", items: ["Help Center", "Contact", "Security", "Status"] },
              { title: "Legal", items: ["Privacy", "Terms", "Compliance", "Accessibility"] }
            ].map((column, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4 text-blue-400">{column.title}</h4>
                <ul className="space-y-2">
                  {column.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            © 2024 NeoBank. Building financial futures since 1985.
          </div>
        </div>
      </footer>
    </div>
  );
}

