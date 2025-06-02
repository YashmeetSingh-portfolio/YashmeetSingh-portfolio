import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import '../styles/projects.css';
import ecomLogo from '../assets/choose&get.png';
import devTellerLogo from '../assets/devTeller.png';

const projects = [
  {
    name: 'Choose&Get',
    desc: 'An ecommerce app ',
    icon: ecomLogo,
    command: 'run choose-Get-preview',
    url: 'https://choose-get.vercel.app/'
  },
  {
    name: 'Dev Teller',
    desc: 'An AI powered Code explanation tool.',
    icon: devTellerLogo,
    command: 'run devTeller-preview',
    url: 'https://devteller.vercel.app/'
  },
  // {
  //   name: 'Blog CMS',
  //   desc: 'Blog CMS with markdown editor, login, and analytics.',
  //   icon: 'limegreen',
  //   command: 'run blog-preview'
  // }
];

const Projects = () => {
  function openInNewTab(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <div className="projects-header">
          <div className="terminal-line">
            <span className="prompt">user@portfolio:~$</span> ls projects/
          </div>
          <div className="terminal-line output">
            <span className="text-primary">Some of my latest work:</span>
          </div>
        </div>

        <div className="projects-list">
          {projects.map((project, index) => (
            <div key={index} className="project-box" onClick={() => openInNewTab(project.url)}>
              <div className="terminal-line">
                <span className="prompt">~$

                </span> {project.command}
              </div>
              <div className="project-preview">

                <div className="project-preview">
                  <img src={project.icon} />
                </div>

              </div>
              <div className="project-title">{project.name}</div>
              <div className="project-desc">{project.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
