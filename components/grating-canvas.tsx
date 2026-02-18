"use client";

import { useEffect, useRef } from "react";
import type { Orientation } from "@/lib/vcs";

export function GratingCanvas({ contrast, cpd, orientation, phase }: { contrast: number; cpd: number; orientation: Orientation; phase: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = canvas;
    const imageData = ctx.createImageData(width, height);
    const theta = orientation === "left" ? (3 * Math.PI) / 4 : orientation === "right" ? Math.PI / 4 : Math.PI / 2;
    const freq = cpd / 150;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const xr = x * Math.cos(theta) + y * Math.sin(theta);
        const value = 127 + 127 * contrast * Math.sin(2 * Math.PI * freq * xr + phase);
        imageData.data[i] = value;
        imageData.data[i + 1] = value;
        imageData.data[i + 2] = value;
        imageData.data[i + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }, [contrast, cpd, orientation, phase]);

  return <canvas ref={ref} width={380} height={380} className="mx-auto rounded-xl" />;
}
