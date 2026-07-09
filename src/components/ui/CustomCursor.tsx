import { useEffect, useRef, useState } from "react";
import { useIsTouchDevice } from "../../hooks/useMediaQuery";

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    // Don't initialize on touch devices
    if (isTouch) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let mouseX = 0;
    let mouseY = 0;
    let outerX = 0;
    let outerY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      inner.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    let rafId: number;
    const animateOuter = () => {
      outerX += (mouseX - outerX) * 0.15;
      outerY += (mouseY - outerY) * 0.15;
      outer.style.transform = `translate(${outerX - 16}px, ${outerY - 16}px)`;
      rafId = requestAnimationFrame(animateOuter);
    };

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);

    const handleHoverIn = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]") ||
        target.closest("input") ||
        target.closest("textarea")
      ) {
        setHovering(true);
      }
    };

    const handleHoverOut = () => setHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleHoverIn);
    document.addEventListener("mouseout", handleHoverOut);
    rafId = requestAnimationFrame(animateOuter);

    // Hide default cursor only on non-touch devices with pointer
    if (window.matchMedia("(pointer: fine)").matches) {
      document.documentElement.style.cursor = "none";
      document.body.style.cursor = "none";
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleHoverIn);
      document.removeEventListener("mouseout", handleHoverOut);
      cancelAnimationFrame(rafId);
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
    };
  }, [isTouch]);

  // Don't render on touch devices
  if (isTouch) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference hidden md:block"
        style={{ willChange: "transform" }}
      >
        <div
          className={`w-8 h-8 rounded-full border border-white/60 transition-all duration-200 ${
            hovering ? "scale-[2.2] border-white/90 bg-white/5" : ""
          } ${clicking ? "scale-75" : ""}`}
        />
      </div>

      {/* Inner dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        style={{ willChange: "transform" }}
      >
        <div
          className={`w-2 h-2 rounded-full bg-white transition-all duration-150 ${
            hovering ? "scale-0" : ""
          } ${clicking ? "scale-50" : ""}`}
        />
      </div>
    </>
  );
}
