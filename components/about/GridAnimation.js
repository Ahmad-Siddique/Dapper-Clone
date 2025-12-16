"use client";
import React, { useEffect, useRef } from "react";

export const GridAnimation = ({ className = "" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    // Set internal size to match display size * DPR for sharpness
    const resize = () => {
       canvas.width = canvas.offsetWidth * dpr;
       canvas.height = canvas.offsetHeight * dpr;
       ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const gridSize = 70;
    // We'll calculate cols/rows in the loop or on resize if needed,
    // but doing it dynamic inside animate is safer if container resizes.
    
    const dotRadius = 2.5;
    const gap = 12;

    let time = 0;
    const yellowPulses = [];

    const createYellowPulse = () => {
      // Need valid cols/rows based on current size
      const cols = Math.ceil(canvas.offsetWidth / gridSize) + 4;
      const rows = Math.ceil(canvas.offsetHeight / gridSize) + 4;

      const numLines = 5 + Math.floor(Math.random() * 5); // 5–9 pulses (2x intensity)

      for (let k = 0; k < numLines; k++) {
        const isHorizontal = Math.random() < 0.5;

        let gridIndex;
        if (isHorizontal) {
          gridIndex = Math.floor(Math.random() * (rows - 1));
        } else {
          // Allow spawning anywhere
          const minCol = 1;
          const maxCol = cols - 2;
          gridIndex = minCol + Math.floor(Math.random() * (maxCol - minCol + 1));
        }

        const numSquares = 3 + Math.random() * 3; 
        const fraction = numSquares; 
        const startFrac = Math.random() * 0.5;

        yellowPulses.push({
          isHorizontal,
          gridIndex,
          startFrac,
          fraction,
          progress: -0.2 + Math.random() * 0.4, 
          speed: 0.003 + Math.random() * 0.003, 
          life: 0, 
        });
      }
    };

    const pulseInterval = setInterval(createYellowPulse, 450);
    createYellowPulse();

    let animationId;
    let isVisible = true; // Default to true so it runs initially or if observer fails

    const animate = () => {
      if (!isVisible) return; // Stop loop if hidden

      // Clear
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const cols = Math.ceil(canvas.offsetWidth / gridSize) + 4;
      const rows = Math.ceil(canvas.offsetHeight / gridSize) + 4;

      // Boldness wave logic
      const waveWidth = 1200;
      const fullCycle = canvas.offsetWidth + waveWidth * 2;
      const cycleTime = fullCycle / 1.2;
      const t = (time / cycleTime) % 2;
      const pingPong = t <= 1 ? t : 2 - t;
      let waveX = -waveWidth + pingPong * fullCycle;

      const gradient = ctx.createLinearGradient(waveX, 0, waveX + waveWidth, 0);
      gradient.addColorStop(0.00, "rgba(0, 0, 0, 0.00)");
      gradient.addColorStop(0.08, "rgba(0, 0, 0, 0.04)");
      gradient.addColorStop(0.20, "rgba(0, 0, 0, 0.10)");
      gradient.addColorStop(0.35, "rgba(0, 0, 0, 0.20)");
      gradient.addColorStop(0.50, "rgba(0, 0, 0, 0.32)");
      gradient.addColorStop(0.65, "rgba(0, 0, 0, 0.20)");
      gradient.addColorStop(0.80, "rgba(0, 0, 0, 0.10)");
      gradient.addColorStop(0.92, "rgba(0, 0, 0, 0.04)");
      gradient.addColorStop(1.00, "rgba(0, 0, 0, 0.00)");

      ctx.strokeStyle = gradient;
      ctx.fillStyle = gradient;
      ctx.lineWidth = 1.0;

      // Draw main grid
      for (let i = 0; i < cols; i++) {
        const x = (i - 1) * gridSize;
        for (let j = 0; j < rows; j++) {
          const y = (j - 1) * gridSize;

          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();

          if (j < rows - 1) {
            ctx.beginPath();
            ctx.moveTo(x + gap, y);
            ctx.lineTo(x + gridSize - gap, y);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x + gap, y + gridSize);
            ctx.lineTo(x + gridSize - gap, y + gridSize);
            ctx.stroke();
          }

          if (i < cols - 1) {
            ctx.beginPath();
            ctx.moveTo(x, y + gap);
            ctx.lineTo(x, y + gridSize - gap);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x + gridSize, y + gap);
            ctx.lineTo(x + gridSize, y + gridSize - gap);
            ctx.stroke();
          }
        }
      }

      // YELLOW PULSES
      ctx.save();
      ctx.lineCap = "round";
      
      yellowPulses.forEach((pulse, index) => {
        pulse.progress += pulse.speed;
        pulse.life += 0.01;

        if (pulse.progress > 1.2 || pulse.life > 1) { 
          yellowPulses.splice(index, 1);
          return;
        }

        const opacity = Math.sin(pulse.life * Math.PI) * 1; 
        const totalPulseLength = pulse.fraction * gridSize; 

        if (pulse.isHorizontal) {
          const y = pulse.gridIndex * gridSize;
          const startX = pulse.startFrac * gridSize; 
          const currentHeadX = startX + pulse.progress * (canvas.offsetWidth + totalPulseLength) - totalPulseLength;
          const currentTailX = currentHeadX - totalPulseLength;

          for (let i = 0; i < cols; i++) {
             const segX = (i - 1) * gridSize;
             const segStart = segX + gap;
             const segEnd = segX + gridSize - gap;
             
             const overlapStart = Math.max(segStart, currentTailX);
             const overlapEnd = Math.min(segEnd, currentHeadX);

             if (overlapStart < overlapEnd) {
                const pulseCenter = (currentHeadX + currentTailX) / 2;
                const segCenter = (overlapStart + overlapEnd) / 2;
                const dist = Math.abs(segCenter - pulseCenter);
                const maxDist = totalPulseLength / 2;
                const segOpacity = Math.max(0, 1 - (dist / maxDist));
                const glowColor = `rgba(251, 191, 36, ${opacity * segOpacity})`;
                
                ctx.shadowColor = "rgba(251, 191, 36, 1)";
                ctx.shadowBlur = 10;
                ctx.strokeStyle = glowColor;
                ctx.lineWidth = 2;

                ctx.beginPath();
                ctx.moveTo(overlapStart, y);
                ctx.lineTo(overlapEnd, y);
                ctx.stroke();

                ctx.shadowBlur = 0; 
             }
          }

        } else {
           const x = pulse.gridIndex * gridSize;
           const startY = pulse.startFrac * gridSize;
           const currentHeadY = startY + pulse.progress * (canvas.offsetHeight + totalPulseLength) - totalPulseLength;
           const currentTailY = currentHeadY - totalPulseLength;

           for (let j = 0; j < rows; j++) {
              const segY = (j - 1) * gridSize;
              const segStart = segY + gap;
              const segEnd = segY + gridSize - gap;

              const overlapStart = Math.max(segStart, currentTailY);
              const overlapEnd = Math.min(segEnd, currentHeadY);

              if (overlapStart < overlapEnd) {
                 const pulseCenter = (currentHeadY + currentTailY) / 2;
                 const segCenter = (overlapStart + overlapEnd) / 2;
                 const dist = Math.abs(segCenter - pulseCenter);
                 const maxDist = totalPulseLength / 2;
                 const segOpacity = Math.max(0, 1 - (dist / maxDist));
                 const glowColor = `rgba(251, 191, 36, ${opacity * segOpacity})`;

                 ctx.shadowColor = "rgba(251, 191, 36, 1)";
                 ctx.shadowBlur = 10;
                 ctx.strokeStyle = glowColor;
                 ctx.lineWidth = 2;

                 ctx.beginPath();
                 ctx.moveTo(x, overlapStart);
                 ctx.lineTo(x, overlapEnd);
                 ctx.stroke();
                 ctx.shadowBlur = 0;
              }
           }
        }
      });
      ctx.restore();

      time++;
      animationId = requestAnimationFrame(animate);
    };

    // Intersection Observer to pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
         isVisible = entry.isIntersecting;
         if (isVisible) {
            // Restart loop if it stopped
            if (!animationId) animate(); 
         } else {
            // Cancel loop
            cancelAnimationFrame(animationId);
            animationId = null;
         }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(pulseInterval);
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};
