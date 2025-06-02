import { useEffect, useRef } from 'react';
import '../styles/matrixBackground.css';

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Matrix characters - Japanese Katakana for authentic look
    const matrix = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
    const fontSize = 14;
    const columns = canvas.width / fontSize;

    // Set of drops for each column
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height / fontSize) * fontSize;
    }

    // Drawing the characters
    function draw() {
      // Black background with opacity for trails
      ctx.fillStyle = 'rgba(5, 10, 20, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gradient overlay
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(10, 25, 47, 0.7)');
      gradient.addColorStop(0.5, 'rgba(100, 255, 218, 0.2)');
      gradient.addColorStop(1, 'rgba(10, 25, 47, 0.7)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set style for characters
      ctx.fillStyle = '#00ff9d';
      ctx.font = `${fontSize}px 'JetBrains Mono'`;

      // Loop over drops
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = matrix.charAt(Math.floor(Math.random() * matrix.length));
        
        // Draw character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top when it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }
    }

    // Animation loop
    const interval = setInterval(draw, 35);

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="matrix-container">
      <canvas 
        ref={canvasRef} 
        className="matrix-canvas"
      />
      <div className="gradient-overlay"></div>
    </div>
  );
};

export default MatrixBackground;