import React, { useRef, useEffect } from 'react';

const NeonChart = ({ data, labels, theme = 'cyan', maxVal = 700, unit = 'k' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const handleDraw = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.5)';
      ctx.lineWidth = 1;
      const gridCount = theme === 'cyan' ? 3 : 2;
      for (let i = 1; i <= gridCount; i++) {
        const y = (h - 30) * (i / (gridCount + 1)) + 10;
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(w - 20, y);
        ctx.stroke();
      }

      const startX = 50;
      const endX = w - 30;
      const rangeX = endX - startX;
      const rangeY = h - 60;

      const points = data.map((val, idx) => {
        const x = startX + rangeX * (idx / (data.length - 1));
        const y = (h - 40) - (val / maxVal) * rangeY;
        return { x, y, val };
      });

      // Gradient Fill
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      const strokeColor = theme === 'cyan' ? '#0EA5E9' : '#8B5CF6';
      const shadowColor = theme === 'cyan' ? 'rgba(14, 165, 233, 0.45)' : 'rgba(139, 92, 246, 0.45)';
      const fillColorStart = theme === 'cyan' ? 'rgba(14, 165, 233, 0.22)' : 'rgba(139, 92, 246, 0.22)';
      
      grad.addColorStop(0, fillColorStart);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(points[0].x, h - 30);
      points.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.lineTo(points[points.length - 1].x, h - 30);
      ctx.closePath();
      ctx.fill();

      // Line
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 3.5;
      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      points.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Dots
      points.forEach((p, idx) => {
        ctx.fillStyle = strokeColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Labels
        if (idx === points.length - 1 || idx % 2 === 0) {
          ctx.fillStyle = '#1E293B';
          ctx.font = 'bold 9px sans-serif';
          ctx.fillText(`${unit === '₩' ? '₩' : ''}${p.val}${unit !== '₩' ? unit : ''}`, p.x - 12, p.y - 12);
        }

        ctx.fillStyle = '#94A3B8';
        ctx.font = '9px sans-serif';
        ctx.fillText(labels[idx], p.x - 12, h - 12);
      });
    };

    handleDraw();

    const handleResize = () => {
      cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(handleDraw);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [data, labels, theme, maxVal, unit]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
};

export default NeonChart;
