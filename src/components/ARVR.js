
// import React, { useState } from 'react';
// import { 
//   Smartphone,
//   Activity,
//   Layers,
//   Zap,
//   Target
// } from 'lucide-react';

// const App = () => {
//   // Set Heart as initial state
//   const [activeOrgan, setActiveOrgan] = useState({
//     id: 3,
//     name: 'Heart',
//     category: 'Cardiology',
//     img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVCosVMsGfIcehFG6eBjKuPGrX7jt80bp4yhnVE8fPO-edUwIpKjnoIZwhquFYQrkBQfwX3egcDYWpvgC4-5dJHvs_jFlQwsRkdxpmeyHcAsnyzebao-aAxQVTHRK5pPTQ1_4_qA4SEI2Tj-WX8Nv9rBJWvI9sWU91hjRNxgmk_tYOaZVorL3QvyTfzNKLyHowrQJbPJrFXEZbCjBa1DMtciJnMRo_B0x1Eo8nI7VALclFLDth2R810Rd7qRdgl7y5ZMFOW2PBARQ',
//     qr: '/heart_QR.png' 
//   });

//   const organs = [
//     { 
//       id: 1, 
//       name: 'Respiratory Systeam', 
//       category: 'Respiratory', 
//       img: 'https://png.pngtree.com/thumb_back/fw800/background/20240310/pngtree-3d-human-respiratory-system-lungs-image_15639790.jpg', 
//       qr: '/respiratory_systeam.png' 
//     },
//     { 
//       id: 2, 
//       name: 'Brain', 
//       category: 'Neurology', 
//       img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAakaAXQx2QdWaFeOW7EwzT4bIvNHwwLPnF_1V7Wdu8M7w10C8v3anRP4ft6SvL-gOJ18CCy4jV02HBv4eNIWbbqtE0ltIzGFumtwL5T0R-ekk3erEHzJkw8SO1whLsDN3zCy7g19FRmC7Zsknq8FK4ESa1QpQrNN5dTp0anWUd6mLnlItLyUl8md62uAMeCsLi9RWoB9kIgfsgDWTsFpRfPBOLHjZ22x3OXta_xuGohsDCaPJH77T4OPWOlEs6bsKTC72wcqKILbo', 
//       qr: '/Brain_QR.png' 
//     },
//     { 
//       id: 3, 
//       name: 'Heart', 
//       category: 'Cardiology', 
//       img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVCosVMsGfIcehFG6eBjKuPGrX7jt80bp4yhnVE8fPO-edUwIpKjnoIZwhquFYQrkBQfwX3egcDYWpvgC4-5dJHvs_jFlQwsRkdxpmeyHcAsnyzebao-aAxQVTHRK5pPTQ1_4_qA4SEI2Tj-WX8Nv9rBJWvI9sWU91hjRNxgmk_tYOaZVorL3QvyTfzNKLyHowrQJbPJrFXEZbCjBa1DMtciJnMRo_B0x1Eo8nI7VALclFLDth2R810Rd7qRdgl7y5ZMFOW2PBARQ', 
//       qr: '/heart_QR.png' 
//     },
//     { 
//       id: 4, 
//       name: 'Eye', 
//       category: 'Ophthalmology', 
//       img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6HUGapo9M0DsaojaWhe9H7_NQSa1Wh7E_iJEiccGKrguYiBgiw2X9Cf9Iyea4qa6ximUPh6-83bpjXfZIswTD8RbiTLzeoPyTBEelO4ceFFiNkPb2hiy2csyf2w8BYmAWK6vEDgVEImJ0m-PHsQKMROb2WCDKuQcnZkjPuPjqXegdcKnr7edml2C3YSFKpChmYOwOy1NKXKbn2QThOP9PCYL7hgRtNRouPtqeOKIudhjZ1__wZOgYUCccqJsAqgED_DQNxgP_v7g', 
//       qr: '/eye_QR.png' 
//     },
//   ];

//   return (
//     <div className="w-full min-h-screen flex justify-center items-start bg-transparent p-2 font-sans overflow-hidden pt-24">
//       <div className="relative w-full max-w-5xl h-[650px] bg-[#0a0c14] border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
        
//         {/* Background Grid Accent */}
//         <div className="absolute inset-0 pointer-events-none opacity-5">
//           <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:30px_30px]" />
//         </div>

//         {/* LEFT PANEL: AR ACTIVATION */}
//         <div className="w-full md:w-[40%] h-full border-r border-white/5 p-6 md:p-8 flex flex-col justify-between relative z-10 bg-black/20">
//           <div>
//             <div className="flex items-center gap-2 mb-1">
//               <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
//               <span className="text-[9px] font-bold tracking-[0.3em] text-cyan-400 uppercase">Neural Link Ready</span>
//             </div>
//             <h1 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent italic">
//               VIRTUAL.BIO
//             </h1>
//           </div>

//           <div className="flex flex-col items-center my-4">
//             <div className="relative group">
//               <div className="absolute -inset-4 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors" />
              
//               <div className="relative p-4 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden">
//                 <div className="bg-white p-2 rounded-lg relative overflow-hidden">
//                   <img 
//                     src={activeOrgan.qr} 
//                     alt={`${activeOrgan.name} QR`} 
//                     className="w-40 h-40 md:w-48 md:h-48 object-contain"
//                   />
//                   <div className="absolute inset-0 pointer-events-none">
//                     <div className="w-full h-[2px] bg-cyan-400 shadow-[0_0_15px_#22d3ee] absolute animate-[scan_3s_ease-in-out_infinite]" />
//                   </div>
//                 </div>
//                 <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-500/50" />
//                 <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-500/50" />
//               </div>
//             </div>

//             <div className="w-full mt-8 space-y-2">
//               {[
//                 { icon: <Smartphone size={14}/>, label: "SCAN", sub: "Initialize link" },
//                 { icon: <Target size={14}/>, label: "PROJECT", sub: "Surface lock" },
//                 { icon: <Activity size={14}/>, label: "INTERACT", sub: "Real-time AR" }
//               ].map((item, idx) => (
//                 <div key={idx} className="flex items-center gap-4 p-3 bg-white/[0.02] border border-white/5 rounded-xl">
//                   <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
//                     {item.icon}
//                   </div>
//                   <div>
//                     <h4 className="text-[10px] font-black tracking-wider text-white uppercase">{item.label}</h4>
//                     <p className="text-[9px] text-white/30 uppercase tracking-tighter">{item.sub}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="text-[8px] font-mono text-white/10 text-center tracking-widest">
//             V-BIO_SYSTEM_ENCRYPTED
//           </div>
//         </div>

//         {/* RIGHT PANEL: SELECTION */}
//         <div className="w-full md:w-[60%] h-full grid grid-cols-2 bg-[#0d0f1a]">
//           {organs.map((organ) => {
//             const isActive = activeOrgan.id === organ.id;
//             return (
//               <button
//                 key={organ.id}
//                 onClick={() => setActiveOrgan(organ)}
//                 className={`group relative flex flex-col justify-end p-6 border-b border-r border-white/5 transition-all duration-500 ${
//                   isActive ? 'bg-cyan-500/[0.03]' : 'hover:bg-white/[0.02]'
//                 }`}
//               >
//                 {/* Organ Image Display - REMOVED GRAYSCALE FROM HERE */}
//                 <div className={`absolute inset-0 p-10 flex items-center justify-center transition-all duration-700 ${
//                   isActive ? 'scale-105 opacity-100' : 'scale-90 opacity-40 group-hover:opacity-60'
//                 }`}>
//                   <img 
//                     src={organ.img} 
//                     alt={organ.name} 
//                     className={`max-w-full max-h-full object-contain filter brightness-110 contrast-100 drop-shadow-[0_0_30px_rgba(34,211,238,0.15)] ${
//                       isActive ? 'animate-pulse' : ''
//                     }`} 
//                   />
//                 </div>

//                 <div className="relative z-20 pointer-events-none">
//                   <div className="flex items-center gap-2 mb-1">
//                     <Layers size={10} className={isActive ? 'text-cyan-400' : 'text-white/20'} />
//                     <p className={`text-[8px] font-bold tracking-[0.3em] uppercase ${isActive ? 'text-cyan-400' : 'text-white/20'}`}>
//                       {organ.category}
//                     </p>
//                   </div>
//                   <h3 className={`text-xl font-black tracking-tight uppercase transition-colors ${isActive ? 'text-white' : 'text-white/10 group-hover:text-white/30'}`}>
//                     {organ.name}
//                   </h3>
                  
//                   {isActive && (
//                     <div className="mt-2 flex items-center gap-1.5 text-cyan-400/80">
//                        <Zap size={10} fill="currentColor" />
//                        <span className="text-[8px] font-bold tracking-widest uppercase italic">Live Link</span>
//                     </div>
//                   )}
//                 </div>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       <style dangerouslySetInnerHTML={{ __html: `
//         @keyframes scan {
//           0%, 100% { top: 0%; opacity: 0; }
//           5% { opacity: 1; }
//           95% { opacity: 1; }
//           100% { top: 100%; opacity: 0; }
//         }
//       `}} />
//     </div>
//   );
// };

// export default App;


//code to apply
import React, { useState, useEffect } from 'react';
import { 
  Smartphone,
  Activity,
  Layers,
  Zap,
  Target,
  Maximize
} from 'lucide-react';

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const organs = [
    { 
      id: 1, 
      name: 'Lungs', 
      category: 'Respiratory', 
      img: 'https://png.pngtree.com/thumb_back/fw800/background/20240310/pngtree-3d-human-respiratory-system-lungs-image_15639790.jpg', 
      qr: '/respiratory_systeam.png',
      glb: 'https://raw.githubusercontent.com/Maithiliraut9526/project-components/main/respiratory_system.glb'
    },
    { 
      id: 2, 
      name: 'Brain', 
      category: 'Neurology', 
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAakaAXQx2QdWaFeOW7EwzT4bIvNHwwLPnF_1V7Wdu8M7w10C8v3anRP4ft6SvL-gOJ18CCy4jV02HBv4eNIWbbqtE0ltIzGFumtwL5T0R-ekk3erEHzJkw8SO1whLsDN3zCy7g19FRmC7Zsknq8FK4ESa1QpQrNN5dTp0anWUd6mLnlItLyUl8md62uAMeCsLi9RWoB9kIgfsgDWTsFpRfPBOLHjZ22x3OXta_xuGohsDCaPJH77T4OPWOlEs6bsKTC72wcqKILbo', 
      qr: '/Brain_QR.png',
      glb: 'https://raw.githubusercontent.com/Maithiliraut9526/project-components/main/brain_diagram.glb'
    },
    { 
      id: 3, 
      name: 'Heart', 
      category: 'Cardiology', 
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVCosVMsGfIcehFG6eBjKuPGrX7jt80bp4yhnVE8fPO-edUwIpKjnoIZwhquFYQrkBQfwX3egcDYWpvgC4-5dJHvs_jFlQwsRkdxpmeyHcAsnyzebao-aAxQVTHRK5pPTQ1_4_qA4SEI2Tj-WX8Nv9rBJWvI9sWU91hjRNxgmk_tYOaZVorL3QvyTfzNKLyHowrQJbPJrFXEZbCjBa1DMtciJnMRo_B0x1Eo8nI7VALclFLDth2R810Rd7qRdgl7y5ZMFOW2PBARQ', 
      qr: '/heart_QR.png',
      glb: 'https://raw.githubusercontent.com/Maithiliraut9526/heart/main/heart.glb'
    },
    { 
      id: 4, 
      name: 'Skeleton', 
      category: 'Ophthalmology', 
      img: 'https://tse1.mm.bing.net/th/id/OIP.-E2tOKDo4RU2z0uqKEEoDgHaFj?pid=Api&P=0&h=180', 
      qr: '/skeleton_QR.png',
      glb: 'https://raw.githubusercontent.com/Maithiliraut9526/project-components/main/skeleton.glb'
    },
  ];

  const [activeOrgan, setActiveOrgan] = useState(organs[2]); 

  const handleLaunchAR = () => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const encodedFile = encodeURIComponent(activeOrgan.glb);
    if (isAndroid) {
      const sceneViewerUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodedFile}&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;`;
      window.location.href = sceneViewerUrl;
    } else {
      window.location.href = activeOrgan.glb;
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-start bg-[#050506] p-4 font-sans overflow-x-hidden pt-32 md:pt-24 text-white">
      <div className="relative w-full max-w-5xl h-auto md:h-[650px] bg-[#0a0c14] border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
        
        {/* Background Grid Accent */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:30px_30px]" />
        </div>

        {/* LEFT PANEL: AR ACTIVATION */}
        <div className="w-full md:w-[40%] h-full border-r border-white/5 p-6 md:p-8 flex flex-col justify-between relative z-10 bg-black/20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-[9px] font-bold tracking-[0.3em] text-cyan-400 uppercase">Neural Link Ready</span>
            </div>
            <h1 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent italic">
              VIRTUAL.BIO
            </h1>
          </div>

          <div className="flex flex-col items-center my-6">
            <div className="relative group">
              <div className="absolute -inset-4 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors" />
              
              <div className="relative p-4 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden">
                <div className="bg-white p-2 rounded-lg relative overflow-hidden">
                  {isMobile ? (
                    <div className="w-44 h-44 md:w-48 md:h-48 flex items-center justify-center bg-black/5 rounded">
                       <img src={activeOrgan.img} alt="Preview" className="w-36 h-36 object-contain animate-pulse" />
                    </div>
                  ) : (
                    <img 
                      src={activeOrgan.qr} 
                      alt="QR Code" 
                      className="w-40 h-40 md:w-48 md:h-48 object-contain"
                    />
                  )}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="w-full h-[2px] bg-cyan-400 shadow-[0_0_15px_#22d3ee] absolute animate-[scan_3s_ease-in-out_infinite]" />
                  </div>
                </div>
              </div>
            </div>

            {isMobile && (
              <button 
                onClick={handleLaunchAR}
                className="mt-6 flex items-center gap-3 bg-cyan-500 text-black px-8 py-4 rounded-2xl font-black text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(34,211,238,0.3)] active:scale-95 transition-all"
              >
                <Maximize size={16} />
                Initialize AR
              </button>
            )}

            {!isMobile && (
              <div className="w-full mt-8 space-y-2">
                {[
                  { icon: <Smartphone size={14}/>, label: "SCAN", sub: "Initialize link" },
                  { icon: <Target size={14}/>, label: "PROJECT", sub: "Surface lock" },
                  { icon: <Activity size={14}/>, label: "INTERACT", sub: "Real-time AR" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                    <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black tracking-wider text-white uppercase">{item.label}</h4>
                      <p className="text-[9px] text-white/30 uppercase tracking-tighter">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="text-[8px] font-mono text-white/10 text-center tracking-widest pb-4 md:pb-0">
            V-BIO_SYSTEM_V2.5_ENCRYPTED
          </div>
        </div>

        {/* RIGHT PANEL: SELECTION */}
        {/* Added gap-1 for mobile separation */}
        <div className="w-full md:w-[60%] h-full grid grid-cols-2 gap-1 md:gap-0 bg-[#0d0f1a]">
          {organs.map((organ) => {
            const isActive = activeOrgan.id === organ.id;
            return (
              <button
                key={organ.id}
                onClick={() => setActiveOrgan(organ)}
                className={`group relative flex flex-col justify-end p-4 md:p-6 border-b border-r border-white/5 transition-all duration-500 overflow-hidden ${
                  isActive ? 'bg-cyan-500/[0.05]' : 'hover:bg-white/[0.02]'
                } ${isMobile ? 'h-56' : 'h-auto'}`}
              >
                {/* Organ Image - p-4 on mobile makes them big and clear */}
                <div className={`absolute inset-0 p-4 md:p-10 flex items-center justify-center transition-all duration-700 ${
                  isActive ? 'scale-110 opacity-100' : 'scale-95 opacity-30 group-hover:opacity-50'
                }`}>
                  <img 
                    src={organ.img} 
                    alt={organ.name} 
                    className={`max-w-full max-h-full object-contain filter drop-shadow-[0_0_20px_rgba(34,211,238,0.1)] ${
                      isActive ? 'animate-pulse' : ''
                    }`} 
                  />
                </div>

                <div className="relative z-20 pointer-events-none">
                  <div className="flex items-center gap-2 mb-1">
                    <Layers size={10} className={isActive ? 'text-cyan-400' : 'text-white/20'} />
                    <p className={`text-[8px] font-bold tracking-[0.3em] uppercase ${isActive ? 'text-cyan-400' : 'text-white/20'}`}>
                      {organ.category}
                    </p>
                  </div>
                  <h3 className={`text-xl font-black tracking-tight uppercase transition-colors ${isActive ? 'text-white' : 'text-white/10 group-hover:text-white/30'}`}>
                    {organ.name}
                  </h3>
                  
                  {isActive && (
                    <div className="mt-2 flex items-center gap-1.5 text-cyan-400/80">
                       <Zap size={10} fill="currentColor" />
                       <span className="text-[8px] font-bold tracking-widest uppercase italic">Live Link</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
    </div>
  );
};

export default App;




