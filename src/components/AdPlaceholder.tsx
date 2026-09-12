import React from 'react';

interface AdPlaceholderProps {
  slotId: string;
  type: 'leaderboard' | 'in-article' | 'sidebar' | 'footer';
  label?: string;
  language?: 'hi' | 'en';
}

/**
 * =========================================================================
 * FUTURE ADS INTEGRATION PLACEHOLDER (भविष्य में विज्ञापन लगाने के लिए स्थान)
 * =========================================================================
 * 
 * इस घटक में आप भविष्य में आसानी से Google AdSense, Cloudflare Zaraz, 
 * या Ezoic जैसे एड नेटवर्क का कोड लगा सकते हैं।
 * 
 * निर्देश (Instructions):
 * 1. नीचे दिए गए कमेंट वाले स्थान में अपना AdSense <ins class="adsbygoogle" ...> कोड पेस्ट करें।
 * 2. प्रोडक्शन में डिप्लॉय करते समय या एड लाइव होने पर यह कंटेनर स्वतः एड प्रदर्शित करेगा।
 * =========================================================================
 */
export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  slotId,
  type,
  label,
  language = 'hi',
}) => {
  const getDimensions = () => {
    switch (type) {
      case 'leaderboard':
        return 'min-h-[100px] w-full max-w-4xl';
      case 'sidebar':
        return 'min-h-[280px] w-full max-w-[320px]';
      case 'footer':
        return 'min-h-[110px] w-full max-w-5xl';
      case 'in-article':
      default:
        return 'min-h-[140px] w-full max-w-3xl';
    }
  };

  return (
    <div
      id={`ad-container-${slotId}`}
      className={`ad-banner-slot my-8 mx-auto flex flex-col items-center justify-center p-3 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50/70 text-center transition-all hover:bg-slate-100/80 ${getDimensions()}`}
    >
      {/* 
        ===================================================================
        <!-- AD_SLOT: Insert Google AdSense / Cloudflare Ad code here -->
        Example:
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        ===================================================================
      */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[11px] font-medium tracking-wider uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-600">
          {language === 'hi' ? 'विज्ञापन स्थान (Ad Space)' : 'Advertisement Space'}
        </span>
        <span className="text-[11px] text-slate-400 font-mono">#{slotId}</span>
      </div>
      
      <p className="text-xs text-slate-500 max-w-md font-sans leading-relaxed">
        {language === 'hi' 
          ? (label || 'भविष्य में यहाँ Google AdSense या नेटवर्क एड प्रदर्शित होगा (कोड बेस में कमेंट उपलब्ध है)।')
          : (label || 'Google AdSense or ad network banner will render here (Code placeholder ready).')}
      </p>
    </div>
  );
};
