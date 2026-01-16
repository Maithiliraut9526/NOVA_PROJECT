// import React, { useState, useEffect, useMemo } from 'react';
// import { 
//   Cpu, 
//   ShieldCheck, 
//   ChevronRight, 
//   Activity, 
//   Lock, 
//   Mail,
//   Zap,
//   Network,
//   Terminal,
//   Database,
//   RefreshCw,
//   Eye,
//   EyeOff
// } from 'lucide-react';

// const App = () => {
//   const [step, setStep] = useState('auth'); // auth | initializing | dashboard
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [sysLogs, setSysLogs] = useState([]);
//   const [loadProgress, setLoadProgress] = useState(0);

//   // High-frequency data logs for "Professional" feel
//   const logPool = useMemo(() => [
//     "ENC_KEY_VALIDATED: RSA-4096",
//     "NODE_SYNC: 102.4.99.1",
//     "NEURAL_LATENCY: 0.002ms",
//     "MEM_ALLOC: SECURE_STRATUM",
//     "PARITY_CHECK: COMPLETE",
//     "PROTOCOL: AES_GCM_PROTOCOL",
//     "KERNEL_INTEGRITY: VERIFIED"
//   ], []);

//   useEffect(() => {
//     if (step === 'initializing') {
//       let i = 0;
//       const interval = setInterval(() => {
//         setSysLogs(prev => [...prev.slice(-4), `> ${logPool[i % logPool.length]}`]);
//         setLoadProgress(prev => {
//           if (prev >= 100) {
//             clearInterval(interval);
//             setTimeout(() => setStep('dashboard'), 800);
//             return 100;
//           }
//           return prev + 2;
//         });
//         i++;
//       }, 60);
//       return () => clearInterval(interval);
//     }
//   }, [step, logPool]);

//   const handleAuth = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     // Simulate server handshakes
//     setTimeout(() => {
//       setLoading(false);
//       setStep('initializing');
//     }, 1800);
//   };

//   return (
//     <div className="min-h-screen bg-[#05070a] text-slate-200 flex items-center justify-center p-6 font-mono selection:bg-cyan-500/30 overflow-hidden relative">
//       {/* Background Architectural Grid */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
//       {/* Ambient Radial Glows */}
//       <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
//       <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

//       <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-16 items-center">
        
//         {/* Technical Branding Section */}
//         <div className="hidden lg:block space-y-8">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded flex items-center justify-center">
//               <Activity className="text-cyan-400" size={20} />
//             </div>
//             <h1 className="text-xl font-bold tracking-widest uppercase text-white">
//               Surgical<span className="text-cyan-500">AI</span> Systems
//             </h1>
//           </div>

//           <div className="space-y-4">
//             <h2 className="text-5xl font-extrabold text-white tracking-tighter leading-none">
//               PRECISION <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">THROUGH LOGIC.</span>
//             </h2>
//             <p className="text-slate-500 font-sans max-w-sm leading-relaxed border-l-2 border-cyan-900/50 pl-4">
//               Authorized access only. Enterprise-grade neural processing interface for autonomous surgical assistance.
//             </p>
//           </div>

//           {/* Dynamic Status Grid */}
//           <div className="grid grid-cols-2 gap-4 max-w-sm pt-8">
//             <div className="p-4 bg-white/5 border border-white/5 rounded-lg space-y-1">
//               <div className="text-xs text-slate-500 uppercase tracking-tighter font-bold">Uptime</div>
//               <div className="text-lg text-cyan-400 font-bold">99.9998%</div>
//             </div>
//             <div className="p-4 bg-white/5 border border-white/5 rounded-lg space-y-1">
//               <div className="text-xs text-slate-500 uppercase tracking-tighter font-bold">Active Nodes</div>
//               <div className="text-lg text-cyan-400 font-bold">14,802</div>
//             </div>
//           </div>
//         </div>

//         {/* Interaction Terminal */}
//         <div className="relative">
//           <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-50" />
          
//           <div className="relative bg-[#0b0f17] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
//             {/* Window Header */}
//             <div className="bg-white/5 border-b border-white/10 p-4 flex justify-between items-center">
//               <div className="flex gap-1.5">
//                 <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
//                 <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40" />
//                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
//               </div>
//               <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Secure_Terminal_v4.0.1</span>
//             </div>

//             <div className="p-8 md:p-12">
//               {step === 'auth' && (
//                 <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
//                   <div className="mb-10">
//                     <h3 className="text-xl font-bold text-white mb-2 tracking-tight">System Authentication</h3>
//                     <p className="text-xs text-slate-500">Identify personnel to unlock neural pathways.</p>
//                   </div>

//                   <form onSubmit={handleAuth} className="space-y-6">
//                     <div className="space-y-2">
//                       <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">Identity ID</label>
//                       <div className="relative">
//                         <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
//                         <input 
//                           required
//                           type="email"
//                           placeholder="e.g. neuro.surgeon@hospital.net"
//                           className="w-full bg-black/40 border border-white/5 focus:border-cyan-500/50 rounded-lg py-3.5 pl-11 pr-4 outline-none transition-all text-sm placeholder:text-slate-700 focus:bg-cyan-500/[0.02]"
//                         />
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">Access Protocol</label>
//                       <div className="relative">
//                         <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
//                         <input 
//                           required
//                           type={showPassword ? "text" : "password"}
//                           placeholder="••••••••••••"
//                           className="w-full bg-black/40 border border-white/5 focus:border-cyan-500/50 rounded-lg py-3.5 pl-11 pr-12 outline-none transition-all text-sm placeholder:text-slate-700 focus:bg-cyan-500/[0.02]"
//                         />
//                         <button 
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-cyan-400 transition-colors"
//                         >
//                           {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                         </button>
//                       </div>
//                     </div>

//                     <button 
//                       disabled={loading}
//                       className="group relative w-full py-4 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-bold text-sm tracking-widest uppercase transition-all overflow-hidden flex items-center justify-center gap-3 active:scale-[0.98]"
//                     >
//                       <div className="absolute inset-0 w-1/4 bg-white/20 -skew-x-[30deg] -translate-x-full group-hover:translate-x-[400%] transition-transform duration-700 ease-in-out" />
//                       {loading ? (
//                         <RefreshCw className="animate-spin" size={18} />
//                       ) : (
//                         <>
//                           <ShieldCheck size={18} />
//                           Initiate Handshake
//                         </>
//                       )}
//                     </button>
//                   </form>
//                 </div>
//               )}

//               {step === 'initializing' && (
//                 <div className="animate-in fade-in duration-300">
//                   <div className="flex flex-col items-center justify-center py-4">
//                     {/* Professional Orbital Loader */}
//                     <div className="relative w-32 h-32 mb-8">
//                       <div className="absolute inset-0 border-[3px] border-cyan-500/10 rounded-full" />
//                       <div className="absolute inset-0 border-[3px] border-transparent border-t-cyan-500 rounded-full animate-spin" style={{ animationDuration: '0.8s' }} />
//                       <div className="absolute inset-4 border border-cyan-500/20 rounded-full animate-pulse" />
//                       <div className="absolute inset-0 flex items-center justify-center flex-col">
//                         <span className="text-xl font-bold text-white">{loadProgress}%</span>
//                         <span className="text-[8px] text-cyan-500 uppercase tracking-tighter">Syncing</span>
//                       </div>
//                     </div>

//                     <div className="w-full space-y-2 bg-black/40 p-4 border border-white/5 rounded font-mono text-[10px] h-32 overflow-hidden">
//                       {sysLogs.map((log, idx) => (
//                         <div key={idx} className="text-cyan-400/80 leading-tight flex gap-2">
//                           <span className="text-slate-600">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
//                           {log}
//                         </div>
//                       ))}
//                     </div>

//                     <div className="mt-6 flex gap-4 w-full">
//                       <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
//                         <div className="h-full bg-cyan-500 transition-all duration-100" style={{ width: `${loadProgress}%` }} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {step === 'dashboard' && (
//                 <div className="animate-in zoom-in-95 duration-500 text-center py-6">
//                   <div className="inline-flex items-center justify-center p-6 bg-cyan-500/20 rounded-full mb-8 relative">
//                     <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-2xl animate-pulse" />
//                     <Zap className="text-cyan-400 relative z-10" size={48} />
//                   </div>
//                   <h2 className="text-2xl font-bold text-white mb-2">SYSTEM READY</h2>
//                   <p className="text-slate-500 text-xs mb-8">Interface synchronized. Redirecting to primary command...</p>
                  
//                   <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
//                     {[...Array(3)].map((_, i) => (
//                       <div key={i} className="h-1 bg-cyan-500/40 rounded-full overflow-hidden">
//                         <div className="h-full bg-cyan-400 animate-[loading_1.5s_infinite]" style={{ animationDelay: `${i * 0.2}s` }} />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Footer Status Bar */}
//             <div className="bg-black/60 px-6 py-3 border-t border-white/5 flex justify-between items-center text-[9px] font-bold text-slate-500 uppercase tracking-widest">
//               <div className="flex gap-4">
//                 <span className="flex items-center gap-1.5"><Network size={10} className="text-cyan-500" /> AES-256</span>
//                 <span className="flex items-center gap-1.5"><Database size={10} className="text-emerald-500" /> Local_DB</span>
//               </div>
//               <span className="animate-pulse">● System_Nominal</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style dangerouslySetInnerHTML={{ __html: `
//         @keyframes loading {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }
//       `}} />
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, Activity, Lock, Mail, Zap, Network, 
  Database, RefreshCw, Eye, EyeOff, UserPlus 
} from 'lucide-react';
// 1. IMPORT FIREBASE AUTH
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";

const App = () => {
  const [step, setStep] = useState('auth'); 
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const auth = getAuth(); // Initialize Firebase Auth

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'signup') {
        // CREATE NEW USER
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // LOGIN EXISTING USER
        await signInWithEmailAndPassword(auth, email, password);
      }
      
      // If successful, proceed to animation
      setLoading(false);
      setStep('initializing');
    } catch (err) {
      setLoading(false);
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  // ... (Keep your logPool and useEffect for initializing from previous code)

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-200 flex items-center justify-center p-6 font-mono overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Technical Branding Section */}
        <div className="hidden lg:block space-y-8">
          <div className="flex items-center gap-3">
            <Activity className="text-cyan-400" size={20} />
            <h1 className="text-xl font-bold tracking-widest uppercase text-white">Surgical<span className="text-cyan-500">AI</span></h1>
          </div>
          <h2 className="text-5xl font-extrabold text-white tracking-tighter leading-none">
            {mode === 'login' ? 'SECURE' : 'CREATE'} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              {mode === 'login' ? 'ACCESS.' : 'IDENTITY.'}
            </span>
          </h2>
        </div>

        {/* Interaction Terminal */}
        <div className="relative">
          <div className="relative bg-[#0b0f17] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <div className="p-8 md:p-12">
              {step === 'auth' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">
                    {mode === 'login' ? 'System Authentication' : 'Registry Initialized'}
                  </h3>
                  
                  {error && <p className="text-red-400 text-[10px] mb-4 bg-red-500/10 p-2 border border-red-500/20 rounded">{error}</p>}

                  <form onSubmit={handleAuth} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Identity ID</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-lg py-3.5 pl-11 pr-4 outline-none text-sm" placeholder="neuro.surgeon@hospital.net" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Access Protocol</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                        <input required type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-lg py-3.5 pl-11 pr-12 outline-none text-sm" placeholder="••••••••••••" />
                      </div>
                    </div>

                    <button disabled={loading} className="group relative w-full py-4 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-bold text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-3">
                      {loading ? <RefreshCw className="animate-spin" /> : (mode === 'login' ? <ShieldCheck size={18} /> : <UserPlus size={18} />)}
                      {mode === 'login' ? 'Initiate Handshake' : 'Register Identity'}
                    </button>

                    <div className="text-center">
                      <button type="button" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-[10px] text-slate-500 hover:text-cyan-400 uppercase tracking-widest transition-colors">
                        {mode === 'login' ? "Need New Identity? Register" : "Existing Identity? Login"}
                      </button>
                    </div>
                  </form>
                </div>
              )}
              {/* (Keep 'initializing' and 'dashboard' steps same as before) */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;