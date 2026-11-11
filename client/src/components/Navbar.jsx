import React from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  BookMarked, 
  FlaskConical, 
  Settings, 
  ShieldCheck, 
  Cpu
} from 'lucide-react';

export default function Navbar({ 
  onOpenKB, 
  onOpenTester, 
  onOpenSettings, 
  systemStatus 
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top University Branding Stripe */}
      <div className="bg-gradient-to-r from-navy-900 via-blue-900 to-indigo-950 text-white text-xs px-4 py-1.5 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2 font-medium tracking-wide">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-slate-100">PRESIDENCY UNIVERSITY</span>
          <span className="text-blue-300">|</span>
          <span className="text-slate-300 hidden sm:inline">SCHOOL OF COMPUTER SCIENCE & ENGINEERING</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-blue-200 font-mono">
          <span className="bg-blue-800/60 px-2 py-0.5 rounded border border-blue-700/50">
            TECHNOPIA 2.0 • 60-MIN CHALLENGE
          </span>
          <span className="hidden md:inline text-blue-300/80">LG07 CAMPUS</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo and App Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-900 font-heading">
                CAMPUS CONNECT
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                <Sparkles className="w-3 h-3 text-blue-600" />
                AI PORTAL
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Ask • Learn • Get Help • 24/7 University Support
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Status Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>
              {systemStatus?.hasApiKey ? 'Gemini 1.5 Flash' : 'Grounded AI Engine'}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>

          {/* Quick Knowledge Base Button */}
          <button
            onClick={onOpenKB}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-lg transition-all"
            title="View Official University Information"
          >
            <BookMarked className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">Official KB</span>
          </button>

          {/* Judge Test Suite Button */}
          <button
            onClick={onOpenTester}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-all shadow-sm"
            title="Judge & Evaluation Test Suite"
          >
            <FlaskConical className="w-4 h-4 text-indigo-600" />
            <span className="hidden md:inline">Judge Test Suite</span>
            <span className="md:hidden">Test</span>
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg border border-slate-200 transition-all"
            title="AI Model & Key Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Student Profile Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              ST
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-semibold text-slate-800 leading-tight">Student User</p>
              <p className="text-[10px] text-slate-500">B.Tech CSE</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
