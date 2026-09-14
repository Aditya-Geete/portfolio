import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from '../api';

export default function ProjectDetail({ darkMode }) {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorType, setErrorType] = useState(null); // 'NOT_FOUND' | 'SERVER_ERROR' | null

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setErrorType(null);
    setProject(null);

    fetch(`${API_BASE_URL}/api/projects/${projectId}`)
      .then((res) => {
        if (res.status === 404) throw new Error('NOT_FOUND');
        if (!res.ok) throw new Error('SERVER_ERROR');
        return res.json();
      })
      .then((data) => {
        if (isMounted) setProject(data);
      })
      .catch((err) => {
        if (isMounted) setErrorType(err.message === 'NOT_FOUND' ? 'NOT_FOUND' : 'SERVER_ERROR');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className={`ml-3 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading project...</p>
      </div>
    );
  }

  if (errorType === 'NOT_FOUND') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
        <Link to="/projects" className="text-blue-600 underline">Back to Projects</Link>
      </div>
    );
  }

  if (errorType === 'SERVER_ERROR' || !project) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Something Went Wrong</h2>
        <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Could not load this project. Please make sure the backend server is running.
        </p>
        <Link to="/projects" className="text-blue-600 underline">Back to Projects</Link>
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <Link to="/projects" className="text-blue-500 text-sm font-semibold hover:underline">&larr; Back to Projects</Link>
      <h1 className="text-4xl font-bold my-4">{project.title}</h1>
      <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-6">{project.tag}</span>
      <p className={`text-lg mb-6 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{project.fullDetails}</p>

      <h3 className="font-bold text-lg mb-2">Technologies Used:</h3>
      <div className="flex gap-2 mb-8">
        {project.techStack.map((t, i) => (
          <span key={i} className={`px-3 py-1 text-sm rounded ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-800'}`}>{t}</span>
        ))}
      </div>

      <a href={project.link} target="_blank" rel="noreferrer" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
        Visit Project Repo / Live Link
      </a>
    </section>
  );
}
