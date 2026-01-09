



import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Float, Html } from '@react-three/drei';
import { 
  Heart, Brain, Wind, Eye, User, Search, X, 
  Activity, ChevronRight, Cpu, Layers 
} from 'lucide-react';

// Standard CDN Prefix to ensure GitHub files load correctly (Fixes Skeleton & Eye)
const CDN_URL = "https://cdn.jsdelivr.net/gh/Maithiliraut9526/project-components@main";

function AnatomicalModel({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

const ModelDashboard = () => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const models = [
    {
      id: "m1",
      name: "Respiratory System",
      category: "Respiratory",
      description: "Primary gas exchange network including the lungs and bronchial tree.",
      longDescription: "A biological air filtration and oxygenation plant. This system utilizes the pressure differential created by the diaphragm to facilitate passive gas exchange at the alveolar level.",
      specs: ["Alveolar Surface: 70m²", "Capacity: 6000mL", "pH Balance: 7.4"],
      icon: <Wind size={18} />,
      image: "https://www.bing.com/th/id/OIP.rhlFOXLDbOrdt3r33-5ngQHaE8?w=284&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
      color: "text-cyan-400",
      glb: `${CDN_URL}/respiratory_system.glb` 
    },
    {
      id: "m2",
      name: "Cerebral Cortex",
      category: "Neurology",
      description: "Central command center for processing sensory data and cognitive function.",
      longDescription: "The most complex biological structure known. It regulates everything from autonomous heart rates to abstract philosophical reasoning.",
      specs: ["Latency: 2ms", "Power: 20 Watts", "Storage: 2.5 PB"],
      icon: <Brain size={18} />,
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800",
      color: "text-purple-500",
      glb: `${CDN_URL}/brain_diagram.glb` 
    },
    {
      id: "m3",
      name: "Human Heart",
      category: "Cardiology",
      description: "Muscular pump driving the systemic and pulmonary circulatory loops.",
      longDescription: "A dual-circuit pump that operates autonomously via the sinoatrial node. It maintains hemodynamic stability across the entire organism.",
      specs: ["Stroke Vol: 70mL", "Cycles: 2.5B Life", "Mass: 300g"],
      icon: <Heart size={18} />,
      image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800",
      color: "text-rose-500",
      glb: `${CDN_URL}/heart.glb` 
    },
    {
      id: "m4",
      name: "Ocular Structure",
      category: "Visual",
      description: "Advanced light-capturing system for spatial and color perception.",
      longDescription: "A sophisticated optical array that processes photic stimuli into neural signals via the optic nerve.",
      specs: ["Field: 210 Deg", "Cells: 125M Rods", "Aperture: f/2.1"],
      icon: <Eye size={18} />,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6HUGapo9M0DsaojaWhe9H7_NQSa1Wh7E_iJEiccGKrguYiBgiw2X9Cf9Iyea4qa6ximUPh6-83bpjXfZIswTD8RbiTLzeoPyTBEelO4ceFFiNkPb2hiy2csyf2w8BYmAWK6vEDgVEImJ0m-PHsQKMROb2WCDKuQcnZkjPuPjqXegdcKnr7edml2C3YSFKpChmYOwOy1NKXKbn2QThOP9PCYL7hgRtNRouPtqeOKIudhjZ1__wZOgYUCccqJsAqgED_DQNxgP_v7g",
      color: "text-amber-500",
      glb: `${CDN_URL}/realistic_human_eye.glb`
    },
    {
      id: "m5",
      name: "Human Skeleton",
      category: "Orthopedic",
      description: "Rigid framework providing structural support and vital organ protection.",
      longDescription: "A dynamic mineralized scaffold. Not only provides structure but acts as a factory for hematopoiesis.",
      specs: ["Density: 1.8g/cm³", "Marrow: Red/Yellow", "Tensile: High"],
      icon: <User size={18} />,
      image: "https://tse1.mm.bing.net/th/id/OIP.-E2tOKDo4RU2z0uqKEEoDgHaFj?pid=Api&P=0&h=180",
      color: "text-blue-400",
      glb: `${CDN_URL}/skeleton.glb`
    }
  ];

  const categories = ["All", "Respiratory", "Neurology", "Cardiology", "Visual", "Orthopedic"];

  const filteredModels = models.filter(model => {
    const matchesCategory = activeCategory === "All" || model.category === activeCategory;
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-300 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <div className="h-20 w-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* HEADER & FILTER */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 py-12 border-b border-white/5 mb-12">
          <div className="relative w-full lg:max-w-md group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search anatomical systems..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/40 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm font-medium focus:outline-none focus:border-cyan-500/40 focus:bg-slate-900/80 transition-all text-white placeholder:text-slate-600"
            />
          </div>

          <nav className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                  activeCategory === cat 
                  ? 'bg-cyan-600 border-cyan-400/50 text-white shadow-[0_0_20px_rgba(6,182,212,0.2)]' 
                  : 'bg-slate-900/40 border-white/5 text-slate-500 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>

        {/* GRID (Now shows only 5 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
          {filteredModels.map(model => (
            <div key={model.id} className="group relative bg-slate-900/20 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-cyan-500/40 transition-all duration-500 shadow-xl flex flex-col h-full">
              <div className="relative h-56 bg-black overflow-hidden">
                <img src={model.image} alt={`${model.name} thumbnail`} className="w-full h-full object-cover opacity-60 brightness-125 group-hover:scale-110 group-hover:opacity-100 group-hover:brightness-150 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent" />
                <div className={`absolute bottom-6 left-8 p-3 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 ${model.color}`}>
                  {model.icon}
                </div>
              </div>

              <div className="p-8 flex-grow">
                <span className="text-[9px] text-cyan-500 font-black uppercase tracking-[0.25em] mb-2 block">{model.category}</span>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{model.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{model.description}</p>
              </div>

              <div className="px-8 pb-8">
                <button 
                  onClick={() => setSelectedModel(model)}
                  className="w-full py-4 bg-white/5 hover:bg-cyan-600 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group/btn flex items-center justify-center gap-3 overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-200 group-hover/btn:text-white transition-colors">Analyze Structure</span>
                  <ChevronRight size={14} className="text-slate-400 group-hover/btn:text-white translate-x-0 group-hover/btn:translate-x-1 transition-all" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL VIEWER */}
        {selectedModel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070a]/95 backdrop-blur-3xl animate-in fade-in duration-300">
            <div className="relative w-full h-full flex flex-col lg:flex-row max-w-screen-2xl mx-auto p-6 lg:p-12 items-center">
              
              <div className="w-full lg:w-[450px] flex-shrink-0 flex flex-col justify-center animate-in slide-in-from-left duration-500 z-10 lg:pr-12">
                <div className={`inline-flex items-center gap-3 mb-6 ${selectedModel.color}`}>
                  {selectedModel.icon}
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Structural Analysis</span>
                </div>
                
                <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 uppercase tracking-tighter italic leading-none">{selectedModel.name}</h2>
                <p className="text-base text-slate-300 font-light leading-relaxed mb-8 border-l-2 border-cyan-500/30 pl-6">{selectedModel.longDescription}</p>

                <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 mb-8">
                  <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Cpu size={14} /> System Specifications
                  </h4>
                  <div className="space-y-4">
                    {selectedModel.specs?.map((spec, i) => (
                      <div key={i} className="flex items-center justify-between text-sm border-b border-white/[0.03] pb-3 last:border-0">
                        <span className="text-slate-500">{spec.split(':')[0]}</span>
                        <span className="text-white font-mono font-bold tracking-tight">{spec.split(':')[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 py-5 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2">
                    <Activity size={14} /> Active Feed
                  </button>
                  <button onClick={() => setSelectedModel(null)} className="px-8 py-5 bg-white/5 hover:bg-white/10 text-slate-400 font-black text-[10px] uppercase rounded-2xl border border-white/10 transition-all flex items-center gap-2">
                    <X size={14} /> Close
                  </button>
                </div>
              </div>

              <div className="flex-1 w-full h-full flex items-center justify-center relative mt-8 lg:mt-0">
                <div className="w-full h-full max-w-2xl aspect-square relative flex items-center justify-center">
                    <div className="absolute inset-0 border border-cyan-500/10 rounded-full animate-[spin_60s_linear_infinite]" />
                    <div className="absolute inset-8 border border-dashed border-white/5 rounded-full animate-[spin_40s_linear_reverse_infinite]" />
                    
                    <div className="absolute inset-4 rounded-full overflow-hidden bg-slate-900/20 border border-white/10 shadow-[0_0_80px_rgba(6,182,212,0.1)]">
                        {selectedModel.glb ? (
                          <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
                            <Suspense fallback={<Html center className="text-cyan-500 font-mono text-[10px]">SYNCING_DATA...</Html>}>
                                <Stage environment="city" intensity={0.5} contactShadow={false}>
                                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                                        <AnatomicalModel url={selectedModel.glb} />
                                    </Float>
                                </Stage>
                                <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.5} />
                            </Suspense>
                          </Canvas>
                        ) : (
                          <div className="w-full h-full relative group">
                            <img src={selectedModel.image} alt={selectedModel.name} className="w-full h-full object-cover mix-blend-screen opacity-50 transition-transform duration-[20s] group-hover:scale-125" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-500/50">3D_MODEL_OFFLINE</span>
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 opacity-[0.1] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
                    </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer { animation: shimmer 2s infinite; }
      `}} />
    </div>
  );
};

export default ModelDashboard;