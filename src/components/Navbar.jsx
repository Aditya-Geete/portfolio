import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ darkMode, setDarkMode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const linkStyle = ({ isActive }) =>
    `transition-colors hover:text-blue-500 ${isActive ? 'text-blue-600 font-bold' : darkMode ? 'text-gray-300' : 'text-gray-600'}`;

  return (
    <header className={`sticky top-0 z-50 border-b ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-xl font-bold text-blue-600">Portfolio</NavLink>

        <nav className="hidden md:flex gap-6 font-medium items-center">
          <NavLink to="/" className={linkStyle}>Home</NavLink>
          <NavLink to="/about" className={linkStyle}>About</NavLink>
          <NavLink to="/projects" className={linkStyle}>Projects</NavLink>
          <NavLink to="/contact" className={linkStyle}>Contact</NavLink>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-3 py-1 rounded-lg border text-sm ${darkMode ? 'bg-gray-800 border-gray-700 text-yellow-400' : 'bg-gray-100 border-gray-300 text-gray-700'}`}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </nav>

        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-xl">
          ☰
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className={`flex flex-col p-4 gap-3 md:hidden border-t ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'}`}>
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={linkStyle}>Home</NavLink>
          <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)} className={linkStyle}>About</NavLink>
          <NavLink to="/projects" onClick={() => setIsMobileMenuOpen(false)} className={linkStyle}>Projects</NavLink>
          <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={linkStyle}>Contact</NavLink>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-left py-1 text-sm font-medium"
          >
            Switch to {darkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      )}
    </header>
  );
}