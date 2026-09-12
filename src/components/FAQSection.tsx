import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { FAQItem, Language } from '../types';

interface FAQSectionProps {
  faqs: FAQItem[];
  language: Language;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs, language }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="my-8 scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-amber-600 text-white flex items-center justify-center shadow-xs">
            <HelpCircle className="h-4.5 w-4.5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg sm:text-xl">
              {language === 'hi' ? '10. अक्सर पूछे जाने वाले प्रश्न (FAQs)' : '10. Frequently Asked Questions (FAQs)'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'hi' 
                ? 'तलाकशुदा महिला आरक्षण से जुड़े सामान्य संशय व उनके सटीक समाधान' 
                : 'Common doubts and verified answers regarding divorced women quota'}
            </p>
          </div>
        </div>

        {/* Quick Question Filter */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={language === 'hi' ? 'प्रश्न खोजें...' : 'Filter questions...'}
            className="w-full rounded-lg border border-slate-200 bg-white pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:outline-hidden"
          />
        </div>
      </div>

      <div className="space-y-2.5">
        {filteredFaqs.length === 0 ? (
          <div className="p-6 text-center text-sm text-slate-500 bg-white rounded-xl border border-slate-200">
            {language === 'hi' ? 'कोई प्रश्न नहीं मिला।' : 'No matching questions found.'}
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-800 hover:text-amber-800 hover:bg-slate-50/50 transition-colors gap-3"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base leading-snug">
                    {faq.question}
                  </span>
                  <div className="shrink-0 text-slate-400 p-1">
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-100 bg-slate-50/30 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
