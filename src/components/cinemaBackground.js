import { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';

function CinemaBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    let mouseX = width / 2;
    let mouseY = height / 2;
    let time = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches ||
      document.documentElement.classList.contains('chakra-ui-dark');

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      const gradient1 = ctx.createRadialGradient(
        mouseX,
        mouseY,
        0,
        mouseX,
        mouseY,
        width * 0.6
      );
      gradient1.addColorStop(0, isDark ? 'rgba(255, 121, 198, 0.15)' : 'rgba(255, 121, 198, 0.08)');
      gradient1.addColorStop(0.5, isDark ? 'rgba(189, 147, 249, 0.1)' : 'rgba(189, 147, 249, 0.05)');
      gradient1.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, width, height);

      const gradient2 = ctx.createRadialGradient(
        width / 2,
        height * 0.3,
        0,
        width / 2,
        height * 0.3,
        width * 1.2
      );
      gradient2.addColorStop(0, isDark ? 'rgba(189, 147, 249, 0.12)' : 'rgba(189, 147, 249, 0.06)');
      gradient2.addColorStop(0.7, isDark ? 'rgba(255, 121, 198, 0.08)' : 'rgba(255, 121, 198, 0.04)');
      gradient2.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < 3; i++) {
        const x = (width / 4) * (i + 1) + Math.sin(time + i) * 30;
        const y = height * 0.5 + Math.cos(time * 0.8 + i) * 20;
        const radius = 200 + Math.sin(time + i) * 50;

        const spotlight = ctx.createRadialGradient(x, y, 0, x, y, radius);
        spotlight.addColorStop(0, isDark ? 'rgba(255, 121, 198, 0.2)' : 'rgba(255, 121, 198, 0.1)');
        spotlight.addColorStop(0.5, isDark ? 'rgba(189, 147, 249, 0.15)' : 'rgba(189, 147, 249, 0.08)');
        spotlight.addColorStop(1, 'transparent');
        ctx.fillStyle = spotlight;
        ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      }

      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
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
      opacity={0.6}
    />
  );
}

export default CinemaBackground;
