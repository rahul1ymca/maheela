import React, { useState } from 'react';
import { X, Copy, Check, MessageSquare, Send } from 'lucide-react';
import { Language } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, language }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://sarkari-mahila-aarakshan.pages.dev/';
  const shareTitle = language === 'hi'
    ? 'तलाकशुदा महिलाओं के लिए सरकारी नौकरी में आरक्षण: नियम, आयु सीमा और आवेदन प्रक्रिया'
    : 'Reservation in Government Jobs for Divorced Women: Rules, Age Limit & Application Process';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + '\n' + currentUrl)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareTitle)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(currentUrl)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-base sm:text-lg">
            {language === 'hi' ? 'आलेख शेयर करें' : 'Share Article'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 my-3">
          {language === 'hi'
            ? 'इस उपयोगी जानकारी को ज़रूरतमंद महिलाओं और परीक्षार्थियों के साथ साझा करें:'
            : 'Share this important legal resource with candidates and community groups:'}
        </p>

        {/* Social Share Buttons Grid */}
        <div className="grid grid-cols-2 gap-2.5 my-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-xs sm:text-sm transition-colors shadow-2xs"
          >
            <MessageSquare className="h-4 w-4" />
            <span>WhatsApp</span>
          </a>

          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-medium text-xs sm:text-sm transition-colors shadow-2xs"
          >
            <Send className="h-4 w-4" />
            <span>Telegram</span>
          </a>

          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm transition-colors shadow-2xs"
          >
            <span className="font-bold text-sm">f</span>
            <span>Facebook</span>
          </a>

          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm transition-colors shadow-2xs"
          >
            <span className="font-bold text-sm">𝕏</span>
            <span>Twitter / X</span>
          </a>
        </div>

        {/* Copy Link Input */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
            {language === 'hi' ? 'सीधा वेब लिंक कॉपी करें:' : 'Copy Direct Link:'}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600 truncate focus:outline-hidden"
            />
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all ${
                copied ? 'bg-emerald-600' : 'bg-amber-600 hover:bg-amber-700'
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>{language === 'hi' ? 'कॉपी हुआ!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>{language === 'hi' ? 'कॉपी' : 'Copy'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
