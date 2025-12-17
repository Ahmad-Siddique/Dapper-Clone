"use client";
import React, { useEffect, useRef } from "react";

export const GridAnimation = ({ className = "", theme = "light" }) => {
  const canvasRef = useRef(null);
  const offscreenCanvasRef = useRef(null); // Ref for caching geometry

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize Offscreen Canvas
    if (!offscreenCanvasRef.current) {
        offscreenCanvasRef.current = document.createElement("canvas");
    }
    const offCanvas = offscreenCanvasRef.current;
    
    // optimize for transparency
    const ctx = canvas.getContext("2d", { alpha: true }); 
    const offCtx = offCanvas.getContext("2d", { alpha: true });

    const dpr = window.devicePixelRatio || 1;
    const gridSize = 70;
    const dotRadius = 2.5;
    const gap = 12;

    // Resizing Logic: Prepare both canvases
    const resize = () => {
       const width = canvas.offsetWidth;
       const height = canvas.offsetHeight;

       // Main Canvas
       canvas.width = width * dpr;
       canvas.height = height * dpr;
       ctx.scale(dpr, dpr);

       // Offscreen Canvas (Cache static geometry)
       offCanvas.width = width * dpr;
       offCanvas.height = height * dpr;
       offCtx.scale(dpr, dpr);
       
       // DRAW STATIC GEOMETRY ONCE
       drawStaticGrid(offCtx, width, height);
    };

    // Helper to draw static grid geometry (opaque black)
    const drawStaticGrid = (context, width, height) => {
        const cols = Math.ceil(width / gridSize) + 4;
        const rows = Math.ceil(height / gridSize) + 4;
        
        context.clearRect(0, 0, width, height);
        // Draw in black always on offscreen buffer. 
        // We tint it using source-in gradient later.
        context.fillStyle = "#000000"; 
        context.strokeStyle = "#000000";
        context.lineWidth = 1.0;

        for (let i = 0; i < cols; i++) {
            const x = (i - 1) * gridSize;
            for (let j = 0; j < rows; j++) {
              const y = (j - 1) * gridSize;

              // Dot
              context.beginPath();
              context.arc(x, y, dotRadius, 0, Math.PI * 2);
              context.fill();

              // Lines
              if (j < rows - 1) {
                context.beginPath();
                context.moveTo(x + gap, y);
                context.lineTo(x + gridSize - gap, y);
                context.stroke();

                context.beginPath();
                context.moveTo(x + gap, y + gridSize);
                context.lineTo(x + gridSize - gap, y + gridSize);
                context.stroke();
              }

              if (i < cols - 1) {
                context.beginPath();
                context.moveTo(x, y + gap);
                context.lineTo(x, y + gridSize - gap);
                context.stroke();

                context.beginPath();
                context.moveTo(x + gridSize, y + gap);
                context.lineTo(x + gridSize, y + gridSize - gap);
                context.stroke();
              }
            }
        }
    };

    resize();
    window.addEventListener("resize", resize);

    // PULSE SYSTEM
    let time = 0;
    const yellowPulses = [];
    const createYellowPulse = () => {
      const cols = Math.ceil(canvas.offsetWidth / gridSize) + 4;
      const rows = Math.ceil(canvas.offsetHeight / gridSize) + 4;
      const numLines = 5 + Math.floor(Math.random() * 5); 

      for (let k = 0; k < numLines; k++) {
        const isHorizontal = Math.random() < 0.5;
        let gridIndex;
        
        if (isHorizontal) {
          gridIndex = Math.floor(Math.random() * (rows - 1));
        } else {
          const minCol = 1;
          const maxCol = cols - 2;
          gridIndex = minCol + Math.floor(Math.random() * (maxCol - minCol + 1));
        }

        yellowPulses.push({
          isHorizontal,
          gridIndex,
          startFrac: Math.random() * 0.5,
          fraction: 3 + Math.random() * 3,
          progress: -0.2 + Math.random() * 0.4, 
          speed: 0.003 + Math.random() * 0.003, 
          life: 0, 
        });
      }
    };

    const pulseInterval = setInterval(createYellowPulse, 450);
    createYellowPulse();

    let animationId;
    let isVisible = true;

    // MAIN ANIMATION LOOP
    const animate = () => {
      if (!isVisible) return;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Static Grid from Cache + Apply Shimmer Gradient
      ctx.drawImage(offCanvas, 0, 0, width, height);

      // Gradient Logic
      const waveWidth = 1200;
      const fullCycle = width + waveWidth * 2;
      const cycleTime = fullCycle / 1.2;
      const t = (time / cycleTime) % 2;
      const pingPong = t <= 1 ? t : 2 - t;
      let waveX = -waveWidth + pingPong * fullCycle;

      const gradient = ctx.createLinearGradient(waveX, 0, waveX + waveWidth, 0);
      
      const isDark = theme === 'dark';
      // Use White (255) for Dark Mode, Black (0) for Light Mode
      const r = isDark ? 255 : 0;
      const g = isDark ? 255 : 0;
      const b = isDark ? 255 : 0;

      const a = (val) => isDark ? Math.min(1, val * 2.5) : val; // Boost opacity significantly for dark mode

      gradient.addColorStop(0.00, `rgba(${r}, ${g}, ${b}, ${a(0.00)})`);
      gradient.addColorStop(0.08, `rgba(${r}, ${g}, ${b}, ${a(0.04)})`);
      gradient.addColorStop(0.20, `rgba(${r}, ${g}, ${b}, ${a(0.10)})`);
      gradient.addColorStop(0.35, `rgba(${r}, ${g}, ${b}, ${a(0.20)})`);
      gradient.addColorStop(0.50, `rgba(${r}, ${g}, ${b}, ${a(0.32)})`);
      gradient.addColorStop(0.65, `rgba(${r}, ${g}, ${b}, ${a(0.20)})`);
      gradient.addColorStop(0.80, `rgba(${r}, ${g}, ${b}, ${a(0.10)})`);
      gradient.addColorStop(0.92, `rgba(${r}, ${g}, ${b}, ${a(0.04)})`);
      gradient.addColorStop(1.00, `rgba(${r}, ${g}, ${b}, ${a(0.00)})`);

      // Apply Gradient using source-in
      ctx.globalCompositeOperation = "source-in";
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Reset Composite for Pulses
      ctx.globalCompositeOperation = "source-over";

      // 2. Draw Yellow Pulses and Filter Dead Ones
      const cols = Math.ceil(width / gridSize) + 4;
      const rows = Math.ceil(height / gridSize) + 4;

      ctx.save();
      ctx.lineCap = "round";
      
      // Use filter to create a new array of active pulses
      // This prevents the "splice during forEach" skip bug
      const activePulses = [];
      
      yellowPulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        pulse.life += 0.01;

        if (pulse.progress > 1.2 || pulse.life > 1) { 
           // Skip adding to activePulses (effectively removing it)
           return;
        }
        
        activePulses.push(pulse);

        const opacity = Math.sin(pulse.life * Math.PI) * 1; 
        const totalPulseLength = pulse.fraction * gridSize; 
        
        // DRAWING LOGIC
        if (pulse.isHorizontal) {
          const y = pulse.gridIndex * gridSize;
          const startX = pulse.startFrac * gridSize; 
          const currentHeadX = startX + pulse.progress * (width + totalPulseLength) - totalPulseLength;
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
           const currentHeadY = startY + pulse.progress * (height + totalPulseLength) - totalPulseLength;
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

      // Update the main array reference logic
      // Since yellowPulses is const array, we clear and refill it
      yellowPulses.length = 0;
      yellowPulses.push(...activePulses);

      time++;
      animationId = requestAnimationFrame(animate);
    };

    // Observer and Cleanup
    const observer = new IntersectionObserver(
      ([entry]) => {
         isVisible = entry.isIntersecting;
         if (isVisible && !animationId) animate(); 
         else if (!isVisible && animationId) {
             cancelAnimationFrame(animationId);
             animationId = null;
         }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(pulseInterval);
      if (animationId) cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};
