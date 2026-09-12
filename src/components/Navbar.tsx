import React from 'react';
import { Globe, Share2, Printer, BookOpen, Sparkles } from 'lucide-react';
import { Language, FontSize } from '../types';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  fontSize: FontSize;
  onChangeFontSize: (size: FontSize) => void;
  onOpenShare: () => void;
  onPrint: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  fontSize,
  onChangeFontSize,
  onOpenShare,
  onPrint,
}) => {
  return (
    <header className="sticky top-1.5 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Brand / Portal Header */}
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center text-white shadow-xs">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">
                {language === 'hi' ? 'भर्ती विधिक प्रकोष्ठ' : 'Recruitment Legal Cell'}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Sparkles className="h-3 w-3" />
                {language === 'hi' ? 'सत्यापित जानकारी' : 'Verified Guide'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden md:block">
              {language === 'hi' 
                ? 'सरकारी सेवा आरक्षण एवं विधिक सूचना मंच' 
                : 'Public Employment Affirmative Action Portal'}
            </p>
          </div>
        </div>

        {/* Action Controls: Language Toggle, Text Size, Share, Print */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Font Size Adjuster */}
          <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <button
              id="font-btn-normal"
              onClick={() => onChangeFontSize('normal')}
              title={language === 'hi' ? 'सामान्य अक्षर आकार' : 'Normal Font'}
              className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                fontSize === 'normal' 
                  ? 'bg-white text-slate-900 shadow-xs font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              A
            </button>
            <button
              id="font-btn-large"
              onClick={() => onChangeFontSize('large')}
              title={language === 'hi' ? 'बड़ा अक्षर आकार' : 'Large Font'}
              className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                fontSize === 'large' 
                  ? 'bg-white text-slate-900 shadow-xs font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              A+
            </button>
            <button
              id="font-btn-xlarge"
              onClick={() => onChangeFontSize('xlarge')}
              title={language === 'hi' ? 'अति-बड़ा अक्षर आकार' : 'Extra Large Font'}
              className={`px-2 py-1 text-xs font-medium rounded transition-all ${
                fontSize === 'xlarge' 
                  ? 'bg-white text-slate-900 shadow-xs font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              A++
            </button>
          </div>

          {/* Language Switch Button */}
          <button
            id="language-toggle-btn"
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-50 hover:bg-amber-100/80 text-amber-900 font-semibold text-xs sm:text-sm transition-colors shadow-xs"
            title={language === 'hi' ? 'अंग्रेज़ी में पढ़ें (Switch to English)' : 'हिंदी में पढ़ें (Switch to Hindi)'}
          >
            <Globe className="h-4 w-4 text-amber-700" />
            <span>{language === 'hi' ? 'English' : 'हिंदी'}</span>
          </button>

          {/* Print / Save Button */}
          <button
            id="print-btn"
            onClick={onPrint}
            title={language === 'hi' ? 'प्रिंट करें या PDF सेव करें' : 'Print / Save PDF'}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors hidden md:flex items-center justify-center"
          >
            <Printer className="h-4 w-4" />
          </button>

          {/* Share Button */}
          <button
            id="share-header-btn"
            onClick={onOpenShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm transition-colors shadow-xs"
            title={language === 'hi' ? 'आलेख शेयर करें' : 'Share Article'}
          >
            <Share2 className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">{language === 'hi' ? 'शेयर करें' : 'Share'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
