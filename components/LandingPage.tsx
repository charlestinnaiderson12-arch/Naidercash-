
import React, { useState } from 'react';
import { 
  ArrowRight, 
  Globe, 
  ShieldCheck, 
  Zap, 
  CreditCard, 
  Bot, 
  Star,
  Smartphone,
  CheckCircle2,
  ChevronRight,
  LayoutDashboard,
  ChevronDown
} from 'lucide-react';
import { translations } from '../translations';

interface LandingPageProps {
  onJoin: () => void;
  onLogin: () => void;
  lang: string;
  setLang: (lang: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onJoin, onLogin, lang, setLang }) => {
  const [activePreview, setActivePreview] = useState<'dashboard' | 'cards' | 'transfer'>('dashboard');
  const t = translations[lang] || translations['ht'];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">
              N
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">NAIDERCASH</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">{t.features}</a>
            <a href="#preview" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">{t.preview}</a>
            <a href="#security" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">{t.security}</a>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative group mr-2">
              <button className="flex items-center space-x-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200 text-xs font-bold text-slate-600 uppercase">
                {lang}
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute right-0 mt-2 w-24 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all">
                {['ht', 'en', 'fr', 'es'].map(l => (
                  <button 
                    key={l} 
                    onClick={() => setLang(l)}
                    className="w-full text-left px-4 py-2 text-xs font-bold uppercase hover:bg-blue-50 first:rounded-t-xl last:rounded-b-xl"
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={onLogin}
              className="hidden sm:block text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
            >
              {t.login}
            </button>
            <button 
              onClick={onJoin}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-full font-bold text-sm shadow-xl shadow-slate-200 hover:bg-slate-800 hover:scale-105 transition-all"
            >
              {t.getStarted}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest animate-in slide-in-from-left-4 duration-500">
              <Zap className="w-3 h-3" />
              <span>NAIDERCASH {lang === 'ht' ? 'No. 1 an Ayiti' : 'Finance No. 1'}</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
              {t.heroTitle.split(',')[0]}, <span className="text-blue-600">{t.heroTitle.split(',')[1]}</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={onJoin}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-full font-black text-lg shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center"
              >
                {t.getStarted}
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative animate-in zoom-in duration-700">
            <div className="relative z-10 animate-float">
               <div className="aspect-[1.6/1] w-full max-w-lg mx-auto bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] shadow-2xl p-8 text-white relative overflow-hidden group">
                 <div className="absolute top-8 right-10 text-2xl font-black italic opacity-60">VISA</div>
                 <div className="mt-16">
                    <p className="text-sm opacity-60 mb-2">Balans Disponib</p>
                    <h2 className="text-4xl font-bold tracking-tight">$24,500.00</h2>
                 </div>
                 <div className="mt-auto flex justify-between items-end pt-12">
                   <div>
                     <p className="text-[10px] uppercase tracking-widest opacity-60">Card Number</p>
                     <p className="text-lg font-mono tracking-widest">**** **** **** 4592</p>
                   </div>
                   <div className="w-12 h-10 bg-amber-400 rounded-lg"></div>
                 </div>
               </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section id="preview" className="py-24 bg-slate-900 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight">{t.preview}</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Yon konsepsyon pwòp epi modèn ki fè jesyon lajan w vin yon plezi.
            </p>
          </div>

          <div className="flex justify-center space-x-2 mb-12">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'cards', label: 'Kat Vityèl', icon: CreditCard },
              { id: 'transfer', label: 'Transfè', icon: Globe }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePreview(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-bold text-sm transition-all ${
                  activePreview === tab.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white/5 text-slate-400'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="relative group mx-auto max-w-5xl rounded-[2rem] border-[12px] border-slate-800 bg-slate-50 overflow-hidden aspect-[16/10] shadow-2xl">
             {/* Mockup content based on activePreview */}
             <div className="p-8 h-full bg-slate-50">
               <div className="h-4 w-32 bg-slate-200 rounded mb-8"></div>
               <div className="grid grid-cols-3 gap-6">
                 {[1,2,3].map(i => (
                   <div key={i} className="h-32 bg-white rounded-2xl border border-slate-100 p-6">
                     <div className="w-8 h-8 bg-slate-100 rounded mb-4"></div>
                     <div className="h-2 w-16 bg-slate-200 rounded mb-2"></div>
                     <div className="h-4 w-24 bg-slate-300 rounded"></div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-slate-900 text-white py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
           <h2 className="text-5xl font-black tracking-tight">{lang === 'ht' ? 'Pare pou kontwole finans ou?' : 'Ready for financial freedom?'}</h2>
           <button onClick={onJoin} className="px-10 py-5 bg-white text-slate-900 rounded-full font-black text-xl hover:scale-105 transition-all">
             {t.getStarted}
           </button>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
