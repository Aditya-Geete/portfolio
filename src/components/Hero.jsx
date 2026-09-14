import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Hero({ darkMode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        <p className={`ml-3 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading Home...</p>
      </div>
    );
  }

  return (
    <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-white to-blue-50'}`}>
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="text-blue-600 font-semibold text-lg">Hello, I'm</p>
        <h1 className="text-4xl sm:text-5xl font-bold my-2">Aditya Geete</h1>
        <p className={`text-lg max-w-xl mx-auto mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Computer Science Student & Full-Stack Developer building modular React applications.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/projects" className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
            View Projects
          </Link>
          <Link to="/contact" className={`px-5 py-2.5 border border-blue-600 font-medium rounded-lg ${darkMode ? 'text-blue-400 hover:bg-gray-800' : 'text-blue-600 hover:bg-blue-50'}`}>
            Get In Touch
          </Link>
        </div>
      </div>
    </section>
  );
}