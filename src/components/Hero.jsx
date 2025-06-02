import { useEffect, useState } from 'react';
import '../styles/hero.css';
import nodeLogo from '../assets/node.png';
import reactLogo from '../assets/React.png';
import ExpressLogo from '../assets/Express.jpg';
import JSLogo from '../assets/javascript.png';
import htmlLogo from '../assets/html.png';
import cssLogo from '../assets/css.png';
import sqlLogo from '../assets/sql.png';
import axiosLogo from '../assets/axios.png';
import authLogo from '../assets/authentication.png';
import yash from '../assets/profile.jpg';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const phrases = [
    "Enthusiastic Programmer",
    "Full-Stack Web Developer",
    "UI/UX Engineer",
    "SQL Database Expert",
    "API Expert"
  ];

  const techStack = [
    { name: "React", icon: reactLogo },
    { name: "Node.js", icon: nodeLogo },
    { name: "Express.js", icon: ExpressLogo },
    { name: "JavaScript", icon: JSLogo },
    { name: "HTML", icon: htmlLogo },
    { name: "CSS", icon: cssLogo },
    { name: "PostgreSQL", icon: sqlLogo },
    { name: "Axios", icon: axiosLogo },
    { name: "Authentication", icon: authLogo },
  ];

  useEffect(() => {
    let currentText = '';
    let isDeleting = false;
    let typingSpeed = 150;
    let phraseIndex = 0;

    const type = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        currentText = currentPhrase.substring(0, currentText.length - 1);
      } else {
        currentText = currentPhrase.substring(0, currentText.length + 1);
      }

      setTypedText(currentText);

      if (!isDeleting && currentText === currentPhrase) {
        typingSpeed = 1500;
        isDeleting = true;
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 150;
      } else if (isDeleting) {
        typingSpeed = 50;
      }

      setTimeout(type, typingSpeed);
    };

    const timer = setTimeout(type, 1000);
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(cursorInterval);
    };
  }, []);

  // Exact same smooth scrolling function with easing as Navbar
  const smoothScrollTo = (targetY, duration = 600) => {
    const startY = window.pageYOffset;
    const difference = targetY - startY;
    let startTime = null;

    const easeInOutQuad = (t) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutQuad(progress);

      window.scrollTo(0, startY + difference * ease);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      // If you have a fixed navbar, subtract its height (defaulting 80px)
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      smoothScrollTo(sectionTop, 600);
    }
  };

  return (
    <section id='home' className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-terminal">
            <div className="terminal-line">
              <span className="prompt">user@portfolio:~$</span> cat about.txt
            </div>
            <div className="terminal-line output">
              <span className="text-primary">Hello, I'm</span> Yashmeet Singh
            </div>
            <div className="terminal-line output">
              <span className="text-secondary">{typedText}</span>
              <span className={`cursor ${showCursor ? 'visible' : ''}`}>|</span>
            </div>
          </div>

          <div className="hero-actions">
            <button
              className="hero-btn"
              onClick={() => scrollToSection('projects')}
            >
              <span className="btn-code">view_projects()</span>
              <span className="btn-arrow">→</span>
            </button>
            <button
              className="hero-btn secondary"
              onClick={() => scrollToSection('contact')}
            >
              <span className="btn-code">contact_me()</span>
              <span className="btn-arrow">↗</span>
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="profile-image-container">
            <img
              src={yash}
              alt="Profile"
              className="profile-image"
            />
            <div className="image-border-effect"></div>
          </div>

          <div className="tech-stack">
            {techStack.map((tech, index) => (
              <div key={index} className="tech-item">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="tech-icon"
                />
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
