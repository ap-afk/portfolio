import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Typewriter } from "react-simple-typewriter";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";

/* -----------------------------------------
   Data: projects & skills (same as before)
----------------------------------------- */
const projects = [
  {
    title: "Omnimins",
    description: "Landing page for a fictional smartwatch brand.",
    link: "https://omnimins.netlify.app/",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Landing Page Gules Omega",
    description: "React + Tailwind landing page.",
    link: "https://landing-page-gules-omega.vercel.app/",
    tech: ["React", "Tailwind CSS"],
  },
  {
    title: "Code Review & Docs",
    description: "Improving code quality and documentation.",
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

const skills = [
  { name: "HTML", icon: <FaHtml5 /> },
  { name: "CSS", icon: <FaCss3Alt /> },
  { name: "JavaScript", icon: <FaJsSquare /> },
  { name: "React", icon: <FaReact /> },
  { name: "Tailwind", icon: <SiTailwindcss /> },
  { name: "Node.js", icon: <FaNodeJs /> },
];

/* -----------------------------------------
   Project Request Form (Web3Forms)
----------------------------------------- */
function ProjectRequestForm() {
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [showResultModal, setShowResultModal] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResultMessage("");

    const formData = new FormData(event.target);
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResultMessage("🎉 Your project request has been sent!");
        event.target.reset();
      } else {
        setResultMessage("❌ " + data.message);
      }
    } catch (err) {
      setResultMessage("❌ Network error: " + err.message);
    }

    setLoading(false);
    setShowResultModal(true);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-4 max-w-3xl mx-auto">
        <div>
          <label className="font-semibold">Your Name *</label>
          <input name="name" required className="w-full border px-4 py-2 rounded bg-white text-black" />
        </div>

        <div>
          <label className="font-semibold">Email *</label>
          <input type="email" name="email" required className="w-full border px-4 py-2 rounded bg-white text-black" />
        </div>

        <div>
          <label className="font-semibold">Project Description *</label>
          <textarea name="message" rows="5" required className="w-full border px-4 py-2 rounded bg-white text-black"></textarea>
        </div>

        <button className="w-full bg-blue-500 text-white py-3 rounded font-semibold hover:bg-blue-600">
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>

      {/* Success Modal */}
      {showResultModal && (
        <div className="modal-bg">
          <div className="modal-box">
            <h3 className="text-xl font-bold mb-2">Message</h3>
            <p>{resultMessage}</p>

            <button className="btn mt-4" onClick={() => setShowResultModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* -----------------------------------------
   MAIN APP
----------------------------------------- */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  /* ---------- DARK/LIGHT MODE USING NORMAL CSS ---------- */
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") || "light";
    setTheme(stored);
    document.body.className = stored;
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.body.className = next;
  };

  /* ---------- PROJECT MODAL ---------- */
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  const openModal = (p) => {
    setActiveProject(p);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveProject(null);
  };

  return (
    <div>

      {/* NAVBAR */}
      <nav className="navbar shadow-lg">
        <div className="text-xl font-bold">Aayushman Singh</div>

        <div className="hidden md:flex gap-6">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#resume">Resume</a>
          <a href="#project-request">Give Project</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="flex gap-3">
          <button className="theme-btn" onClick={toggleTheme}>
            {theme === "light" ? "Dark" : "Light"}
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-3xl">☰</button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          <a onClick={() => setMenuOpen(false)} href="#about">About</a>
          <a onClick={() => setMenuOpen(false)} href="#projects">Projects</a>
          <a onClick={() => setMenuOpen(false)} href="#skills">Skills</a>
          <a onClick={() => setMenuOpen(false)} href="#resume">Resume</a>
          <a onClick={() => setMenuOpen(false)} href="#project-request">Give Project</a>
          <a onClick={() => setMenuOpen(false)} href="#contact">Contact</a>
        </div>
      )}

      {/* HERO */}
      <section className="text-center px-6 py-24 bg-blue-400 text-white mt-16">
        <h1 className="text-5xl font-bold">Hi, I'm Aayushman</h1>
        <h2 className="text-xl mt-4">
          <Typewriter
            words={[
              "MERN Developer",
              "React Developer",
              "Frontend Developer",
              "7th Grade Programmer"
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={40}
            delaySpeed={1000}
          />
        </h2>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <h2 className="section-title">About Me</h2>
        <p>I am a passionate young developer learning MERN Stack development.</p>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <h2 className="section-title">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div key={i} className="card cursor-pointer hover:shadow-xl" onClick={() => openModal(p)}>
              <h3 className="font-bold text-xl">{p.title}</h3>
              <p className="opacity-75 mt-2">{p.description}</p>

              <div className="flex gap-2 mt-3">
                {p.tech.map((t, idx) => (
                  <span key={idx} className="bg-blue-200 text-blue-600 px-3 py-1 rounded text-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECT MODAL */}
      {modalOpen && activeProject && (
        <div className="modal-bg">
          <div className="modal-box">
            <button onClick={closeModal} className="text-xl float-right font-bold">×</button>

            <h2 className="text-2xl font-bold">{activeProject.title}</h2>
            <p className="my-3">{activeProject.description}</p>

            <a href={activeProject.link} className="btn w-full mt-3">
              View Project
            </a>
          </div>
        </div>
      )}

      {/* SKILLS */}
      <section id="skills" className="section">
        <h2 className="section-title">Skills</h2>

        <div className="flex flex-wrap gap-3">
          {skills.map((s, i) => (
            <span key={i} className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center gap-2">
              {s.icon} {s.name}
            </span>
          ))}
        </div>
      </section>

      {/* RESUME */}
      <section id="resume" className="section">
        <h2 className="section-title">Resume</h2>
        <p>7th Grade | MERN Developer | React Learner</p>
      </section>

      {/* PROJECT REQUEST FORM */}
      <section id="project-request" className="section">
        <h2 className="section-title">Give Me a Project</h2>
        <ProjectRequestForm />
      </section>

      {/* CONTACT */}
      <section id="contact" className="section text-center">
        <h2 className="section-title">Contact</h2>
        <p>Email: <a className="text-blue-500" href="mailto:aayushmaansingh726@gmail.com">aayushmaansingh726@gmail.com</a></p>
      </section>

    </div>
  );
}
