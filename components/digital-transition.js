"use client";

import { useLayoutEffect, useRef } from "react";
import styles from "./home-hero.module.scss";

const DURATION = 950;
const clamp = value => Math.max(0, Math.min(1, value));
const smooth = value => { const t = clamp(value); return t * t * (3 - 2 * t); };
const noise = seed => { const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453; return value - Math.floor(value); };

// Match the CSS object-fit/object-position so the photograph never jumps at either end.
function photograph(image, width, height) {
  if (!image?.complete || !image.naturalWidth) return null;
  const buffer = document.createElement("canvas");
  buffer.width = Math.ceil(width);
  buffer.height = Math.ceil(height);
  const context = buffer.getContext("2d");
  const ratio = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const [horizontal, vertical] = getComputedStyle(image).objectPosition.split(" ");
  const fraction = value => value === "right" || value === "bottom" ? 1 : value === "left" || value === "top" ? 0 : (parseFloat(value) || 50) / 100;
  const w = image.naturalWidth * ratio;
  const h = image.naturalHeight * ratio;
  context.drawImage(image, (width - w) * fraction(horizontal), (height - h) * fraction(vertical), w, h);
  return buffer;
}

export default function DigitalTransition({ scene, enabled, imagesRef }) {
  const canvasRef = useRef(null);
  const previousScene = useRef(scene);
  const interrupted = useRef(null);

  useLayoutEffect(() => {
    const previous = previousScene.current;
    previousScene.current = scene;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context) return;
    if (!enabled || previous === scene) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      interrupted.current = null;
      return;
    }

    const { width, height } = canvas.getBoundingClientRect();
    const incoming = photograph(imagesRef.current[scene], width, height);
    const outgoing = interrupted.current || photograph(imagesRef.current[previous], width, height);
    interrupted.current = null;
    if (!incoming || !outgoing) return;
    // Work in CSS pixels: thousands of textured fragments without a heavy 3D library.
    canvas.width = Math.ceil(width);
    canvas.height = Math.ceil(height);
    const cell = width < 700 ? 12 : 18;
    const fragments = [];
    const colors = incoming.getContext("2d").getImageData(0, 0, incoming.width, incoming.height).data;
    for (let y = 0; y < height; y += cell) {
      for (let x = 0; x < width; x += cell) {
        const seed = fragments.length + 1;
        const w = Math.min(cell, width - x);
        const h = Math.min(cell, height - y);
        const angle = -Math.PI / 4 + (noise(seed) - .5) * 1.4;
        const distance = (width < 700 ? 16 : 28) + noise(seed + 8) * Math.min(width, 1400) * .035;
        const sample = (Math.floor(y + h / 2) * incoming.width + Math.floor(x + w / 2)) * 4;
        const diagonal = ((x + w / 2) / width + 1 - (y + h / 2) / height) / 2;
        fragments.push({ x, y, w, h, dx: Math.cos(angle) * distance, dy: Math.sin(angle) * distance * .7, curl: (noise(seed + 4) - .5) * 18, delay: diagonal * .56 + noise(seed + 9) * .04, color: `rgb(${colors[sample]}, ${colors[sample + 1]}, ${colors[sample + 2]})` });
      }
    }
    let frame;
    const start = performance.now();
    let finished = false;
    context.drawImage(outgoing, 0, 0, width, height);

    function draw(time) {
      const progress = clamp((time - start) / DURATION);
      if (progress === 1) {
        context.clearRect(0, 0, width, height);
        finished = true;
        return;
      }
      context.globalAlpha = 1;
      context.drawImage(outgoing, 0, 0, width, height);
      // An opaque, displaced photo mosaic fills every gap beneath the moving fragments.
      // Delays follow the bottom-left → top-right diagonal, with a soft irregular edge.
      for (const part of fragments) {
        const local = smooth((progress - part.delay) / .4);
        const burst = Math.pow(Math.sin(Math.PI * local), 2);
        const mix = smooth((local - .2) / .6);
        const sx = Math.max(0, Math.min(width - part.w, part.x - part.dx * burst * .32));
        const sy = Math.max(0, Math.min(height - part.h, part.y - part.dy * burst * .32));
        context.globalAlpha = 1;
        context.drawImage(outgoing, sx, sy, part.w, part.h, part.x, part.y, part.w + .5, part.h + .5);
        context.globalAlpha = mix;
        context.drawImage(incoming, sx, sy, part.w, part.h, part.x, part.y, part.w + .5, part.h + .5);
      }
      for (const part of fragments) {
        const local = smooth((progress - part.delay) / .4);
        const burst = Math.pow(Math.sin(Math.PI * local), 2);
        if (burst < .001) continue;
        const mix = smooth((local - .2) / .6);
        const size = 1 - burst * .78;
        const px = part.x + part.w / 2 + part.dx * burst + Math.sin(local * Math.PI * 2) * part.curl * burst;
        const py = part.y + part.h / 2 + part.dy * burst + Math.cos(local * Math.PI * 2) * part.curl * burst;
        const w = part.w * size + .3;
        const h = part.h * size + .3;
        if (mix < 1) {
          context.globalAlpha = (1 - mix) * burst;
          context.drawImage(outgoing, part.x, part.y, part.w, part.h, px - w / 2, py - h / 2, w, h);
        }
        if (mix > 0) {
          context.globalAlpha = mix * burst;
          context.drawImage(incoming, part.x, part.y, part.w, part.h, px - w / 2, py - h / 2, w, h);
        }
        if (burst > .25) {
          // Light trails follow the actual photo fragments, rather than a screen-wide wipe.
          context.globalAlpha = burst * .18;
          context.strokeStyle = part.color;
          context.beginPath();
          context.moveTo(px, py);
          context.lineTo(px - part.dx * .06 * burst, py - part.dy * .06 * burst);
          context.stroke();
          context.globalAlpha = burst * .4;
          context.fillStyle = part.color;
          context.fillRect(px - 1, py - 1, 2, 2);
        }
      }
      context.globalAlpha = 1;
      frame = window.requestAnimationFrame(draw);
    }
    frame = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(frame);
      if (!finished) {
        const snapshot = document.createElement("canvas");
        snapshot.width = canvas.width;
        snapshot.height = canvas.height;
        snapshot.getContext("2d").drawImage(canvas, 0, 0);
        interrupted.current = snapshot;
      }
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [scene, enabled, imagesRef]);

  return <canvas ref={canvasRef} className={styles.digitalCanvas} aria-hidden="true" />;
}
