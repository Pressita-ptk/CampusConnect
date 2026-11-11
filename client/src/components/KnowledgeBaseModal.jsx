import React from 'react';
import { 
  X, 
  BookMarked, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  GraduationCap,
  Sparkles
} from 'lucide-react';

export default function KnowledgeBaseModal({ isOpen, onClose, categories = [] }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-900 via-blue-900 to-indigo-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/30 border border-blue-400/40 flex items-center justify-center text-blue-300">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading">
                Authoritative Knowledge Base
              </h3>
              <p className="text-xs text-blue-200">
                Official Presidency University Ground Truth (TECHNOPIA 2.0)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Anti-hallucination banner */}
        <div className="bg-emerald-50 border-b border-emerald-100 px-5 py-3 flex items-start gap-3 text-xs text-emerald-900">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Strict Grounding & Zero Hallucination Guarantee:</p>
            <p className="text-emerald-800 mt-0.5">
              The AI assistant is strictly instructed to only answer using the 8 supplied statements below. It will never invent dates, fees, phone numbers, or administrative policies.
            </p>
          </div>
        </div>

        {/* Category List */}
        <div className="overflow-y-auto p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div 
                key={cat.id} 
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${cat.badgeColor}`}>
                    {cat.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono uppercase">
                    Official
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-800 leading-relaxed bg-white p-3 rounded-xl border border-slate-100 italic">
                  "{cat.officialStatement}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm"
          >
            Got it, return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
