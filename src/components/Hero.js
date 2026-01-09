import React from 'react';
import { Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
      {/* Reserved Space for your Nav Bar */}
      <div className="h-20 w-full opacity-0 pointer-events-none">Nav Spacer</div>

      <div className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
        {/* Background Glows for Depth */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Text Content */}
            <div className="flex flex-col gap-8 text-center lg:text-left animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="inline-flex items-center gap-2 w-fit mx-auto lg:mx-0 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-semibold uppercase tracking-widest">
                <Activity size={14} className="animate-pulse" />
                Next-Gen Surgical Intelligence
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                Master Surgical Anatomy with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  SurgicalAI
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Experience the next generation of surgical planning. Interactive 3D modeling,
                AR visualization, and AI-driven insights for students and professionals.
              </p>

              {/* Action Buttons: Updated to Sky Blue and removed Explore AI */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/login">
                  <button className="w-full sm:w-auto px-8 py-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black rounded-2xl flex items-center justify-center gap-2 transition-all shadow-[0_15px_35px_-10px_rgba(14,165,233,0.5)] active:scale-95 group">
                    Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Right: Stable Image Card */}
            <div className="relative animate-in fade-in zoom-in duration-1000">
              <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-2xl transform scale-95 transition-transform duration-700"></div>
              
              <div className="relative rounded-2xl border border-white/10 bg-[#0a101f] overflow-hidden shadow-2xl aspect-[4/3]">
                <div className="absolute top-4 left-4 flex gap-1.5 z-30">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/40"></div>
                </div>

                {/* Main Image Layer */}
                <div
                  className="w-full h-full bg-cover bg-center brightness-125 saturate-125 opacity-80"
                  style={{
                    backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBqrOj0xXs_zDVuzjIsMCSTc4BEYwhJaspE5IN8kRFoj-rpr2qydgsOwbq6ZeN9sEY--_c9aq3O4EtIHqEnSh11_zynGplpOax2XAxy7m75PUEm0uS7ADg-uGf-J1Gq1nmzROR33YMQSd6yhAD2mJDPql2xsL-wmzBWebiW0qytSPGTOqAlW22kv6WS43rSKESnsi1JnYL8Ufs2kKYC0T31o9ysyi9X8fj3tQ5w3dbTwahXFYxQibHapswFAHwt-2HFVx6gFQ_Jgoo')",
                  }}
                ></div>

                <div className="absolute inset-0 z-20 pointer-events-none">
                   <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent shadow-[0_0_10px_rgba(96,165,250,0.5)] absolute animate-scan" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 6s linear infinite;
        }
      `}</style>
    </div>
  );
}



//code to apply 
// import React from 'react';
// import { Activity } from 'lucide-react';

// export default function App() {
//   return (
//     <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
//       {/* Reserved Space for your Nav Bar */}
//       <div className="h-20 w-full opacity-0 pointer-events-none">Nav Spacer</div>

//       <div className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
//         {/* Background Glows for Depth */}
//         <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none"></div>
//         <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
            
//             {/* Left: Text Content */}
//             <div className="flex flex-col gap-8 text-center lg:text-left animate-in fade-in slide-in-from-bottom-8 duration-1000">
//               <div className="inline-flex items-center gap-2 w-fit mx-auto lg:mx-0 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-semibold uppercase tracking-widest">
//                 <Activity size={14} className="animate-pulse" />
//                 Next-Gen Surgical Intelligence
//               </div>

//               <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
//                 Master Surgical Anatomy with{" "}
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
//                   SurgicalAI
//                 </span>
//               </h1>

//               <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
//                 Experience the next generation of surgical planning. Interactive 3D modeling,
//                 AR visualization, and AI-driven insights for students and professionals.
//               </p>
//             </div>

//             {/* Right: Stable Image Card */}
//             <div className="relative animate-in fade-in zoom-in duration-1000">
//               {/* Soft glow behind the frame */}
//               <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-2xl transform scale-95 transition-transform duration-700"></div>
              
//               <div className="relative rounded-2xl border border-white/10 bg-[#0a101f] overflow-hidden shadow-2xl aspect-[4/3]">
//                 {/* Browser-style Control Dots */}
//                 <div className="absolute top-4 left-4 flex gap-1.5 z-30">
//                   <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
//                   <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></div>
//                   <div className="w-2.5 h-2.5 rounded-full bg-green-500/40"></div>
//                 </div>

//                 {/* Main Image Layer */}
//                 <div
//                   className="w-full h-full bg-cover bg-center opacity-90 transition-opacity duration-500 group-hover:opacity-100"
//                   style={{
//                     backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBqrOj0xXs_zDVuzjIsMCSTc4BEYwhJaspE5IN8kRFoj-rpr2qydgsOwbq6ZeN9sEY--_c9aq3O4EtIHqEnSh11_zynGplpOax2XAxy7m75PUEm0uS7ADg-uGf-J1Gq1nmzROR33YMQSd6yhAD2mJDPql2xsL-wmzBWebiW0qytSPGTOqAlW22kv6WS43rSKESnsi1JnYL8Ufs2kKYC0T31o9ysyi9X8fj3tQ5w3dbTwahXFYxQibHapswFAHwt-2HFVx6gFQ_Jgoo')",
//                   }}
//                 ></div>

//                 {/* Subtle Scanning Line Animation */}
//                 <div className="absolute inset-0 z-20 pointer-events-none">
//                    <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent shadow-[0_0_10px_rgba(96,165,250,0.5)] absolute animate-scan" />
//                 </div>

//                 {/* Gradient Vignette for Depth */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes scan {
//           0% { top: 0%; opacity: 0; }
//           10% { opacity: 1; }
//           90% { opacity: 1; }
//           100% { top: 100%; opacity: 0; }
//         }
//         .animate-scan {
//           animation: scan 6s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// }



// import React from 'react';
// import { Activity, ArrowRight } from 'lucide-react';
// import { Link } from 'react-router-dom'; // Added for navigation

// export default function Hero() {
//   return (
//     <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
//       {/* Reserved Space for your Nav Bar */}
//       <div className="h-20 w-full opacity-0 pointer-events-none">Nav Spacer</div>

//       <div className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
//         {/* Background Glows for Depth */}
//         <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none"></div>
//         <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
            
//             {/* Left: Text Content */}
//             <div className="flex flex-col gap-8 text-center lg:text-left animate-in fade-in slide-in-from-bottom-8 duration-1000">
//               <div className="inline-flex items-center gap-2 w-fit mx-auto lg:mx-0 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-semibold uppercase tracking-widest">
//                 <Activity size={14} className="animate-pulse" />
//                 Next-Gen Surgical Intelligence
//               </div>

//               <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
//                 Master Surgical Anatomy with{" "}
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
//                   SurgicalAI
//                 </span>
//               </h1>

//               <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
//                 Experience the next generation of surgical planning. Interactive 3D modeling,
//                 AR visualization, and AI-driven insights for students and professionals.
//               </p>

//               {/* NEW: Action Buttons */}
//               <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                 <Link to="/login">
//                   <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20 active:scale-95">
//                     Get Started <ArrowRight size={18} />
//                   </button>
//                 </Link>
//                 <Link to="/ai">
//                   {/* <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all">
//                     Explore AI
//                   </button> */}
//                 </Link>
//               </div>
//             </div>

//             {/* Right: Stable Image Card */}
//             <div className="relative animate-in fade-in zoom-in duration-1000">
//               <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-2xl transform scale-95 transition-transform duration-700"></div>
              
//               <div className="relative rounded-2xl border border-white/10 bg-[#0a101f] overflow-hidden shadow-2xl aspect-[4/3]">
//                 <div className="absolute top-4 left-4 flex gap-1.5 z-30">
//                   <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
//                   <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></div>
//                   <div className="w-2.5 h-2.5 rounded-full bg-green-500/40"></div>
//                 </div>

//                 {/* Main Image Layer - Brighter & More Vivid as requested */}
//                 <div
//                   className="w-full h-full bg-cover bg-center brightness-125 saturate-125 opacity-80"
//                   style={{
//                     backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBqrOj0xXs_zDVuzjIsMCSTc4BEYwhJaspE5IN8kRFoj-rpr2qydgsOwbq6ZeN9sEY--_c9aq3O4EtIHqEnSh11_zynGplpOax2XAxy7m75PUEm0uS7ADg-uGf-J1Gq1nmzROR33YMQSd6yhAD2mJDPql2xsL-wmzBWebiW0qytSPGTOqAlW22kv6WS43rSKESnsi1JnYL8Ufs2kKYC0T31o9ysyi9X8fj3tQ5w3dbTwahXFYxQibHapswFAHwt-2HFVx6gFQ_Jgoo')",
//                   }}
//                 ></div>

//                 <div className="absolute inset-0 z-20 pointer-events-none">
//                    <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent shadow-[0_0_10px_rgba(96,165,250,0.5)] absolute animate-scan" />
//                 </div>

//                 <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes scan {
//           0% { top: 0%; opacity: 0; }
//           10% { opacity: 1; }
//           90% { opacity: 1; }
//           100% { top: 100%; opacity: 0; }
//         }
//         .animate-scan {
//           animation: scan 6s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// }




