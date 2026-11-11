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
  ArrowUpRight
} from 'lucide-react';

// Icon map helper
const ICON_MAP = {
  GraduationCap: GraduationCap,
  UserCheck: UserCheck,
  FileText: FileText,
  Briefcase: Briefcase,
  BookOpen: BookOpen,
  Home: Home,
  Building2: Building2,
  Calendar: Calendar
};

export default function CategoryGrid({ categories = [], onSelectCategoryQuestion }) {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  const filteredCategories = activeCategoryFilter === 'all'
    ? categories
    : categories.filter(c => c.id === activeCategoryFilter);

  return (
    <div className="py-8">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            University Services Directory
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
            Official Support Categories
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Select a service category below or click a suggested question to consult the AI assistant.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveCategoryFilter('all')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              activeCategoryFilter === 'all'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All (8)
          </button>
          {categories.slice(0, 4).map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryFilter(cat.id)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all hidden md:block ${
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

      {/* Grid of 8 Service Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredCategories.map((category) => {
          const IconComponent = ICON_MAP[category.icon] || HelpCircle;

          return (
            <div
              key={category.id}
              className="group relative bg-white rounded-2xl border border-slate-200 hover:border-blue-400/80 p-5 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Icon & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${category.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${category.badgeColor}`}>
                    {category.title}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors font-heading mb-1.5 flex items-center justify-between">
                  <span>{category.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                  {category.description}
                </p>

                {/* Authoritative Information Block */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 text-xs text-slate-700 mb-4 leading-relaxed">
                  <span className="font-semibold text-slate-900 block mb-1 text-[11px] uppercase tracking-wider">
                    Authoritative Policy:
                  </span>
                  <p className="italic text-slate-600">
                    "{category.officialStatement}"
                  </p>
                </div>
              </div>

              {/* Suggested Questions Section */}
              <div className="pt-2 border-t border-slate-100">
                <p className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 text-slate-400" />
                  Suggested Questions:
                </p>
                <div className="space-y-1.5">
                  {category.suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => onSelectCategoryQuestion(q)}
                      className="w-full text-left text-xs bg-slate-50/80 hover:bg-blue-50 text-slate-700 hover:text-blue-800 p-2 rounded-lg border border-transparent hover:border-blue-200 transition-all flex items-center justify-between group/btn"
                    >
                      <span className="truncate pr-1">{q}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover/btn:text-blue-600 group-hover/btn:translate-x-0.5 transition-all flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
