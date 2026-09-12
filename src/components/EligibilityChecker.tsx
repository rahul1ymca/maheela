import React, { useState } from 'react';
import { Calculator, CheckCircle2, AlertTriangle, XCircle, FileText, Info } from 'lucide-react';
import { Language } from '../types';

interface EligibilityCheckerProps {
  language: Language;
}

export const EligibilityChecker: React.FC<EligibilityCheckerProps> = ({ language }) => {
  const [selectedState, setSelectedState] = useState<'rajasthan' | 'central' | 'up' | 'mp' | 'bihar' | 'other'>('rajasthan');
  const [selectedCategory, setSelectedCategory] = useState<'ur' | 'obc' | 'sc_st' | 'ews'>('ur');
  const [age, setAge] = useState<number>(34);
  const [hasCourtDecree, setHasCourtDecree] = useState<'yes' | 'pending' | 'no'>('yes');
  const [hasRemarried, setHasRemarried] = useState<'no' | 'yes'>('no');

  const calculateEligibility = () => {
    // Basic Disqualifiers
    if (hasRemarried === 'yes') {
      return {
        eligible: false,
        statusTitle: language === 'hi' ? 'अपात्र (Ineligible - पुनर्विवाह के कारण)' : 'Ineligible (Due to Remarriage)',
        statusClass: 'bg-red-50 text-red-800 border-red-200',
        icon: <XCircle className="h-6 w-6 text-red-600" />,
        reason: language === 'hi' 
          ? 'सरकारी सेवा नियमों के अनुसार, तलाक के बाद दूसरा विवाह करने पर तलाकशुदा महिला आरक्षण और आयु छूट का लाभ स्वतः समाप्त हो जाता है।'
          : 'Under government service rules, benefits of divorced women quota and age relaxation cease upon remarriage.',
        maxAge: '-',
        quotaInfo: '-',
        actionNeeded: language === 'hi' ? 'आप सामान्य श्रेणी में अपनी श्रेणी की पात्रता के अनुसार आवेदन कर सकती हैं।' : 'You can apply under the standard category without quota relaxation.'
      };
    }

    if (hasCourtDecree === 'no' || hasCourtDecree === 'pending') {
      return {
        eligible: false,
        statusTitle: language === 'hi' ? 'शर्त अधूरी (कोर्ट डिक्री लंबित या अनुपलब्ध)' : 'Conditional (Decree Pending or Unavailable)',
        statusClass: 'bg-amber-50 text-amber-800 border-amber-200',
        icon: <AlertTriangle className="h-6 w-6 text-amber-600" />,
        reason: language === 'hi' 
          ? 'सुप्रीम कोर्ट के निर्देशानुसार आवेदन की कट-ऑफ डेट तक फैमिली कोर्ट द्वारा अंतिम डिक्री (Decree Absolute) पारित होना अनिवार्य है। केवल मुकदमा पेंडिंग होने पर आरक्षण नहीं मिलता।'
          : 'As per Supreme Court rulings, a final court divorce decree before application deadline is mandatory. Pending cases do not qualify.',
        maxAge: '-',
        quotaInfo: '-',
        actionNeeded: language === 'hi' ? 'कोर्ट से डिक्री प्राप्त होने के पश्चात ही इस विशेष कोटे में आवेदन करें।' : 'Apply under this quota only after obtaining the certified court decree.'
      };
    }

    // State-specific calculations
    let maxAllowedAge = 40;
    let quotaSummary = '';
    let specialNote = '';

    if (selectedState === 'rajasthan') {
      maxAllowedAge = 60; // No upper age limit up to retirement
      quotaSummary = language === 'hi' 
        ? '8% संयुक्त क्षैतिज आरक्षण (विधवा एवं तलाकशुदा/परित्यक्ता कोटा)' 
        : '8% Combined Horizontal Quota for Widows & Divorced Women';
      specialNote = language === 'hi'
        ? 'राजस्थान कार्मिक नियमों के अनुसार तलाकशुदा महिला हेतु कोई ऊपरी आयु सीमा नहीं है (सेवानिवृत्ति तक पात्र)।'
        : 'Under Rajasthan service rules, no upper age limit applies for divorced women (eligible up to retirement).';
    } else if (selectedState === 'central') {
      if (selectedCategory === 'ur' || selectedCategory === 'ews') {
        maxAllowedAge = 35;
      } else if (selectedCategory === 'obc') {
        maxAllowedAge = 38;
      } else {
        maxAllowedAge = 40;
      }
      quotaSummary = language === 'hi' 
        ? 'ग्रुप-सी सिविल पदों में विशेष आयु सीमा छूट (DoPT नियम)' 
        : 'Special age relaxation in Group-C posts under DoPT rules';
      specialNote = language === 'hi'
        ? 'SSC एवं केंद्र सरकार के गैर-राजपत्रित पदों में आयु सीमा में विशेष छूट देय है।'
        : 'Admissible across SSC and non-gazetted central civil posts.';
    } else if (selectedState === 'mp') {
      maxAllowedAge = selectedCategory === 'ur' ? 45 : 48;
      quotaSummary = language === 'hi' ? '33% महिला आरक्षण एवं 45-48 वर्ष तक आयु छूट' : '33% female quota with up to 45-48 years age cap';
      specialNote = language === 'hi' ? 'मध्य प्रदेश सामान्य प्रशासन विभाग के आदेशानुसार।' : 'As per MP GAD departmental circulars.';
    } else if (selectedState === 'up') {
      maxAllowedAge = 45;
      quotaSummary = language === 'hi' ? '20% महिला क्षैतिज आरक्षण व 5 वर्ष छूट' : '20% horizontal female quota with 5 yrs relaxation';
      specialNote = language === 'hi' ? 'उत्तर प्रदेश लोक सेवा आयोग के सामान्य सेवा नियमों के तहत।' : 'Under UPPSC standard civil service regulations.';
    } else if (selectedState === 'bihar') {
      maxAllowedAge = selectedCategory === 'ur' ? 40 : 42;
      quotaSummary = language === 'hi' ? '35% क्षैतिज महिला आरक्षण (बिहार के मूल निवासियों हेतु)' : '35% horizontal female quota for Bihar residents';
      specialNote = language === 'hi' ? 'महिला आरक्षण (WBC) के अंतर्गत लाभ।' : 'Under Bihar state female reservation framework.';
    } else {
      maxAllowedAge = 40;
      quotaSummary = language === 'hi' ? 'संबंधित राज्य के सेवा नियमों के अधीन' : 'Subject to specific state service codes';
      specialNote = language === 'hi' ? 'अन्य राज्यों में सामान्यतः 5 वर्ष की अतिरिक्त आयु छूट दी जाती है।' : 'Other states typically extend 5 years over standard ceiling.';
    }

    const isAgeEligible = age <= maxAllowedAge;

    return {
      eligible: isAgeEligible,
      statusTitle: isAgeEligible 
        ? (language === 'hi' ? 'पूर्णतः पात्र (Eligible under Quota)' : 'Eligible under Quota')
        : (language === 'hi' ? 'आयु सीमा पार (Over-Age for this category)' : 'Over-Age for this category'),
      statusClass: isAgeEligible ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-rose-50 text-rose-900 border-rose-200',
      icon: isAgeEligible 
        ? <CheckCircle2 className="h-6 w-6 text-emerald-600" />
        : <AlertTriangle className="h-6 w-6 text-rose-600" />,
      reason: isAgeEligible
        ? (language === 'hi' 
            ? `आपकी आयु (${age} वर्ष) निर्धारित अधिकतम सीमा (${maxAllowedAge} वर्ष) के भीतर है। आप इस आरक्षण व आयु छूट की हकदार हैं।`
            : `Your age (${age} yrs) is within the prescribed ceiling (${maxAllowedAge} yrs). You are eligible for quota benefits.`)
        : (language === 'hi' 
            ? `आपकी आयु (${age} वर्ष) इस श्रेणी के लिए अधिकतम मान्य आयु (${maxAllowedAge} वर्ष) से अधिक हो चुकी है।`
            : `Your age (${age} yrs) exceeds the maximum allowed ceiling (${maxAllowedAge} yrs) for this category.`),
      maxAge: `${maxAllowedAge} ${language === 'hi' ? 'वर्ष' : 'Years'}`,
      quotaInfo: quotaSummary,
      actionNeeded: specialNote
    };
  };

  const result = calculateEligibility();

  return (
    <div id="calculator-section" className="my-8 rounded-2xl border border-amber-300/80 bg-white p-5 sm:p-7 shadow-sm">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="h-10 w-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-lg sm:text-xl">
            {language === 'hi' 
              ? 'तलाकशुदा महिला आरक्षण एवं आयु पात्रता कैलकुलेटर' 
              : 'Divorced Women Quota & Age Eligibility Calculator'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            {language === 'hi' 
              ? 'अपना राज्य, वर्ग और आयु चुनें और जानें कि आप किस नौकरी व कोटे के लिए पात्र हैं:' 
              : 'Select your state, category, and age to verify your applicable quota eligibility:'}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* State Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            {language === 'hi' ? '1. राज्य / भर्ती बोर्ड चुनें' : '1. Select State / Recruitment Board'}
          </label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value as any)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3 py-2.5 text-sm font-medium text-slate-800 focus:border-amber-500 focus:bg-white focus:outline-hidden"
          >
            <option value="rajasthan">राजस्थान (RPSC / RSSB - 8% विशेष कोटा)</option>
            <option value="central">केंद्र सरकार (SSC / Group C Civil Posts)</option>
            <option value="mp">मध्य प्रदेश (MPPSC / MPESB)</option>
            <option value="up">उत्तर प्रदेश (UPPSC / UPSSSC)</option>
            <option value="bihar">बिहार (BPSC / BSSC 35% कोटा)</option>
            <option value="other">अन्य राज्य (Other State Services)</option>
          </select>
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            {language === 'hi' ? '2. मूल सामाजिक श्रेणी (Category)' : '2. Parent Social Category'}
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3 py-2.5 text-sm font-medium text-slate-800 focus:border-amber-500 focus:bg-white focus:outline-hidden"
          >
            <option value="ur">अनारक्षित / सामान्य वर्ग (General / UR)</option>
            <option value="obc">अन्य पिछड़ा वर्ग (OBC - Non Creamy Layer)</option>
            <option value="sc_st">अनुसूचित जाति / जनजाति (SC / ST)</option>
            <option value="ews">आर्थिक रूप से कमजोर वर्ग (EWS)</option>
          </select>
        </div>

        {/* Current Age Slider / Input */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {language === 'hi' ? '3. आपकी वर्तमान आयु' : '3. Your Current Age'}
            </label>
            <span className="text-sm font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {age} {language === 'hi' ? 'वर्ष' : 'Years'}
            </span>
          </div>
          <input
            type="range"
            min={18}
            max={62}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full accent-amber-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 mt-1">
            <span>18 वर्ष</span>
            <span>35 वर्ष</span>
            <span>45 वर्ष</span>
            <span>60 वर्ष</span>
          </div>
        </div>

        {/* Court Decree Check */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            {language === 'hi' ? '4. क्या सक्षम कोर्ट से तलाक डिक्री प्राप्त है?' : '4. Possess Valid Court Divorce Decree?'}
          </label>
          <select
            value={hasCourtDecree}
            onChange={(e) => setHasCourtDecree(e.target.value as any)}
            className="w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3 py-2.5 text-sm font-medium text-slate-800 focus:border-amber-500 focus:bg-white focus:outline-hidden"
          >
            <option value="yes">{language === 'hi' ? 'हाँ, अंतिम डिक्री प्राप्त है (Yes, Decree Absolute)' : 'Yes, Decree Absolute obtained'}</option>
            <option value="pending">{language === 'hi' ? 'केस चल रहा है / फैसला नहीं आया (Pending in Court)' : 'Pending in Court'}</option>
            <option value="no">{language === 'hi' ? 'नहीं / केवल सामाजिक अलगाव (No / Only Customary)' : 'No / Informal separation'}</option>
          </select>
        </div>

        {/* Remarried Check */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            {language === 'hi' ? '5. क्या आपने तलाक के बाद पुनर्विवाह (Remarriage) किया है?' : '5. Have you Remarried after Divorce?'}
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm">
              <input
                type="radio"
                name="remarried"
                value="no"
                checked={hasRemarried === 'no'}
                onChange={() => setHasRemarried('no')}
                className="accent-amber-600"
              />
              <span className="font-medium text-slate-700">
                {language === 'hi' ? 'नहीं, पुनर्विवाह नहीं किया (Not Remarried)' : 'No, Not Remarried'}
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm">
              <input
                type="radio"
                name="remarried"
                value="yes"
                checked={hasRemarried === 'yes'}
                onChange={() => setHasRemarried('yes')}
                className="accent-amber-600"
              />
              <span className="font-medium text-slate-700">
                {language === 'hi' ? 'हाँ, दूसरा विवाह हो चुका है (Remarried)' : 'Yes, Remarried'}
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div className={`mt-6 rounded-xl border p-4 sm:p-5 transition-all ${result.statusClass}`}>
        <div className="flex items-start gap-3">
          <div className="mt-0.5">{result.icon}</div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-bold text-base sm:text-lg tracking-tight">
                {result.statusTitle}
              </h4>
              {result.maxAge !== '-' && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/80 border border-current shadow-2xs">
                  {language === 'hi' ? 'अधिकतम मान्य आयु:' : 'Max Allowed Age:'} {result.maxAge}
                </span>
              )}
            </div>

            <p className="mt-2 text-sm leading-relaxed font-normal">
              {result.reason}
            </p>

            {result.quotaInfo !== '-' && (
              <div className="mt-3 pt-3 border-t border-current/20 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <strong className="font-semibold">{language === 'hi' ? 'लागू आरक्षण:' : 'Applicable Quota:'} </strong>
                  <span>{result.quotaInfo}</span>
                </div>
                <div className="text-current/90 italic">
                  {result.actionNeeded}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checklist footer */}
      <div className="mt-4 pt-3 flex items-center gap-2 text-xs text-slate-500">
        <Info className="h-4 w-4 text-amber-600 shrink-0" />
        <span>
          {language === 'hi' 
            ? 'नोट: यह परिणाम सामान्य सेवा नियमावली पर आधारित है। प्रत्येक भर्ती के आधिकारिक विज्ञापन में दिए गए विशिष्ट नियमों का अवलोकन अवश्य करें।'
            : 'Note: Results reflect standard departmental service rules. Refer to official recruitment notification for specific cadre conditions.'}
        </span>
      </div>
    </div>
  );
};
