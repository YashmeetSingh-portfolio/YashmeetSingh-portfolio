import { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverCommand, setHoverCommand] = useState('');
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const commands = {
    home: 'cd ~/home',
    projects: 'ls -la ./projects',
    skills: 'cat skills.txt | grep "expert"',
    about: 'vim about.md',
    contact: 'ssh contact@dev-portfolio'
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMenuOpen(false);

    const section = document.getElementById(link);
    if (section) {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      smoothScrollTo(sectionTop, 600); // scroll duration 600ms
    }
  };

  const smoothScrollTo = (targetY, duration) => {
    const startY = window.pageYOffset;
    const difference = targetY - startY;
    let startTime = null;

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutQuad(progress);

      window.scrollTo(0, startY + difference * ease);

      if (progress < 1) requestAnimationFrame(animation);
    };

    const easeInOutQuad = (t) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    requestAnimationFrame(animation);
  };

  const handleLinkHover = (link, event) => {
    setHoverCommand(commands[link]);
    const rect = event.target.getBoundingClientRect();
    setHoverPosition({
      x: rect.left + rect.width / 2,
      y: rect.bottom + 10,
    });
  };

  const handleLinkLeave = () => {
    setHoverCommand('');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-container">
        <div className="logo">
          <span className="code-symbol">{"$"}</span>
          <span className="logo-text">Yashmeet_Singh</span>
        </div>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`bar ${menuOpen ? 'bar1-open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'bar2-open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'bar3-open' : ''}`}></div>
        </div>

        <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
          {hoverCommand && (
            <div
              className="terminal-command"
              style={{
                left: `${hoverPosition.x}px`,
                top: `${hoverPosition.y}px`,
              }}
            >
              <span className="prompt">user@portfolio:~$</span> {hoverCommand}
            </div>
          )}

          <li>
            <a
              className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
              role="button"
              style={{ cursor: 'pointer' }}
              onClick={() => handleLinkClick('home')}
              onMouseEnter={(e) => handleLinkHover('home', e)}
              onMouseLeave={handleLinkLeave}
            >
              <span className="link-number">01</span>_home
            </a>
          </li>
         
          <li>
            <a
              className={`nav-link ${activeLink === 'skills' ? 'active' : ''}`}
              role="button"
              style={{ cursor: 'pointer' }}
              onClick={() => handleLinkClick('skills')}
              onMouseEnter={(e) => handleLinkHover('skills', e)}
              onMouseLeave={handleLinkLeave}
            >
              <span className="link-number">02</span>_skills
            </a>
          </li>
           <li>
            <a
              className={`nav-link ${activeLink === 'projects' ? 'active' : ''}`}
              role="button"
              style={{ cursor: 'pointer' }}
              onClick={() => handleLinkClick('projects')}
              onMouseEnter={(e) => handleLinkHover('projects', e)}
              onMouseLeave={handleLinkLeave}
            >
              <span className="link-number">03</span>_projects
            </a>
          </li>
          <li>
            <a
              className={`nav-link ${activeLink === 'contact' ? 'active' : ''}`}
              role="button"
              style={{ cursor: 'pointer' }}
              onClick={() => handleLinkClick('contact')}
              onMouseEnter={(e) => handleLinkHover('contact', e)}
              onMouseLeave={handleLinkLeave}
            >
              <span className="link-number">04</span>_contact
            </a>
          </li>
          <li>
            <button
              className="resume-btn"
              onMouseEnter={(e) => {
                setHoverCommand('./resume.sh --download');
                const rect = e.target.getBoundingClientRect();
                setHoverPosition({
                  x: rect.left + rect.width / 2,
                  y: rect.bottom + 10,
                });
              }}
              onMouseLeave={handleLinkLeave}
            >
              <span className="btn-text">./resume.sh</span>
              <span className="btn-bg"></span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
