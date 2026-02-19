
import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Briefcase, AtSign, 
  Building2, Calendar, Shield, Bell, Globe, 
  ChevronRight, Camera, Edit2, Lock, Smartphone,
  Database, Zap, CheckCircle
} from 'lucide-react';
import { translations } from '../translations';
import { STRIPE_CONFIG } from '../services/config';

interface SettingsProps {
  lang: string;
}

const Settings: React.FC<SettingsProps> = ({ lang }) => {
  const t = translations[lang] || translations['ht'];
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'integration'>('profile');

  const userData = {
    fullName: "Jean Baptiste",
    email: "jean.baptiste@gmail.com",
    naiderTag: "jeanb24",
    phone: "+509 3721-4567",
    dob: "12 Oktòb 1995",
    address: "Pétion-Ville, Port-au-Prince, Haiti",
    occupation: "Software Engineer",
    business: "B-Tech Solutions",
    country: "Ayiti"
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-blue-200">
              JB
            </div>
            <button className="absolute -bottom-2 -right-2 p-3 bg-white rounded-2xl shadow-xl border border-slate-100 text-blue-600 hover:scale-110 transition-transform">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{userData.fullName}</h1>
            <p className="text-blue-600 font-black flex items-center">
              <AtSign className="w-4 h-4 mr-1" />
              {userData.naiderTag}
            </p>
            <div className="mt-2 flex items-center space-x-2">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">Verified Account</span>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100">Premium Plan</span>
            </div>
          </div>
        </div>
        
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'profile' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            {t.profile}
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'security' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            {t.security}
          </button>
          <button 
            onClick={() => setActiveTab('integration')}
            className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'integration' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Bank Integration
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
            <h3 className="font-black text-slate-900 mb-6 flex items-center uppercase tracking-widest text-xs">
              <Shield className="w-5 h-5 mr-2 text-blue-600" />
              Sante Kont Ou
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sekirite</span>
                  <span className="text-[10px] font-black text-emerald-600 uppercase">85% - FÒ</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full">
                  <div className="h-2 w-[85%] bg-emerald-500 rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-black">
                  <div className="flex items-center text-slate-600">
                    <Lock className="w-4 h-4 mr-2" />
                    2FA Aktive
                  </div>
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between text-xs font-black">
                  <div className="flex items-center text-slate-600">
                    <Smartphone className="w-4 h-4 mr-2" />
                    App Authenticator
                  </div>
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'profile' && (
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">{t.personalInfo}</h2>
                <button className="flex items-center px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-blue-600 hover:bg-blue-50 transition-colors uppercase tracking-widest">
                  <Edit2 className="w-4 h-4 mr-2" />
                  {t.editProfile}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                <InfoItem label={t.fullName} value={userData.fullName} icon={User} />
                <InfoItem label={t.email} value={userData.email} icon={Mail} />
                <InfoItem label={t.phone} value={userData.phone} icon={Phone} />
                <InfoItem label={t.dob} value={userData.dob} icon={Calendar} />
                <div className="md:col-span-2">
                  <InfoItem label={t.address} value={userData.address} icon={MapPin} />
                </div>
                <InfoItem label={t.employment} value={userData.occupation} icon={Briefcase} />
                <InfoItem label={t.businessReg} value={userData.business} icon={Building2} />
              </div>
            </div>
          )}

          {activeTab === 'integration' && (
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Bank Integration</h2>
                <div className="px-3 py-1 bg-blue-600 text-white rounded-lg font-black italic text-xs">STRIPE</div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      <Database className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 uppercase tracking-widest">API Configuration</p>
                      <p className="text-xs text-slate-500 font-medium">Mete kle Stripe ou yo pou pèmèt sistèm nan bay kat.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Publishable Key</label>
                      <div className="relative">
                         <input 
                          type="text" 
                          readOnly
                          value={STRIPE_CONFIG.PUBLISHABLE_KEY}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-600"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 opacity-60">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secret Key (Server Side Only)</label>
                      <div className="relative">
                         <input 
                          type="password" 
                          readOnly
                          value="••••••••••••••••••••••••"
                          className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono text-slate-400 cursor-not-allowed"
                        />
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Zap className="w-6 h-6 text-indigo-600" />
                    <div>
                      <p className="text-sm font-black text-indigo-900 uppercase tracking-widest">Webhooks Status</p>
                      <p className="text-xs text-indigo-600 font-bold">Konekte - Koute chanjman sou kat yo.</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white text-indigo-600 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm hover:bg-indigo-600 hover:text-white transition-all">
                    Test Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoItem: React.FC<{label: string, value: string, icon: any}> = ({label, value, icon: Icon}) => (
  <div className="space-y-1.5">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</p>
    <div className="flex items-center text-slate-800 font-black text-sm">
      <Icon className="w-4 h-4 mr-3 text-slate-300" />
      {value}
    </div>
  </div>
);

export default Settings;
