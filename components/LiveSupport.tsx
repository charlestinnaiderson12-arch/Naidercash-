
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Mic, MicOff, Headphones, Loader2, Send } from 'lucide-react';
import { GoogleGenAI, Modality } from '@google/genai';

// Helpers for audio processing
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const LiveSupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcriptions, setTranscriptions] = useState<{ role: 'user' | 'agent', text: string }[]>([]);
  
  const aiRef = useRef<any>(null);
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const streamRef = useRef<MediaStream | null>(null);
  const currentOutputTranscriptionRef = useRef('');
  const currentInputTranscriptionRef = useRef('');

  const toggleChat = () => {
    if (isOpen && isConnected) {
      stopSession();
    }
    setIsOpen(!isOpen);
  };

  const startSession = async () => {
    setIsConnecting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      aiRef.current = ai;

      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            setIsConnecting(false);
            
            // Stream microphone
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              if (isMuted) return;
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: any) => {
            // Handle Audio
            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              const buffer = await decodeAudioData(decode(audioData), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputCtx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            // Handle Transcriptions
            if (message.serverContent?.outputTranscription) {
              currentOutputTranscriptionRef.current += message.serverContent.outputTranscription.text;
              updateTranscription('agent', currentOutputTranscriptionRef.current);
            }
            if (message.serverContent?.inputTranscription) {
              currentInputTranscriptionRef.current += message.serverContent.inputTranscription.text;
              updateTranscription('user', currentInputTranscriptionRef.current);
            }
            if (message.serverContent?.turnComplete) {
              currentOutputTranscriptionRef.current = '';
              currentInputTranscriptionRef.current = '';
            }
            
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => stopSession(),
          onerror: (e) => console.error("Live support error:", e),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } },
          systemInstruction: "Ou se yon ajan sipò kliyan pou NAIDERCASH. Ou dwe reponn an Kreyòl Ayisyen. Ou trè politi, itil, epi ou konnen tout bagay sou transfè entènasyonal ak kat vityèl. Si itilizatè a mande èd, bay li solisyon finansye NAIDERCASH yo.",
          outputAudioTranscription: {},
          inputAudioTranscription: {},
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsConnecting(false);
    }
  };

  const updateTranscription = (role: 'user' | 'agent', text: string) => {
    setTranscriptions(prev => {
      const last = prev[prev.length - 1];
      if (last && last.role === role) {
        return [...prev.slice(0, -1), { role, text }];
      }
      return [...prev, { role, text }];
    });
  };

  const stopSession = () => {
    if (sessionRef.current) sessionRef.current.close();
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    sourcesRef.current.forEach(s => s.stop());
    setIsConnected(false);
    setIsConnecting(false);
    setTranscriptions([]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-slate-900 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <Headphones className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Sipò NAIDERCASH</h4>
                <p className="text-[10px] text-blue-400 font-medium uppercase tracking-wider">An Dirèk</p>
              </div>
            </div>
            <button onClick={toggleChat} className="text-slate-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 h-80 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {!isConnected && !isConnecting && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <div>
                  <h5 className="font-bold text-slate-800">Kòmanse Konvèsasyon an</h5>
                  <p className="text-xs text-slate-500 mt-1">Pale ak yon ajan an dirèk pou èd enstantane.</p>
                </div>
                <button 
                  onClick={startSession}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                >
                  Konekte Kounye a
                </button>
              </div>
            )}

            {isConnecting && (
              <div className="h-full flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <p className="text-sm font-medium text-slate-500">N ap prepare koneksyon an...</p>
              </div>
            )}

            {isConnected && (
              <div className="space-y-4">
                {transcriptions.length === 0 && (
                  <p className="text-center text-[10px] text-slate-400 uppercase font-bold tracking-tighter py-4">
                    Koneksyon an etabli. Ou ka pale kounye a...
                  </p>
                )}
                {transcriptions.map((t, i) => (
                  <div key={i} className={`flex ${t.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium shadow-sm ${
                      t.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                    }`}>
                      {t.text}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {isConnected && (
            <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-2.5 rounded-full transition-all ${isMuted ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-600'}`}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <div className="flex space-x-1 items-center">
                  {!isMuted && [1,2,3].map(i => (
                    <div key={i} className="w-1 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}></div>
                  ))}
                </div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Ajan an ap koute...</p>
            </div>
          )}
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
          isOpen ? 'bg-slate-900 rotate-90' : 'bg-blue-600 shadow-blue-300'
        }`}
      >
        {isOpen ? <X className="text-white w-6 h-6" /> : <MessageSquare className="text-white w-6 h-6" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
        )}
      </button>
    </div>
  );
};

export default LiveSupport;
