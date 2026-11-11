import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Zap, 
  Bot,
  ShieldCheck
} from 'lucide-react';

export default function HeroSection({ onSubmitQuery, onSelectSuggestedQuery }) {
  const [searchInput, setSearchInput] = useState('');
  const [greeting, setGreeting] = useState('Welcome');

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
    { text: 'What is the exact date of my next examination?', category: 'Examinations (Edge)' }
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-10 bg-gradient-to-b from-blue-50/70 via-slate-50 to-slate-50 border-b border-slate-200">
      {/* Decorative background glow circles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-10 right-10 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Friendly Greeting Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-200 shadow-sm text-xs font-semibold text-blue-900 mb-4 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
            <span>{greeting}, Student! 👋 Welcome to Campus Helpdesk</span>
          </div>

          {/* Main Title & Catchphrase */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight mb-3">
            Welcome to <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600 bg-clip-text text-transparent">Presidency University</span> Campus Helpdesk!
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto mb-6">
            Study Smart... Get Help Instantly! Your verified AI assistant for academics, exams, placements, hostel, and student services.
          </p>

          {/* Prominent AI Search / Query Bar */}
          <form 
            onSubmit={handleSubmit}
            className="relative max-w-2xl mx-auto shadow-xl shadow-blue-500/10 rounded-2xl bg-white p-2 border-2 border-blue-500/40 hover:border-blue-500 transition-all focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100"
          >
            <div className="flex items-center gap-3 px-3">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600 flex-shrink-0">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Ask your university question in natural language... (e.g., Whom should I contact for academic problems?)"
                className="w-full text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-transparent outline-none font-medium py-2"
              />
              <button
                type="submit"
                disabled={!searchInput.trim()}
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-md shadow-blue-600/20 transition-all"
              >
                <span>Ask AI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Suggested Quick Question Chips */}
          <div className="mt-5 flex flex-wrap justify-center items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Try asking:
            </span>
            {sampleChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectSuggestedQuery(chip.text)}
                className="text-xs bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-300 transition-all shadow-sm flex items-center gap-1.5 group"
              >
                <span className="truncate max-w-[220px] sm:max-w-none">{chip.text}</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-blue-500">
                  {chip.category}
                </span>
              </button>
            ))}
          </div>

          {/* Feature Highlights Pills */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>8 Official Campus Services</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>100% Grounded (Zero Hallucinations)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Instant AI Responses</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-indigo-600" />
              <span>Context-Aware Conversations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
