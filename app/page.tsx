
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showCopyMessage, setShowCopyMessage] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  // Apply theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('contactSubmission', JSON.stringify(formData));
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const copyLink = (link, product) => {
    navigator.clipboard.writeText(link);
    localStorage.setItem('lastClickedProduct', product);
    setShowCopyMessage(product);
    setTimeout(() => setShowCopyMessage(''), 2000);
  };

  const outfitProducts = [
    {
      id: 1,
      name: "Urban Street Collection",
      price: "$89.99",
      originalPrice: "$149.99",
      discount: "40% OFF",
      image: "https://readdy.ai/api/search-image?query=Trendy%20urban%20streetwear%20outfit%20with%20modern%20styling%2C%20young%20woman%20wearing%20contemporary%20casual%20fashion%2C%20clean%20studio%20photography%2C%20professional%20model%20pose%2C%20stylish%20street%20fashion%20look%20with%20accessories%2C%20minimalist%20aesthetic%2C%20high-quality%20fashion%20photography&width=400&height=600&seq=fashion001&orientation=portrait"
    },
    {
      id: 2,
      name: "Minimalist Chic Set",
      price: "$124.99",
      originalPrice: "$199.99",
      discount: "37% OFF",
      image: "https://readdy.ai/api/search-image?query=Elegant%20minimalist%20fashion%20outfit%2C%20sophisticated%20chic%20style%20clothing%2C%20clean%20lines%20and%20neutral%20colors%2C%20modern%20professional%20casual%20wear%2C%20timeless%20design%20aesthetic%2C%20studio%20photography%20with%20soft%20lighting%2C%20premium%20quality%20garments&width=400&height=600&seq=fashion002&orientation=portrait"
    },
    {
      id: 3,
      name: "Casual Trendy Outfit",
      price: "$79.99",
      originalPrice: "$129.99",
      discount: "38% OFF",
      image: "https://readdy.ai/api/search-image?query=Casual%20trendy%20everyday%20fashion%20outfit%2C%20comfortable%20yet%20stylish%20clothing%2C%20modern%20casual%20wear%20for%20young%20adults%2C%20versatile%20wardrobe%20pieces%2C%20contemporary%20fashion%20photography%2C%20natural%20lighting%20and%20clean%20background&width=400&height=600&seq=fashion003&orientation=portrait"
    },
    {
      id: 4,
      name: "Instagram-Ready Style",
      price: "$139.99",
      originalPrice: "$219.99",
      discount: "36% OFF",
      image: "https://readdy.ai/api/search-image?query=Instagram%20worthy%20fashion%20outfit%2C%20social%20media%20ready%20styling%2C%20trendy%20Gen%20Z%20fashion%20look%2C%20photogenic%20clothing%20ensemble%2C%20vibrant%20colors%20and%20modern%20cuts%2C%20influencer%20style%20fashion%20photography%2C%20eye-catching%20contemporary%20design&width=400&height=600&seq=fashion004&orientation=portrait"
    }
  ];

  const testimonials = [
    {
      name: "Emma K.",
      role: "Fashion Lover",
      text: "These outfits are Instagram gold! Got so many compliments and the quality is amazing!",
      image: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20satisfied%20customer%20Emma%20K%2C%20young%20fashionable%20woman%20smiling%2C%20clean%20white%20background%2C%20modern%20portrait%20photography%2C%20trendy%20Gen%20Z%20style%2C%20fashion%20customer%20testimonial%20style&width=60&height=60&seq=test002&orientation=squarish"
    },
    {
      name: "Sarah M.",
      role: "Verified Buyer",
      text: "PinealXT completely changed my focus and productivity. I feel sharper than ever!",
      image: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20satisfied%20customer%20Sarah%20M%2C%20young%20woman%20smiling%20confidently%2C%20clean%20white%20background%2C%20modern%20portrait%20photography%2C%20trustworthy%20appearance%2C%20wellness%20and%20health%20customer%20testimonial%20style&width=60&height=60&seq=test001&orientation=squarish"
    },
    {
      name: "Mike R.",
      role: "Happy Customer",
      text: "Fast shipping, great quality, and my brain feels amazing with PinealXT. Highly recommend both!",
      image: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20satisfied%20customer%20Mike%20R%2C%20young%20man%20smiling%20confidently%2C%20clean%20white%20background%2C%20modern%20portrait%20photography%2C%20trustworthy%20appearance%2C%20satisfied%20customer%20testimonial%20style&width=60&height=60&seq=test003&orientation=squarish"
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Advanced Sticky Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 shadow-2xl border-b border-gray-200/50 dark:border-gray-700/50' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="font-['Pacifico'] text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              logo
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#fashion" className="relative group font-semibold hover:text-purple-600 transition-all duration-300 cursor-pointer whitespace-nowrap">
                Fashion
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#supplements" className="relative group font-semibold hover:text-purple-600 transition-all duration-300 cursor-pointer whitespace-nowrap">
                Brain Boost
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="relative group font-semibold hover:text-purple-600 transition-all duration-300 cursor-pointer whitespace-nowrap">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              
              <button
                onClick={handleThemeToggle}
                className={`p-3 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer ${darkMode ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'}`}
              >
                <i className={`ri-${darkMode ? 'sun' : 'moon'}-line text-lg`}></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Ultra Advanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background with Particles */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 transition-all duration-1000"
            style={{
              backgroundImage: `url('https://readdy.ai/api/search-image?query=Beautiful%20fashionable%20young%20woman%20in%20trendy%20outfit%2C%20confident%20pose%2C%20stylish%20casual%20wear%2C%20modern%20fashion%20photography%2C%20professional%20portrait%2C%20attractive%20girl%20in%20contemporary%20clothing%2C%20clean%20composition%2C%20vibrant%20colors%2C%20fashion%20model%20aesthetic%2C%20trendy%20Gen%20Z%20style&width=1920&height=1080&seq=hero001&orientation=landscape')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-black/60 to-blue-900/80"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          
          {/* Advanced Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-70`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Advanced Geometric Shapes */}
          <div className="absolute top-20 left-10 w-20 h-20 border-2 border-purple-400/30 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-20 right-10 w-16 h-16 border-2 border-pink-400/30 rotate-45 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg animate-bounce"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          {/* Hero Content with Advanced Animations */}
          <div className="space-y-8 animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-black leading-tight uppercase tracking-wider">
              UNLOCK YOUR{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient-x font-black">
                STYLE
              </span>{' '}
              &{' '}
              <span className="bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 bg-clip-text text-transparent animate-gradient-x font-black">
                MIND
              </span>{' '}
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-gradient-x font-black">
                POWER
              </span>
            </h1>
            
            <p className="text-xl md:text-3xl font-bold uppercase max-w-4xl mx-auto leading-relaxed">
              TRANSFORM YOUR BRAIN PERFORMANCE AND ELEVATE YOUR FASHION GAME WITH OUR PREMIUM SELECTIONS ✨
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
              <a 
                href="#fashion" 
                className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-10 py-5 rounded-full text-xl font-black transition-all duration-300 hover:scale-110 hover:shadow-2xl transform cursor-pointer whitespace-nowrap uppercase overflow-hidden"
              >
                <span className="relative z-10">SHOP TRENDY OUTFITS 🔥</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a 
                href="#supplements" 
                className="group relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white px-10 py-5 rounded-full text-xl font-black transition-all duration-300 hover:scale-110 hover:shadow-2xl transform cursor-pointer whitespace-nowrap uppercase overflow-hidden"
              >
                <span className="relative z-10">BOOST MY BRAIN NOW 🧠</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
            
            <div className="flex justify-center space-x-12 mt-16">
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 cursor-pointer">
                  <i className="ri-brain-line text-3xl text-white"></i>
                </div>
                <p className="font-bold uppercase">Brain Power</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 cursor-pointer">
                  <i className="ri-shirt-line text-3xl text-white"></i>
                </div>
                <p className="font-bold uppercase">Style</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 cursor-pointer">
                  <i className="ri-star-fill text-3xl text-white"></i>
                </div>
                <p className="font-bold uppercase">Success</p>
              </div>
            </div>
          </div>
          
          {/* Advanced Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center animate-bounce">
              <span className="text-sm font-semibold mb-2 uppercase">Scroll Down</span>
              <i className="ri-arrow-down-line text-3xl"></i>
            </div>
          </div>
        </div>

        {/* Custom CSS for Advanced Animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-20px) rotate(120deg); }
            66% { transform: translateY(-10px) rotate(240deg); }
          }
          
          @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-spin-slow {
            animation: spin 8s linear infinite;
          }
          
          .animate-gradient-x {
            animation: gradient-x 3s ease infinite;
            background-size: 200% 200%;
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 1s ease-out;
          }
        `}</style>
      </section>

      {/* Advanced Fashion Section */}
      <section id="fashion" className={`py-24 ${darkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-white to-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-bold text-lg uppercase tracking-widest">Premium Collection</span>
            <h2 className="text-5xl md:text-6xl font-black mt-4 mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              FASHION REVOLUTION ✨
            </h2>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Instagram-worthy fashion that defines your Gen Z style and makes you stand out from the crowd
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {outfitProducts.map((product, index) => (
              <div key={product.id} className={`group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 ${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'}`}>
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                    {product.discount}
                  </span>
                </div>
                
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-black mb-3 group-hover:text-purple-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-3xl font-black bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                      {product.price}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {product.originalPrice}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Premium quality materials with modern design. Perfect for casual outings, Instagram photos, and expressing your unique style. Each piece is carefully selected to match current fashion trends.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
     
