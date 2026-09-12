import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { TableOfContents } from './components/TableOfContents';
import { EligibilityChecker } from './components/EligibilityChecker';
import { StateComparisonTable } from './components/StateComparisonTable';
import { FAQSection } from './components/FAQSection';
import { ShareModal } from './components/ShareModal';
import { AdPlaceholder } from './components/AdPlaceholder';
import { hindiContent, englishContent } from './data/blogContent';
import { Language, FontSize } from './types';
import { 
  Calendar, 
  Clock, 
  User, 
  CheckCircle2, 
  AlertOctagon, 
  FileCheck2, 
  Scale, 
  Bookmark, 
  ArrowUp, 
  Share2, 
  HeartHandshake,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('hi');
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  const content = language === 'hi' ? hindiContent : englishContent;

  // Track active section for TOC highlighting & scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sectionIds = content.tocItems.map(item => item.id);
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [content.tocItems]);

  const handleSelectSection = (id: string) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const topOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg leading-relaxed sm:text-xl sm:leading-loose';
      case 'xlarge':
        return 'text-xl leading-loose sm:text-2xl sm:leading-loose';
      case 'normal':
      default:
        return 'text-base leading-relaxed sm:text-lg sm:leading-relaxed';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-devanagari antialiased flex flex-col">
      {/* Top Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Main Sticky Navigation */}
      <Navbar
        language={language}
        onToggleLanguage={() => setLanguage(prev => prev === 'hi' ? 'en' : 'hi')}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        onOpenShare={() => setIsShareModalOpen(true)}
        onPrint={() => window.print()}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10">
        {/* =========================================================================
            AD_SLOT_1: TOP LEADERBOARD AD (शीर्ष विज्ञापन स्थान)
            Cloudflare / Google AdSense code can be inserted inside AdPlaceholder
           ========================================================================= */}
        {/* AD_SLOT: Header Leaderboard Container */}
        <AdPlaceholder 
          slotId="header-leaderboard" 
          type="leaderboard" 
          language={language}
          label={language === 'hi' ? 'शीर्ष विज्ञापन बैनर (Header Leaderboard - 728x90)' : 'Top Header Leaderboard Banner'}
        />

        {/* Article Header & Metadata */}
        <article className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-8 md:p-10">
          <header className="border-b border-slate-100 pb-6 mb-6">
            {/* Category / Authority Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-900 border border-amber-500/20">
                <Bookmark className="h-3.5 w-3.5 text-amber-600" />
                {content.header.badge}
              </span>
              <span className="text-xs text-slate-500">
                {language === 'hi' ? 'विधिक एवं कार्मिक परिपत्र संख्या 42/2025' : 'Legal & Personnel Circular 42/2025'}
              </span>
            </div>

            {/* Primary SEO H1 Title */}
            <h1 
              id="article-title"
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug sm:leading-tight mb-4"
            >
              {content.header.title}
            </h1>

            {/* Subtitle / Meta Hook */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5 font-normal">
              {content.header.subtitle}
            </p>

            {/* Author, Reviewer & Publish Date Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-slate-500 pt-4 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4 text-amber-600" />
                  <span className="font-semibold text-slate-800">{content.header.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span>{language === 'hi' ? 'अंतिम अद्यतन:' : 'Updated:'} {content.header.updatedDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span>{content.header.readingTime}</span>
                </div>
              </div>

              {/* Quick Share Trigger */}
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center gap-1 text-xs font-semibold text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-md transition-colors"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>{language === 'hi' ? 'शेयर करें' : 'Share'}</span>
              </button>
            </div>
          </header>

          {/* Quick Notice / Key Highlights Box */}
          <div className="my-6 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50/50 border border-amber-200/80 p-4 sm:p-5">
            <h2 className="text-sm sm:text-base font-bold text-amber-950 flex items-center gap-2 mb-2">
              <Scale className="h-4.5 w-4.5 text-amber-700 shrink-0" />
              <span>{language === 'hi' ? 'प्रमुख बिंदु: त्वरित सारांश' : 'Executive Key Points'}</span>
            </h2>
            <ul className="space-y-1.5 text-xs sm:text-sm text-amber-900 font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{content.sections.intro.keyTakeaways[0]}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{content.sections.intro.keyTakeaways[1]}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{content.sections.intro.keyTakeaways[2]}</span>
              </li>
            </ul>
          </div>

          {/* Table of Contents with Jump-to-Page Anchors */}
          <TableOfContents
            items={content.tocItems}
            activeId={activeSection}
            language={language}
            onSelectSection={handleSelectSection}
          />

          {/* =========================================================================
              AD_SLOT_2: AFTER TABLE OF CONTENTS AD (विषय सूची के बाद विज्ञापन)
             ========================================================================= */}
          {/* AD_SLOT: In-Article Post-TOC Banner */}
          <AdPlaceholder 
            slotId="after-toc-slot" 
            type="in-article" 
            language={language}
            label={language === 'hi' ? 'विषय सूची के बाद का विज्ञापन (Ad Slot 2)' : 'After Table of Contents Ad Unit'}
          />

          {/* Article Body Section by Section */}
          <div className={`article-body space-y-10 text-slate-800 ${getFontSizeClass()}`}>
            
            {/* Section 1: Intro */}
            <section id="intro" className="scroll-mt-24 pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                {content.sections.intro.heading}
              </h2>
              <div className="text-slate-700 whitespace-pre-line leading-relaxed">
                {content.sections.intro.content}
              </div>
            </section>

            {/* Section 2: Nature of Quota */}
            <section id="nature-of-quota" className="scroll-mt-24 pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                {content.sections.natureOfQuota.heading}
              </h2>
              <div className="text-slate-700 whitespace-pre-line leading-relaxed">
                {content.sections.natureOfQuota.content}
              </div>

              {/* Graphical Explanation Box */}
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
                <div className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <HeartHandshake className="h-4 w-4 text-amber-600" />
                  <span>{language === 'hi' ? 'क्षैतिज आरक्षण का व्यावहारिक उदाहरण:' : 'Practical Example of Horizontal Quota:'}</span>
                </div>
                <p className="text-slate-600">
                  {language === 'hi'
                    ? 'यदि किसी भर्ती में कुल 1,000 पद हैं और महिलाओं के लिए 30% (300 पद) आरक्षित हैं, तो इन 300 महिला पदों में से लगभग 8% पद (24 पद) विशेष रूप से विधवा और तलाकशुदा महिलाओं के लिए आरक्षित रहते हैं। इनकी मेरिट सामान्य महिला मेरिट से काफी कम रहती है।'
                    : 'If an exam advertises 1,000 vacancies with 30% (300) seats reserved for females, approximately 8% of these female seats (around 24 posts) are earmarked specifically for widows and divorced candidates, leading to distinct, relaxed qualifying cutoffs.'}
                </p>
              </div>
            </section>

            {/* Section 3: State Rules & Comparison Table */}
            <section id="state-rules" className="scroll-mt-24 pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                {content.sections.stateRules.heading}
              </h2>
              <div className="text-slate-700 whitespace-pre-line leading-relaxed">
                {content.sections.stateRules.content}
              </div>

              {/* State-by-State Comparison Table Component */}
              <StateComparisonTable 
                rules={content.sections.stateRules.table} 
                language={language} 
              />
            </section>

            {/* =========================================================================
                AD_SLOT_3: MID-ARTICLE CONTENT AD (लेख के बीच में विज्ञापन स्थान)
               ========================================================================= */}
            {/* AD_SLOT: Mid-Article Banner */}
            <AdPlaceholder 
              slotId="mid-article-slot" 
              type="in-article" 
              language={language}
              label={language === 'hi' ? 'आर्टिकल के बीच में विज्ञापन (Mid Article Ad Slot)' : 'Mid Article Ad Unit'}
            />

            {/* Section 4: Age Relaxation */}
            <section id="age-relaxation" className="scroll-mt-24 pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                {content.sections.ageRelaxation.heading}
              </h2>
              <div className="text-slate-700 whitespace-pre-line leading-relaxed">
                {content.sections.ageRelaxation.content}
              </div>

              {/* Warning Alert Box */}
              <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm flex items-start gap-3">
                <AlertOctagon className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">{language === 'hi' ? 'महत्वपूर्ण चेतावनी: ' : 'Critical Warning: '}</span>
                  <span>{content.sections.ageRelaxation.ageAlert}</span>
                </div>
              </div>
            </section>

            {/* Section 5: Interactive Eligibility & Age Calculator */}
            <section id="calculator-section" className="scroll-mt-24 pt-2">
              <EligibilityChecker language={language} />
            </section>

            {/* Section 6: Essential Documents */}
            <section id="essential-documents" className="scroll-mt-24 pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                {content.sections.essentialDocuments.heading}
              </h2>
              <div className="text-slate-700 whitespace-pre-line leading-relaxed mb-4">
                {content.sections.essentialDocuments.content}
              </div>

              <div className="grid grid-cols-1 gap-3">
                {content.sections.essentialDocuments.documentsList.map((doc, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2 mb-1">
                      <FileCheck2 className="h-4.5 w-4.5 text-amber-600 shrink-0" />
                      <span>{doc.title}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 ml-6.5">
                      {doc.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 7: Supreme Court Cut-Off Date Rule */}
            <section id="cutoff-date-rule" className="scroll-mt-24 pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                {content.sections.cutoffDateRule.heading}
              </h2>
              <div className="text-slate-700 whitespace-pre-line leading-relaxed">
                {content.sections.cutoffDateRule.content}
              </div>

              {/* Landmark Precedents Callout */}
              <div className="mt-4 p-4 rounded-xl bg-amber-50/80 border border-amber-300 text-xs sm:text-sm text-amber-950">
                <div className="font-bold mb-1 flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4 text-amber-700" />
                  <span>{language === 'hi' ? 'न्यायालयीन नजीर (Judicial Precedent):' : 'Judicial Precedent:'}</span>
                </div>
                <p>
                  {language === 'hi'
                    ? 'राजस्थान उच्च न्यायालय एवं सर्वोच्च न्यायालय के निर्णय (उदा. श्रीमती सुनीता मीना बनाम राज्य) के अनुसार, आवेदन की अंतिम तिथि को अभ्यर्थी की जो वैवाहिक स्थिति विधिक रूप से प्रमाणित है, उसी के आधार पर पात्रता तय होती है। बाद में प्राप्त डिक्री को पूर्व तिथि से प्रभावी नहीं माना जा सकता।'
                    : 'Pursuant to landmark High Court & Supreme Court rulings, candidate status on the last date of application determines eligibility. A divorce decree rendered subsequent to the application cutoff cannot be applied retrospectively.'}
                </p>
              </div>
            </section>

            {/* Section 8: Step-by-Step Application Guide */}
            <section id="step-by-step-apply" className="scroll-mt-24 pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                {content.sections.stepByStepApply.heading}
              </h2>

              <div className="space-y-3">
                {content.sections.stepByStepApply.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-white">
                    <div className="h-8 w-8 rounded-lg bg-amber-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold tracking-wider text-amber-700 uppercase bg-amber-50 px-2 py-0.5 rounded">
                          {step.stepNumber}
                        </span>
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-1 text-xs sm:text-sm text-slate-600">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 9: 5 Common Mistakes */}
            <section id="common-mistakes" className="scroll-mt-24 pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                {content.sections.commonMistakes.heading}
              </h2>
              <div className="space-y-3">
                {content.sections.commonMistakes.mistakes.map((mistake, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base text-rose-800 flex items-center gap-2 mb-1">
                      <AlertOctagon className="h-4 w-4 text-rose-600 shrink-0" />
                      <span>{mistake.title}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 ml-6">
                      {mistake.detail}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* =========================================================================
                AD_SLOT_4: BEFORE FAQ AD (प्रश्नोत्तरी से पहले विज्ञापन स्थान)
               ========================================================================= */}
            {/* AD_SLOT: Pre-FAQ Responsive Rectangle */}
            <AdPlaceholder 
              slotId="pre-faq-slot" 
              type="in-article" 
              language={language}
              label={language === 'hi' ? 'प्रश्नोत्तरी (FAQ) से पहले विज्ञापन स्थान' : 'Pre-FAQ Advertisement Unit'}
            />

            {/* Section 10: FAQ Accordion with Search */}
            <FAQSection 
              faqs={content.sections.faq.faqs} 
              language={language} 
            />

            {/* Section 11: Conclusion & Help */}
            <section id="conclusion" className="scroll-mt-24 pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                {content.sections.conclusion.heading}
              </h2>
              <div className="text-slate-700 whitespace-pre-line leading-relaxed mb-4">
                {content.sections.conclusion.content}
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                <span>{content.sections.conclusion.helplineInfo}</span>
              </div>
            </section>
          </div>

          {/* End of Article Action Bar */}
          <footer className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-700">
                {language === 'hi' ? 'क्या यह जानकारी आपके लिए उपयोगी रही?' : 'Was this guide helpful?'}
              </p>
              <p className="text-[11px] text-slate-500">
                {language === 'hi' ? 'अन्य अभ्यर्थियों की सहायता के लिए इसे सोशल मीडिया पर शेयर करें।' : 'Share this resource to help aspiring female candidates.'}
              </p>
            </div>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-colors shadow-xs"
            >
              <Share2 className="h-4 w-4" />
              <span>{language === 'hi' ? 'यह आलेख शेयर करें' : 'Share This Guide'}</span>
            </button>
          </footer>
        </article>

        {/* =========================================================================
            AD_SLOT_5: BOTTOM FOOTER AD (निचला विज्ञापन बैनर)
           ========================================================================= */}
        {/* AD_SLOT: Bottom Leaderboard Container */}
        <AdPlaceholder 
          slotId="footer-banner-slot" 
          type="footer" 
          language={language}
          label={language === 'hi' ? 'फुटर विज्ञापन बैनर (Footer Banner Ad - 728x90 / Fluid)' : 'Bottom Footer Banner Unit'}
        />

        {/* Cloudflare Pages Compatibility Notice & Disclaimer */}
        <div className="mt-6 mb-12 p-4 rounded-xl border border-slate-200 bg-white/70 text-slate-500 text-xs leading-relaxed text-center">
          <p className="font-semibold text-slate-700 mb-1">
            {language === 'hi' ? 'अस्वीकरण एवं विधिक सूचना (Disclaimer):' : 'Legal Disclaimer:'}
          </p>
          <p>
            {language === 'hi'
              ? 'यह आलेख केवल शैक्षणिक एवं सामान्य सूचना के उद्देश्य से तैयार किया गया है। किसी भी सरकारी भर्ती में आवेदन से पूर्व संबंधित भर्ती आयोग (RPSC, SSC, BPSC आदि) के मूल विज्ञापन व सेवा नियमावली का गहन अध्ययन अवश्य करें।'
              : 'This editorial resource is published purely for informational and educational awareness. Prospective candidates are advised to verify exact conditions from the primary notification of the respective commission before submitting application.'}
          </p>
          <p className="mt-2 text-[11px] text-slate-400">
            {language === 'hi' 
              ? 'क्लाउडफ्लेयर पेजेस (Cloudflare Pages) एवं मोबाइल ब्राउज़र के लिए पूर्णतः गति-अनुकूलित (Optimized for Fast Loading).' 
              : 'Optimized for high-speed delivery on Cloudflare Pages and modern mobile browsers.'}
          </p>
        </div>
      </main>

      {/* Floating Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          title={language === 'hi' ? 'ऊपर जाएं' : 'Scroll to top'}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-lg transition-all hover:scale-105"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Social Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        language={language}
      />
    </div>
  );
}
