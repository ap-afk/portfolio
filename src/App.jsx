import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";

// Project List
const projects = [
  { 
    title: "Omnimins", 
    description: "Landing page for a fictional smartwatch brand.", 
    link: "https://omnimins.netlify.app/", 
    tech: ["HTML", "CSS", "JavaScript"],
  },
  { 
    title: "Landing Page Gules Omega", 
    description: "Built with React and Tailwind CSS.", 
    link: "https://landing-page-gules-omega.vercel.app/", 
    tech: ["React", "Tailwind CSS"],
  },
  { 
    title: "Code Review & Docs", 
    description: "Improving code quality and writing documentation.", 
    link: "https://github.com/ap-afk", 
    tech: ["GitHub", "Documentation"],
  },
  { 
    title: "FoodReels", 
    description: "Recipe exploring app with interactive UI.", 
    link: "https://foodreels.netlify.app/", 
    tech: ["React", "API", "CSS"],
  },
];

// Skills List
const skills = [
  { name: "HTML", icon: <FaHtml5 /> },
  { name: "CSS", icon: <FaCss3Alt /> },
  { name: "JavaScript", icon: <FaJsSquare /> },
  { name: "React", icon: <FaReact /> },
  { name: "Tailwind", icon: <SiTailwindcss /> },
  { name: "Node.js", icon: <FaNodeJs /> },
];

function App() {
  const [visible, setVisible] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const cardRefs = useRef([]);

  // Scroll animation for project cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index;
            setVisible(prev => [...new Set([...prev, Number(index)])]);
          }
        });
      },
      { threshold: 0.3 }
    );

    cardRefs.current.forEach(card => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen font-sans scroll-smooth">

      {/* ---------------- NAVBAR ---------------- */}
      <nav className="fixed top-0 left-0 w-full bg-blue-500 text-white px-6 py-4 flex justify-between items-center shadow-lg z-50">

        {/* Logo */}
        <div className="font-bold text-xl">Aayushman Singh</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <a href="#about" className="hover:underline">About</a>
          <a href="#projects" className="hover:underline">Projects</a>
          <a href="#skills" className="hover:underline">Skills</a>
          <a href="#resume" className="hover:underline">Resume</a>
          <a href="#project-request" className="hover:underline">Give Project</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-3xl">
          ☰
        </button>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="
            absolute top-full left-0 
            w-full bg-blue-600 text-white 
            flex flex-col py-4 space-y-4 
            shadow-xl z-[9999]
          ">
            <a onClick={() => setMenuOpen(false)} href="#about" className="text-center py-2 hover:bg-blue-700">About</a>
            <a onClick={() => setMenuOpen(false)} href="#projects" className="text-center py-2 hover:bg-blue-700">Projects</a>
            <a onClick={() => setMenuOpen(false)} href="#skills" className="text-center py-2 hover:bg-blue-700">Skills</a>
            <a onClick={() => setMenuOpen(false)} href="#resume" className="text-center py-2 hover:bg-blue-700">Resume</a>
            <a onClick={() => setMenuOpen(false)} href="#project-request" className="text-center py-2 hover:bg-blue-700">Give Project</a>
            <a onClick={() => setMenuOpen(false)} href="#contact" className="text-center py-2 hover:bg-blue-700">Contact</a>
          </div>
        )}
      </nav>

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="text-center px-6 py-24 bg-blue-400 text-white mt-16">
        <h1 className="text-5xl font-bold mb-4">Hi, I'm Aayushman</h1>
        <p className="text-xl mb-6">Aspiring MERN Developer | 7th Grade</p>
        <a href="#projects" className="bg-white text-blue-500 px-6 py-3 rounded font-semibold hover:bg-gray-200">
          View Projects
        </a>
      </section>

      {/* ---------------- ABOUT SECTION ---------------- */}
      <section id="about" className="max-w-5xl mx-auto bg-white px-6 py-12 rounded shadow mt-12">
        <h2 className="text-3xl font-bold mb-3">About Me</h2>
        <p className="text-gray-700">
          I'm a young web developer learning HTML, CSS, JavaScript, React, Tailwind CSS, and Node.js.
          I love building real-world projects and learning new skills every day.
        </p>
      </section>

      {/* ---------------- PROJECTS SECTION ---------------- */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-12 mt-12">
        <h2 className="text-4xl font-bold mb-8 text-center">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div
              key={i}
              data-index={i}
              ref={el => (cardRefs.current[i] = el)}
              className={`bg-white shadow p-6 rounded transform transition duration-500 ${
                visible.includes(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{p.title}</h3>
              <p className="text-gray-600 mb-3">{p.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {p.tech.map((tech, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>

              <a href={p.link} target="_blank" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                View Project
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- SKILLS SECTION ---------------- */}
      <section id="skills" className="max-w-5xl mx-auto bg-white px-6 py-12 rounded shadow mt-12">
        <h2 className="text-3xl font-bold mb-4">Skills</h2>

        <div className="flex flex-wrap gap-3">
          {skills.map((s, i) => (
            <span key={i} className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center gap-2">
              {s.icon} {s.name}
            </span>
          ))}
        </div>
      </section>

      {/* ---------------- RESUME SECTION ---------------- */}
      <section id="resume" className="max-w-5xl mx-auto bg-white px-6 py-12 rounded shadow mt-12">
        <h2 className="text-3xl font-bold text-center mb-6">Resume</h2>

        <h3 className="text-xl font-semibold mb-2">Summary</h3>
        <p className="mb-4">
          A young MERN stack developer passionate about creating modern web applications.
        </p>

        <h3 className="text-xl font-semibold mb-2">Education</h3>
        <p className="mb-4">Currently studying in 7th Grade</p>

        <h3 className="text-xl font-semibold mb-2">Projects</h3>
        <ul className="list-disc pl-6">
          {projects.map((project, i) => (
            <li key={i} className="mb-2">
              <strong>{project.title}</strong> – {project.description}  
              (<a href={project.link} className="text-blue-500">View</a>)
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------- GIVE PROJECT FORM ---------------- */}
      <section id="project-request" className="max-w-5xl mx-auto bg-white px-6 py-12 rounded shadow mt-12">
        <h2 className="text-3xl font-bold text-center mb-3">Give Me a Project</h2>
        <p className="text-center text-gray-600 mb-8">
          Fill this form to hire me! I will reply within 24 hours.
        </p>

        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="space-y-4 max-w-3xl mx-auto"
        >
          <input type="hidden" name="access_key" value={import.meta.env.VITE_WEB3FORMS_KEY} />

          <div>
            <label className="font-semibold">Your Name *</label>
            <input name="name" required className="w-full border px-4 py-2 rounded" />
          </div>

          <div>
            <label className="font-semibold">Email *</label>
            <input type="email" name="email" required className="w-full border px-4 py-2 rounded" />
          </div>

          <div>
            <label className="font-semibold">Project Type *</label>
            <select name="project_type" required className="w-full border px-4 py-2 rounded">
              <option>Portfolio Website</option>
              <option>React Website</option>
              <option>E-commerce Website</option>
              <option>Landing Page</option>
              <option>Full MERN App</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Budget (INR)</label>
            <input name="budget" placeholder="₹2000 - ₹15000" className="w-full border px-4 py-2 rounded" />
          </div>

          <div>
            <label className="font-semibold">Deadline</label>
            <input type="date" name="deadline" className="w-full border px-4 py-2 rounded" />
          </div>

          <div>
            <label className="font-semibold">Project Description *</label>
            <textarea name="description" rows="5" required className="w-full border px-4 py-2 rounded"></textarea>
          </div>

          <button className="w-full bg-blue-500 text-white py-3 rounded font-semibold hover:bg-blue-600">
            Submit Project
          </button>
        </form>
      </section>

      {/* ---------------- CONTACT SECTION ---------------- */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-12 text-center mt-12 mb-12 bg-white shadow rounded">
        <h2 className="text-3xl font-bold mb-3">Contact</h2>
        <p>Email: <a className="text-blue-500" href="mailto:aayushmaansingh726@gmail.com">aayushmaansingh726@gmail.com</a></p>
        <p>GitHub: <a className="text-blue-500" href="https://github.com/ap-afk">github.com/ap-afk</a></p>
      </section>

    </div>
  );
}

export default App;
