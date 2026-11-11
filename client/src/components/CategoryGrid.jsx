import React, { useState } from 'react';
import { 
  GraduationCap, 
  UserCheck, 
  FileText, 
  Briefcase, 
  BookOpen, 
  Home, 
  Building2, 
  Calendar,
  ChevronRight,
  HelpCircle,
  Sparkles,
  ArrowUpRight,
  Bot
} from 'lucide-react';

const ICON_MAP = {
  GraduationCap,
  UserCheck,
  FileText,
  Briefcase,
  BookOpen,
  Home,
  Building2,
  Calendar
};

// Fallback images map
const FALLBACK_IMAGES = {
  academics: '/images/cat-academics.jpg',
  attendance: '/images/cat-attendance.jpg',
  examinations: '/images/cat-examinations.jpg',
  placements: '/images/cat-placements.jpg',
  library: '/images/cat-library.jpg',
  hostel: '/images/cat-hostel.jpg',
  administration: '/images/cat-administration.jpg',
  events: '/images/cat-events.jpg'
};

export default function CategoryGrid({ categories = [], onSelectCategoryQuestion }) {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  const filteredCategories = activeCategoryFilter === 'all'
    ? categories
    : categories.filter(c => c.id === activeCategoryFilter);

  return (
    <div className="py-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Presidency University Campus Services
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            Official University Divisions
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Explore guidance across all 8 verified campus departments. Click any suggested question to consult the AI assistant.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveCategoryFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              activeCategoryFilter === 'all'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Divisions (8)
          </button>
          {categories.slice(0, 4).map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryFilter(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all hidden md:block ${
                activeCategoryFilter === cat.id
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 8 Service Category Cards with Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCategories.map((category) => {
          const IconComponent = ICON_MAP[category.icon] || HelpCircle;
          const imageSrc = category.image || FALLBACK_IMAGES[category.id] || '/images/presidency-campus-aerial.jpg';

          return (
            <div
              key={category.id}
              className="group relative bg-white rounded-3xl border border-slate-200 hover:border-blue-400 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Banner Header */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={imageSrc}
                    alt={`${category.title} at Presidency University`}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/presidency-campus-aerial.jpg';
                    }}
                  />
                  {/* Subtle dark gradient overlay over image for readable badges */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Top floating Icon & Category Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${category.color} text-white flex items-center justify-center shadow-md shadow-black/20 backdrop-blur-sm`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20 shadow-sm">
                      {category.title}
                    </span>
                  </div>

                  {/* Bottom title on image */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-blue-200">
                      Presidency University
                    </span>
                    <h3 className="text-lg font-bold text-white font-heading leading-tight flex items-center justify-between">
                      <span>{category.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-blue-200 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </h3>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5">
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Authoritative Information Block */}
                  <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 text-xs text-slate-700 mb-4 leading-relaxed">
                    <span className="font-bold text-slate-900 block mb-1 text-[11px] uppercase tracking-wider text-blue-900">
                      Authoritative Guidance:
                    </span>
                    <p className="italic text-slate-600">
                      "{category.officialStatement}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Suggested Questions Section */}
              <div className="px-5 pb-5 pt-0">
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-1">
                    <HelpCircle className="w-3 h-3 text-slate-400" />
                    Ask Campus Buddy:
                  </p>
                  <div className="space-y-1.5">
                    {category.suggestedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => onSelectCategoryQuestion(q)}
                        className="w-full text-left text-xs bg-slate-50/80 hover:bg-blue-50 text-slate-700 hover:text-blue-800 p-2.5 rounded-xl border border-transparent hover:border-blue-200 transition-all flex items-center justify-between group/btn"
                      >
                        <span className="truncate pr-1 font-medium">{q}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover/btn:text-blue-600 group-hover/btn:translate-x-0.5 transition-all flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
