import React, { useEffect, useRef, useState } from "react";
import "./App.css"; // Include your CSS for styling
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";

// Projects with optional screenshots
const projects = [
  { 
    title: "Omnimins", 
    description: "Landing page for a fictional smartwatch brand.", 
    link: "https://omnimins.netlify.app/", 
    tech: ["HTML", "CSS", "JavaScript"],
    screenshot: "" // Add image link if available
  },
  { 
    title: "Landing Page Gules Omega", 
    description: "Built with React and Tailwind CSS.", 
    link: "https://landing-page-gules-omega.vercel.app/", 
    tech: ["React", "Tailwind CSS"],
    screenshot: ""
  },
  { 
    title: "Code Review & Docs", 
    description: "Practicing coding, improving code quality, and writing documentation.", 
    link: "https://github.com/ap-afk", 
    tech: ["GitHub", "Documentation"],
    screenshot: ""
  },
  { 
    title: "FoodReels", 
    description: "Web app for exploring food recipes with an interactive UI.", 
    link: "https://foodreels.netlify.app/", 
    tech: ["React", "API", "CSS"],
    screenshot: ""
  },
];

// Skills with icons
const skills = [
  { name: "HTML", icon: <FaHtml5 /> },
  { name: "CSS", icon: <FaCss3Alt /> },
  { name: "JavaScript", icon: <FaJsSquare /> },
  { name: "React", icon: <FaReact /> },
  { name: "Tailwind", icon: <SiTailwindcss /> },
  { name: "Node.js", icon: <FaNodeJs /> }
];

function App() {
  const [visible, setVisible] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false); // responsive navbar
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute("data-index");
            setVisible((prev) => [...new Set([...prev, parseInt(index)])]);
          }
        });
      },
      { threshold: 0.3 }
    );

    cardRefs.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen font-sans scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-blue-500 text-white px-6 py-4 flex justify-between items-center z-50 shadow">
        <div className="text-lg md:text-xl font-bold">Aayushman Singh</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-sm md:text-base">
          <a href="#about" className="hover:underline">About</a>
          <a href="#projects" className="hover:underline">Projects</a>
          <a href="#skills" className="hover:underline">Skills</a>
          <a href="#resume" className="hover:underline">Resume</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-blue-600 flex flex-col items-center md:hidden py-4 space-y-4 shadow">
            <a href="#about" className="hover:underline" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#projects" className="hover:underline" onClick={() => setMenuOpen(false)}>Projects</a>
            <a href="#skills" className="hover:underline" onClick={() => setMenuOpen(false)}>Skills</a>
            <a href="#resume" className="hover:underline" onClick={() => setMenuOpen(false)}>Resume</a>
            <a href="#contact" className="hover:underline" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="text-center px-6 py-20 bg-blue-400 text-white mt-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">Hi, I'm Aayushman</h1>
        <p className="text-lg md:text-xl mb-6 animate-fadeIn delay-200">Aspiring MERN Stack Developer | 7th Grade</p>
        <a href="#projects" className="bg-white text-blue-500 font-bold px-6 py-3 rounded hover:bg-gray-100 transition animate-fadeIn delay-400">
          View My Projects
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 py-12 bg-white rounded shadow mt-12 animate-fadeIn">
        <h2 className="text-3xl font-bold mb-4">About Me</h2>
        <p className="text-gray-700 leading-relaxed">
          I am a young developer learning web development with HTML, CSS, JavaScript, React, Tailwind, and Node.js. 
          I enjoy building projects, solving coding challenges, and learning new technologies every day.
        </p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Projects</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              data-index={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`project-card ${visible.includes(index) ? "visible" : "opacity-0 translate-y-8"} bg-white rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col`}
            >
              {project.screenshot && (
                <img src={project.screenshot} alt={`${project.title} screenshot`} className="mb-4 rounded" />
              )}
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech?.map((t, i) => (
                  <span key={i} className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full hover:bg-blue-200 transition">
                    {t}
                  </span>
                ))}
              </div>

              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer" 
                className="mt-auto inline-block bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                View Project
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 py-12 bg-white rounded shadow mt-12 animate-fadeIn">
        <h2 className="text-3xl font-bold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span key={skill.name} className="bg-blue-500 text-white px-4 py-2 rounded-full shadow flex items-center gap-2 hover:bg-blue-600 transition">
              {skill.icon} {skill.name}
            </span>
          ))}
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 py-12 bg-white rounded shadow mt-12 animate-fadeIn">
        <h2 className="text-3xl font-bold mb-4 text-center">Resume</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Summary</h3>
          <p>Aspiring MERN Stack Developer and 7th-grade student passionate about building web applications. Experienced with React, Node.js, Tailwind, and MongoDB.</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill.name} className="bg-blue-500 text-white px-4 py-2 rounded-full shadow flex items-center gap-2">
                {skill.icon} {skill.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Projects</h3>
          <ul className="list-disc list-inside">
            {projects.map((project, index) => (
              <li key={index} className="mb-2">
                <strong>{project.title}</strong>: {project.description}{" "}
                <a href={project.link} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                  View Project
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Education</h3>
          <p>Currently studying in 7th grade</p>
        </div>

        
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 py-12 mb-12 bg-white rounded shadow text-center mt-12 animate-fadeIn">
        <h2 className="text-3xl font-bold mb-4">Contact</h2>
        <p>Email: <a href="mailto:aayushmaansingh726@gmail.com" className="text-blue-500 hover:underline">aayushmaansingh726@gmail.com</a></p>
        <p>GitHub: <a href="https://github.com/ap-afk" className="text-blue-500 hover:underline">github.com/ap-afk</a></p>
        <a href="mailto:aayushmaansingh726@gmail.com" className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition">
          Send Email
        </a>
      </section>
    </div>
  );
}

export default App;
