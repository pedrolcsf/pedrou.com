import { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';

function CineTechBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const getGridSize = () => (window.innerWidth > 768 ? 60 : 40);
    let time = 0;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      const gridSize = getGridSize();
      ctx.strokeStyle = 'rgba(255, 121, 198, 0.08)';
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < 5; i++) {
        const angle = (time * 0.3) + (i * Math.PI * 0.4);
        const radius = 300 + Math.sin(time + i) * 100;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 400);
        gradient.addColorStop(0, `rgba(255, 121, 198, ${0.25 - i * 0.05})`);
        gradient.addColorStop(0.5, `rgba(189, 147, 249, ${0.15 - i * 0.03})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(x - 400, y - 400, 800, 800);
      }

      const mouseGradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 500);
      mouseGradient.addColorStop(0, 'rgba(255, 121, 198, 0.2)');
      mouseGradient.addColorStop(0.4, 'rgba(189, 147, 249, 0.1)');
      mouseGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = mouseGradient;
      ctx.fillRect(mouseX - 500, mouseY - 500, 1000, 1000);

      const scanlineGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      scanlineGradient.addColorStop(0, 'transparent');
      scanlineGradient.addColorStop(0.5, 'rgba(255, 121, 198, 0.03)');
      scanlineGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = scanlineGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <Box
      as="canvas"
      ref={canvasRef}
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      zIndex={0}
      pointerEvents="none"
    />
  );
}

export default CineTechBackground;
