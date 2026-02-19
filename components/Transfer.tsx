
import React, { useState } from 'react';
/* Added Plus to the Lucide icon imports */
import { Send, Search, Users, History, Info, Globe, ChevronDown, Plus } from 'lucide-react';

const Transfer: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('HTG');

  const exchangeRates: Record<string, number> = {
    HTG: 132.50,
    DOP: 58.30,
    EUR: 0.92,
    CAD: 1.36,
  };

  const calculateResult = () => {
    const val = parseFloat(amount);
    if (isNaN(val)) return '0.00';
    return (val * exchangeRates[targetCurrency]).toLocaleString(undefined, { minimumFractionDigits: 2 });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Voye Lajan</h1>
        <p className="text-slate-500">Transfè rapid, san sekirite, nan tout mond lan.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="space-y-6">
               <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Kantite ou vle voye (USD)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-slate-400 font-bold">$</span>
                    </div>
                    <input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="block w-full pl-10 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-xl font-bold"
                    />
                  </div>
               </div>

               <div className="flex items-center justify-center -my-4 relative z-10">
                 <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg">
                   <ChevronDown className="w-5 h-5" />
                 </div>
               </div>

               <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Moun nan ap resevwa</label>
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                       <input 
                        type="text" 
                        readOnly
                        value={calculateResult()}
                        className="block w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-xl font-bold text-slate-400"
                      />
                    </div>
                    <select 
                      value={targetCurrency}
                      onChange={(e) => setTargetCurrency(e.target.value)}
                      className="bg-white border border-slate-200 rounded-2xl px-4 py-4 font-bold focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                    >
                      <option value="HTG">HTG</option>
                      <option value="DOP">DOP</option>
                      <option value="EUR">EUR</option>
                      <option value="CAD">CAD</option>
                    </select>
                  </div>
               </div>

               <div className="p-4 bg-blue-50 rounded-2xl flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-blue-800 font-semibold">Enfòmasyon sou To a</p>
                    <p className="text-blue-600">1 USD = {exchangeRates[targetCurrency]} {targetCurrency}. Pa gen okenn frè kache pou premye transfè ou.</p>
                  </div>
               </div>

               <div className="space-y-4 pt-4">
                  <h3 className="text-sm font-semibold text-slate-700">Resepsyonè</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border-2 border-blue-600 bg-blue-50 rounded-2xl flex items-center space-x-3 cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold">SM</div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Sarah Michel</p>
                        <p className="text-xs text-slate-500">**** 4492 - Ayiti</p>
                      </div>
                    </div>
                    <button className="p-4 border-2 border-dashed border-slate-200 hover:border-blue-300 hover:bg-slate-50 rounded-2xl flex items-center justify-center space-x-2 text-slate-500 font-medium transition-all">
                      <Plus className="w-4 h-4" />
                      <span>Ajoute yon nouvo</span>
                    </button>
                  </div>
               </div>

               <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 transform active:scale-[0.98]">
                 Konfime Transfè
               </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center">
               <Users className="w-5 h-5 mr-2 text-blue-600" />
               Moun Ou Voye Souvan
             </h3>
             <div className="space-y-4">
               {[
                 { name: 'Ricardo Jean', country: 'Ayiti', initial: 'RJ' },
                 { name: 'Marie Denise', country: 'Dominkani', initial: 'MD' },
                 { name: 'Peterson Noel', country: 'USA', initial: 'PN' },
               ].map((user, i) => (
                 <div key={i} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                   <div className="flex items-center space-x-3">
                     <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                       {user.initial}
                     </div>
                     <div>
                        <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.country}</p>
                     </div>
                   </div>
                   <Send className="w-4 h-4 text-slate-300 group-hover:text-blue-600" />
                 </div>
               ))}
             </div>
           </div>

           <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-sm overflow-hidden relative">
             <div className="relative z-10">
               <h3 className="font-bold mb-2">Transfè Global</h3>
               <p className="text-xs text-slate-400 mb-4">Nou kouvri plis pase 150 peyi avèk livrezon enstantane.</p>
               <div className="flex -space-x-2">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                     <img src={`https://picsum.photos/32/32?random=${i}`} alt="user" />
                   </div>
                 ))}
                 <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-blue-600 flex items-center justify-center text-[10px] font-bold">
                   +2k
                 </div>
               </div>
             </div>
             <Globe className="absolute -bottom-8 -right-8 w-32 h-32 text-white/5" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
