
import React, { useState } from 'react';
import { 
  Eye, EyeOff, Shield, Copy, Plus, CreditCard as CardIcon, 
  Monitor, ShoppingBag, Globe, CheckCircle, AlertTriangle 
} from 'lucide-react';
import { stripeIssuingService } from '../services/stripeService';

const CardManager: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isStripeActive] = useState(stripeIssuingService.isConfigured());

  const handleCreateCard = async () => {
    setIsCreating(true);
    await stripeIssuingService.createVirtualCard('JEAN BAPTISTE');
    setIsCreating(false);
    alert('Kat vityèl ou a kreye avèk siksè atravè Stripe!');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Jere Kat Ou Yo</h1>
          <p className="text-slate-500 font-medium">Kreye kat vityèl oswa kòmande kat fizik.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleCreateCard}
            disabled={isCreating}
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95 disabled:opacity-50"
          >
            {isCreating ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            Nouvo Kat Vityèl
          </button>
          <button className="bg-white text-slate-800 border border-slate-200 px-6 py-3 rounded-2xl font-black text-sm flex items-center hover:bg-slate-50 transition-all shadow-sm">
            <CardIcon className="w-4 h-4 mr-2" />
            Kòmande Fizik
          </button>
        </div>
      </div>

      {/* Stripe Integration Status Banner */}
      <div className={`p-4 rounded-2xl border flex items-center justify-between ${isStripeActive ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl ${isStripeActive ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
            {isStripeActive ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          </div>
          <div>
            <p className="text-sm font-black text-slate-900">
              {isStripeActive ? 'Stripe Issuing: Konekte' : 'Stripe Issuing: Kle yo pa konfigure'}
            </p>
            <p className="text-xs text-slate-500 font-medium">
              {isStripeActive 
                ? 'Ou ka kreye kat reyèl kounye a.' 
                : 'Mete Publishable Key ou nan services/config.ts pou aktive.'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Powered by</span>
           <div className="px-3 py-1 bg-white rounded-lg border border-slate-200 text-[#635bff] font-black italic text-xs">Stripe</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Card View */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full -mr-20 -mt-20 blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
             
             <div className="relative aspect-[1.6/1] bg-slate-900 rounded-[2rem] p-8 text-white overflow-hidden shadow-2xl">
               <div className="flex justify-between items-start">
                  <div className="w-12 h-10 bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 rounded-lg border border-white/20"></div>
                  <div className="font-black italic text-2xl tracking-tighter opacity-80 uppercase">NAIDER PREMIUM</div>
               </div>
               
               <div className="mt-12 space-y-6">
                 <div className="flex justify-between items-center">
                    <p className="text-xl md:text-2xl font-mono tracking-[0.25em]">
                      {showDetails ? '5412 8823 0041 3321' : '•••• •••• •••• 3321'}
                    </p>
                    <button 
                      onClick={() => setShowDetails(!showDetails)}
                      className="p-2 hover:bg-white/10 rounded-xl transition-all active:scale-90"
                    >
                      {showDetails ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                 </div>
                 
                 <div className="flex gap-10">
                   <div>
                     <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mb-1">Holder</p>
                     <p className="text-xs font-black tracking-wide uppercase">JEAN BAPTISTE</p>
                   </div>
                   <div>
                     <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mb-1">Expires</p>
                     <p className="text-xs font-black tracking-wide">08/28</p>
                   </div>
                   <div>
                     <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mb-1">CVV</p>
                     <p className="text-xs font-black tracking-wide">{showDetails ? '441' : '•••'}</p>
                   </div>
                 </div>
               </div>

               <div className="absolute bottom-6 right-8 flex items-center space-x-2">
                 <div className="w-12 h-12 bg-red-500/80 rounded-full blur-[1px]"></div>
                 <div className="w-12 h-12 bg-amber-500/80 rounded-full blur-[1px] -ml-6"></div>
               </div>
             </div>

             <div className="mt-8 grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center space-x-2 py-4 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-700 font-black transition-all text-sm active:scale-95 border border-slate-100">
                  <Copy className="w-4 h-4" />
                  <span>Kopye Nimewo</span>
                </button>
                <button className="flex items-center justify-center space-x-2 py-4 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-700 font-black transition-all text-sm active:scale-95 border border-slate-100">
                  <Shield className="w-4 h-4" />
                  <span>Chanje PIN</span>
                </button>
             </div>
          </div>
        </div>

        {/* Card Controls */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h3 className="font-black text-slate-900 mb-8 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-blue-600" />
              Sekirite ak Limit
            </h3>
            <div className="space-y-6">
               <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                 <div className="flex items-center space-x-4">
                   <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                     <Monitor className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-sm font-black text-slate-800">Online Payments</p>
                     <p className="text-xs text-slate-500 font-medium">Acha sou entènèt</p>
                   </div>
                 </div>
                 <Toggle checked={true} />
               </div>

               <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                 <div className="flex items-center space-x-4">
                   <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                     <Globe className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-sm font-black text-slate-800">International</p>
                     <p className="text-xs text-slate-500 font-medium">Sèvi nan tout peyi</p>
                   </div>
                 </div>
                 <Toggle checked={true} />
               </div>

               <div className="pt-6 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Monthly Limit</p>
                    <span className="text-sm font-black text-blue-600">$2,500.00 / $5,000.00</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full w-1/2 shadow-lg shadow-blue-200 transition-all duration-1000"></div>
                  </div>
               </div>

               <button className="w-full py-4 text-rose-600 font-black text-sm border-2 border-rose-50 rounded-2xl hover:bg-rose-50 transition-all active:scale-95">
                 Bloke Kat Sa a
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Toggle: React.FC<{checked?: boolean}> = ({checked}) => (
  <div className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" className="sr-only peer" defaultChecked={checked} />
    <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 shadow-inner"></div>
  </div>
);

export default CardManager;
