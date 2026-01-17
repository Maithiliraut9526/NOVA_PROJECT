


//code to implement
import React, { useState, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Heart, Brain, Wind, Eye, User, Search, X, 
  Activity, ChevronRight, Cpu, Layers, Volume2 
} from 'lucide-react';

// Standard CDN Prefix to ensure GitHub files load correctly (Fixes Skeleton & Eye)
const CDN_URL = "https://cdn.jsdelivr.net/gh/Maithiliraut9526/project-components@main";

// Function to fetch anatomical information from Wikipedia
const fetchAnatomicalInfo = async (bodyPart) => {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(bodyPart)}?redirect=true`
    );
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    return data.extract || `Information about ${bodyPart} not found.`;
  } catch (error) {
    console.error('Error fetching info:', error);
    return `Unable to fetch information about ${bodyPart}. Please try again.`;
  }
};

// --- HOTSPOT COMPONENT (Labels Only on Model) ---
const Hotspot = ({ position, label, info, onActive }) => {
  const handleClick = async (e) => {
    try {
      e.stopPropagation();
      if (onActive && typeof onActive === 'function') {
        // Fetch info from Wikipedia if not already fetched
        let fetchedInfo = info;
        if (!info || info.startsWith('Unable to fetch')) {
          fetchedInfo = await fetchAnatomicalInfo(label);
        }
        onActive(label, fetchedInfo);
      }
    } catch (error) {
      console.error('Error in hotspot click handler:', error);
    }
  };

  return (
    <group position={position}>
      <Html 
        position={[0, 0, 0]} 
        center 
        distanceFactor={0.45}
        occlude={false}
        scale={1}
      >
        <div
          onClick={handleClick}
          className="cursor-pointer pointer-events-auto select-none"
          style={{
            textShadow: '0 0 30px rgba(0, 212, 255, 1), 0 0 50px rgba(0, 212, 255, 0.8), 0 0 80px rgba(0, 212, 255, 0.5)',
            filter: 'drop-shadow(0 0 15px rgba(0, 212, 255, 0.9))',
          }}
        >
          <span className="text-[56px] md:text-[76px] lg:text-[120px] text-cyan-100 font-black tracking-wider uppercase whitespace-nowrap bg-gradient-to-b from-black/96 to-black/90 px-16 py-8 rounded-2xl border-4 border-cyan-300/100 shadow-2xl hover:bg-black/85 transition-colors" style={{
            textShadow: '0 0 40px rgba(0, 212, 255, 1), 0 0 25px rgba(0, 212, 255, 0.9), 0 0 15px rgba(0, 212, 255, 0.8)',
            letterSpacing: '0.15em',
          }}>
            {label}
          </span>
        </div>
      </Html>
    </group>
  );
};

function AnatomicalModel({ url, showHotspots, hotspots, onPartClick, cameraTarget }) {
  const { scene } = useGLTF(url);
  return (
    <group>
      <primitive object={scene} />
      {showHotspots && hotspots?.map((spot, idx) => (
        <Hotspot 
          key={idx} 
          position={spot.pos} 
          label={spot.name} 
          info={spot.info} 
          onActive={onPartClick} 
        />
      ))}
    </group>
  );
}

// Canvas component with camera controls
function CanvasWithControls({ model, onPartClick, cameraTarget }) {
  const handleCanvasClick = (e) => {
    try {
      // Only handle clicks on the canvas background, not on hotspots
      if (e.object && e.object.userData && e.object.userData.isHotspot) {
        return;
      }
    } catch (error) {
      console.error('Canvas click error:', error);
    }
  };

  return (
    <Canvas 
      camera={{ position: [0, 0, 5], fov: 35 }}
      onClick={handleCanvasClick}
    >
      <Suspense fallback={<Html center className="text-cyan-500 font-mono text-[10px]">SYNCING_DATA...</Html>}>
          <CameraController cameraTarget={cameraTarget} />
          <Stage environment="city" intensity={0.5} contactShadow={false}>
              <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                  <AnatomicalModel 
                    url={model.glb}
                    showHotspots={true}
                    hotspots={model.hotspots}
                    onPartClick={onPartClick}
                    cameraTarget={cameraTarget}
                  />
              </Float>
          </Stage>
          <OrbitControls 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.5} 
          />
      </Suspense>
    </Canvas>
  );
}

// Camera controller component
function CameraController({ cameraTarget }) {
  const { camera } = useThree();
  const controlsRef = React.useRef();

  React.useEffect(() => {
    if (cameraTarget) {
      // Smooth camera movement to target
      const targetPos = {
        x: cameraTarget[0] * 2.5,
        y: cameraTarget[1] * 2.5,
        z: cameraTarget[2] * 2.5 + 3
      };

      const targetLookAt = {
        x: cameraTarget[0],
        y: cameraTarget[1],
        z: cameraTarget[2]
      };

      const startPos = { ...camera.position };
      let progress = 0;
      const duration = 800; // ms
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-in-out-cubic)
        const easeProgress = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        camera.position.x = startPos.x + (targetPos.x - startPos.x) * easeProgress;
        camera.position.y = startPos.y + (targetPos.y - startPos.y) * easeProgress;
        camera.position.z = startPos.z + (targetPos.z - startPos.z) * easeProgress;

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    }
  }, [cameraTarget, camera]);

  return null;
}

const ModelDashboard = () => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeInfo, setActiveInfo] = useState(null);
  const [cameraTarget, setCameraTarget] = useState(null);

  // Load voices on component mount
  React.useEffect(() => {
    console.log('ModelDashboard mounted');
    
    // Preload voices
    const preloadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      console.log('Voices available:', voices.length);
      voices.forEach((voice, idx) => {
        console.log(`Voice ${idx}: ${voice.name} (${voice.lang})`);
      });
    };
    
    // Call immediately
    preloadVoices();
    
    // Also listen for voices to load
    const handleVoicesChanged = () => {
      console.log('Voices changed event fired');
      preloadVoices();
    };
    
    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
    
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
    };
  }, []);

  // Handle voice output and camera movement to organ
  const handleVoice = (label, info) => {
    setActiveInfo({ label, info });
    
    console.log('🎙️ VOICE REQUEST for:', label);
    console.log('Text:', info.substring(0, 80) + '...');
    
    try {
      // Step 1: Ensure speechSynthesis API exists
      if (!window.speechSynthesis) {
        console.error('❌ Speech Synthesis API not available in this browser');
        alert('Voice output not available on your browser');
        return;
      }
      
      // Step 2: Cancel any existing speech
      window.speechSynthesis.cancel();
      console.log('✓ Cancelled any previous speech');
      
      // Step 3: Get voices - try multiple times if needed
      let voices = window.speechSynthesis.getVoices();
      console.log('Available voices:', voices.length);
      
      if (voices.length === 0) {
        console.warn('⚠️ No voices loaded yet, waiting for voiceschanged event...');
        const handleVoicesReady = () => {
          voices = window.speechSynthesis.getVoices();
          console.log('✓ Voices loaded:', voices.length);
          window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesReady);
          playVoice();
        };
        window.speechSynthesis.addEventListener('voiceschanged', handleVoicesReady);
        setTimeout(playVoice, 500); // Fallback after 500ms
      } else {
        playVoice();
      }
      
      // Main voice playing function
      function playVoice() {
        try {
          // Create utterance
          const utterance = new SpeechSynthesisUtterance(info);
          
          // Get fresh voices
          const allVoices = window.speechSynthesis.getVoices();
          console.log('Total voices available:', allVoices.length);
          
          // Select best voice - prioritize by availability
          let selectedVoice = null;
          
          // Log available voice names
          if (allVoices.length > 0) {
            console.log('Available voice names:', allVoices.map(v => v.name).slice(0, 5));
          }
          
          // Try different voice selection strategies
          if (allVoices.length > 0) {
            // Strategy 1: Look for Google voices (usually good quality)
            selectedVoice = allVoices.find(v => v.name.includes('Google'));
            console.log('Google voice found:', !!selectedVoice);
            
            // Strategy 2: Look for native quality voices
            if (!selectedVoice) {
              selectedVoice = allVoices.find(v => v.name.includes('Microsoft') || v.name.includes('Samantha') || v.name.includes('Victoria'));
              console.log('Native quality voice found:', !!selectedVoice);
            }
            
            // Strategy 3: Look for female voices
            if (!selectedVoice) {
              selectedVoice = allVoices.find(v => v.name.toLowerCase().includes('female'));
              console.log('Female voice found:', !!selectedVoice);
            }
            
            // Strategy 4: First English voice
            if (!selectedVoice) {
              selectedVoice = allVoices.find(v => v.lang.startsWith('en'));
              console.log('English voice found:', !!selectedVoice);
            }
            
            // Strategy 5: Just use first available
            if (!selectedVoice) {
              selectedVoice = allVoices[0];
              console.log('Using first available voice');
            }
            
            if (selectedVoice) {
              utterance.voice = selectedVoice;
              console.log('✓ Selected voice:', selectedVoice.name);
            }
          }
          
          // Set audio properties to MAXIMUM
          utterance.rate = 1.0;        // Normal speed
          utterance.pitch = 1.0;       // Normal pitch
          utterance.volume = 1.0;      // Maximum volume (0.0 to 1.0)
          utterance.lang = 'en-US';
          
          console.log('Audio properties set:', {
            rate: utterance.rate,
            pitch: utterance.pitch,
            volume: utterance.volume,
            lang: utterance.lang
          });
          
          // Event listeners with detailed logging
          utterance.onstart = () => {
            console.log('✅ VOICE STARTED PLAYING');
          };
          
          utterance.onend = () => {
            console.log('✅ VOICE FINISHED PLAYING');
          };
          
          utterance.onerror = (event) => {
            console.error('❌ VOICE ERROR:', event.error);
            alert('Voice error: ' + event.error);
          };
          
          utterance.onpause = () => {
            console.log('⏸️ Voice paused');
          };
          
          utterance.onresume = () => {
            console.log('▶️ Voice resumed');
          };
          
          // Final check before speaking
          if (window.speechSynthesis.pending) {
            console.warn('⚠️ Speech synthesis pending, waiting...');
            setTimeout(() => {
              window.speechSynthesis.speak(utterance);
              console.log('✓ speak() called after pending queue');
            }, 200);
          } else {
            // Speak immediately
            console.log('📢 Calling speak()...');
            window.speechSynthesis.speak(utterance);
            console.log('✓ speak() called immediately');
          }
          
        } catch (error) {
          console.error('❌ Error in playVoice():', error);
          alert('Voice error: ' + error.message);
        }
      }
      
    } catch (error) {
      console.error('❌ Error in handleVoice:', error);
      alert('Voice system error: ' + error.message);
    }
  };

  // Handle organ click from list
  const handleOrganClick = (organName, organInfo, position) => {
    setCameraTarget(position);
    handleVoice(organName, organInfo);
  };

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
      glb: `${CDN_URL}/respiratory_system.glb`,
      hotspots: [
        { pos: [0.2, 2.2, 0.2], name: "Trachea", info: "" },
        { pos: [1.2, 1.2, 0], name: "Left Lung", info: "" },
        { pos: [-1.2, 1.2, 0], name: "Right Lung", info: "" },
        { pos: [0, -0.5, 0], name: "Diaphragm", info: "" },
      ]
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
      glb: `${CDN_URL}/brain_diagram.glb`,
      hotspots: [
        { pos: [0.6, 0.8, 0.1], name: "Frontal Lobe", info: "" },
        { pos: [-0.6, 0.8, 0.1], name: "Parietal Lobe", info: "" },
        { pos: [0.6, -0.4, 0], name: "Temporal Lobe", info: "" },
        { pos: [-0.6, -0.4, 0], name: "Occipital Lobe", info: "" },
      ]
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
      glb: `${CDN_URL}/heart.glb`,
      hotspots: [
        { pos: [0.6, 0.8, 0.15], name: "Right Atrium", info: "" },
        { pos: [-0.6, 0.8, 0.15], name: "Left Atrium", info: "" },
        { pos: [0.6, -0.3, 0.1], name: "Right Ventricle", info: "" },
        { pos: [-0.6, -0.3, 0.1], name: "Left Ventricle", info: "" },
      ]
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
      glb: `${CDN_URL}/realistic_human_eye.glb`,
      hotspots: [
        { pos: [0.2, 0.8, 0.2], name: "Cornea", info: "" },
        { pos: [0.2, 0.4, 0.3], name: "Iris", info: "" },
        { pos: [0.2, 0.4, 0.4], name: "Pupil", info: "" },
        { pos: [0.2, -0.3, 0.1], name: "Retina", info: "" },
      ]
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
      glb: `${CDN_URL}/skeleton.glb`,
      hotspots: [
        { pos: [0, 3, 0], name: "Skull", info: "" },
        { pos: [0, 1.8, 0.5], name: "Vertebral Column", info: "" },
        { pos: [0.6, 0.5, 0.3], name: "Ribs", info: "" },
        { pos: [0.4, -0.8, 0.2], name: "Femur", info: "" },
      ]
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
          <div className="fixed inset-0 z-50 bg-[#05070a] overflow-y-auto md:overflow-hidden">
            <div className="relative w-full min-h-screen md:h-screen flex flex-col md:flex-row max-w-screen-2xl mx-auto p-4 md:p-8 lg:p-12 md:items-center gap-6 md:gap-0">
              
              {/* LEFT PANEL - INFO */}
              <div className="w-full md:w-[40%] flex-shrink-0 flex flex-col justify-start md:justify-center md:max-h-screen md:overflow-y-auto pr-0 md:pr-8">
                <div className={`inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-6 ${selectedModel.color}`}>
                  {selectedModel.icon}
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest opacity-70">Structural Analysis</span>
                </div>
                
                <h2 className="text-2xl md:text-4xl lg:text-6xl font-black text-white mb-2 md:mb-4 uppercase tracking-tighter italic leading-none">{selectedModel.name}</h2>
                <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed mb-4 md:mb-6 border-l-2 border-cyan-500/30 pl-4">{selectedModel.longDescription}</p>

                {/* ACTIVE PART INFO - LARGE FORMAT */}
                {activeInfo && (
                  <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border-2 border-cyan-500/60 rounded-3xl md:rounded-4xl p-6 md:p-8 lg:p-10 mb-6 md:mb-8 shadow-2xl">
                    <h4 className="text-sm md:text-lg lg:text-xl font-black text-cyan-300 uppercase tracking-widest mb-4 md:mb-6 flex items-center gap-3">
                      <Volume2 size={18} className="md:w-6 md:h-6" /> {activeInfo.label}
                    </h4>
                    <p className="text-sm md:text-base lg:text-lg text-slate-100 leading-relaxed md:leading-loose font-medium whitespace-pre-wrap">
                      {activeInfo.info}
                    </p>
                  </div>
                )}

                {/* SYSTEM SPECS */}
                {!activeInfo && (
                  <div className="bg-white/[0.03] border border-white/5 rounded-2xl md:rounded-3xl p-4 md:p-6 mb-4 md:mb-6">
                    <h4 className="text-[8px] md:text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-3 md:mb-4 flex items-center gap-2">
                      <Cpu size={12} className="md:w-4 md:h-4" /> System Specs
                    </h4>
                    <div className="space-y-2 md:space-y-3">
                      {selectedModel.specs?.map((spec, i) => (
                        <div key={i} className="flex items-center justify-between text-[10px] md:text-xs border-b border-white/[0.03] pb-2 last:border-0">
                          <span className="text-slate-500">{spec.split(':')[0]}</span>
                          <span className="text-white font-mono font-bold tracking-tight">{spec.split(':')[1]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ORGANS LIST */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl md:rounded-3xl p-4 md:p-6 mb-4 md:mb-6 max-h-48 md:max-h-none md:overflow-y-auto">
                  <h4 className="text-[8px] md:text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-3 md:mb-4 flex items-center gap-2">
                    <Layers size={12} className="md:w-4 md:h-4" /> Components
                  </h4>
                  <div className="space-y-1 md:space-y-2">
                    {selectedModel.hotspots?.map((spot, i) => (
                      <button
                        key={i}
                        onClick={() => handleOrganClick(spot.name, spot.info, spot.pos)}
                        className={`w-full text-left px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all border ${
                          activeInfo?.label === spot.name
                            ? 'bg-cyan-600 border-cyan-400/50 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                            : 'bg-slate-900/40 border-white/5 text-slate-300 hover:bg-slate-900/60 hover:border-cyan-500/40'
                        }`}
                      >
                        • {spot.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2 md:gap-4">
                  <button className="flex-1 py-3 md:py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-[8px] md:text-[10px] uppercase tracking-widest rounded-lg md:rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2">
                    <Activity size={12} className="md:w-4 md:h-4" /> Feed
                  </button>
                  <button onClick={() => { setSelectedModel(null); setActiveInfo(null); setCameraTarget(null); window.speechSynthesis.cancel(); }} className="px-4 md:px-6 py-3 md:py-4 bg-white/5 hover:bg-white/10 text-slate-400 font-black text-[8px] md:text-[10px] uppercase rounded-lg md:rounded-2xl border border-white/10 transition-all flex items-center gap-2">
                    <X size={12} className="md:w-4 md:h-4" /> Close
                  </button>
                </div>
              </div>

              {/* RIGHT PANEL - 3D MODEL */}
              <div className="w-full md:w-[60%] h-[350px] md:h-full flex items-center justify-center relative md:flex-1">
                <div className="w-full h-full max-w-3xl aspect-square relative flex items-center justify-center">
                    <div className="absolute inset-0 border border-cyan-500/10 rounded-full animate-[spin_60s_linear_infinite]" />
                    <div className="absolute inset-8 border border-dashed border-white/5 rounded-full animate-[spin_40s_linear_reverse_infinite]" />
                    
                    <div className="absolute inset-4 rounded-full overflow-hidden bg-slate-900/20 border border-white/10 shadow-[0_0_80px_rgba(6,182,212,0.1)]">
                        {selectedModel.glb ? (
                          <CanvasWithControls
                            model={selectedModel}
                            onPartClick={handleVoice}
                            cameraTarget={cameraTarget}
                          />
                        ) : (
                          <div className="w-full h-full relative group">
                            <img src={selectedModel.image} alt={selectedModel.name} className="w-full h-full object-cover mix-blend-screen opacity-50 transition-transform duration-[20s] group-hover:scale-125" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-cyan-500/50">3D_MODEL_OFFLINE</span>
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










//second code to implement
// import React, { useState, Suspense } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Stage, useGLTF, Float, Html } from '@react-three/drei';
// import { 
//   Heart, Brain, Wind, Eye, User, Search, X, 
//   Activity, ChevronRight, Cpu, Volume2 
// } from 'lucide-react';

// const CDN_URL = "https://cdn.jsdelivr.net/gh/Maithiliraut9526/project-components@main";

// // --- HOTSPOT COMPONENT ---
// const Hotspot = ({ position, label, info, onActive }) => {
//   return (
//     <Html position={position} center>
//       <div className="group relative flex items-center justify-center">
//         <div className="absolute w-4 h-4 bg-cyan-400 rounded-full animate-ping opacity-75"></div>
//         <button 
//           onClick={(e) => {
//             e.stopPropagation();
//             onActive(label, info);
//           }}
//           className="relative w-4 h-4 bg-cyan-500 border-2 border-white rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)] hover:scale-125 transition-transform"
//         />
//         <div className="absolute left-6 px-2 py-1 bg-black/80 border border-white/20 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity uppercase font-bold tracking-widest">
//           {label}
//         </div>
//       </div>
//     </Html>
//   );
// };

// // --- UPDATED ANATOMICAL MODEL COMPONENT ---
// function AnatomicalModel({ url, showHotspots, onPartClick }) {
//   const { scene } = useGLTF(url);
  
//   // Specific hotspots for Respiratory System
//   const respiratoryHotspots = [
//     { pos: [0, 1.8, 0.2], name: "Trachea", info: "The trachea is a cartilaginous tube that connects the larynx to the bronchi." },
//     { pos: [0.8, 0.5, 0.5], name: "Left Lung", info: "The lungs facilitate gas exchange, bringing oxygen into the bloodstream." },
//     { pos: [-0.8, 0.5, 0.5], name: "Right Lung", info: "The right lung is slightly larger than the left and consists of three lobes." },
//     { pos: [0, -1.2, 0.3], name: "Diaphragm", info: "The diaphragm is the primary muscle used in breathing." },
//   ];

//   return (
//     <group>
//       <primitive object={scene} />
//       {showHotspots && respiratoryHotspots.map((spot, idx) => (
//         <Hotspot 
//           key={idx} 
//           position={spot.pos} 
//           label={spot.name} 
//           info={spot.info} 
//           onActive={onPartClick} 
//         />
//       ))}
//     </group>
//   );
// }

// const ModelDashboard = () => {
//   const [selectedModel, setSelectedModel] = useState(null);
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeInfo, setActiveInfo] = useState("");

//   const handleVoice = (label, info) => {
//     window.speechSynthesis.cancel();
//     setActiveInfo({ label, info });
//     const utterance = new SpeechSynthesisUtterance(info);
//     utterance.rate = 0.9;
//     window.speechSynthesis.speak(utterance);
//   };

//   const models = [
//     {
//       id: "m1",
//       name: "Respiratory System",
//       category: "Respiratory",
//       description: "Primary gas exchange network including the lungs and bronchial tree.",
//       longDescription: "A biological air filtration and oxygenation plant. This system utilizes the pressure differential created by the diaphragm to facilitate passive gas exchange.",
//       specs: ["Alveolar Surface: 70m²", "Capacity: 6000mL", "pH Balance: 7.4"],
//       icon: <Wind size={18} />,
//       image: "https://www.bing.com/th/id/OIP.rhlFOXLDbOrdt3r33-5ngQHaE8?w=284&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
//       color: "text-cyan-400",
//       glb: `${CDN_URL}/respiratory_system.glb` 
//     },
//     {
//       id: "m2",
//       name: "Cerebral Cortex",
//       category: "Neurology",
//       description: "Central command center for processing sensory data and cognitive function.",
//       longDescription: "The most complex biological structure known. It regulates everything from autonomous heart rates to abstract reasoning.",
//       specs: ["Latency: 2ms", "Power: 20 Watts", "Storage: 2.5 PB"],
//       icon: <Brain size={18} />,
//       image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800",
//       color: "text-purple-500",
//       glb: `${CDN_URL}/brain_diagram.glb` 
//     },
//     {
//       id: "m3",
//       name: "Human Heart",
//       category: "Cardiology",
//       description: "Muscular pump driving the systemic and pulmonary circulatory loops.",
//       longDescription: "A dual-circuit pump that operates autonomously via the sinoatrial node. It maintains hemodynamic stability.",
//       specs: ["Stroke Vol: 70mL", "Cycles: 2.5B Life", "Mass: 300g"],
//       icon: <Heart size={18} />,
//       image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800",
//       color: "text-rose-500",
//       glb: `${CDN_URL}/heart.glb` 
//     },
//     {
//       id: "m4",
//       name: "Ocular Structure",
//       category: "Visual",
//       description: "Advanced light-capturing system for spatial and color perception.",
//       longDescription: "A sophisticated optical array that processes photic stimuli into neural signals via the optic nerve.",
//       specs: ["Field: 210 Deg", "Cells: 125M Rods", "Aperture: f/2.1"],
//       icon: <Eye size={18} />,
//       image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6HUGapo9M0DsaojaWhe9H7_NQSa1Wh7E_iJEiccGKrguYiBgiw2X9Cf9Iyea4qa6ximUPh6-83bpjXfZIswTD8RbiTLzeoPyTBEelO4ceFFiNkPb2hiy2csyf2w8BYmAWK6vEDgVEImJ0m-PHsQKMROb2WCDKuQcnZkjPuPjqXegdcKnr7edml2C3YSFKpChmYOwOy1NKXKbn2QThOP9PCYL7hgRtNRouPtqeOKIudhjZ1__wZOgYUCccqJsAqgED_DQNxgP_v7g",
//       color: "text-amber-500",
//       glb: `${CDN_URL}/realistic_human_eye.glb`
//     },
//     {
//       id: "m5",
//       name: "Human Skeleton",
//       category: "Orthopedic",
//       description: "Rigid framework providing structural support and vital organ protection.",
//       longDescription: "A dynamic mineralized scaffold. Not only provides structure but acts as a factory for hematopoiesis.",
//       specs: ["Density: 1.8g/cm³", "Marrow: Red/Yellow", "Tensile: High"],
//       icon: <User size={18} />,
//       image: "https://tse1.mm.bing.net/th/id/OIP.-E2tOKDo4RU2z0uqKEEoDgHaFj?pid=Api&P=0&h=180",
//       color: "text-blue-400",
//       glb: `${CDN_URL}/skeleton.glb`
//     }
//   ];

//   const categories = ["All", "Respiratory", "Neurology", "Cardiology", "Visual", "Orthopedic"];

//   const filteredModels = models.filter(model => {
//     const matchesCategory = activeCategory === "All" || model.category === activeCategory;
//     const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   return (
//     <div className="min-h-screen bg-[#05070a] text-slate-300 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
//       <div className="h-20 w-full" />

//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         {/* HEADER & FILTER */}
//         {!selectedModel && (
//           <>
//             <div className="flex flex-col lg:flex-row items-center justify-between gap-6 py-12 border-b border-white/5 mb-12">
//               <div className="relative w-full lg:max-w-md group">
//                 <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-400 transition-colors" size={18} />
//                 <input 
//                   type="text" 
//                   placeholder="Search anatomical systems..." 
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full bg-slate-900/40 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm font-medium focus:outline-none focus:border-cyan-500/40 focus:bg-slate-900/80 transition-all text-white placeholder:text-slate-600"
//                 />
//               </div>

//               <nav className="flex flex-wrap justify-center gap-2">
//                 {categories.map(cat => (
//                   <button
//                     key={cat}
//                     onClick={() => setActiveCategory(cat)}
//                     className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
//                       activeCategory === cat 
//                       ? 'bg-cyan-600 border-cyan-400/50 text-white shadow-[0_0_20px_rgba(6,182,212,0.2)]' 
//                       : 'bg-slate-900/40 border-white/5 text-slate-500 hover:text-slate-200'
//                     }`}
//                   >
//                     {cat}
//                   </button>
//                 ))}
//               </nav>
//             </div>

//             {/* GRID */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
//               {filteredModels.map(model => (
//                 <div key={model.id} className="group relative bg-slate-900/20 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-cyan-500/40 transition-all duration-500 shadow-xl flex flex-col h-full">
//                   <div className="relative h-56 bg-black overflow-hidden">
//                     <img src={model.image} alt={model.name} className="w-full h-full object-cover opacity-60 brightness-125 group-hover:scale-110 group-hover:opacity-100 group-hover:brightness-150 transition-all duration-1000" />
//                     <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent" />
//                     <div className={`absolute bottom-6 left-8 p-3 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 ${model.color}`}>
//                       {model.icon}
//                     </div>
//                   </div>

//                   <div className="p-8 flex-grow">
//                     <span className="text-[9px] text-cyan-500 font-black uppercase tracking-[0.25em] mb-2 block">{model.category}</span>
//                     <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{model.name}</h3>
//                     <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{model.description}</p>
//                   </div>

//                   <div className="px-8 pb-8">
//                     <button 
//                       onClick={() => setSelectedModel(model)}
//                       className="w-full py-4 bg-white/5 hover:bg-cyan-600 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group/btn flex items-center justify-center gap-3 overflow-hidden relative"
//                     >
//                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-200 group-hover/btn:text-white">Analyze Structure</span>
//                       <ChevronRight size={14} className="text-slate-400 group-hover/btn:text-white transition-all" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {/* MODAL VIEWER */}
//         {selectedModel && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070a]/95 backdrop-blur-3xl animate-in fade-in duration-300">
//             <div className="relative w-full h-full flex flex-col lg:flex-row max-w-screen-2xl mx-auto p-6 lg:p-12 items-center">
              
//               <div className="w-full lg:w-[450px] flex-shrink-0 flex flex-col justify-center animate-in slide-in-from-left duration-500 z-10 lg:pr-12">
//                 <div className={`inline-flex items-center gap-3 mb-6 ${selectedModel.color}`}>
//                   {selectedModel.icon}
//                   <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Structural Analysis</span>
//                 </div>
                
//                 <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 uppercase tracking-tighter italic leading-none">{selectedModel.name}</h2>
                
//                 {/* Active Info Display (Voice Result) */}
//                 <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 mb-8">
//                   <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-4 flex items-center gap-2">
//                     <Activity size={14} /> {activeInfo.label || "System Info"}
//                   </h4>
//                   <p className="text-sm text-slate-300 leading-relaxed">
//                     {activeInfo.info || selectedModel.longDescription}
//                   </p>
//                 </div>

//                 <div className="flex gap-4">
//                   <button 
//                     onClick={() => { window.speechSynthesis.cancel(); setSelectedModel(null); setActiveInfo(""); }}
//                     className="flex-1 py-5 bg-white/5 hover:bg-white/10 text-slate-400 font-black text-[10px] uppercase rounded-2xl border border-white/10 transition-all flex items-center justify-center gap-2"
//                   >
//                     <X size={14} /> Exit Lab
//                   </button>
//                 </div>
//               </div>

//               <div className="flex-1 w-full h-full flex items-center justify-center relative mt-8 lg:mt-0">
//                 <div className="w-full h-full max-w-2xl aspect-square relative flex items-center justify-center">
//                     <div className="absolute inset-0 border border-cyan-500/10 rounded-full animate-[spin_60s_linear_infinite]" />
//                     <div className="absolute inset-4 rounded-full overflow-hidden bg-slate-900/20 border border-white/10 shadow-[0_0_80px_rgba(6,182,212,0.1)]">
//                         {selectedModel.glb ? (
//                           <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
//                             <Suspense fallback={<Html center className="text-cyan-500 font-mono text-[10px]">SYNCING_DATA...</Html>}>
//                                 <Stage environment="city" intensity={0.5} contactShadow={false}>
//                                     <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
//                                         <AnatomicalModel 
//                                           url={selectedModel.glb} 
//                                           showHotspots={selectedModel.category === "Respiratory"}
//                                           onPartClick={handleVoice}
//                                         />
//                                     </Float>
//                                 </Stage>
//                                 <OrbitControls enablePan={false} autoRotate={!activeInfo} autoRotateSpeed={0.5} />
//                             </Suspense>
//                           </Canvas>
//                         ) : (
//                           <div className="w-full h-full relative group">
//                             <img src={selectedModel.image} alt={selectedModel.name} className="w-full h-full object-cover mix-blend-screen opacity-50" />
//                           </div>
//                         )}
//                     </div>
//                 </div>
//               </div>

//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ModelDashboard;


// import React, { useState, Suspense, useEffect } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Stage, useGLTF, Float, Html } from '@react-three/drei';
// import { 
//   Heart, Brain, Wind, Eye, User, Search, X, 
//   Activity, ChevronRight, Cpu, Layers 
// } from 'lucide-react';

// const CDN_URL = "https://cdn.jsdelivr.net/gh/Maithiliraut9526/project-components@main";

// function AnatomicalModel({ url }) {
//   const { scene } = useGLTF(url);
//   return <primitive object={scene} />;
// }

// const ModelDashboard = () => {
//   const [selectedModel, setSelectedModel] = useState(null);
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
  
//   // Added to handle responsive camera zoom
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const models = [
//     {
//       id: "m1",
//       name: "Respiratory System",
//       category: "Respiratory",
//       description: "Primary gas exchange network including the lungs and bronchial tree.",
//       longDescription: "A biological air filtration and oxygenation plant. This system utilizes the pressure differential created by the diaphragm to facilitate passive gas exchange at the alveolar level.",
//       specs: ["Alveolar Surface: 70m²", "Capacity: 6000mL", "pH Balance: 7.4"],
//       icon: <Wind size={18} />,
//       image: "https://www.bing.com/th/id/OIP.rhlFOXLDbOrdt3r33-5ngQHaE8?w=284&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
//       color: "text-cyan-400",
//       glb: `${CDN_URL}/respiratory_system.glb` 
//     },
//     {
//         id: "m2",
//         name: "Cerebral Cortex",
//         category: "Neurology",
//         description: "Central command center for processing sensory data and cognitive function.",
//         longDescription: "The most complex biological structure known. It regulates everything from autonomous heart rates to abstract philosophical reasoning.",
//         specs: ["Latency: 2ms", "Power: 20 Watts", "Storage: 2.5 PB"],
//         icon: <Brain size={18} />,
//         image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800",
//         color: "text-purple-500",
//         glb: `${CDN_URL}/brain_diagram.glb` 
//     },
//     {
//         id: "m3",
//         name: "Human Heart",
//         category: "Cardiology",
//         description: "Muscular pump driving the systemic and pulmonary circulatory loops.",
//         longDescription: "A dual-circuit pump that operates autonomously via the sinoatrial node. It maintains hemodynamic stability across the entire organism.",
//         specs: ["Stroke Vol: 70mL", "Cycles: 2.5B Life", "Mass: 300g"],
//         icon: <Heart size={18} />,
//         image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800",
//         color: "text-rose-500",
//         glb: `${CDN_URL}/heart.glb` 
//     },
//     {
//         id: "m4",
//         name: "Ocular Structure",
//         category: "Visual",
//         description: "Advanced light-capturing system for spatial and color perception.",
//         longDescription: "A sophisticated optical array that processes photic stimuli into neural signals via the optic nerve.",
//         specs: ["Field: 210 Deg", "Cells: 125M Rods", "Aperture: f/2.1"],
//         icon: <Eye size={18} />,
//         image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6HUGapo9M0DsaojaWhe9H7_NQSa1Wh7E_iJEiccGKrguYiBgiw2X9Cf9Iyea4qa6ximUPh6-83bpjXfZIswTD8RbiTLzeoPyTBEelO4ceFFiNkPb2hiy2csyf2w8BYmAWK6vEDgVEImJ0m-PHsQKMROb2WCDKuQcnZkjPuPjqXegdcKnr7edml2C3YSFKpChmYOwOy1NKXKbn2QThOP9PCYL7hgRtNRouPtqeOKIudhjZ1__wZOgYUCccqJsAqgED_DQNxgP_v7g",
//         color: "text-amber-500",
//         glb: `${CDN_URL}/realistic_human_eye.glb`
//     },
//     {
//         id: "m5",
//         name: "Human Skeleton",
//         category: "Orthopedic",
//         description: "Rigid framework providing structural support and vital organ protection.",
//         longDescription: "A dynamic mineralized scaffold. Not only provides structure but acts as a factory for hematopoiesis.",
//         specs: ["Density: 1.8g/cm³", "Marrow: Red/Yellow", "Tensile: High"],
//         icon: <User size={18} />,
//         image: "https://tse1.mm.bing.net/th/id/OIP.-E2tOKDo4RU2z0uqKEEoDgHaFj?pid=Api&P=0&h=180",
//         color: "text-blue-400",
//         glb: `${CDN_URL}/skeleton.glb`
//     }
//   ];

//   const categories = ["All", "Respiratory", "Neurology", "Cardiology", "Visual", "Orthopedic"];

//   const filteredModels = models.filter(model => {
//     const matchesCategory = activeCategory === "All" || model.category === activeCategory;
//     const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   return (
//     <div className="min-h-screen bg-[#05070a] text-slate-300 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
//       <div className="h-20 w-full" />

//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         {/* HEADER & FILTER */}
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-6 py-12 border-b border-white/5 mb-12">
//           <div className="relative w-full lg:max-w-md group">
//             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-400 transition-colors" size={18} />
//             <input 
//               type="text" 
//               placeholder="Search anatomical systems..." 
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full bg-slate-900/40 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm font-medium focus:outline-none focus:border-cyan-500/40 focus:bg-slate-900/80 transition-all text-white placeholder:text-slate-600"
//             />
//           </div>

//           <nav className="flex flex-wrap justify-center gap-2">
//             {categories.map(cat => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat)}
//                 className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
//                   activeCategory === cat 
//                   ? 'bg-cyan-600 border-cyan-400/50 text-white shadow-[0_0_20px_rgba(6,182,212,0.2)]' 
//                   : 'bg-slate-900/40 border-white/5 text-slate-500 hover:text-slate-200'
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </nav>
//         </div>

//         {/* GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
//           {filteredModels.map(model => (
//             <div key={model.id} className="group relative bg-slate-900/20 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-cyan-500/40 transition-all duration-500 shadow-xl flex flex-col h-full">
//               <div className="relative h-56 bg-black overflow-hidden">
//                 <img src={model.image} alt={`${model.name} thumbnail`} className="w-full h-full object-cover opacity-60 brightness-125 group-hover:scale-110 group-hover:opacity-100 group-hover:brightness-150 transition-all duration-1000" />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent" />
//                 <div className={`absolute bottom-6 left-8 p-3 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 ${model.color}`}>
//                   {model.icon}
//                 </div>
//               </div>
//               <div className="p-8 flex-grow">
//                 <span className="text-[9px] text-cyan-500 font-black uppercase tracking-[0.25em] mb-2 block">{model.category}</span>
//                 <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{model.name}</h3>
//                 <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{model.description}</p>
//               </div>
//               <div className="px-8 pb-8">
//                 <button 
//                   onClick={() => setSelectedModel(model)}
//                   className="w-full py-4 bg-white/5 hover:bg-cyan-600 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group/btn flex items-center justify-center gap-3 overflow-hidden relative"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
//                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-200 group-hover/btn:text-white transition-colors">Analyze Structure</span>
//                   <ChevronRight size={14} className="text-slate-400 group-hover/btn:text-white translate-x-0 group-hover/btn:translate-x-1 transition-all" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* MODAL VIEWER - FIXED FOR MOBILE SCROLLING */}
//         {selectedModel && (
//           <div className="fixed inset-0 z-[100] bg-[#05070a] overflow-y-auto">
//             {/* The wrapper is now allowed to scroll vertically */}
//             <div className="relative w-full min-h-screen flex flex-col lg:flex-row max-w-screen-2xl mx-auto p-6 lg:p-12 items-start lg:items-center">
              
//               {/* Text Content */}
//               <div className="w-full lg:w-[450px] flex-shrink-0 flex flex-col justify-center animate-in slide-in-from-left duration-500 z-10 lg:pr-12 mt-12 lg:mt-0">
//                 <div className={`inline-flex items-center gap-3 mb-6 ${selectedModel.color}`}>
//                   {selectedModel.icon}
//                   <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Structural Analysis</span>
//                 </div>
                
//                 <h2 className="text-4xl lg:text-7xl font-black text-white mb-6 uppercase tracking-tighter italic leading-none">{selectedModel.name}</h2>
//                 <p className="text-sm lg:text-base text-slate-300 font-light leading-relaxed mb-8 border-l-2 border-cyan-500/30 pl-6">{selectedModel.longDescription}</p>

//                 <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 lg:p-8 mb-8">
//                   <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-6 flex items-center gap-2">
//                     <Cpu size={14} /> System Specifications
//                   </h4>
//                   <div className="space-y-4">
//                     {selectedModel.specs?.map((spec, i) => (
//                       <div key={i} className="flex items-center justify-between text-xs lg:text-sm border-b border-white/[0.03] pb-3 last:border-0">
//                         <span className="text-slate-500">{spec.split(':')[0]}</span>
//                         <span className="text-white font-mono font-bold tracking-tight">{spec.split(':')[1]}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="flex gap-4 mb-10">
//                   <button className="flex-1 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all">
//                     Active Feed
//                   </button>
//                   <button onClick={() => setSelectedModel(null)} className="px-8 py-4 bg-white/5 hover:bg-white/10 text-slate-400 font-black text-[10px] uppercase rounded-2xl border border-white/10 transition-all">
//                     Close
//                   </button>
//                 </div>
//               </div>

//               {/* 3D Model Section - Fixed height for mobile visibility */}
//               <div className="w-full h-[400px] lg:h-full lg:flex-1 flex items-center justify-center relative pb-10 lg:pb-0">
//                 <div className="w-full h-full max-w-2xl aspect-square relative flex items-center justify-center">
//                     <div className="absolute inset-0 border border-cyan-500/10 rounded-full animate-[spin_60s_linear_infinite]" />
//                     <div className="absolute inset-4 rounded-full overflow-hidden bg-slate-900/20 border border-white/10 shadow-[0_0_80px_rgba(6,182,212,0.1)]">
//                         {selectedModel.glb ? (
//                           <Canvas camera={{ position: [0, 0, isMobile ? 8 : 5], fov: isMobile ? 50 : 35 }}>
//                             <Suspense fallback={<Html center className="text-cyan-500 font-mono text-[10px]">SYNCING_DATA...</Html>}>
//                                 <Stage environment="city" intensity={0.5} contactShadow={false} adjustCamera={2}>
//                                     <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
//                                         <AnatomicalModel url={selectedModel.glb} />
//                                     </Float>
//                                 </Stage>
//                                 <OrbitControls enablePan={true} autoRotate autoRotateSpeed={0.5} />
//                             </Suspense>
//                           </Canvas>
//                         ) : (
//                           <div className="w-full h-full relative group">
//                             <img src={selectedModel.image} alt={selectedModel.name} className="w-full h-full object-cover mix-blend-screen opacity-50" />
//                           </div>
//                         )}
//                     </div>
//                 </div>
//               </div>

//             </div>
//           </div>
//         )}
//       </div>

//       <style dangerouslySetInnerHTML={{ __html: `
//         @keyframes shimmer {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }
//         .animate-shimmer { animation: shimmer 2s infinite; }
//       `}} />
//     </div>
//   );
// };

// export default ModelDashboard;




// import React, { useState, Suspense, useEffect } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Stage, useGLTF, Float, Html } from '@react-three/drei';
// import { 
//   Heart, Brain, Wind, Eye, User, Search, X, 
//   Activity, ChevronRight, Cpu, Layers 
// } from 'lucide-react';

// const CDN_URL = "https://cdn.jsdelivr.net/gh/Maithiliraut9526/project-components@main";

// // --- 3D MODEL COMPONENT ---
// function AnatomicalModel({ url, onPartClick }) {
//   const { scene } = useGLTF(url);
//   return (
//     <primitive 
//       object={scene} 
//       onClick={(e) => {
//         e.stopPropagation(); 
//         // We pass the internal mesh name (e.g., "Lung_Left") to the handler
//         onPartClick(e.object.name);
//       }}
//     />
//   );
// }

// const ModelDashboard = () => {
//   const [selectedModel, setSelectedModel] = useState(null);
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     setIsMobile(window.innerWidth < 768);
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // --- IMPROVED VOICE LOGIC ---
//   const handlePartClick = (partName) => {
//     window.speechSynthesis.cancel();

//     // 1. Normalize the clicked name (e.g., "Left_Lung_01" -> "left lung")
//     const searchName = partName.toLowerCase().replace(/[_-]/g, ' ');
    
//     let speechText = "";

//     // 2. Search for keyword matches in partDetails
//     if (selectedModel.partDetails) {
//       // Find the first key in our database that is contained within the clicked mesh name
//       const matchedKey = Object.keys(selectedModel.partDetails).find(key => 
//         searchName.includes(key.toLowerCase())
//       );

//       if (matchedKey) {
//         speechText = selectedModel.partDetails[matchedKey];
//       }
//     }

//     // 3. Fallback if no specific detail is found
//     if (!speechText) {
//       const cleanName = partName.replace(/[_-]/g, ' ').replace(/[0-9]/g, '').trim();
//       speechText = `This is the ${cleanName}. It is a critical component of the ${selectedModel.name}.`;
//     }

//     const utterance = new SpeechSynthesisUtterance(speechText);
//     utterance.rate = 0.9;
//     window.speechSynthesis.speak(utterance);
//   };

//   const models = [
//     {
//       id: "m1",
//       name: "Respiratory System",
//       category: "Respiratory",
//       description: "Gas exchange network including the lungs and trachea.",
//       longDescription: "A biological filtration plant. Click the lungs, trachea, or diaphragm for detailed information.",
//       specs: ["Alveolar Surface: 70m²", "Capacity: 6000mL", "pH Balance: 7.4"],
//       icon: <Wind size={18} />,
//       image: "https://www.bing.com/th/id/OIP.rhlFOXLDbOrdt3r33-5ngQHaE8?w=284&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
//       color: "text-cyan-400",
//       glb: `${CDN_URL}/respiratory_system.glb`,
//       // KEY: These must be keywords likely found in the GLB mesh names
//       partDetails: {
//         "Lung": "The lungs are the primary organs of respiration. They house the alveoli where oxygen enters the blood and carbon dioxide is removed.",
//         "Trachea": "The trachea, or windpipe, is a reinforced tube that conducts air from the larynx to the bronchi of the lungs.",
//         "Diaphragm": "The diaphragm is the primary muscle of respiration. Its contraction creates a vacuum that pulls air into the lungs.",
//         "Bronchi": "The bronchi are the main passageways into the lungs, branching into smaller bronchioles to distribute air."
//       }
//     },
//     {
//       id: "m3",
//       name: "Human Heart",
//       category: "Cardiology",
//       description: "Muscular pump driving circulatory loops.",
//       longDescription: "A dual-circuit autonomous pump. Click chambers or major vessels for structural details.",
//       specs: ["Stroke Vol: 70mL", "Mass: 300g"],
//       icon: <Heart size={18} />,
//       image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800",
//       color: "text-rose-500",
//       glb: `${CDN_URL}/heart.glb`,
//       partDetails: {
//         "Ventricle": "The ventricles are the heart's pumping chambers. The left ventricle pumps oxygenated blood to the entire body.",
//         "Aorta": "The aorta is the largest artery in the body, carrying oxygen-rich blood away from the heart.",
//         "Atrium": "The atria are the receiving chambers. The right atrium receives deoxygenated blood from the body.",
//         "Artery": "Arteries are thick-walled vessels that carry blood under high pressure away from the heart."
//       }
//     },
//     {
//       id: "m2",
//       name: "Cerebral Cortex",
//       category: "Neurology",
//       icon: <Brain size={18} />,
//       image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800",
//       color: "text-purple-500",
//       glb: `${CDN_URL}/brain_diagram.glb`,
//       description: "Command center for cognitive function.",
//       longDescription: "The outer layer of neural tissue of the cerebrum. Click different lobes to understand their function.",
//       partDetails: {
//         "Frontal": "The frontal lobe is the center for executive function, reasoning, and voluntary motor control.",
//         "Cerebellum": "The cerebellum coordinates voluntary movements such as posture, balance, and coordination.",
//         "Temporal": "The temporal lobe is primarily responsible for processing auditory information and memory encoding.",
//         "Occipital": "The occipital lobe is the visual processing center of the mammalian brain."
//       }
//     }
//   ];

//   const filteredModels = models.filter(m => 
//     (activeCategory === "All" || m.category === activeCategory) &&
//     m.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-[#05070a] text-slate-300 font-sans selection:bg-cyan-500/30">
//       <div className="h-20 w-full" />
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
//         {/* HEADER */}
//         <div className="flex flex-col lg:flex-row items-center justify-between gap-6 py-12 border-b border-white/5 mb-12">
//           <div className="relative w-full lg:max-w-md group">
//             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
//             <input 
//               type="text" 
//               placeholder="Search anatomical systems..." 
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full bg-slate-900/40 border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm text-white outline-none focus:border-cyan-500/40"
//             />
//           </div>
//           <nav className="flex flex-wrap justify-center gap-2">
//             {["All", "Respiratory", "Neurology", "Cardiology", "Visual", "Orthopedic"].map(cat => (
//               <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase border transition-all ${activeCategory === cat ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-900/40 border-white/5 text-slate-500'}`}>{cat}</button>
//             ))}
//           </nav>
//         </div>

//         {/* GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
//           {filteredModels.map(model => (
//             <div key={model.id} className="group bg-slate-900/20 border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col h-full hover:border-cyan-500/40 transition-all shadow-xl">
//               <div className="relative h-56">
//                 <img src={model.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" alt={model.name} />
//                 <div className={`absolute bottom-6 left-8 p-3 bg-black/60 rounded-2xl border border-white/10 ${model.color}`}>{model.icon}</div>
//               </div>
//               <div className="p-8 flex-grow">
//                 <span className="text-[9px] text-cyan-500 font-black uppercase tracking-widest mb-2 block">{model.category}</span>
//                 <h3 className="text-xl font-bold text-white mb-3">{model.name}</h3>
//                 <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{model.description}</p>
//               </div>
//               <div className="px-8 pb-8">
//                 <button onClick={() => setSelectedModel(model)} className="w-full py-4 bg-white/5 hover:bg-cyan-600 rounded-2xl border border-white/10 text-[10px] font-black uppercase flex items-center justify-center gap-3">
//                   Analyze Structure <ChevronRight size={14} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* MODAL VIEWER */}
//         {selectedModel && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070a]/95 backdrop-blur-3xl p-6">
//             <div className="relative w-full h-full flex flex-col lg:flex-row max-w-screen-2xl mx-auto items-center">
              
//               <div className="w-full lg:w-[450px] z-10 lg:pr-12">
//                 <div className={`inline-flex items-center gap-3 mb-6 ${selectedModel.color}`}>
//                   {selectedModel.icon}
//                   <span className="text-[10px] font-black uppercase tracking-widest">Interactive Laboratory</span>
//                 </div>
//                 <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 italic tracking-tighter uppercase leading-none">{selectedModel.name}</h2>
//                 <p className="text-sm text-slate-400 leading-relaxed mb-8 pl-6 border-l-2 border-cyan-500/30">{selectedModel.longDescription}</p>

//                 <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 mb-8">
//                   <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-4 flex items-center gap-2">
//                     <Activity size={14} /> Voice Analysis Active
//                   </h4>
//                   <p className="text-xs text-slate-500">The AI will describe any part of the model you click on. Rotate the model to explore hidden structures.</p>
//                 </div>

//                 <button onClick={() => { window.speechSynthesis.cancel(); setSelectedModel(null); }} className="px-8 py-5 bg-white/5 hover:bg-white/10 text-slate-400 font-black text-[10px] uppercase rounded-2xl border border-white/10 flex items-center gap-2">
//                   <X size={14} /> Exit System
//                 </button>
//               </div>

//               {/* 3D SECTION */}
              

// [Image of human respiratory system showing lungs and trachea]

//               <div className="flex-1 w-full h-full relative flex items-center justify-center">
//                 <div className="w-full h-full max-w-2xl aspect-square relative bg-slate-900/20 border border-white/10 rounded-full shadow-[0_0_80px_rgba(6,182,212,0.1)]">
//                   <Canvas camera={{ position: [0, 0, isMobile ? 8 : 5], fov: 35 }}>
//                     <Suspense fallback={<Html center className="text-cyan-500 font-mono text-xs">LOADING_VOICE_ENGINE...</Html>}>
//                       <Stage environment="city" intensity={0.5} contactShadow={false}>
//                         <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
//                           <AnatomicalModel url={selectedModel.glb} onPartClick={handlePartClick} />
//                         </Float>
//                       </Stage>
//                       <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.4} />
//                     </Suspense>
//                   </Canvas>
//                 </div>
//               </div>

//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ModelDashboard;