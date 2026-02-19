
import React, { useState } from 'react';
import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft, CreditCard } from 'lucide-react';
import { TransactionStatus } from '../types';

const TransactionHistory: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const transactions = [
    { id: '1', type: 'Payment', merchant: 'Apple Store', date: '21 May 2024, 14:30', amount: -1299.00, status: TransactionStatus.COMPLETED, icon: CreditCard },
    { id: '2', type: 'Transfer', merchant: 'Mona Lisa (Refund)', date: '21 May 2024, 09:15', amount: 45.00, status: TransactionStatus.COMPLETED, icon: ArrowDownLeft },
    { id: '3', type: 'Transfer', merchant: 'To Jean Baptiste', date: '20 May 2024, 18:20', amount: -300.00, status: TransactionStatus.PENDING, icon: ArrowUpRight },
    { id: '4', type: 'Deposit', merchant: 'Salary Deposit', date: '20 May 2024, 08:00', amount: 4200.00, status: TransactionStatus.COMPLETED, icon: ArrowDownLeft },
    { id: '5', type: 'Payment', merchant: 'Spotify', date: '19 May 2024, 23:59', amount: -9.99, status: TransactionStatus.COMPLETED, icon: CreditCard },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Istorik Tranzaksyon</h1>
          <p className="text-slate-500">Swiv tout aktivite sou kont ou.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
          <Download className="w-4 h-4 mr-2" />
          Telechaje Rapò (PDF)
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Chèche yon tranzaksyon..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            />
          </div>
          <div className="flex items-center space-x-2">
            {['All', 'Payments', 'Transfers', 'Deposits'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  filter === f ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {f === 'All' ? 'Tout' : f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Tranzaksyon</th>
                <th className="px-6 py-4">Dat ak Lè</th>
                <th className="px-6 py-4">Kantite</th>
                <th className="px-6 py-4">Estati</th>
                <th className="px-6 py-4">Aksyon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${tx.amount > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                        <tx.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{tx.merchant}</p>
                        <p className="text-xs text-slate-500">{tx.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600">{tx.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className={`font-bold ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-md ${
                      tx.status === TransactionStatus.COMPLETED ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-slate-400 hover:text-blue-600 transition-colors p-1">
                      <Info className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
          <p>Montre 5 tranzaksyon sou 124</p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">Anvan</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50">Apre</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default TransactionHistory;
