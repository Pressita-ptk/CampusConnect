import React from 'react';
import { GraduationCap, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Footer({ onOpenKB, onOpenTester }) {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-slate-800">
          {/* Column 1: Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-white font-bold text-base font-heading">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span>CAMPUS CONNECT</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              AI-Powered University Campus Helpdesk created for TECHNOPIA 2.0 Build It in 60 Minutes development challenge.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-blue-400">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>School of Computer Science & Engineering</span>
            </div>
          </div>

          {/* Column 2: Supported Categories */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3 uppercase tracking-wider text-[11px]">
              Supported Knowledge Domains
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-slate-400 text-xs">
              <span className="hover:text-white transition-colors">• Academics</span>
              <span className="hover:text-white transition-colors">• Attendance</span>
              <span className="hover:text-white transition-colors">• Examinations</span>
              <span className="hover:text-white transition-colors">• Placements</span>
              <span className="hover:text-white transition-colors">• Library</span>
              <span className="hover:text-white transition-colors">• Hostel</span>
              <span className="hover:text-white transition-colors">• Administration</span>
              <span className="hover:text-white transition-colors">• Events</span>
            </div>
          </div>

          {/* Column 3: Trust & Safety */}
          <div className="space-y-3">
            <h4 className="text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              Trust & Verification
            </h4>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Anti-Hallucination Safe</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Responses are strictly grounded in official university regulations. Out-of-scope and unknown queries are politely handled without inventing facts.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onOpenKB}
                className="text-xs text-blue-400 hover:text-blue-300 underline underline-offset-4"
              >
                View Knowledge Base
              </button>
              <span className="text-slate-600">•</span>
              <button
                onClick={onOpenTester}
                className="text-xs text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
              >
                Judge Test Suite
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 Presidency University • TECHNOPIA 2.0 • LG07 Venue</p>
          <div className="flex items-center gap-1">
            <span>Built with React, Express & Google Gemini AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
