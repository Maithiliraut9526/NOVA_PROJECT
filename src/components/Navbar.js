// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0b1724]/80 backdrop-blur-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           {/* Logo */}
//           <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer">
//             <div className="size-8 rounded bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-background-dark">
//               <span className="material-symbols-outlined font-bold">medical_services</span>
//             </div>
//             <span className="text-xl font-bold tracking-tight text-white">SurgicalAI</span>
//           </div>

//           {/* Links */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link to="/" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">Home</Link>
//             <Link to="/ai" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">AI Assistant</Link>
//             <Link to="/model" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">3D Model View</Link>
//             <Link to="/arvr" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">AR/VR View</Link>
//             <Link to="/quize" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">Quize</Link>
//           </div>

//           {/* Buttons */}
//           <div className="hidden md:flex items-center gap-4">
//             {/* <button className="text-sm font-bold text-white hover:text-primary transition-colors">Login</button> */}
//             {/* <button className="bg-primary hover:bg-primary-hover text-background-dark px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-glow hover:shadow-glow-hover">
//               Get Started
//             </button> */}
//           </div>

//           {/* Mobile Menu */}
//           <div className="md:hidden flex items-center">
//             <button className="text-white hover:text-primary">
//               <span className="material-symbols-outlined">menu</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }



import { Link, useLocation } from "react-router-dom"; // Added useLocation
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Detects current page

  const toggleMenu = () => setIsOpen(!isOpen);

  // Helper to style active links
  const getLinkStyle = (path) => 
    location.pathname === path 
      ? "text-cyan-400 font-bold" 
      : "text-slate-300 hover:text-cyan-400";

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'AI Assistant', path: '/ai' },
    { name: '3D Model View', path: '/model' },
    { name: 'AR/VR View', path: '/arvr' },
    { name: 'Quiz', path: '/quize' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0b1724]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="size-9 rounded bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-black">
              <span className="material-symbols-outlined font-bold">medical_services</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-white italic">SurgicalAI</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`text-sm transition-colors uppercase tracking-widest ${getLinkStyle(link.path)}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white p-2">
              <span className="material-symbols-outlined text-3xl text-cyan-400">
                {isOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Slide Effect */}
      <div className={`md:hidden absolute w-full bg-[#0b1724] border-b border-cyan-500/20 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[400px] opacity-100 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-8 space-y-4 flex flex-col">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              onClick={() => setIsOpen(false)} 
              className={`text-lg py-2 border-b border-white/5 uppercase tracking-[0.2em] ${getLinkStyle(link.path)}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}