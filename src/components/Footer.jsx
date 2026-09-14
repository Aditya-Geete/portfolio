export default function Footer({ darkMode }) {
  return (
    <footer className={`py-6 border-t text-center text-sm ${darkMode ? 'bg-gray-900 border-gray-800 text-gray-400' : 'bg-white border-gray-200 text-gray-600'}`}>
      <p>© 2026 Aditya Geete. All rights reserved.</p>
    </footer>
  );
}