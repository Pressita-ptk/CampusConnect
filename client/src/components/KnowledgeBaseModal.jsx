import React, { useState } from 'react';
import { 
  X, 
  BookMarked, 
  ShieldCheck, 
  CreditCard, 
  Home, 
  Calendar, 
  BookOpen, 
  FileText,
  Clock,
  Phone,
  AlertCircle
} from 'lucide-react';

export default function KnowledgeBaseModal({ isOpen, onClose, categories = [] }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('divisions');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-900 via-blue-900 to-indigo-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/30 border border-blue-400/40 flex items-center justify-center text-blue-300">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading">
                Presidency University Authoritative Knowledge Base
              </h3>
              <p className="text-xs text-blue-200">
                Official Student Handbook (2025-26) & Academic Calendar (2026-27)
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

        {/* Tab Navigation */}
        <div className="bg-slate-100 border-b border-slate-200 px-5 pt-2 flex flex-wrap gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('divisions')}
            className={`px-3 py-2 rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'divisions'
                ? 'bg-white text-blue-700 border-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>8 Divisions</span>
          </button>
          <button
            onClick={() => setActiveTab('fees')}
            className={`px-3 py-2 rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'fees'
                ? 'bg-white text-blue-700 border-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
            <span>Fees & Refund Policy</span>
          </button>
          <button
            onClick={() => setActiveTab('hostel')}
            className={`px-3 py-2 rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'hostel'
                ? 'bg-white text-blue-700 border-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-rose-500" />
            <span>Hostel & Housing</span>
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-3 py-2 rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'calendar'
                ? 'bg-white text-blue-700 border-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-purple-600" />
            <span>Academic Calendar 2026-27</span>
          </button>
          <button
            onClick={() => setActiveTab('library_admin')}
            className={`px-3 py-2 rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'library_admin'
                ? 'bg-white text-blue-700 border-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-600" />
            <span>Library & Certificates</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto p-6 space-y-4 flex-1">
          {/* Tab 1: 8 Divisions */}
          {activeTab === 'divisions' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 p-3 rounded-2xl flex items-start gap-2.5 text-xs text-blue-900">
                <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <p>Official core policy statements for all eight university service divisions.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <div key={cat.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${cat.badgeColor}`}>
                        {cat.title}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono uppercase">Official</span>
                    </div>
                    <p className="text-xs font-medium text-slate-800 leading-relaxed bg-white p-3 rounded-xl border border-slate-100 italic">
                      "{cat.officialStatement}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Fees & Refund Policy */}
          {activeTab === 'fees' && (
            <div className="space-y-4 text-xs text-slate-700">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-2">
                <h4 className="font-bold text-sm text-emerald-950 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  Section 17.1: University Fee Policy & Payment Modes
                </h4>
                <p>• <strong>Annual Basis:</strong> Charged annually in advance for the concerned academic year (not semester-based).</p>
                <p>• <strong>Two Instalments:</strong> Facilitated in 2 instalments (1st in <strong>June</strong>, 2nd in <strong>November</strong>).</p>
                <p>• <strong>Accepted Modes:</strong> Cash, Bank Demand Draft, Net Banking, Credit/Debit Card.</p>
                <p className="text-rose-700 font-semibold">• <strong>Notice:</strong> CHEQUES ARE STRICTLY NOT ACCEPTED by the University.</p>
                <p>• <strong>Security Deposit:</strong> Refunded upon course completion or formal withdrawal after adjusting dues.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3">
                <h4 className="font-bold text-sm text-slate-900">UGC-Aligned Fee Refund Matrix (Admission Withdrawal)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-300 text-slate-500 font-bold uppercase text-[10px]">
                        <th className="py-2">Refund %</th>
                        <th className="py-2">Timeline of Withdrawal Notice</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr><td className="py-2 font-bold text-emerald-600">100%</td><td className="py-2">15 days or more before formally notified last date of admission</td></tr>
                      <tr><td className="py-2 font-bold text-emerald-600">90%</td><td className="py-2">Less than 15 days before formally notified last date of admission</td></tr>
                      <tr><td className="py-2 font-bold text-amber-600">80%</td><td className="py-2">15 days or less after formally notified last date of admission</td></tr>
                      <tr><td className="py-2 font-bold text-amber-600">50%</td><td className="py-2">30 days or less (but &gt;15 days) after formally notified last date of admission</td></tr>
                      <tr><td className="py-2 font-bold text-rose-600">0%</td><td className="py-2">More than 30 calendar days after commencement (caution deposit only refunded)</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-slate-500 italic mt-2">
                  * Processing fee: Up to 5% of value, max Rs. 5,000. Refunds sent via NEFT to parent's bank within 30 days.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Hostel & Housing */}
          {activeTab === 'hostel' && (
            <div className="space-y-4 text-xs text-slate-700">
              <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl space-y-2">
                <h4 className="font-bold text-sm text-rose-950 flex items-center gap-2">
                  <Home className="w-4 h-4 text-rose-600" />
                  Section 17.9: University Hostel & Housing Regulations
                </h4>
                <p>• <strong>Separate Hostels:</strong> Dedicated hostels for boys and girls with affordable in-house mess facilities.</p>
                <p>• <strong>Allotment:</strong> Granted on a first-come-first-serve basis for odd and even semesters.</p>
                <p>• <strong>Local Guardian:</strong> Nomination of a reliable local guardian is mandatory for admission.</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-1.5 text-amber-900">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Mandatory 75% Attendance Requirement</span>
                </div>
                <p>
                  Hostellers must maintain a minimum <strong>75% attendance</strong> in all courses registered. If attendance falls below 75% at the end of the semester, the hostel facility will be <strong>withdrawn immediately for the next semester</strong>.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
                <h4 className="font-bold text-sm text-slate-900">Key Housing Administration Contacts</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900">Dr. Syed Shoukath Ali</p>
                    <p className="text-slate-500">Director, Student Housing</p>
                    <p className="font-mono text-blue-600 mt-1">📞 8050643902</p>
                    <p className="text-slate-500 font-mono text-[11px]">✉️ shoukathali@presidencyuniversity.in</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900">Ms. Zareena Ali</p>
                    <p className="text-slate-500">Residence Officer, Girls Hostel</p>
                    <p className="font-mono text-blue-600 mt-1">📞 9148572609</p>
                    <p className="text-slate-500 font-mono text-[11px]">✉️ zareena.ali@presidencyuniversity.in</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Academic Calendar 2026-27 */}
          {activeTab === 'calendar' && (
            <div className="space-y-4 text-xs text-slate-700">
              <div className="bg-purple-50 border border-purple-200 p-4 rounded-2xl space-y-2">
                <h4 className="font-bold text-sm text-purple-950 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  Academic Calendar 2026-27 Key Dates
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-white p-3 rounded-xl border border-purple-100">
                    <span className="font-bold text-purple-900 block">Odd Semester Mid-Terms:</span>
                    <span className="text-slate-700">5th Oct 2026 (Mon) to 9th Oct 2026 (Fri)</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-purple-100">
                    <span className="font-bold text-purple-900 block">Odd Semester End-Terms:</span>
                    <span className="text-slate-700">7th Dec 2026 (Mon) to 30th Dec 2026 (Wed)</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-purple-100">
                    <span className="font-bold text-purple-900 block">Make-Up Exams (Odd Sem):</span>
                    <span className="text-slate-700">8th Feb 2027 (Mon) to 19th Feb 2027 (Fri)</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-purple-100">
                    <span className="font-bold text-purple-900 block">Even Semester End-Terms:</span>
                    <span className="text-slate-700">24th May 2027 (Mon) to 12th June 2027 (Sat)</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
                <h4 className="font-bold text-sm text-slate-900">Major University Festivals & Events</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-2 bg-white rounded-lg border border-slate-200"><p className="font-bold text-blue-700">AARAMBH</p><p className="text-[10px] text-slate-500">29 Aug 2026</p></div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200"><p className="font-bold text-blue-700">Kal-Utsav</p><p className="text-[10px] text-slate-500">26 Sept 2026</p></div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200"><p className="font-bold text-blue-700">UDAAN Sports</p><p className="text-[10px] text-slate-500">16-19 Feb 2027</p></div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200"><p className="font-bold text-blue-700">Euphoria</p><p className="text-[10px] text-slate-500">24 Apr 2027</p></div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Library & Certificates */}
          {activeTab === 'library_admin' && (
            <div className="space-y-4 text-xs text-slate-700">
              <div className="bg-cyan-50 border border-cyan-200 p-4 rounded-2xl space-y-2">
                <h4 className="font-bold text-sm text-cyan-950 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-600" />
                  Library (LKRC) Rules & Fines (Section 17.4)
                </h4>
                <p>• <strong>Borrowing Period:</strong> 15 days per book (renewable twice if not reserved).</p>
                <p>• <strong>Overdue Fines:</strong> Rs. 5/book/day for first 10 days; Rs. 10/book/day from 11th day.</p>
                <p>• <strong>Lost Book:</strong> 3x book price (if reported before due date); 5x cost if rare.</p>
                <p>• <strong>Timings:</strong> Mon-Sat 8:30 AM - 6:30 PM (extended to 8:00 PM during End-Terms).</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2">
                <h4 className="font-bold text-sm text-slate-900">Certificate Processing Turnaround (Section 18)</h4>
                <div className="space-y-2">
                  <div className="flex justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-semibold text-slate-800">Bonafide Certificate (Registrar's Office)</span>
                    <span className="font-bold text-emerald-600">1 Working Day</span>
                  </div>
                  <div className="flex justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-semibold text-slate-800">Academic Transcripts (Exam Dept)</span>
                    <span className="font-bold text-blue-600">2 Weeks</span>
                  </div>
                  <div className="flex justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-semibold text-slate-800">Duplicate Certificates (FIR + Affidavit)</span>
                    <span className="font-bold text-amber-600">2 Weeks</span>
                  </div>
                  <div className="flex justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-semibold text-slate-800">Degree Certificate before Convocation</span>
                    <span className="font-bold text-purple-600">2 Months</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>Trained on Presidency University Student Handbook 2025-26 & Academic Calendar 2026-27</span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm"
          >
            Close Knowledge Base
          </button>
        </div>
      </div>
    </div>
  );
}
