import React from 'react';
import { StateQuotaRule, Language } from '../types';
import { Building2, ShieldCheck, Check } from 'lucide-react';

interface StateComparisonTableProps {
  rules: StateQuotaRule[];
  language: Language;
}

export const StateComparisonTable: React.FC<StateComparisonTableProps> = ({ rules, language }) => {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
      <div className="bg-slate-900 px-4 py-3 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-amber-400" />
          <h4 className="font-semibold text-sm sm:text-base">
            {language === 'hi' 
              ? 'प्रमुख राज्यवार व केंद्र सरकार आरक्षण तुलना सारणी' 
              : 'Key State & Central Govt Quota Comparison Matrix'}
          </h4>
        </div>
        <span className="text-xs text-amber-300 font-mono hidden sm:inline">
          {language === 'hi' ? '2025-2026 अद्यतन' : 'Updated 2025-2026'}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
              <th className="py-3 px-4">{language === 'hi' ? 'राज्य / आयोग' : 'State / Commission'}</th>
              <th className="py-3 px-4">{language === 'hi' ? 'आरक्षण कोटा' : 'Quota Percentage'}</th>
              <th className="py-3 px-4">{language === 'hi' ? 'अधिकतम आयु सीमा छूट' : 'Age Relaxation'}</th>
              <th className="py-3 px-4">{language === 'hi' ? 'मुख्य अनिवार्य शर्त' : 'Key Mandatory Condition'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-normal text-slate-800">
            {rules.map((rule, idx) => (
              <tr 
                key={idx} 
                className={`transition-colors hover:bg-amber-50/40 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}
              >
                <td className="py-3.5 px-4 font-bold text-slate-950 flex items-start gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                  <span>{rule.state}</span>
                </td>
                <td className="py-3.5 px-4 font-semibold text-amber-800">
                  {rule.quotaPercentage}
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                    {rule.ageRelaxation}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-600 leading-relaxed max-w-xs">
                  {rule.keyRule}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
        <span>
          {language === 'hi'
            ? 'स्रोत: संबंधित राज्य लोक सेवा आयोग अधिसूचनाएं एवं DoPT भर्ती दिशा-निर्देश।'
            : 'Source: Relevant State Public Service Commission notifications & DoPT recruitment guidelines.'}
        </span>
      </div>
    </div>
  );
};
