import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Bot,
  ShieldCheck,
  MapPin,
  Image as ImageIcon,
  MessageSquare
} from 'lucide-react';

export default function HeroSection({ onSubmitQuery, onSelectSuggestedQuery }) {
  const [searchInput, setSearchInput] = useState('');
  const [greeting, setGreeting] = useState('Welcome');
  const [bgIndex, setBgIndex] = useState(0);

  // Background photos supplied by Presidency University
  const heroBackgrounds = [
    {
      url: '/images/presidency-campus-aerial.jpg',
      label: 'Campus Aerial & Central Fountain'
    },
    {
      url: '/images/presidency-campus-gate.jpg',
      label: 'Main University Entrance Gate'
    }
  ];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    onSubmitQuery(searchInput.trim());
    setSearchInput('');
  };

  const sampleChips = [
    { text: 'Whom should I contact for academic problems?', category: 'Academics' },
    { text: 'Where can I find the examination timetable?', category: 'Examinations' },
    { text: 'Whom should I contact for placement training?', category: 'Placements' },
    { text: 'How can I raise a hostel complaint?', category: 'Hostel' },
    { text: 'What is the exact date of my next examination?', category: 'Edge Test' },
    { text: 'Who are you?', category: 'Conversational' }
  ];

  return (
    <section className="relative overflow-hidden py-14 sm:py-20 text-white min-h-[540px] flex items-center justify-center">
      {/* Background Image Layer with smooth fade */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 transform scale-105"
        style={{ backgroundImage: `url(${heroBackgrounds[bgIndex].url})` }}
      />

      {/* Subtle Dark Glassmorphism Gradient Overlay to ensure crisp text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-navy-950/75 to-slate-950/90 backdrop-blur-[2px]" />

      {/* Decorative radial lighting */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* View Switcher Pill (Top Right of Hero) */}
      <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-2">
        <button
          onClick={() => setBgIndex(prev => (prev === 0 ? 1 : 0))}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-[11px] text-slate-200 transition-all shadow-md"
          title="Switch campus view"
        >
          <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
          <span>View: {heroBackgrounds[bgIndex].label}</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-3xl mx-auto">
          {/* Authentic Presidency University Location Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-200 mb-4 animate-fade-in shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <MapPin className="w-3.5 h-3.5 text-blue-300" />
            <span>Presidency University, Bengaluru • {greeting}, Student! 👋</span>
          </div>

          {/* Main Title & Catchphrase */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight mb-4 drop-shadow-md">
            CAMPUS <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">CONNECT</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-200 font-medium max-w-2xl mx-auto mb-8 drop-shadow">
            Study Smart... Get Help Instantly! Your verified AI assistant for academics, examinations, placements, hostel & campus life.
          </p>

          {/* Prominent AI Search / Query Bar */}
          <form 
            onSubmit={handleSubmit}
            className="relative max-w-2xl mx-auto shadow-2xl shadow-blue-900/30 rounded-2xl bg-white/95 backdrop-blur-md p-2 border-2 border-blue-400/50 hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-400/20 transition-all text-slate-800"
          >
            <div className="flex items-center gap-3 px-3">
              <div className="p-2.5 rounded-xl bg-blue-600 text-white flex-shrink-0 shadow-md">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Ask your university question in natural language... (e.g. Whom should I contact for academic problems?)"
                className="w-full text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-transparent outline-none font-medium py-2"
              />
              <button
                type="submit"
                disabled={!searchInput.trim()}
                className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-md shadow-blue-600/30 transition-all"
              >
                <span>Ask AI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Query Suggestion Chips */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-2">
            <span className="text-xs font-semibold text-blue-200 flex items-center gap-1 mr-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Popular questions:
            </span>
            {sampleChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectSuggestedQuery(chip.text)}
                className="text-xs bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl border border-white/15 hover:border-blue-300/40 transition-all shadow-sm flex items-center gap-1.5 group"
              >
                <span className="truncate max-w-[220px] sm:max-w-none">{chip.text}</span>
                <span className="text-[10px] uppercase font-bold text-blue-300 group-hover:text-amber-300">
                  {chip.category}
                </span>
              </button>
            ))}
          </div>

          {/* Trust & Capability Badges */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-xs font-medium text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>8 Official Campus Divisions</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>100% Grounded (Anti-Hallucination)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>Natural Conversational Dialogue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Powered by Google Gemini</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
