"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";

type Segment = {
  radius: number;
  startAngle: number;
  endAngle: number;
  color: string;
};

type RingGroup = {
  radius: number;
  direction: "normal" | "reverse";
  duration: number;
  segments: Segment[];
};

const RING_COLORS = [
  "#d9e2e0",
  "#7befde",
  "#43e4cf",
  "#21d5bf",
  "#1b736a",
  "#e8c978",
  "#d5a64a",
  "#b9852f",
  "#8f642a",
];

const RING_RADII = Array.from({ length: 18 }, (_, index) => 380 + index * 35);
const emptySubscribe = () => () => {};

function seededUnit(seed: number) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453123;
  return value - Math.floor(value);
}

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(" ");
}

function DataRings() {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const ringGroups = useMemo<RingGroup[]>(() => {
    if (!isClient) return [];

    const generateSegments = (radius: number): Segment[] => {
      const segments: Segment[] = [];
      let currentAngle = 0;
      let step = 0;

      while (currentAngle < 360) {
        const seed = radius * 0.137 + step * 0.73;
        const angleSize =
          seededUnit(seed) < 0.3 ? seededUnit(seed + 1) * 2 + 0.5 : seededUnit(seed + 2) * 6 + 1;
        const gap = seededUnit(seed + 3) * 5 + 1;
        const color = RING_COLORS[Math.floor(seededUnit(seed + 4) * RING_COLORS.length)];

        if (seededUnit(seed + 5) > 0.15) {
          segments.push({
            radius,
            startAngle: currentAngle,
            endAngle: currentAngle + angleSize,
            color,
          });
        }

        currentAngle += angleSize + gap;
        step += 1;
      }

      return segments;
    };

    return RING_RADII.map((radius, index) => ({
      radius,
      direction: index % 2 === 0 ? "normal" : "reverse",
      duration: 100 + seededUnit(radius * 0.91 + index * 1.37) * 80,
      segments: generateSegments(radius),
    }));
  }, [isClient]);

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
      {!isClient ? (
        <div
          className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#030712] opacity-90 blur-[80px]"
          aria-hidden="true"
        />
      ) : null}

      <style>{`
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {isClient ? (
        <svg
          viewBox="0 0 2000 2000"
          className="absolute top-1/2 left-1/2 h-[150vw] w-[150vw] min-h-[1400px] min-w-[1400px] -translate-x-1/2 -translate-y-1/2 opacity-20 mix-blend-screen"
          aria-hidden="true"
        >
          {ringGroups.map((group, index) => (
            <g
              key={`ring-${group.radius}-${index}`}
              style={{
                transformOrigin: "1000px 1000px",
                animation: `spinRing ${group.duration}s linear infinite ${group.direction}`,
              }}
            >
              {group.segments.map((segment, segmentIndex) => (
                <path
                  key={`segment-${segment.radius}-${segment.startAngle}-${segmentIndex}`}
                  d={describeArc(1000, 1000, segment.radius, segment.startAngle, segment.endAngle)}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth="18"
                  strokeLinecap="butt"
                />
              ))}
            </g>
          ))}
        </svg>
      ) : null}

      <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#030712] opacity-90 blur-[80px]" />
    </div>
  );
}

function SymbioticNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    type ParticleState = {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;
      color: string;
      draw: () => void;
      update: () => void;
    };

    const colors = ["#21d5bf", "#43e4cf", "#7befde", "#d5a64a", "#b9852f"];
    const mouse = { x: null as number | null, y: null as number | null, radius: 250 };
    const particlesArray: ParticleState[] = [];
    let animationFrameId = 0;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (
      x: number,
      y: number,
      directionX: number,
      directionY: number,
      size: number,
      color: string,
    ): ParticleState => {
      const particle: ParticleState = {
        x,
        y,
        directionX,
        directionY,
        size,
        color,
        draw() {
          context.beginPath();
          context.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
          context.fillStyle = this.color;
          context.shadowBlur = 15;
          context.shadowColor = this.color;
          context.fill();
          context.shadowBlur = 0;
        },
        update() {
          if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
          if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

          if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distanceSquared = dx * dx + dy * dy;

            if (distanceSquared > 0 && distanceSquared < mouse.radius * mouse.radius) {
              const distance = Math.sqrt(distanceSquared);
              const forceDirectionX = dx / distance;
              const forceDirectionY = dy / distance;
              const force = (mouse.radius - distance) / mouse.radius;

              this.x += forceDirectionX * force * 2.5;
              this.y += forceDirectionY * force * 2.5;
            } else {
              this.x += this.directionX;
              this.y += this.directionY;
            }
          } else {
            this.x += this.directionX;
            this.y += this.directionY;
          }

          this.draw();
        },
      };

      return particle;
    };

    const initializeParticles = () => {
      particlesArray.length = 0;

      const numberOfParticles = (canvas.height * canvas.width) / 11000;
      for (let index = 0; index < numberOfParticles; index += 1) {
        const size = Math.random() * 2.5 + 0.5;
        const x = Math.random() * (canvas.width - size * 4) + size * 2;
        const y = Math.random() * (canvas.height - size * 4) + size * 2;
        const directionX = Math.random() * 1.5 - 0.75;
        const directionY = Math.random() * 1.5 - 0.75;
        const color = colors[Math.floor(Math.random() * colors.length)];

        particlesArray.push(createParticle(x, y, directionX, directionY, size, color));
      }
    };

    const connectParticles = () => {
      const maxDistanceSquared = 18000;
      for (let a = 0; a < particlesArray.length; a += 1) {
        for (let b = a; b < particlesArray.length; b += 1) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < maxDistanceSquared) {
            const opacity = 1 - distanceSquared / maxDistanceSquared;
            context.strokeStyle = particlesArray[a].color;
            context.globalAlpha = opacity * 0.7;
            context.lineWidth = 1.2;
            context.beginPath();
            context.moveTo(particlesArray[a].x, particlesArray[a].y);
            context.lineTo(particlesArray[b].x, particlesArray[b].y);
            context.stroke();
          }
        }
      }
      context.globalAlpha = 1;
    };

    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let index = 0; index < particlesArray.length; index += 1) {
        particlesArray[index].update();
      }

      connectParticles();
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };

    const handleResize = () => {
      setCanvasSize();
      initializeParticles();
    };

    setCanvasSize();
    initializeParticles();
    animate();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-auto opacity-80 mix-blend-screen"
      aria-hidden="true"
    />
  );
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#030712] pt-28 pb-20">
      <DataRings />
      <SymbioticNetwork />

      <div className="pointer-events-none relative z-10 mx-auto mt-8 max-w-4xl px-6 text-center">
        <div className="mb-8 inline-block rounded-sm border border-[#d5a64a]/35 bg-[#d5a64a]/10 px-3 py-1.5 text-[9px] font-bold tracking-[0.15em] text-[#e8c978] backdrop-blur-sm">
          TECHNOLOGY
        </div>

        <h1 className="mb-6 text-[42px] font-bold leading-[1.05] tracking-[-0.03em] text-white md:text-[68px]">
          Mapping How Genes
          <br />
          Causally Shape Biology
          <span className="text-[#d5a64a] drop-shadow-[0_0_12px_rgba(213,166,74,0.75)]">.</span>
        </h1>

        <p className="mx-auto mb-14 max-w-[620px] text-[15px] leading-relaxed font-normal text-gray-300 md:text-[17px]">
          By testing every gene across all human tissues using large-scale Mendelian randomization and
          colocalization across thousands of diseases.
        </p>

        <div className="pointer-events-auto mx-auto mb-16 grid max-w-[600px] grid-cols-1 gap-x-12 gap-y-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-lg md:grid-cols-2">
          <div className="flex flex-col items-center">
            <div className="mb-1 flex items-baseline gap-1">
              <span className="text-[44px] font-medium tracking-tight text-white drop-shadow-md">1.8</span>
              <span className="text-[20px] font-semibold text-[#d5a64a]">x</span>
            </div>
            <span className="text-[13px] font-medium text-gray-400">Originally developed</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-1 flex items-baseline gap-1">
              <span className="text-[44px] font-medium tracking-tight text-white drop-shadow-md">88.2</span>
              <span className="text-[20px] font-semibold text-[#d5a64a]">%</span>
            </div>
            <span className="text-[13px] font-medium text-gray-400">Leverage observational data</span>
          </div>

          <div className="flex flex-col items-center md:col-span-2">
            <div className="mb-1 flex items-baseline gap-1">
              <span className="text-[44px] font-medium tracking-tight text-white drop-shadow-md">9.2</span>
              <span className="text-[20px] font-semibold text-[#d5a64a]">M</span>
            </div>
            <span className="text-[13px] font-medium text-gray-400">Causal inference techniques</span>
          </div>
        </div>
      </div>

      {/* Soft seam into the zoom sequence below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-b from-transparent via-[#06141a]/65 to-[#050505]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 h-24 w-[72%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(33,213,191,0.16),rgba(213,166,74,0.1)_45%,transparent_72%)] blur-xl" />
    </section>
  );
}
