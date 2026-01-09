import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0b1724]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer">
            <div className="size-8 rounded bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-background-dark">
              <span className="material-symbols-outlined font-bold">medical_services</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">SurgicalAI</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">Home</Link>
            <Link to="/ai" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">AI Assistant</Link>
            <Link to="/model" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">3D Model View</Link>
            <Link to="/arvr" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">AR/VR View</Link>
            <Link to="/quize" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">Quize</Link>
          </div>

          {/* Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* <button className="text-sm font-bold text-white hover:text-primary transition-colors">Login</button> */}
            {/* <button className="bg-primary hover:bg-primary-hover text-background-dark px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-glow hover:shadow-glow-hover">
              Get Started
            </button> */}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            <button className="text-white hover:text-primary">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}