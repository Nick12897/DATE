"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function HeartConfetti() {
  useEffect(() => {
    // Bắn confetti hình trái tim với bảng màu lãng mạn
    const duration = 3.5 * 1000;
    const animationEnd = Date.now() + duration;

    // Hình trái tim tùy chỉnh cho confetti
    const heartShape = confetti.shapeFromPath({
      path: "M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -75,-76 -151,-151 -151,-227 0,-42 34,-75 76,-75 38,0 57,18 75,56z",
    });

    const colors = ["#E05A47", "#EE8582", "#FCD6D4", "#C2968C", "#FF6B6B"];

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        shapes: [heartShape],
        scalar: 1.6,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        shapes: [heartShape],
        scalar: 1.6,
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return null;
}
