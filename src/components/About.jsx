export default function About({ darkMode }) {
  const skills = ["React", "JavaScript", "Python", "Node.js", "Tailwind CSS", "Git"];

  return (
    <section className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">About Me</h2>
        <p className={`max-w-2xl mx-auto text-center mb-8 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Computer Science student focusing on building scalable React web applications and modern AI models.
        </p>
        <h3 className="text-xl font-semibold mb-4 text-center">Technical Skills</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {skills.map((skill, index) => (
            <span key={index} className={`px-3 py-1 text-sm font-medium rounded-full ${darkMode ? 'bg-gray-800 text-blue-400' : 'bg-blue-50 text-blue-700'}`}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}