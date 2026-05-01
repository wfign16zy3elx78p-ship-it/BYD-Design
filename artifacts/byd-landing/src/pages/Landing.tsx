import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { 
  Search, Globe, User, Menu, X, ChevronRight, ChevronLeft, 
  Cpu, Zap, CheckCircle2, Smartphone, Music, Thermometer, 
  Sun, MessageCircle, MapPin, Search as SearchIcon, Minus, Plus, Navigation
} from "lucide-react";
import { Link } from "wouter";

// Fallback image if needed
import heroFallback from "@assets/image_1777650465679.png";

const NAV_LINKS = ["Vehicles", "Energy", "Charging", "Discover", "Shop", "Support"];
const HAMBURGER_LINKS = ["Vehicles", "Energy", "Charging", "Discover", "Shop", "Support"];
const REGION_OPTIONS = ["United States"];

const MODELS = [
  {
    id: "seal",
    name: "BYD Seal",
    series: "Ocean Series | Sport Sedan",
    price: "$45,900",
    range: "570km",
    power: "230kW",
    acceleration: "3.8s",
    image: "/seal.png"
  },
  {
    id: "tang",
    name: "BYD Tang",
    series: "Dynasty Series | 7-Seat SUV",
    price: "$72,900",
    range: "505km",
    power: "360kW",
    acceleration: "4.6s",
    image: "/tang.png"
  },
  {
    id: "atto3",
    name: "BYD Atto 3",
    series: "Ocean Series | Compact SUV",
    price: "$38,990",
    range: "420km",
    power: "150kW",
    acceleration: "7.3s",
    image: "/atto3.png"
  },
  {
    id: "dolphin",
    name: "BYD Dolphin",
    series: "Ocean Series | Hatchback",
    price: "$29,990",
    range: "427km",
    power: "130kW",
    acceleration: "7.0s",
    image: "/dolphin.png"
  },
  {
    id: "han",
    name: "BYD Han",
    series: "Dynasty Series | Executive Sedan",
    price: "$54,900",
    range: "605km",
    power: "380kW",
    acceleration: "3.9s",
    image: "/han.png"
  }
];

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();
  const scrollTo = (index: number) => emblaApi && emblaApi.scrollTo(index);

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#1A2332] font-sans pb-[64px]">
      
      {/* 1. Navigation */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 h-[56px] flex items-center ${
          scrolled ? "bg-white/85 backdrop-blur-md shadow-sm" : "bg-transparent text-white"
        }`}
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-widest uppercase cursor-pointer" style={{ color: scrolled ? "#1A2332" : "white" }}>
            BYD
          </div>
          
{/* Desktop Nav - Show all links including Support */}
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            {NAV_LINKS.map(link => (
              <a 
                key={link} 
                href="#" 
                className="hover:opacity-70 transition-opacity"
                onClick={link === "Support" ? (e) => { e.preventDefault(); setHamburgerMenuOpen(!hamburgerMenuOpen); } : undefined}
              >
                {link}
              </a>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center gap-5">
            <button className="hover:opacity-70 transition-opacity" data-testid="btn-search"><Search size={20} /></button>
            <button className="hover:opacity-70 transition-opacity" data-testid="btn-region"><Globe size={20} /></button>
            <button className="hover:opacity-70 transition-opacity" data-testid="btn-account"><User size={20} /></button>
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="btn-mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

{/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-20 px-6 flex flex-col gap-6 text-[#1A2332] md:hidden"
          >
            {NAV_LINKS.map(link => (
              <a key={link} href="#" className="text-xl font-medium border-b border-gray-100 pb-4" onClick={() => setMobileMenuOpen(false)}>
                {link}
              </a>
            ))}
            
            {/* Region & Language for Mobile */}
            <div className="mt-auto border-t border-gray-100 pt-4">
              <div className="flex items-center gap-2 py-2">
                <Globe size={18} />
                <span className="text-sm">{REGION_OPTIONS[0]}</span>
                <ChevronRight size={14} />
              </div>
              <div className="flex items-center gap-2 py-2">
                <span className="text-sm">English</span>
                <ChevronRight size={14} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hamburger Menu Overlay */}
      <AnimatePresence>
        {hamburgerMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-[320px] bg-white shadow-xl pt-16 px-6 flex flex-col text-[#1A2332] hidden md:flex"
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 p-2"
              onClick={() => setHamburgerMenuOpen(false)}
            >
              <X size={24} />
            </button>
            
            {/* Menu Items with > */}
            <div className="flex flex-col gap-0">
              {HAMBURGER_LINKS.map((link, index) => (
                <a 
                  key={link} 
                  href="#" 
                  className="flex items-center justify-between py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  onClick={() => setHamburgerMenuOpen(false)}
                >
                  <span className="text-[15px] font-medium">{link}</span>
                  <ChevronRight size={18} className="text-gray-400" />
                </a>
              ))}
            </div>
            
            {/* Region & Language at bottom */}
            <div className="mt-auto border-t border-gray-100 pt-6 pb-6">
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2">
                  <Globe size={18} />
                  <span className="text-[14px]">{REGION_OPTIONS[0]}</span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-[14px]">English</span>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Hero Section */}
      <section className="relative h-[100vh] w-full flex flex-col items-center justify-end pb-24 md:pb-32 overflow-hidden bg-black">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/hero.png" 
            alt="BYD DM-i Super Hybrid" 
            className="w-full h-full object-cover object-center opacity-80"
            onError={(e) => { e.currentTarget.src = heroFallback }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
        </div>
        
        <div className="relative z-10 text-center flex flex-col items-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#0055D6] text-white text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wider"
          >
            1,000km total range
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[32px] md:text-[48px] font-semibold text-white mb-2 leading-tight"
          >
            DM-i Super Hybrid
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-[18px] text-white/80 mb-10 max-w-md font-light"
          >
            Efficiency Meets Performance
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button className="bg-[#0055D6] text-white px-8 py-3 rounded-md font-medium min-h-[44px] hover:brightness-110 transition-all duration-300 w-full sm:w-auto" data-testid="btn-hero-primary">
              Explore Technology
            </button>
            <button className="bg-transparent border border-white text-white px-8 py-3 rounded-md font-medium min-h-[44px] hover:bg-white/10 transition-all duration-300 w-full sm:w-auto" data-testid="btn-hero-secondary">
              Learn More
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex gap-2 mt-12"
          >
            {[0, 1, 2].map(i => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? "bg-white" : "bg-white/30"}`}></div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Model Showcase */}
      <section className="py-24 bg-[#F5F7FA] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-12 text-center">
          <FadeIn>
            <h2 className="text-[36px] font-semibold text-[#1A2332]">Explore the Lineup</h2>
          </FadeIn>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {MODELS.map((model, index) => (
                <div key={model.id} className="flex-[0_0_100%] md:flex-[0_0_80%] lg:flex-[0_0_70%] min-w-0 pl-4 pr-4 transition-transform duration-500">
                  <div className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 transform ${selectedIndex === index ? 'scale-100 opacity-100' : 'scale-95 opacity-50'}`}>
                    <div className="h-[300px] md:h-[500px] bg-[#F5F7FA] relative w-full flex items-center justify-center p-8">
                      <img src={model.image} alt={model.name} className="w-full h-full object-contain drop-shadow-2xl" />
                    </div>
                    <div className="p-8 text-center flex flex-col items-center">
                      <span className="text-sm font-medium text-[#0055D6] mb-2">{model.series}</span>
                      <h3 className="text-[28px] font-medium text-[#1A2332] mb-1">{model.name}</h3>
                      <p className="text-[#3C4554] mb-8">From {model.price}</p>
                      
                      <div className="grid grid-cols-3 gap-4 w-full max-w-md mx-auto mb-8 divide-x divide-gray-100">
                        <div className="flex flex-col items-center">
                          <span className="text-[20px] font-semibold text-[#1A2332]">{model.range}</span>
                          <span className="text-xs text-[#3C4554]">Range</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-[20px] font-semibold text-[#1A2332]">{model.power}</span>
                          <span className="text-xs text-[#3C4554]">Power</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-[20px] font-semibold text-[#1A2332]">{model.acceleration}</span>
                          <span className="text-xs text-[#3C4554]">0-100km/h</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                        <button className="bg-[#0055D6] text-white px-8 py-3 rounded-md font-medium min-h-[44px] hover:brightness-110 transition-all duration-300" data-testid={`btn-order-${model.id}`}>
                          Order Now
                        </button>
                        <button className="bg-transparent border-2 border-[#0055D6] text-[#0055D6] px-8 py-3 rounded-md font-medium min-h-[44px] hover:bg-[#F0F4FF] transition-all duration-300" data-testid={`btn-learn-${model.id}`}>
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-[#1A2332] hover:bg-gray-50 z-10 hidden md:flex"
            onClick={scrollPrev}
            data-testid="btn-carousel-prev"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-[#1A2332] hover:bg-gray-50 z-10 hidden md:flex"
            onClick={scrollNext}
            data-testid="btn-carousel-next"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="flex justify-center gap-2 mt-8">
          {MODELS.map((_, i) => (
            <button 
              key={i} 
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === selectedIndex ? "bg-[#0055D6] w-8" : "bg-gray-300"}`}
              onClick={() => scrollTo(i)}
              data-testid={`btn-dot-${i}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 4. Special Offers */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn delay={0.1}>
            <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500 border border-[#E5E7EB] flex flex-col h-full cursor-pointer">
              <div className="h-[250px] overflow-hidden">
                <img src="/offers-1.png" alt="Current Offers" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="text-xs font-semibold text-[#0055D6] mb-3 uppercase tracking-wider">Launch Incentives</div>
                <h3 className="text-[28px] font-semibold mb-3">Current Offers</h3>
                <p className="text-[#3C4554] mb-8 flex-grow">Explore limited-time offers on BYD vehicles including financing deals and trade-in bonuses.</p>
                <div className="mt-auto flex items-center text-[#0055D6] font-medium group-hover:translate-x-2 transition-transform duration-300">
                  Learn More <ChevronRight size={18} className="ml-1" />
                </div>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500 border border-[#E5E7EB] flex flex-col h-full cursor-pointer">
              <div className="h-[250px] overflow-hidden">
                <img src="/offers-2.png" alt="Community Heroes" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="text-xs font-semibold text-[#0055D6] mb-3 uppercase tracking-wider">Essential Workers Program</div>
                <h3 className="text-[28px] font-semibold mb-3">Community Heroes</h3>
                <p className="text-[#3C4554] mb-8 flex-grow">$1,000 off for healthcare workers, teachers, first responders, and military personnel.</p>
                <div className="mt-auto flex items-center text-[#0055D6] font-medium group-hover:translate-x-2 transition-transform duration-300">
                  Learn More <ChevronRight size={18} className="ml-1" />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 5. Advanced Technology */}
      <section className="py-24">
        {/* Section A */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-24">
          <div className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl shadow-lg border border-[#E5E7EB]">
            <div className="h-[400px] lg:h-[600px] overflow-hidden">
              <img src="/eplatform.png" alt="e-Platform 3.0" className="w-full h-full object-cover" />
            </div>
            <div className="bg-[#0A192F] text-white p-10 md:p-16 flex flex-col justify-center">
              <Cpu className="text-[#0055D6] w-10 h-10 mb-6" />
              <h2 className="text-[36px] font-semibold mb-2">e-Platform 3.0</h2>
              <p className="text-[18px] text-white/80 mb-10 font-light">Next-Generation Electric Architecture</p>
              
              <ul className="space-y-6 mb-12">
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-[#00A86B] mr-4 shrink-0" />
                  <span className="text-[15px] font-light">Cell-to-Body Technology maximizing structural rigidity</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-[#00A86B] mr-4 shrink-0" />
                  <span className="text-[15px] font-light">8-in-1 Electric Powertrain for ultimate efficiency</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-[#00A86B] mr-4 shrink-0" />
                  <span className="text-[15px] font-light">Ultra-Fast Charging Capability extending your journey</span>
                </li>
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#0055D6] text-white px-8 py-3 rounded-md font-medium hover:brightness-110 transition-all duration-300 text-center">
                  Explore e-Platform 3.0
                </button>
                <button className="bg-transparent border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-all duration-300 text-center">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section B */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl shadow-lg border border-[#E5E7EB]">
            <div className="bg-white p-10 md:p-16 flex flex-col justify-center order-2 lg:order-1">
              <Zap className="text-[#0055D6] w-10 h-10 mb-6" />
              <h2 className="text-[36px] font-semibold text-[#1A2332] mb-2">DM-i Super Hybrid</h2>
              <p className="text-[18px] text-[#3C4554] mb-10 font-light">Efficiency Meets Performance</p>
              
              <ul className="space-y-6 mb-12">
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-[#00A86B] mr-4 shrink-0" />
                  <span className="text-[15px] text-[#3C4554]">1,000km+ Total Range ending range anxiety forever</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-[#00A86B] mr-4 shrink-0" />
                  <span className="text-[15px] text-[#3C4554]">Dual Power System seamlessly switching modes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-[#00A86B] mr-4 shrink-0" />
                  <span className="text-[15px] text-[#3C4554]">Intelligent Energy Management optimizing fuel consumption</span>
                </li>
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#0055D6] text-white px-8 py-3 rounded-md font-medium hover:brightness-110 transition-all duration-300 text-center">
                  Explore DM-i
                </button>
                <button className="bg-transparent border-2 border-[#0055D6] text-[#0055D6] px-8 py-3 rounded-md font-medium hover:bg-[#F0F4FF] transition-all duration-300 text-center">
                  Learn More
                </button>
              </div>
            </div>
            <div className="h-[400px] lg:h-[600px] overflow-hidden order-1 lg:order-2">
              <img src="/engine.png" alt="DM-i Super Hybrid" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Safety */}
      <section className="relative h-[600px] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img src="/safety.jpg" alt="BYD Safety" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 md:px-12">
          <div className="max-w-xl">
            <FadeIn>
              <h2 className="text-[36px] md:text-[48px] font-semibold text-white mb-2 leading-tight">Travel Safer,<br/>Arrive Confident</h2>
              <p className="text-[18px] text-white/80 mb-10 font-light">DiPilot Advanced Driver Assistance Systems</p>
              
              <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-10">
                <div className="flex items-center text-white text-[15px]">
                  <CheckCircle2 className="w-5 h-5 text-[#00A86B] mr-3 shrink-0" /> Adaptive Cruise Control
                </div>
                <div className="flex items-center text-white text-[15px]">
                  <CheckCircle2 className="w-5 h-5 text-[#00A86B] mr-3 shrink-0" /> Lane Keeping Assist
                </div>
                <div className="flex items-center text-white text-[15px]">
                  <CheckCircle2 className="w-5 h-5 text-[#00A86B] mr-3 shrink-0" /> Auto Emergency Braking
                </div>
                <div className="flex items-center text-white text-[15px]">
                  <CheckCircle2 className="w-5 h-5 text-[#00A86B] mr-3 shrink-0" /> 360° Camera System
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-[#1A2332] px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-all duration-300">
                  View Safety Features
                </button>
                <button className="bg-transparent border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 7. Premium Features */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-[#E5E7EB]">
          <div className="h-[400px] lg:h-[600px]">
            <img src="/interior.jpg" alt="BYD Interior" className="w-full h-full object-cover" />
          </div>
          <div className="bg-[#F5F7FA] p-10 md:p-16 flex flex-col justify-center">
            <FadeIn>
              <h2 className="text-[36px] font-semibold text-[#1A2332] mb-2 leading-tight">Premium Features.<br/>Standard Equipment.</h2>
              <p className="text-[18px] text-[#3C4554] mb-12 font-light">Experience luxury without the upgrade cost.</p>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start">
                  <Smartphone className="w-8 h-8 text-[#0055D6] mr-5 shrink-0" />
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#1A2332]">Rotating Touchscreen Display</h4>
                    <p className="text-[15px] text-[#3C4554] mt-1">15.6" high-resolution intelligent hub</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Music className="w-8 h-8 text-[#0055D6] mr-5 shrink-0" />
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#1A2332]">Premium Sound System</h4>
                    <p className="text-[15px] text-[#3C4554] mt-1">Immersive 12-speaker surround audio</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Thermometer className="w-8 h-8 text-[#0055D6] mr-5 shrink-0" />
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#1A2332]">Heated & Ventilated Seats</h4>
                    <p className="text-[15px] text-[#3C4554] mt-1">Optimal year-round cabin comfort</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Sun className="w-8 h-8 text-[#0055D6] mr-5 shrink-0" />
                  <div>
                    <h4 className="text-[16px] font-semibold text-[#1A2332]">Panoramic Sunroof</h4>
                    <p className="text-[15px] text-[#3C4554] mt-1">Expansive open-air driving experience</p>
                  </div>
                </div>
              </div>
              
              <button className="bg-transparent border-2 border-[#0055D6] text-[#0055D6] px-8 py-3 rounded-md font-medium hover:bg-[#F0F4FF] transition-all duration-300 w-fit">
                Explore Interior
              </button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 8. Charging Network */}
      <section className="py-24 bg-white text-center px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto">
          <FadeIn>
            <h2 className="text-[36px] font-semibold text-[#1A2332] mb-4">Charging Network</h2>
            <p className="text-[18px] text-[#3C4554] max-w-2xl mx-auto mb-12">Power up effortlessly with seamless access to over 65,000 public charging points nationwide.</p>
            
            <div className="relative w-full h-[500px] bg-[#F5F7FA] rounded-2xl border border-[#E5E7EB] overflow-hidden mb-8 shadow-sm flex items-center justify-center">
              {/* Map Placeholder Visual */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#1A2332 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
              <MapPin className="w-16 h-16 text-[#0055D6] opacity-20" />
              
              <div className="absolute top-6 left-6 right-6 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[400px] bg-white rounded-lg shadow-md flex items-center p-2 z-10 border border-[#E5E7EB]">
                <SearchIcon className="w-5 h-5 text-gray-400 ml-2" />
                <input type="text" placeholder="Search by address or zip code..." className="flex-1 bg-transparent border-none outline-none px-3 text-[15px]" />
                <button className="bg-[#F5F7FA] hover:bg-gray-200 text-[#1A2332] p-2 rounded-md transition-colors">
                  <Navigation className="w-4 h-4" />
                </button>
              </div>
              
              <div className="absolute right-6 bottom-6 flex flex-col gap-2 z-10">
                <button className="w-10 h-10 bg-white rounded-md shadow-md flex items-center justify-center text-[#1A2332] hover:bg-gray-50 border border-[#E5E7EB]">
                  <Plus className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-white rounded-md shadow-md flex items-center justify-center text-[#1A2332] hover:bg-gray-50 border border-[#E5E7EB]">
                  <Minus className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-10 text-[#1A2332] font-medium">
              <div className="flex items-center">
                <Zap className="w-5 h-5 text-[#0055D6] mr-2" /> 50,000+ Compatible Fast Chargers
              </div>
              <div className="flex items-center">
                <Zap className="w-5 h-5 text-[#00A86B] mr-2" /> 15,000+ Destination Chargers
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#0055D6] text-white px-8 py-3 rounded-md font-medium hover:brightness-110 transition-all duration-300">
                View Network Map
              </button>
              <button className="bg-transparent border-2 border-[#0055D6] text-[#0055D6] px-8 py-3 rounded-md font-medium hover:bg-[#F0F4FF] transition-all duration-300">
                Learn More
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 9. Energy Solutions */}
      <section className="py-24 bg-[#F5F7FA] px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto text-center mb-16">
          <FadeIn>
            <h2 className="text-[36px] font-semibold text-[#1A2332]">Beyond the Vehicle</h2>
            <p className="text-[18px] text-[#3C4554] mt-2">Comprehensive energy solutions for a sustainable future.</p>
          </FadeIn>
        </div>
        
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-8">
          <FadeIn delay={0.1}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#E5E7EB] flex flex-col h-full">
              <div className="h-[300px] overflow-hidden">
                <img src="/energy.jpg" alt="Energy Storage Systems" className="w-full h-full object-cover" />
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-[28px] font-semibold text-[#1A2332] mb-2">Energy Storage Systems</h3>
                <p className="text-[16px] text-[#3C4554] mb-8">Power Your Business and Reduce Energy Costs</p>
                
                <div className="space-y-4 mb-10 flex-grow">
                  <div className="flex items-center text-[#1A2332] text-[15px]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0055D6] mr-3"></div> Commercial & Industrial
                  </div>
                  <div className="flex items-center text-[#1A2332] text-[15px]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0055D6] mr-3"></div> Grid-Scale Storage
                  </div>
                  <div className="flex items-center text-[#1A2332] text-[15px]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0055D6] mr-3"></div> Renewable Integration
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button className="bg-transparent border-2 border-[#1A2332] text-[#1A2332] px-6 py-2 rounded-md font-medium hover:bg-gray-50 transition-all duration-300">
                    Learn More
                  </button>
                  <button className="text-[#0055D6] font-medium hover:underline flex items-center px-2">
                    Discover <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#E5E7EB] flex flex-col h-full">
              <div className="h-[300px] overflow-hidden">
                <img src="/recycling.jpg" alt="Battery Recycling" className="w-full h-full object-cover" />
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-[28px] font-semibold text-[#1A2332] mb-2">Battery Recycling</h3>
                <p className="text-[16px] text-[#3C4554] mb-8">Closed-Loop Sustainability</p>
                
                <div className="space-y-4 mb-10 flex-grow">
                  <div className="flex items-center text-[#1A2332] text-[15px]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00A86B] mr-3"></div> 95% Material Recovery
                  </div>
                  <div className="flex items-center text-[#1A2332] text-[15px]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00A86B] mr-3"></div> Zero Waste Processing
                  </div>
                  <div className="flex items-center text-[#1A2332] text-[15px]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00A86B] mr-3"></div> Sustainable Sourcing
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button className="bg-transparent border-2 border-[#1A2332] text-[#1A2332] px-6 py-2 rounded-md font-medium hover:bg-gray-50 transition-all duration-300">
                    Learn More
                  </button>
                  <button className="text-[#0055D6] font-medium hover:underline flex items-center px-2">
                    Discover <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="bg-white pt-20 pb-10 px-6 md:px-12 border-t border-[#E5E7EB]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
            <div>
              <h4 className="font-semibold text-[#1A2332] mb-6">Vehicles</h4>
              <ul className="space-y-4 text-[14px] text-[#3C4554]">
                <li><a href="#" className="hover:text-[#0055D6] transition-colors">BYD Seal</a></li>
                <li><a href="#" className="hover:text-[#0055D6] transition-colors">BYD Tang</a></li>
                <li><a href="#" className="hover:text-[#0055D6] transition-colors">BYD Atto 3</a></li>
                <li><a href="#" className="hover:text-[#0055D6] transition-colors">BYD Dolphin</a></li>
                <li><a href="#" className="hover:text-[#0055D6] transition-colors">BYD Han</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#1A2332] mb-6">Technology</h4>
              <ul className="space-y-4 text-[14px] text-[#3C4554]">
                <li><a href="#" className="hover:text-[#0055D6] transition-colors">e-Platform 3.0</a></li>
                <li><a href="#" className="hover:text-[#0055D6] transition-colors">DM-i Super Hybrid</a></li>
                <li><a href="#" className="hover:text-[#0055D6] transition-colors">Blade Battery</a></li>
                <li><a href="#" className="hover:text-[#0055D6] transition-colors">DiPilot</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#1A2332] mb-6">Ownership</h4>
              <ul className="space-y-4 text-[14px] text-[#3C4554]">
                <li><a href="#" className="hover:text-[#0055D6] transition-colors">Charging Network</a></li>
                <li><a href="#" className="hover:text-[#0055D6] transition-colors">Warranty</a></li>
                <li><a href="#" className="hover:text-[#0055D6] transition-colors">Service Centers</a></li>
                <li><a href="#" className="hover:text-[#0055D6] transition-colors">Accessories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#1A2332] mb-6">Company</h4>
              <ul className="space-y-4 text-[14px] text-[#3C4554]">
                <li><a href="#" className="hover:text-[#0055D6] transition-colors">About BYD</a></li>
                <li><a href="#" className="hover:text-[#0055D6] transition-colors">Sustainability</a></li>
                <li><a href="#" className="hover:text-[#0055D6] transition-colors">Newsroom</a></li>
                <li><a href="#" className="hover:text-[#0055D6] transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#1A2332] mb-6">Support</h4>
              <ul className="space-y-4 text-[14px] text-[#3C4554]">
                <li><a href="#" className="hover:text-[#0055D6] transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-[#0055D6] transition-colors">Roadside Assistance</a></li>
                <li><a href="#" className="hover:text-[#0055D6] transition-colors">Recall Information</a></li>
                <li><a href="#" className="hover:text-[#0055D6] transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#E5E7EB] gap-4">
            <div className="text-[20px] font-bold tracking-widest text-[#1A2332]">BYD</div>
            <div className="flex gap-6 text-[13px] text-[#3C4554]">
              <a href="#" className="hover:text-[#1A2332]">Privacy & Legal</a>
              <a href="#" className="hover:text-[#1A2332]">Vehicle Recalls</a>
              <a href="#" className="hover:text-[#1A2332]">Cookies</a>
            </div>
            <div className="text-[13px] text-[#9CA3AF]">
              © {new Date().getFullYear()} BYD Motors Inc. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* 11. Persistent Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full h-[64px] bg-white border-t border-[#E5E7EB] z-50 px-6 flex items-center justify-between">
        <div className="max-w-[1440px] mx-auto w-full flex items-center justify-between">
          <button className="flex items-center text-[#3C4554] hover:text-[#1A2332] transition-colors" data-testid="btn-chat">
            <MessageCircle className="w-5 h-5 mr-3" />
            <span className="hidden sm:inline font-medium text-[15px]">Ask a question...</span>
          </button>
          
          <button className="bg-[#0055D6] text-white px-6 py-2 rounded-md font-medium text-sm hover:brightness-110 transition-all duration-300" data-testid="btn-test-drive">
            Schedule Test Drive
          </button>
        </div>
      </div>
      
    </div>
  );
}
