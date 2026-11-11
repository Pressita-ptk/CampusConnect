import React from 'react';
import { 
  X, 
  FlaskConical, 
  Play, 
  CheckCircle2, 
  HelpCircle, 
  AlertTriangle,
  Sparkles,
  Info
} from 'lucide-react';

export default function QuickTesterModal({ isOpen, onClose, onRunTestQuery }) {
  if (!isOpen) return null;

  const testCases = [
    {
      id: 1,
      category: 'Academics',
      question: 'Whom should I contact for academic problems?',
      expected: 'Suggest contacting the faculty advisor.',
      badge: 'Mandatory',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    {
      id: 2,
      category: 'Examinations',
      question: 'Where can I find the examination timetable?',
      expected: 'Refer to official university channels.',
      badge: 'Mandatory',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200'
    },
    {
      id: 3,
      category: 'Placements',
      question: 'Whom should I contact for placement training?',
      expected: 'Suggest contacting the Placement Department.',
      badge: 'Mandatory',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200'
    },
    {
      id: 4,
      category: 'Hostel',
      question: 'How can I raise a hostel complaint?',
      expected: 'Refer to Hostel Administration.',
      badge: 'Mandatory',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200'
    },
    {
      id: 5,
      category: 'Unknown / Anti-Hallucination',
      question: 'What is the exact date of my next examination?',
      expected: 'State that the date is unavailable in the supplied data. Do not make up a date.',
      badge: 'Evaluation Test',
      badgeColor: 'bg-red-100 text-red-800 border-red-200'
    },
    {
      id: 6,
      category: 'Attendance Norms',
      question: 'What is the minimum attendance requirement?',
      expected: 'Follow the minimum attendance requirement prescribed by university regulations.',
      badge: 'Standard KB',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    },
    {
      id: 7,
      category: 'Out of Scope',
      question: 'What is the capital of Australia?',
      expected: 'Politely explain that answer is not in the supplied university data.',
      badge: 'Guardrail Test',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-200'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center text-indigo-300">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading">
                Judge & Evaluation Test Suite
              </h3>
              <p className="text-xs text-blue-200">
                Official queries from Presidency University Problem Statement (Section 5)
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

        {/* Notice */}
        <div className="bg-blue-50 border-b border-blue-100 px-5 py-3 flex items-start gap-3 text-xs text-blue-900">
          <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p>
            Click <strong className="font-semibold">Run Test</strong> on any test case to automatically send the query to the AI and inspect how it handles intent recognition and anti-hallucination rules.
          </p>
        </div>

        {/* Test List */}
        <div className="overflow-y-auto p-5 space-y-3.5">
          {testCases.map((tc) => (
            <div
              key={tc.id}
              className="p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50/40 border border-slate-200 hover:border-indigo-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${tc.badgeColor}`}>
                    {tc.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Case #{tc.id}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  "{tc.question}"
                </p>
                <p className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Expected:</span> {tc.expected}
                </p>
              </div>

              <button
                onClick={() => {
                  onRunTestQuery(tc.question);
                  onClose();
                }}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all flex-shrink-0"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Test</span>
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
