
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle } from 'lucide-react';
import { getFinancialAdvice } from '../services/geminiService';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      text: 'Alo! Mwen se NaiderBot, konseye finansye pèsonèl ou nan NAIDERCASH. Kijan m ka ede w jodi a?', 
      sender: 'bot', 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const botResponse = await getFinancialAdvice(input);
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponse,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] md:h-[600px] bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">NaiderBot AI</h3>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
              <p className="text-xs text-slate-500">Sèvis Entèlijan 24/7</p>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-blue-50 rounded-lg text-blue-600 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3 h-3" />
          <span>Gemini Pro Powered</span>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-50/30"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] md:max-w-[70%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.sender === 'user' ? 'bg-blue-100 text-blue-600 ml-3' : 'bg-slate-200 text-slate-600 mr-3'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-100' 
                  : 'bg-white text-slate-800 rounded-tl-none border border-slate-100 shadow-sm'
              }`}>
                {msg.text}
                <div className={`text-[10px] mt-2 opacity-60 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex flex-row items-center">
              <div className="shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mr-3">
                <Bot className="w-4 h-4 text-slate-600" />
              </div>
              <div className="p-4 bg-white border border-slate-100 rounded-2xl rounded-tl-none flex space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 md:p-6 border-t border-slate-100 bg-white">
        <div className="flex items-center space-x-3 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ekri yon mesaj..."
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
            />
          </div>
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-3.5 rounded-2xl transition-all shadow-lg ${
              !input.trim() || isLoading 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-blue-200'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-4 flex items-center justify-center">
          <AlertCircle className="w-3 h-3 mr-1" />
          AI ka fè erè. Toujou tcheke enfòmasyon finansye enpòtan yo.
        </p>
      </div>
    </div>
  );
};

export default AiAssistant;
