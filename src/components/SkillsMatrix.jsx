import '../styles/skillsMatrix.css';

const services = [
  {
    title: "Frontend Development",
    description: "Building responsive user interfaces using React, HTML, CSS, and JavaScript.",
    command: "run frontend-dev.sh"
  },
  {
    title: "Backend Development",
    description: "Creating robust REST APIs with Node.js and Express.js.",
    command: "run backend-dev.sh"
  },
  {
    title: "UI/UX Design",
    description: "Crafting user-friendly and modern interfaces with Figma & best practices.",
    command: "open figma-tool"
  },
  {
    title: "Database Management",
    description: "Optimizing and managing SQL databases for efficient data handling.",
    command: "connect db.sql"
  },
  {
    title: "React Native Development",
    description: "Building User friendly functional apps with performance optimisation",
    command: "run ReactNative_Dev"
  },
   {
    title: "AI APIs Integration",
    description: "Integrating AI APIs (GPT,Gemini,Claude,Deepseek) into Your Websites/Apps",
    command: "npm run AI_API"
  },
   {
    title: "Firebase",
    description: "Using Google Firebase tools in your Website/APP",
    command: "npm i firebase"
  },
  {
    title: "Authentication",
    description: "Authenticating users Using modern hashing algorithms md5 sha etc",
    command: "sudo hashPassword"
  },
];

const Services = () => {
  return (
    <section id='skills' className="services">
      <div className="services-container">
        <div className="services-header">
          <div className="terminal-line">
            <span className="prompt">user@portfolio:~$</span> cat services.txt
          </div>
          <div className="terminal-line output">
            <span className="text-primary">These are the services I offer:</span>
          </div>
        </div>

        <div className="services-list">
          {services.map((service, index) => (
            <div key={index} className="service-box">
              <div className="terminal-line">
                <span className="prompt">~$</span> {service.command}
              </div>
              <div className="service-title">{service.title}</div>
              <div className="service-desc">{service.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
