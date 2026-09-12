export type Language = 'hi' | 'en';

export type FontSize = 'normal' | 'large' | 'xlarge';

export interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  tag?: string;
}

export interface StateQuotaRule {
  state: string;
  quotaPercentage: string;
  ageRelaxation: string;
  keyRule: string;
  officialReference: string;
}

export interface EligibilityResult {
  eligible: boolean;
  statusText: string;
  details: string;
  maxAge: string;
  applicableRule: string;
  documentsNeeded: string[];
}
