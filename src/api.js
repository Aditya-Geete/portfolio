// Central place for the backend base URL.
// Set VITE_API_BASE_URL in a .env file at your frontend project root to override.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
