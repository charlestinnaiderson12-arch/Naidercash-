
import React from 'react';
import { TrendingUp, TrendingDown, ArrowRight, DollarSign, Plus, Send } from 'lucide-react';
import { TransactionStatus } from '../types';

interface DashboardProps {
  setActiveTab: (tab: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveTab }) => {
  const stats = [
    { label: 'Balans Total', value: '$12,450.80', trend: '+12.5%', icon: DollarSign, color: 'blue' },
    { label: 'Revni mwa sa', value: '$3,200.00', trend: '+5.2%', icon: TrendingUp, color: 'emerald' },
    { label: 'Depans mwa sa', value: '$1,850.25', trend: '-2.1%', icon: TrendingDown, color: 'rose' },
  ];

  const recentTransactions = [
    { id: '1', title: 'Netflix Subscription', amount: -15.99, date: '20 May 2024', status: TransactionStatus.COMPLETED },
    { id: '2', title: 'Amazon Refund', amount: 120.50, date: '19 May 2024', status: TransactionStatus.COMPLETED },
    { id: '3', title: 'Transfer to Mom', amount: -500.00, date: '18 May 2024', status: TransactionStatus.PENDING },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Pare pou voye lajan?</h3>
              <p className="text-blue-100 mb-6">Transfè entènasyonal rapid ak NAIDERCASH.</p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setActiveTab('transfer')}
                  className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold flex items-center hover:bg-blue-50 transition-colors"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Voye Kounye a
                </button>
                <button 
                  onClick={() => setActiveTab('cards')}
                  className="bg-blue-500/30 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-xl font-semibold flex items-center hover:bg-blue-500/40 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Depoze Lajan
                </button>
              </div>
            </div>
            {/* Abstract Background shapes */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl"></div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Dènye Tranzaksyon</h3>
              <button 
                onClick={() => setActiveTab('history')}
                className="text-sm font-medium text-blue-600 flex items-center hover:underline"
              >
                Wè tout <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${tx.amount > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                      {tx.amount > 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{tx.title}</p>
                      <p className="text-xs text-slate-500">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)} USD
                    </p>
                    <p className={`text-[10px] font-bold uppercase ${
                      tx.status === TransactionStatus.COMPLETED ? 'text-emerald-500' : 'text-amber-500'
                    }`}>
                      {tx.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Cards info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Kat Vityèl</h3>
            <div className="relative aspect-[1.6/1] bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white overflow-hidden group cursor-pointer shadow-lg hover:shadow-indigo-200 transition-all duration-300">
              <div className="absolute top-4 right-6 font-bold italic text-xl opacity-80 italic">VISA</div>
              <div className="mt-8">
                <p className="text-xs text-indigo-200 font-medium">Balans Disponib</p>
                <p className="text-2xl font-bold tracking-tight">$4,250.00</p>
              </div>
              <div className="mt-auto flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[10px] text-indigo-200 uppercase tracking-widest">Card Number</p>
                  <p className="text-sm font-mono tracking-widest">**** **** **** 4592</p>
                </div>
                <div className="flex space-x-4">
                  <div>
                    <p className="text-[10px] text-indigo-200 uppercase tracking-widest">Exp</p>
                    <p className="text-sm font-medium">12/26</p>
                  </div>
                </div>
              </div>
              {/* Card Chip decoration */}
              <div className="absolute bottom-6 right-6 w-10 h-8 bg-amber-200/40 rounded-md backdrop-blur-sm border border-amber-100/30"></div>
            </div>
            <button 
              onClick={() => setActiveTab('cards')}
              className="w-full mt-6 py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              + Kreye nouvo kat
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Pousantaj Chanjman</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">USD / HTG</span>
                <span className="font-bold text-slate-800">132.50</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">USD / DOP</span>
                <span className="font-bold text-slate-800">58.30</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">EUR / USD</span>
                <span className="font-bold text-slate-800">1.08</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
