import { useEffect, useRef, useState } from 'react';
import './index.css';
import Navbar from './components/Navbar.jsx';
import MatrixBackground from './components/MatrixBackground.jsx';
import Terminal from './components/Terminal.jsx';
import Hero from './components/Hero.jsx';
import SkillsMatrix from './components/SkillsMatrix.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';

function App() {
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    const speed = 0.4;

    const animate = () => {
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;

      cursor.style.left = `${currentX}px`;
      cursor.style.top = `${currentY}px`;
      requestAnimationFrame(animate);
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);
    animate();

    // Hover effects
    const addHover = () => cursor.classList.add('cursor-hover');
    const removeHover = () => cursor.classList.remove('cursor-hover');

    const clickableElements = document.querySelectorAll(
      'a, button, .nav-link, [data-clickable]'
    );

    clickableElements.forEach((el) => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      clickableElements.forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  return (
    <div>
        <MatrixBackground />

      <Navbar />
      <Hero />
      <Terminal scrollRefs={{ projects: projectsRef, contact: contactRef }} />
      <SkillsMatrix />
      <div ref={projectsRef}>
        <Projects />
      </div>
      <div ref={contactRef}>
        <Contact />
      </div>
      
      <div id="customCursor" ref={cursorRef} style={{
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <div className="cursor-outer"></div>
        <div className="cursor-inner"></div>
      </div>
    </div>
  );
}

export default App;