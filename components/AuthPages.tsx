
import React, { useState } from 'react';
import { 
  ShieldCheck, Mail, Lock, User, ArrowRight, 
  ChevronDown, CheckCircle, Phone, MapPin, 
  Briefcase, Building2, AtSign, Globe, Calendar,
  Search
} from 'lucide-react';
import { translations } from '../translations';

interface AuthPagesProps {
  view: 'login' | 'signup';
  setView: (view: any) => void;
  lang: string;
  setLang: (lang: string) => void;
}

const AuthPages: React.FC<AuthPagesProps> = ({ view, setView, lang, setLang }) => {
  const t = translations[lang] || translations['ht'];
  const [isLoading, setIsLoading] = useState(false);
  const [signupStep, setSignupStep] = useState(1);
  const [searchCountry, setSearchCountry] = useState('');

  // Lis konplè (Mokaj pou 200 peyi)
  const allCountries = [
    { name: "Ayiti", code: "+509", flag: "🇭🇹" },
    { name: "Afghanistan", code: "+93", flag: "🇦🇫" },
    { name: "Albania", code: "+355", flag: "🇦🇱" },
    { name: "Algeria", code: "+213", flag: "🇩🇿" },
    { name: "Andorra", code: "+376", flag: "🇦🇩" },
    { name: "Angola", code: "+244", flag: "🇦🇴" },
    { name: "Argentina", code: "+54", flag: "🇦🇷" },
    { name: "Armenia", code: "+374", flag: "🇦🇲" },
    { name: "Australia", code: "+61", flag: "🇦🇺" },
    { name: "Austria", code: "+43", flag: "🇦🇹" },
    { name: "Bahamas", code: "+1-242", flag: "🇧🇸" },
    { name: "Bahrain", code: "+973", flag: "🇧🇭" },
    { name: "Bangladesh", code: "+880", flag: "🇧🇩" },
    { name: "Barbados", code: "+1-246", flag: "🇧🇧" },
    { name: "Belgium", code: "+32", flag: "🇧🇪" },
    { name: "Belize", code: "+501", flag: "🇧🇿" },
    { name: "Benin", code: "+229", flag: "🇧🇯" },
    { name: "Bermuda", code: "+1-441", flag: "🇧🇲" },
    { name: "Bolivia", code: "+591", flag: "🇧🇴" },
    { name: "Brazil", code: "+55", flag: "🇧🇷" },
    { name: "Bulgaria", code: "+359", flag: "🇧🇬" },
    { name: "Cambodia", code: "+855", flag: "🇰🇭" },
    { name: "Cameroon", code: "+237", flag: "🇨🇲" },
    { name: "Canada", code: "+1", flag: "🇨🇦" },
    { name: "Chile", code: "+56", flag: "🇨🇱" },
    { name: "China", code: "+86", flag: "🇨🇳" },
    { name: "Colombia", code: "+57", flag: "🇨🇴" },
    { name: "Costa Rica", code: "+506", flag: "🇨🇷" },
    { name: "Cuba", code: "+53", flag: "🇨🇺" },
    { name: "Denmark", code: "+45", flag: "🇩🇰" },
    { name: "Dominica", code: "+1-767", flag: "🇩🇲" },
    { name: "Dominican Republic", code: "+1-809", flag: "🇩🇴" },
    { name: "Ecuador", code: "+593", flag: "🇪🇨" },
    { name: "Egypt", code: "+20", flag: "🇪🇬" },
    { name: "El Salvador", code: "+503", flag: "🇸🇻" },
    { name: "France", code: "+33", flag: "🇫🇷" },
    { name: "Germany", code: "+49", flag: "🇩🇪" },
    { name: "Ghana", code: "+233", flag: "🇬🇭" },
    { name: "Greece", code: "+30", flag: "🇬🇷" },
    { name: "Guatemala", code: "+502", flag: "🇬🇹" },
    { name: "Guyana", code: "+592", flag: "🇬🇾" },
    { name: "Honduras", code: "+504", flag: "🇭🇳" },
    { name: "Iceland", code: "+354", flag: "🇮🇸" },
    { name: "India", code: "+91", flag: "🇮🇳" },
    { name: "Indonesia", code: "+62", flag: "🇮🇩" },
    { name: "Ireland", code: "+353", flag: "🇮🇪" },
    { name: "Israel", code: "+972", flag: "🇮🇱" },
    { name: "Italy", code: "+39", flag: "🇮🇹" },
    { name: "Jamaica", code: "+1-876", flag: "🇯🇲" },
    { name: "Japan", code: "+81", flag: "🇯🇵" },
    { name: "Kenya", code: "+254", flag: "🇰🇪" },
    { name: "Mexico", code: "+52", flag: "🇲🇽" },
    { name: "Morocco", code: "+212", flag: "🇲🇦" },
    { name: "Netherlands", code: "+31", flag: "🇳🇱" },
    { name: "New Zealand", code: "+64", flag: "🇳🇿" },
    { name: "Nigeria", code: "+234", flag: "🇳🇬" },
    { name: "Norway", code: "+47", flag: "🇳🇴" },
    { name: "Panama", code: "+507", flag: "🇵🇦" },
    { name: "Peru", code: "+51", flag: "🇵🇪" },
    { name: "Portugal", code: "+351", flag: "🇵🇹" },
    { name: "Russia", code: "+7", flag: "🇷🇺" },
    { name: "South Africa", code: "+27", flag: "🇿🇦" },
    { name: "Spain", code: "+34", flag: "🇪🇸" },
    { name: "Sweden", code: "+46", flag: "🇸🇪" },
    { name: "Switzerland", code: "+41", flag: "🇨🇭" },
    { name: "Turkey", code: "+90", flag: "🇹🇷" },
    { name: "UK", code: "+44", flag: "🇬🇧" },
    { name: "USA", code: "+1", flag: "🇺🇸" },
    { name: "Vietnam", code: "+84", flag: "🇻🇳" },
    // Plis pase 200 ka ajoute isit la...
  ].sort((a, b) => a.name.localeCompare(b.name));

  const filteredCountries = allCountries.filter(c => 
    c.name.toLowerCase().includes(searchCountry.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (view === 'signup' && signupStep < 3) {
      setSignupStep(signupStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setView('app');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Mini Header */}
      <header className="p-6 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-100">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('landing')}>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">N</div>
          <span className="text-2xl font-black tracking-tighter text-slate-900">NAIDERCASH</span>
        </div>
        
        <div className="relative group">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full border border-slate-200 text-sm font-bold text-slate-600 shadow-sm hover:border-blue-300 transition-all">
            <Globe className="w-4 h-4 text-blue-600" />
            <span className="uppercase">{lang}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <div className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-2xl border border-slate-100 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50 p-1">
            {['ht', 'en', 'fr', 'es'].map(l => (
              <button 
                key={l} 
                onClick={() => setLang(l)}
                className={`w-full text-left px-4 py-3 text-sm font-bold uppercase hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors ${lang === l ? 'bg-blue-50 text-blue-600' : 'text-slate-600'}`}
              >
                {l === 'ht' ? '🇭🇹 Kreyòl' : l === 'en' ? '🇺🇸 English' : l === 'fr' ? '🇫🇷 Français' : '🇪🇸 Español'}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-xl space-y-8">
          <div className="text-center space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              {view === 'login' ? t.welcomeBack : t.createAccount}
            </h1>
            {view === 'signup' && (
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-2">
                  {[1, 2, 3].map(s => (
                    <div key={s} className={`h-2 rounded-full transition-all duration-500 ${signupStep >= s ? 'w-12 bg-blue-600' : 'w-4 bg-slate-200'}`}></div>
                  ))}
                </div>
                <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{t.step} {signupStep} / 3</span>
              </div>
            )}
            <p className="text-slate-500 font-medium max-w-sm mx-auto">{t.secureInfo}</p>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden">
            {/* Background design */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50"></div>
            
            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
              
              {/* LOGIN VIEW */}
              {view === 'login' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 ml-1">{t.email}</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input required type="email" placeholder="nom@exemple.com" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 focus:bg-white outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-sm font-black text-slate-700">{t.password}</label>
                      <button type="button" className="text-xs font-bold text-blue-600 hover:underline">{t.forgotPassword}</button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input required type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 focus:bg-white outline-none transition-all" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 px-1">
                    <input type="checkbox" id="remember" className="w-5 h-5 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-600 cursor-pointer" />
                    <label htmlFor="remember" className="text-sm font-bold text-slate-600 cursor-pointer">{t.rememberMe}</label>
                  </div>
                </div>
              )}

              {/* SIGNUP VIEW - STEP 1: Personal Info */}
              {view === 'signup' && signupStep === 1 && (
                <div className="space-y-5 animate-in slide-in-from-right-8 duration-500">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 ml-1">{t.fullName}</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input required type="text" placeholder="Jean Philippe" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 ml-1">{t.email}</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input required type="email" placeholder="jean@naider.com" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 ml-1">{t.phone}</label>
                    <div className="flex space-x-2">
                      <div className="relative">
                         <select className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600 appearance-none min-w-[100px]">
                          {allCountries.map(c => (
                            <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                      <div className="relative flex-1">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input required type="tel" placeholder="3XXX-XXXX" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all outline-none" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 ml-1">{t.dob}</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input required type="date" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all outline-none" />
                    </div>
                  </div>
                </div>
              )}

              {/* SIGNUP VIEW - STEP 2: Account Security & Address */}
              {view === 'signup' && signupStep === 2 && (
                <div className="space-y-5 animate-in slide-in-from-right-8 duration-500">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 ml-1">{t.naiderTag}</label>
                    <div className="relative">
                      <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
                      <input required type="text" placeholder="mon_identifiant" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 focus:bg-white outline-none font-black text-blue-900" />
                    </div>
                    <p className="text-[10px] text-slate-400 px-2 font-bold uppercase tracking-tighter">Sèvi ak tag sa a pou transfè rapid.</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 ml-1">{t.address}</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <textarea required rows={2} placeholder="No 12, Rue des Palmiers, Port-au-Prince" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all outline-none resize-none"></textarea>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 ml-1">{t.password}</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input required type="password" placeholder="Minimòm 8 karaktè" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all outline-none" />
                    </div>
                    <div className="flex space-x-1 px-1">
                      {[1,2,3,4].map(i => <div key={i} className="h-1 flex-1 bg-slate-100 rounded-full"></div>)}
                    </div>
                  </div>
                </div>
              )}

              {/* SIGNUP VIEW - STEP 3: Socio-Economic Profile */}
              {view === 'signup' && signupStep === 3 && (
                <div className="space-y-5 animate-in slide-in-from-right-8 duration-500">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 ml-1">{t.country}</label>
                    <div className="relative group">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <select required className="w-full pl-12 pr-10 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none appearance-none font-bold">
                        <option value="">{t.selectCountry}</option>
                        {allCountries.map(c => (
                          <option key={c.name} value={c.name}>{c.flag} {c.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 ml-1">{t.employment}</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input required type="text" placeholder="Ex: Enjenyè, Pwofesè, Machann..." className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-sm font-black text-slate-700">{t.businessReg}</label>
                      <span className="text-[10px] bg-slate-100 px-3 py-1 rounded-full text-slate-500 font-black uppercase tracking-widest">Optional</span>
                    </div>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="text" placeholder="Non Biznis ou" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 focus:bg-white transition-all outline-none" />
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                    <input required type="checkbox" id="terms" className="mt-1 w-5 h-5 rounded-lg border-blue-300 text-blue-600 focus:ring-blue-600 cursor-pointer" />
                    <label htmlFor="terms" className="text-xs font-bold text-slate-600 leading-relaxed cursor-pointer">
                      {t.terms}
                    </label>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                {view === 'signup' && signupStep > 1 && (
                  <button 
                    type="button"
                    onClick={() => setSignupStep(signupStep - 1)}
                    className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all active:scale-95 flex items-center justify-center"
                  >
                    {t.back}
                  </button>
                )}
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center space-x-3"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>{view === 'login' ? t.login : (signupStep === 3 ? t.signup : t.next)}</span>
                      <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500 font-bold">
                {view === 'login' ? t.noAccount : t.alreadyHaveAccount}
                <button 
                  onClick={() => {
                    setView(view === 'login' ? 'signup' : 'login');
                    setSignupStep(1);
                  }}
                  className="ml-2 font-black text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {view === 'login' ? t.signup : t.login}
                </button>
              </p>
            </div>
          </div>

          {/* Trust Seals */}
          <div className="flex items-center justify-center space-x-8 opacity-40 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
            <div className="flex items-center text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
               <ShieldCheck className="w-5 h-5 mr-2 text-emerald-600" />
               AES-256 SECURE
            </div>
            <div className="flex items-center text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
               <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
               PCI COMPLIANT
            </div>
          </div>
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="p-8 text-center border-t border-slate-100">
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">© 2024 NAIDERCASH Global Finance Inc.</p>
      </footer>
    </div>
  );
};

export default AuthPages;
