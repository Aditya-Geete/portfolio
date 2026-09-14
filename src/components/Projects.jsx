import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { API_BASE_URL } from '../api';

export default function Projects({ darkMode }) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setError(null);

    fetch(`${API_BASE_URL}/api/projects`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load projects.');
        return res.json();
      })
      .then((data) => {
        if (isMounted) setProjects(data);
      })
      .catch(() => {
        if (isMounted) {
          setError('Could not load projects. Please make sure the backend server is running and try again.');
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Projects</h2>

        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className={`ml-3 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading projects...</p>
          </div>
        )}

        {!isLoading && error && (
          <p className="text-center text-red-500 font-medium py-10">{error}</p>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} darkMode={darkMode} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
