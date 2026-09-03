"use client";
import { useEffect, useState } from "react";


export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Only show on non-touch
    if (window.matchMedia("(hover: none)").matches) return;

    let animId: number;
    let targetX = -100;
    let targetY = -100;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: e.clientX, y: e.clientY });
    };

    // Smooth trail via RAF
    const animateTrail = () => {
      setTrailPos(prev => ({
        x: prev.x + (targetX - prev.x) * 0.12,
        y: prev.y + (targetY - prev.y) * 0.12,
      }));
      animId = requestAnimationFrame(animateTrail);
    };
    animId = requestAnimationFrame(animateTrail);

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovered(!!(
        el.tagName === "A" || el.tagName === "BUTTON" ||
        el.closest("a") || el.closest("button") ||
        el.dataset.cursor === "hover"
      ));
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Dot cursor — snaps immediately */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
        style={{ transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)` }}
      >
        <div
          className="rounded-full bg-foreground transition-all duration-100"
          style={{
            width: clicking ? "6px" : "8px",
            height: clicking ? "6px" : "8px",
          }}
        />
      </div>

      {/* Ring cursor — trails behind */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{
          transform: `translate(${trailPos.x - (hovered ? 20 : 16)}px, ${trailPos.y - (hovered ? 20 : 16)}px)`,
        }}
      >
        <div
          className="rounded-full border transition-all duration-200"
          style={{
            width: hovered ? "40px" : "32px",
            height: hovered ? "40px" : "32px",
            borderColor: "hsl(168 76% 42%)",
            opacity: hovered ? 0.8 : 0.5,
            backgroundColor: hovered ? "hsl(168 76% 42% / 0.1)" : "transparent",
          }}
        />
      </div>
    </>
  );
}
