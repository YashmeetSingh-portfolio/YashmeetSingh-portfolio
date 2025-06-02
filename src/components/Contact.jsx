import { FaX } from 'react-icons/fa6';
import '../styles/contact.css';
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram, FaPhoneAlt } from 'react-icons/fa';

const Contact = () => {
  const email = "opyash471@gmail.com";
  const phone = "+916284000794";

  return (
    <div className="transparent">
    <section id='contact' className="contact">
      <div className="contact-container">
        <div className="contact-header">
          <div className="terminal-line">
            <span className="prompt">user@portfolio:~$</span> cat contact.txt
          </div>
          <div className="terminal-line output">
            <span className="text-primary">I'm just a click away 🚀</span>
          </div>
        </div>

        <div className="contact-content">
          <div className="contact-message">
            <p>Got a project idea or just want to connect? Feel free to email or call me directly!</p>

            <div className="contact-buttons">
              <a
                href={`mailto:${email}?subject=Let%27s%20work%20together&body=Hi%20Yashmeet,%20I%20came%20across%20your%20portfolio%20and...`}
                className="contact-action"
              >
                <FaEnvelope className="btn-icon" />
                Send Email
              </a>
              <a href={`tel:${phone}`} className="contact-action call">
                <FaPhoneAlt className="btn-icon" />
                Call Me
              </a>
            </div>
          </div>

          <div className="social-section">
            <div className="terminal-line">
              <span className="prompt">~$</span> open socials/
            </div>
            <div className="social-icons">
              <a href="https://github.com/YashmeetSingh-portfolio" target="_blank" rel="noreferrer" className="social-icon github">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/yashmeet-dhaliwal-307a452a8/" target="_blank" rel="noreferrer" className="social-icon linkedin">
                <FaLinkedin />
              </a>
              <a href={`mailto:${email}`} className="social-icon email">
                <FaEnvelope />
              </a>
              {/* <a href="https://instagram.com/yourinstagram" target="_blank" rel="noreferrer" className="social-icon instagram">
                <FaX />
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Contact;
