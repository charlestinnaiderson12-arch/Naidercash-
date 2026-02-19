
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  CreditCard as CardIcon, 
  Send, 
  History, 
  Settings as SettingsIcon, 
  Bell, 
  LogOut, 
  Menu, 
  X,
  Bot
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import CardManager from './components/CardManager';
import Transfer from './components/Transfer';
import TransactionHistory from './components/TransactionHistory';
import AiAssistant from './components/AiAssistant';
import LiveSupport from './components/LiveSupport';
import LandingPage from './components/LandingPage';
import AuthPages from './components/AuthPages';
import Settings from './components/Settings';

type Tab = 'dashboard' | 'cards' | 'transfer' | 'history' | 'assistant' | 'settings';
type AuthView = 'landing' | 'login' | 'signup' | 'app';

const App: React.FC = () => {
  const [view, setView] = useState<AuthView>('landing');
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lang, setLang] = useState('ht');

  // Deteksyon lang aparèy la pa defo
  useEffect(() => {
    const deviceLang = navigator.language.split('-')[0];
    const supportedLangs = ['ht', 'en', 'fr', 'es'];
    if (supportedLangs.includes(deviceLang)) {
      setLang(deviceLang);
    }
  }, []);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'cards', name: 'Kat Mwen', icon: CardIcon },
    { id: 'transfer', name: 'Transfè', icon: Send },
    { id: 'history', name: 'Istorik', icon: History },
    { id: 'assistant', name: 'NaiderBot AI', icon: Bot },
    { id: 'settings', name: 'Paramèt', icon: SettingsIcon },
  ];

  if (view === 'landing') {
    return <LandingPage onJoin={() => setView('signup')} onLogin={() => setView('login')} lang={lang} setLang={setLang} />;
  }

  if (view === 'login' || view === 'signup') {
    return <AuthPages view={view} setView={setView} lang={lang} setLang={setLang} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-wider text-blue-400">NAIDERCASH</h1>
          <p className="text-xs text-slate-400 mt-1">Finans san limit</p>
        </div>

        <nav className="mt-6 px-4 space-y-1">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as Tab);
                setIsSidebarOpen(false);
              }}
              className={`
                flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors
                ${activeTab === item.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
              `}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
          <button 
            onClick={() => setView('landing')}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Dekonekte
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center">
            <button 
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg mr-2"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold text-slate-800">
              {navigation.find(n => n.id === activeTab)?.name}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-3 border-l pl-4 border-slate-200">
              <div className="text-right hidden sm:block cursor-pointer hover:opacity-80" onClick={() => setActiveTab('settings')}>
                <p className="text-sm font-medium text-slate-800">Jean Baptiste</p>
                <p className="text-xs text-slate-500">@jeanb24</p>
              </div>
              <div 
                className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 font-bold cursor-pointer transition-transform hover:scale-110"
                onClick={() => setActiveTab('settings')}
              >
                JB
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
            {activeTab === 'cards' && <CardManager />}
            {activeTab === 'transfer' && <Transfer />}
            {activeTab === 'history' && <TransactionHistory />}
            {activeTab === 'assistant' && <AiAssistant />}
            {activeTab === 'settings' && <Settings lang={lang} />}
          </div>
        </div>

        <LiveSupport />
      </main>
    </div>
  );
};

export default App;
