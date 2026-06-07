"use client";

import { useEffect, useRef } from "react";

const COLORS = {
  accent: "rgba(79, 70, 229,",
  muted: "rgba(79, 70, 229, 0.15)",
  line: "rgba(79, 70, 229, 0.08)",
};

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  fromNode: number;
  toNode: number;
  layer: number;
  opacity: number;
}

interface Node {
  x: number;
  y: number;
  radius: number;
  pulse: number;
  pulseSpeed: number;
  layer: number;
  active: number;
}

export default function AIVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let nodes: Node[] = [];
    let particles: Particle[] = [];
    let frame = 0;

    const LAYERS = [3, 5, 5, 3, 1];
let mouseX = -1;
let mouseY = -1;

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

canvas.addEventListener("mouseleave", () => {
  mouseX = -1;
  mouseY = -1;
});
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      buildNodes();
    };

    const buildNodes = () => {
      nodes = [];
      const w = canvas.width;
      const h = canvas.height;
      const layerGapX = w / (LAYERS.length + 1);

      LAYERS.forEach((count, layerIdx) => {
        const x = layerGapX * (layerIdx + 1);
        const gapY = h / (count + 1);
for (let i = 0; i < count; i++) {
  const jitterX = (Math.random() - 0.5) * 18;
  const jitterY = (Math.random() - 0.5) * 22;
  nodes.push({
    x: x + jitterX,
    y: gapY * (i + 1) + jitterY,
            radius: layerIdx === LAYERS.length - 1 ? 6 : layerIdx === 0 ? 5 : 4,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.02,
            layer: layerIdx,
            active: 0,
          });
        }
      });
    };

    const getLayerNodes = (layer: number) =>
      nodes.filter((n) => n.layer === layer);

    const spawnParticle = () => {
      const fromLayer = Math.floor(Math.random() * (LAYERS.length - 1));
      const fromLayerNodes = getLayerNodes(fromLayer);
      const toLayerNodes = getLayerNodes(fromLayer + 1);
      if (!fromLayerNodes.length || !toLayerNodes.length) return;

      const fromNode = fromLayerNodes[Math.floor(Math.random() * fromLayerNodes.length)];
      const toNode = toLayerNodes[Math.floor(Math.random() * toLayerNodes.length)];
      const fromIdx = nodes.indexOf(fromNode);
      const toIdx = nodes.indexOf(toNode);

      particles.push({
        x: fromNode.x,
        y: fromNode.y,
        targetX: toNode.x,
        targetY: toNode.y,
        progress: 0,
        speed: 0.008 + Math.random() * 0.006,
        fromNode: fromIdx,
        toNode: toIdx,
        layer: fromLayer,
        opacity: 0,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Spawn particles
      if (frame % 18 === 0) spawnParticle();

      // Draw connections between layers
      for (let l = 0; l < LAYERS.length - 1; l++) {
        const fromNodes = getLayerNodes(l);
        const toNodes = getLayerNodes(l + 1);
        fromNodes.forEach((fn, fi) => {
  toNodes.forEach((tn, ti) => {
    if ((fi + ti) % 2 !== 0) return;
    ctx.beginPath();
    ctx.moveTo(fn.x, fn.y);
    ctx.lineTo(tn.x, tn.y);
    ctx.strokeStyle = COLORS.line;
    ctx.lineWidth = 0.6;
    ctx.stroke();
  });
});
      }

      // Draw nodes
      nodes.forEach((node) => {
        node.pulse += node.pulseSpeed;
node.active = Math.max(0, node.active - 0.015);
if (node.layer === LAYERS.length - 1) {
  node.pulseSpeed = 0.04;
}
        const glow = Math.sin(node.pulse) * 0.5 + 0.5;
        const isOutput = node.layer === LAYERS.length - 1;
const baseOpacity = isOutput ? 0.35 + glow * 0.2 : 0.15 + glow * 0.1;
const activeBoost = node.active * 0.7;
const activeRadius = node.radius + node.active * 2.5;

        // Soft depth glow — two rings
if (node.active > 0.05) {
  ctx.beginPath();
  ctx.arc(node.x, node.y, node.radius + 14, 0, Math.PI * 2);
  ctx.fillStyle = `${COLORS.accent} ${activeBoost * 0.08})`;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(node.x, node.y, node.radius + 7, 0, Math.PI * 2);
  ctx.fillStyle = `${COLORS.accent} ${activeBoost * 0.18})`;
  ctx.fill();
}

        // Node fill
        ctx.beginPath();
        ctx.arc(node.x, node.y, activeRadius, 0, Math.PI * 2);
ctx.fillStyle = `${COLORS.accent} ${baseOpacity + activeBoost})`;
ctx.fill();

// Node border
ctx.beginPath();
ctx.arc(node.x, node.y, activeRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `${COLORS.accent} ${0.4 + activeBoost})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Update and draw particles
      particles = particles.filter((p) => p.progress < 1);
      particles.forEach((p) => {
        p.progress += p.speed;
        p.opacity = Math.min(1, p.progress * 8) * Math.min(1, (1 - p.progress) * 8);

        p.x = nodes[p.fromNode].x + (nodes[p.toNode].x - nodes[p.fromNode].x) * p.progress;
        p.y = nodes[p.fromNode].y + (nodes[p.toNode].y - nodes[p.fromNode].y) * p.progress;

        // Activate destination node when particle arrives
        if (p.progress > 0.9) {
          nodes[p.toNode].active = 1;
        }

        // Draw particle trail
        const trailLength = 0.08;
        const trailProgress = Math.max(0, p.progress - trailLength);
        const trailX = nodes[p.fromNode].x + (nodes[p.toNode].x - nodes[p.fromNode].x) * trailProgress;
        const trailY = nodes[p.fromNode].y + (nodes[p.toNode].y - nodes[p.fromNode].y) * trailProgress;

        const grad = ctx.createLinearGradient(trailX, trailY, p.x, p.y);
        grad.addColorStop(0, `${COLORS.accent} 0)`);
        grad.addColorStop(1, `${COLORS.accent} ${p.opacity * 0.9})`);

        ctx.beginPath();
        ctx.moveTo(trailX, trailY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `${COLORS.accent} ${p.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}