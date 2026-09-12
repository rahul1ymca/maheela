import React, { useState } from 'react';
import { ListFilter, ChevronDown, ChevronUp, Clock, Bookmark } from 'lucide-react';
import { TOCItem, Language } from '../types';

interface TableOfContentsProps {
  items: TOCItem[];
  activeId: string;
  language: Language;
  onSelectSection: (id: string) => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  activeId,
  language,
  onSelectSection,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <nav
      id="table-of-contents"
      aria-label="Table of Contents"
      className="my-6 rounded-xl border border-amber-200/70 bg-gradient-to-br from-amber-50/70 via-white to-amber-50/40 p-4 sm:p-6 shadow-xs"
    >
      <div className="flex items-center justify-between pb-3 border-b border-amber-100">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-amber-500 text-white flex items-center justify-center">
            <ListFilter className="h-4 w-4" />
          </div>
          <h2 className="font-bold text-slate-900 text-base sm:text-lg">
            {language === 'hi' ? 'विषय सूची (Table of Contents)' : 'Table of Contents'}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 text-xs text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200">
            <Clock className="h-3.5 w-3.5 text-amber-600" />
            <span>{language === 'hi' ? '6 मिनट का वाचन' : '6 min read'}</span>
          </div>
          <button
            id="toggle-toc-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-md hover:bg-amber-100/70 text-slate-600 transition-colors"
            aria-expanded={isExpanded}
            aria-label="Toggle Table of Contents"
          >
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-3">
          <p className="text-xs text-slate-500 mb-2.5 flex items-center gap-1.5">
            <Bookmark className="h-3 w-3 text-amber-600" />
            {language === 'hi' 
              ? 'सीधे उस भाग पर जाने के लिए किसी भी विषय पर क्लिक करें:'
              : 'Click on any topic to jump directly to that section:'}
          </p>
          <ul className="space-y-1.5 text-sm">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id} className="transition-all">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectSection(item.id);
                    }}
                    className={`block py-1.5 px-2.5 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-amber-100/80 text-amber-950 font-bold border-l-3 border-amber-600'
                        : 'text-slate-700 hover:text-amber-800 hover:bg-amber-50/60 font-medium'
                    }`}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};
