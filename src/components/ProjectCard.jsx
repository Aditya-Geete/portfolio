import { useState } from 'react';
import { Link } from 'react-router-dom';

function TechBadge({ techName, darkMode }) {
  return (
    <span className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
      {techName}
    </span>
  );
}

export default function ProjectCard({ project, darkMode }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={`p-6 rounded-lg border shadow-sm flex flex-col justify-between ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div>
        <span className="text-xs font-bold text-blue-500 uppercase tracking-wide">{project.tag}</span>
        <h3 className="text-xl font-bold my-2">{project.title}</h3>
        <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>

        {showMore && (
          <p className="text-xs italic my-2 text-blue-400">{project.fullDetails}</p>
        )}

        <button
          onClick={() => setShowMore(!showMore)}
          className="text-xs font-semibold text-blue-500 mb-4 hover:underline block"
        >
          {showMore ? 'Hide Brief Details ▲' : 'Expand Brief Details ▼'}
        </button>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((t, i) => (
            <TechBadge key={i} techName={t} darkMode={darkMode} />
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-gray-700/20">
        <Link to={`/projects/${project.id}`} className="text-blue-500 text-sm font-medium hover:underline">
          Full Page Details &rarr;
        </Link>
      </div>
    </div>
  );
}
