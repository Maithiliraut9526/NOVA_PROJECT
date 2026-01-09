import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase'; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { 
  User, 
  Lock, 
  ChevronRight, 
  Eye, 
  EyeOff, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ id: '', key: '' });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Real Firebase Authentication
      await signInWithEmailAndPassword(auth, formData.id, formData.key);
      
      setIsLoading(false);
      setSuccess(true); // Triggers your success animation

      // Wait for animation to finish before moving to the model view
      setTimeout(() => {
        navigate('/model'); 
      }, 2200);

    } catch (err) {
      setIsLoading(false);
      setError("Authorization Failed. Please check your credentials.");
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#020617] flex items-center justify-center p-4 font-sans text-slate-200 overflow-hidden relative"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#0ea5e915,transparent)] opacity-40" />
        <div 
          className="absolute w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px] transition-transform duration-1000 ease-out"
          style={{ 
            transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 50}px)`,
            top: '20%', left: '20%' 
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1000px] grid lg:grid-cols-2 bg-slate-900/60 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-[0_0_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden animate-container-in">
        
        {/* Left Side: Branding */}
        <div className="p-12 lg:p-16 flex flex-col justify-center relative bg-gradient-to-br from-slate-950/80 to-transparent border-r border-white/5">
          <div className="relative">
            <div className="flex items-center gap-5 mb-14 group cursor-default">
              <div 
                className="relative w-16 h-16 transition-transform duration-500 ease-out"
                style={{ transform: `perspective(1000px) rotateX(${mousePos.y * 30}deg) rotateY(${mousePos.x * 30}deg)` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-sky-600 rounded-2xl rotate-45 group-hover:rotate-90 transition-all duration-1000 shadow-[0_0_40px_rgba(56,189,248,0.4)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles size={32} className="text-white animate-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight text-white">
                  Surgical<span className="text-sky-400">AI</span>
                </h1>
                <p className="text-[10px] font-bold text-sky-400 tracking-[0.3em] uppercase">Intelligence Evolved</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Step Into the Future <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-cyan-300">of Anatomy</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
                Login to explore high-fidelity 3D systems and immersive AR simulations.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-10 lg:p-16 flex flex-col justify-center relative bg-white/[0.01]">
          
          <div className={`transition-all duration-700 ${success ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
            <div className="mb-10">
              <h3 className="text-3xl font-bold text-white mb-2">Secure Access</h3>
              <p className="text-slate-400 text-sm">Please sign in to your encrypted portal.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2 group animate-slide-up">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Identity</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors" size={18} />
                  <input 
                    required
                    type="email"
                    className="w-full bg-slate-800/50 border border-white/10 focus:border-sky-500/50 focus:bg-slate-800/80 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all text-white placeholder:text-slate-600"
                    placeholder="Medical Email"
                    onChange={(e) => setFormData({...formData, id: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2 group animate-slide-up [animation-delay:100ms]">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Access Key</label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors" size={18} />
                  <input 
                    required
                    type={showPass ? "text" : "password"}
                    className="w-full bg-slate-800/50 border border-white/10 focus:border-sky-500/50 focus:bg-slate-800/80 rounded-2xl py-4 pl-12 pr-12 outline-none transition-all text-white placeholder:text-slate-600"
                    placeholder="Password"
                    onChange={(e) => setFormData({...formData, key: e.target.value})}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-sky-400 transition-colors"
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-rose-500 text-[10px] font-bold text-center uppercase tracking-widest animate-pulse mt-2">
                  {error}
                </p>
              )}

              <button 
                disabled={isLoading}
                className="w-full relative group bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-2xl py-4 px-6 font-black text-lg shadow-[0_15px_35px_-10px_rgba(14,165,233,0.5)] transition-all active:scale-[0.98] disabled:opacity-80 overflow-hidden mt-2"
              >
                {/* Shine Effect Layer */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:animate-shine" />
                </div>

                <div className={`flex items-center justify-center gap-2 transition-all duration-300 ${isLoading ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
                  <span>Continue</span>
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
                
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-sky-500">
                    <div className="w-6 h-6 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Success State */}
          {success && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center animate-success-in">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-sky-400 blur-3xl opacity-20 animate-pulse" />
                  <div className="w-24 h-24 bg-sky-400 text-slate-950 rounded-[2rem] flex items-center justify-center relative shadow-[0_20px_50px_-10px_rgba(56,189,248,0.5)]">
                    <CheckCircle2 size={48} />
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-white mb-2">Authenticated</h2>
                <p className="text-slate-400">Entering your secure environment...</p>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes container-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes success-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shine {
          from { opacity: 0; left: -100%; }
          50% { opacity: 1; }
          to { opacity: 0; left: 200%; }
        }
        .animate-container-in { animation: container-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-up { animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-success-in { animation: success-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-shine { animation: shine 0.8s ease-in-out; }
      `}} />
    </div>
  );
};

export default Login;





// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth } from './firebase'; 
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { 
//   User, 
//   Lock, 
//   ChevronRight, 
//   Eye, 
//   EyeOff, 
//   Sparkles,
//   CheckCircle2
// } from 'lucide-react';

// const Login = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [showPass, setShowPass] = useState(false);
//   const [error, setError] = useState('');
//   const [formData, setFormData] = useState({ id: '', key: '' });
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
//   const containerRef = useRef(null);
//   const navigate = useNavigate();

//   const handleMouseMove = (e) => {
//     if (!containerRef.current) return;
//     const rect = containerRef.current.getBoundingClientRect();
//     const x = (e.clientX - rect.left) / rect.width - 0.5;
//     const y = (e.clientY - rect.top) / rect.height - 0.5;
//     setMousePos({ x, y });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       // Real Firebase Authentication
//       await signInWithEmailAndPassword(auth, formData.id, formData.key);
      
//       setIsLoading(false);
//       setSuccess(true); // Triggers your success animation

//       // Wait for animation to finish before moving to the model view
//       setTimeout(() => {
//         navigate('/model'); 
//       }, 2200);

//     } catch (err) {
//       setIsLoading(false);
//       setError("Authorization Failed. Please check your credentials.");
//     }
//   };

//   return (
//     <div 
//       ref={containerRef}
//       onMouseMove={handleMouseMove}
//       className="min-h-screen bg-[#020617] flex items-center justify-center p-4 font-sans text-slate-200 overflow-hidden relative"
//     >
//       {/* Background Ambience */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#0ea5e915,transparent)] opacity-40" />
//         <div 
//           className="absolute w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px] transition-transform duration-1000 ease-out"
//           style={{ 
//             transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 50}px)`,
//             top: '20%', left: '20%' 
//           }}
//         />
//       </div>

//       <div className="relative z-10 w-full max-w-[1000px] grid lg:grid-cols-2 bg-slate-900/60 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-[0_0_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden animate-container-in">
        
//         {/* Left Side: Branding */}
//         <div className="p-12 lg:p-16 flex flex-col justify-center relative bg-gradient-to-br from-slate-950/80 to-transparent border-r border-white/5">
//           <div className="relative">
//             <div className="flex items-center gap-5 mb-14 group cursor-default">
//               <div 
//                 className="relative w-16 h-16 transition-transform duration-500 ease-out"
//                 style={{ transform: `perspective(1000px) rotateX(${mousePos.y * 30}deg) rotateY(${mousePos.x * 30}deg)` }}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-sky-600 rounded-2xl rotate-45 group-hover:rotate-90 transition-all duration-1000 shadow-[0_0_40px_rgba(56,189,248,0.4)]" />
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <Sparkles size={32} className="text-white animate-pulse" />
//                 </div>
//               </div>
//               <div>
//                 <h1 className="text-3xl font-black tracking-tight text-white">
//                   Surgical<span className="text-sky-400">AI</span>
//                 </h1>
//                 <p className="text-[10px] font-bold text-sky-400 tracking-[0.3em] uppercase">Intelligence Evolved</p>
//               </div>
//             </div>

//             <div className="space-y-6">
//               <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
//                 Empowering <br/>
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-cyan-300">Humanity.</span>
//               </h2>
//               <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
//                 Advanced AI integration for precision performance across the entire surgical ecosystem.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Right Side: Login Form */}
//         <div className="p-10 lg:p-16 flex flex-col justify-center relative bg-white/[0.01]">
          
//           <div className={`transition-all duration-700 ${success ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
//             <div className="mb-10">
//               <h3 className="text-3xl font-bold text-white mb-2">Secure Access</h3>
//               <p className="text-slate-400 text-sm">Please sign in to your encrypted portal.</p>
//             </div>

//             <form onSubmit={handleLogin} className="space-y-5">
//               <div className="space-y-2 group animate-slide-up">
//                 <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Identity</label>
//                 <div className="relative">
//                   <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors" size={18} />
//                   <input 
//                     required
//                     type="email"
//                     className="w-full bg-slate-800/50 border border-white/10 focus:border-sky-500/50 focus:bg-slate-800/80 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all text-white placeholder:text-slate-600"
//                     placeholder="Medical Email"
//                     onChange={(e) => setFormData({...formData, id: e.target.value})}
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2 group animate-slide-up [animation-delay:100ms]">
//                 <div className="flex justify-between items-center px-1">
//                   <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Access Key</label>
//                 </div>
//                 <div className="relative">
//                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors" size={18} />
//                   <input 
//                     required
//                     type={showPass ? "text" : "password"}
//                     className="w-full bg-slate-800/50 border border-white/10 focus:border-sky-500/50 focus:bg-slate-800/80 rounded-2xl py-4 pl-12 pr-12 outline-none transition-all text-white placeholder:text-slate-600"
//                     placeholder="Password"
//                     onChange={(e) => setFormData({...formData, key: e.target.value})}
//                   />
//                   <button 
//                     type="button"
//                     onClick={() => setShowPass(!showPass)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-sky-400 transition-colors"
//                   >
//                     {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//               </div>

//               {error && (
//                 <p className="text-rose-500 text-[10px] font-bold text-center uppercase tracking-widest animate-pulse mt-2">
//                   {error}
//                 </p>
//               )}

//               <button 
//                 disabled={isLoading}
//                 className="w-full relative group bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-2xl py-4 px-6 font-black text-lg shadow-[0_15px_35px_-10px_rgba(14,165,233,0.5)] transition-all active:scale-[0.98] disabled:opacity-80 overflow-hidden mt-2"
//               >
//                 {/* Shine Effect Layer */}
//                 <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
//                   <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:animate-shine" />
//                 </div>

//                 <div className={`flex items-center justify-center gap-2 transition-all duration-300 ${isLoading ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
//                   <span>Continue</span>
//                   <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
//                 </div>
                
//                 {isLoading && (
//                   <div className="absolute inset-0 flex items-center justify-center bg-sky-500">
//                     <div className="w-6 h-6 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
//                   </div>
//                 )}
//               </button>
//             </form>
//           </div>

//           {/* Success State */}
//           {success && (
//             <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center animate-success-in">
//                 <div className="relative mb-8">
//                   <div className="absolute inset-0 bg-sky-400 blur-3xl opacity-20 animate-pulse" />
//                   <div className="w-24 h-24 bg-sky-400 text-slate-950 rounded-[2rem] flex items-center justify-center relative shadow-[0_20px_50px_-10px_rgba(56,189,248,0.5)]">
//                     <CheckCircle2 size={48} />
//                   </div>
//                 </div>
//                 <h2 className="text-4xl font-bold text-white mb-2">Authenticated</h2>
//                 <p className="text-slate-400">Entering your secure environment...</p>
//             </div>
//           )}
//         </div>
//       </div>

//       <style dangerouslySetInnerHTML={{ __html: `
//         @keyframes container-in {
//           from { opacity: 0; transform: scale(0.95); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         @keyframes slide-up {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes success-in {
//           from { opacity: 0; transform: scale(0.9); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         @keyframes shine {
//           from { opacity: 0; left: -100%; }
//           50% { opacity: 1; }
//           to { opacity: 0; left: 200%; }
//         }
//         .animate-container-in { animation: container-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
//         .animate-slide-up { animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
//         .animate-success-in { animation: success-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
//         .animate-shine { animation: shine 0.8s ease-in-out; }
//       `}} />
//     </div>
//   );
// };

// export default Login;


