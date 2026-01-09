






import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, Trash2, Activity, Fingerprint, Mic, Waves } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIChatbotPage = () => {
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const chatEndRef = useRef(null);
  
  // --- INITIAL MESSAGE UPDATED ---
  const [chatHistory, setChatHistory] = useState([
    { 
      role: 'model', 
      text: "System Online. I am your Surgical AI assistant. How can I help you analyze medical data or anatomical structures today?" 
    }
  ]);

  // --- VOICE SYNTHESIS ---
  const speakText = (text, index) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onstart = () => setSpeakingIndex(index);
    utterance.onend = () => setSpeakingIndex(null);
    window.speechSynthesis.speak(utterance);
  };

  // --- SPEECH RECOGNITION ---
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      handleSendMessage(null, transcript, true); // true flag triggers auto-voice reply
    };
    recognition.start();
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSendMessage = async (e, directText = null, isVoiceRequest = false) => {
    if (e) e.preventDefault();
    const textToSend = directText || chatInput;
    if (!textToSend.trim() || isTyping) return;

    window.speechSynthesis.cancel();
    setChatHistory(prev => [...prev, { role: 'user', text: textToSend }]);
    setChatInput("");
    setIsTyping(true);

    try {
      const serverBase = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';
      const response = await fetch(`${serverBase}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userText: textToSend }) 
      });
      const data = await response.json();
      const aiResponse = data?.text || "Telemetry Error.";
      
      const newHistory = [...chatHistory, { role: 'user', text: textToSend }, { role: 'model', text: aiResponse }];
      setChatHistory(newHistory);
      
      // Only speak if user used the microphone
      if (isVoiceRequest) {
        speakText(aiResponse, newHistory.length - 1);
      }
      
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'model', text: 'Neural link severed.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#020203] p-4 pt-[80px] font-sans overflow-hidden relative selection:bg-cyan-500/30">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-600/20 blur-[130px] rounded-full" 
        />
      </div>

      {/* CHAT TERMINAL */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl h-[720px] max-h-[calc(100vh-120px)] flex flex-col bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden relative ring-1 ring-white/10"
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-10 border-b border-white/5 bg-white/[0.03] shrink-0 z-10">
          <div className="flex items-center gap-4">
            <Activity size={18} className="text-cyan-400 animate-pulse" />
            <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Surgical AI System</span>
          </div>
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 90 }}
            onClick={() => { window.speechSynthesis.cancel(); setChatHistory([]); }} 
            className="p-2 hover:bg-rose-500/10 rounded-xl text-slate-500 hover:text-rose-400 transition-all"
          >
            <Trash2 size={18} />
          </motion.button>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide z-10">
          <AnimatePresence mode="popLayout">
            {chatHistory.map((msg, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-4 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                    msg.role === 'user' ? 'bg-blue-600/10 border-blue-500/20' : 'bg-cyan-600/10 border-cyan-500/20'
                  }`}>
                    {msg.role === 'user' ? <Fingerprint size={18} className="text-blue-400" /> : <Bot size={18} className="text-cyan-400" />}
                  </div>
                  <div className={`p-5 rounded-[1.8rem] text-[14.5px] leading-relaxed shadow-lg ${
                    msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white/[0.05] border border-white/10 text-slate-200 rounded-tl-none backdrop-blur-md'
                  }`}>
                    {msg.text}
                    {msg.role === 'model' && speakingIndex === idx && (
                      <div className="mt-3 flex gap-1 items-end h-3">
                        {[1, 2, 3].map(i => (
                          <motion.div key={i} animate={{ height: [2, 12, 2] }} transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }} className="w-1 bg-cyan-400 rounded-full" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>

        {/* INPUT Section */}
        <div className="p-6 bg-white/[0.01] border-t border-white/5 shrink-0 z-10">
          <div className="flex gap-4 items-center max-w-4xl mx-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startListening}
              className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
                isListening 
                ? 'bg-rose-500 border-rose-400 text-white animate-pulse shadow-[0_0_20px_rgba(244,63,94,0.4)]' 
                : 'bg-white/5 border-white/10 text-cyan-400 hover:border-cyan-400/40'
              }`}
            >
              {isListening ? <Waves size={24} /> : <Mic size={24} />}
            </motion.button>

            <div className="relative flex-1 group">
              <input 
                type="text" 
                value={chatInput} 
                onChange={(e) => setChatInput(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(null, null, false)}
                placeholder={isListening ? "System is listening..." : "Ask your assistant..."} 
                className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-600" 
              />
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              onClick={() => handleSendMessage(null, null, false)}
              className="p-5 bg-gradient-to-br from-cyan-600 to-blue-600 text-white rounded-2xl shadow-lg"
            >
              <Send size={24} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default AIChatbotPage;