import { Link } from 'react-router-dom';

export default function NotFound({ darkMode }) {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>The page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
        Return to Home
      </Link>
    </div>
  );
}