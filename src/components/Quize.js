import React, { useState, useEffect, useRef } from 'react';
import { Brain, Heart, Sparkles, RotateCcw, Eye, Wind, Activity, Clock, BarChart3, ShieldCheck } from 'lucide-react';

const FlashcardSystem = () => {
  const [studyData, setStudyData] = useState({ Heart: 0, Brain: 0, Eye: 0, Respiratory: 0 });
  const [currentOrgan, setCurrentOrgan] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (timerActive && currentOrgan) {
      timerRef.current = setInterval(() => {
        setStudyData(prev => ({
          ...prev,
          [currentOrgan]: prev[currentOrgan] + 1
        }));
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerActive, currentOrgan]);

  const handleFlip = (index) => setFlippedIndex(flippedIndex === index ? null : index);

  const getLocalCards = (organ) => {
    const database = {
      Heart: [
        { q: "What is the primary pacemaker of the heart?", a: "The Sinoatrial (SA) node, located in the right atrium." },
        { q: "Define Cardiac Output.", a: "The volume of blood pumped by the heart per minute (CO = HR × SV)." },
        { q: "What are the three layers of the heart wall?", a: "Epicardium, Myocardium, and Endocardium." },
        { q: "Which valve separates the left atrium and ventricle?", a: "The Mitral (Bicuspid) valve." }
      ],
      Brain: [
        { q: "Which lobe is responsible for processing visual information?", a: "The Occipital lobe." },
        { q: "What structure connects the two cerebral hemispheres?", a: "The Corpus Callosum." },
        { q: "What are the three parts of the brainstem?", a: "Midbrain, Pons, and Medulla Oblongata." },
        { q: "Role of the Blood-Brain Barrier (BBB)?", a: "Highly selective semipermeable border that protects the brain from circulating toxins." }
      ],
      Eye: [
        { q: "What is the function of the Retina?", a: "To receive light, convert it to neural signals, and send it to the brain." },
        { q: "What are Photoreceptors?", a: "Specialized cells (Rods and Cones) that convert light energy into electrical signals." }
      ],
      Respiratory: [
        { q: "Where does gas exchange occur?", a: "In the Alveoli, the tiny air sacs at the end of the bronchioles." },
        { q: "What is the primary muscle of inspiration?", a: "The Diaphragm." }
      ]
    };
    return database[organ] || database['Heart'];
  };

  const generateAIContent = async () => {
    if (!currentOrgan) return;
    setIsGenerating(true);
    setTimerActive(false); 
    setFlippedIndex(null);
    try {
      const serverBase = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';
      const response = await fetch(`${serverBase}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userText: `Create 4 high-yield anatomy flashcards for the ${currentOrgan} system. JSON format: {"cards": [{"q": "...", "a": "..."}]}` 
        })
      });
      const result = await response.json();
      if (response.status === 429 || result.error) throw new Error('Quota');
      const textResponse = result?.text || JSON.stringify(result?.raw) || '';
      const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        setFlashcards(JSON.parse(jsonMatch[0]).cards || []);
        setTimerActive(true); 
      }
    } catch (error) {
      setFlashcards(getLocalCards(currentOrgan));
      setTimerActive(true);
    } finally { setIsGenerating(false); }
  };

  const resetSession = () => {
    setStudyData({ Heart: 0, Brain: 0, Eye: 0, Respiratory: 0 });
    setFlashcards([]);
    setCurrentOrgan(null);
    setTimerActive(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pt-12">
      <div className="w-full border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 mb-10 mt-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-end">
          <button onClick={resetSession} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-rose-950/20 hover:text-rose-400 transition-all text-xs border border-slate-800 text-slate-400 font-bold uppercase tracking-widest">
            <RotateCcw size={14} /> Reset Session
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-6 gap-8">
          <section className="lg:col-span-2">
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-6 shadow-2xl backdrop-blur-xl">
              <h2 className="text-xs font-black mb-6 text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <BarChart3 size={16} /> Bio-Metrics
              </h2>
              <div className="space-y-3">
                {[
                  { id: 'Heart', name: 'Cardiac Unit', icon: Heart, color: 'text-rose-500' },
                  { id: 'Brain', name: 'Neural Core', icon: Brain, color: 'text-purple-500' },
                  { id: 'Eye', name: 'Ocular Optic', icon: Eye, color: 'text-amber-500' },
                  { id: 'Respiratory', name: 'Pulmonary', icon: Wind, color: 'text-blue-400' }
                ].map((organ) => (
                  <button
                    key={organ.id}
                    onClick={() => { setCurrentOrgan(organ.id); setFlashcards([]); setTimerActive(false); }}
                    className={`w-full p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                      currentOrgan === organ.id ? 'bg-slate-800 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'bg-slate-950/50 border-slate-900 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <organ.icon className={`${organ.color} ${currentOrgan === organ.id && timerActive ? 'animate-pulse' : ''}`} size={26} />
                      <span className="font-bold text-lg tracking-tight">{organ.name}</span>
                    </div>
                    <div className="font-mono text-lg font-bold text-slate-400">
                      {studyData[organ.id]}<span className="text-[10px] ml-1 opacity-40 uppercase font-sans">sec</span>
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={generateAIContent} disabled={isGenerating || !currentOrgan} className="w-full mt-8 py-6 rounded-3xl bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-xl shadow-cyan-900/10">
                {isGenerating ? "Synthesizing..." : <><Sparkles size={18} /> Generate Intelligence</>}
              </button>
            </div>
          </section>

          <section className="lg:col-span-4">
            {!flashcards.length ? (
              <div className="h-full min-h-[480px] border border-slate-900 rounded-[3.5rem] bg-slate-900/10 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                   <Activity size={380} className="text-cyan-500/[0.02] animate-pulse" />
                </div>
                <div className="relative z-10 flex flex-col items-center text-center px-10">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-cyan-500/20 blur-3xl animate-pulse scale-150"></div>
                    <div className="w-28 h-28 rounded-full border-2 border-cyan-500/20 bg-slate-950 flex items-center justify-center relative z-10 shadow-2xl">
                        <Activity size={48} className="text-cyan-400 animate-bounce" />
                    </div>
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-[0.5em] text-white mb-3">Initialize Link</h3>
                  <p className="max-w-xs text-xs text-slate-500 font-bold uppercase tracking-widest leading-loose">
                    Select a biological system to begin real-time neural tracking and intelligence generation.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {flashcards.slice(0, 4).map((card, idx) => (
                  <div key={idx} className="group h-64 [perspective:1000px] cursor-pointer" onClick={() => handleFlip(idx)}>
                    <div className={`relative h-full w-full rounded-3xl transition-all duration-500 [transform-style:preserve-3d] shadow-lg ${flippedIndex === idx ? '[transform:rotateY(180deg)]' : ''}`}>
                      <div className="absolute inset-0 h-full w-full rounded-3xl bg-slate-900 border border-slate-800 p-8 [backface-visibility:hidden] flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Protocol Query {idx + 1}</span>
                            <ShieldCheck size={16} className="text-cyan-500/20" />
                        </div>
                        <div className="overflow-y-auto pr-2 custom-scrollbar flex-grow">
                            <p className="text-xl font-bold text-slate-100 leading-tight">{card.q}</p>
                        </div>
                        <div className="mt-4 text-[9px] font-black text-slate-700 uppercase tracking-widest">Flip for Analysis</div>
                      </div>
                      <div className="absolute inset-0 h-full w-full rounded-3xl bg-gradient-to-br from-slate-900 to-cyan-950 border border-cyan-500/30 p-8 text-white [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col shadow-inner">
                        <span className="text-[10px] font-black text-cyan-400 mb-4 uppercase tracking-widest">Analysis</span>
                        <div className="overflow-y-auto pr-2 custom-scrollbar flex-grow">
                            <p className="text-lg font-medium text-cyan-50 leading-relaxed italic">"{card.a}"</p>
                        </div>
                        <div className="mt-6 flex justify-between items-center opacity-60">
                             <span className="text-[9px] font-black uppercase tracking-widest">Logic Verified</span>
                             <Clock size={16} className="text-cyan-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #0e7490; border-radius: 10px; }
      `}} />
    </div>
  );
};

export default FlashcardSystem;