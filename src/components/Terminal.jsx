import { useState, useEffect, useRef } from 'react';
import '../styles/terminal.css';

const Terminal = ({ scrollRefs }) => {
  const [commands, setCommands] = useState([]);
  const [input, setInput] = useState('');
  const terminalRef = useRef(null);

  const commandList = [
    { cmd: 'help', response: 'Available commands: cat about.txt, ls skills, ls projects, npm run contact, cd github, cd linkedin, clear' },
    { cmd: 'cat about.txt', response: 'I\'m a passionate developer building modern web experiences.' },
    { cmd: 'ls skills', response: 'React, Node.js, Express.js, JavaScript, CSS, HTML, PostgreSQL, Authentication, Axios' },
    { cmd: 'ls projects', action: () => scrollToSection('projects') },
    { cmd: 'npm run contact', action: () => scrollToSection('contact') },
    { cmd: 'cd github', action: () => window.open('https://github.com/your-username', '_blank') },
    { cmd: 'cd linkedin', action: () => window.open('https://linkedin.com/in/your-profile', '_blank') },
  ];

  const smoothScrollTo = (targetY) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 500; // ms
    let start;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);
      window.scrollTo(0, startY + distance * percent);
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  const scrollToSection = (section) => {
    const ref = scrollRefs?.[section];
    if (ref?.current) {
      const offsetTop = ref.current.offsetTop;
      smoothScrollTo(offsetTop);
    }
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const trimmedInput = input.trim();
      let foundCmd = commandList.find(c => c.cmd === trimmedInput);

      if (trimmedInput === 'clear') {
        setCommands([]);
      } else if (foundCmd) {
        setCommands(prev => [
          ...prev,
          { type: 'input', text: `$ ${trimmedInput}` },
          foundCmd.response
            ? { type: 'response', text: foundCmd.response }
            : null
        ].filter(Boolean));

        if (foundCmd.action) {
          foundCmd.action();
        }
      } else {
        setCommands(prev => [
          ...prev,
          { type: 'input', text: `$ ${trimmedInput}` },
          { type: 'response', text: `Command not found: ${trimmedInput}. Type 'help' for available commands.` }
        ]);
      }

      setInput('');
    }
  };

  useEffect(() => {
    setCommands([
      { type: 'response', text: 'Welcome to Dev Terminal v2.0' },
      { type: 'response', text: 'Type "help" for available commands' }
    ]);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  return (
    <div className="terminal-sup">
      <div className="terminal-container">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-btn red"></span>
            <span className="terminal-btn yellow"></span>
            <span className="terminal-btn green"></span>
          </div>
          <div className="terminal-title">bash - dev_terminal</div>
        </div>
        <div className="terminal-body" ref={terminalRef}>
          {commands.map((item, index) => (
            <div key={index} className={`terminal-line ${item.type}`}>
              {item.type === 'input' && <span className="terminal-prompt">{item.text}</span>}
              {item.type === 'response' && <span>{item.text}</span>}
            </div>
          ))}
          <div className="terminal-input-line">
            <span className="terminal-prompt">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="terminal-input"
      
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
