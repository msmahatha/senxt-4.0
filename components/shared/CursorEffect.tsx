"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export function CursorEffect() {
  const [isHovering, setIsHovering] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const dotX = useSpring(pointerX, { stiffness: 500, damping: 28, mass: 0.5 });
  const dotY = useSpring(pointerY, { stiffness: 500, damping: 28, mass: 0.5 });
  const ringX = useSpring(pointerX, { stiffness: 250, damping: 20, mass: 0.8 });
  const ringY = useSpring(pointerY, { stiffness: 250, damping: 20, mass: 0.8 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const pointerQuery = window.matchMedia("(pointer: fine)");
    const updatePointerCapability = () => setHasFinePointer(pointerQuery.matches);
    updatePointerCapability();
    pointerQuery.addEventListener("change", updatePointerCapability);
    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      pointerQuery.removeEventListener("change", updatePointerCapability);
    };
  }, [pointerX, pointerY]);

  if (!hasFinePointer || reducedMotion) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-cyan-500 rounded-full pointer-events-none z-50 mix-blend-screen shadow-[0_0_10px_#21d5bf]"
        style={{ x: dotX, y: dotY, translateX: -8, translateY: -8 }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-cyan-500 rounded-full pointer-events-none z-50 mix-blend-screen shadow-[0_0_15px_rgba(33,213,191,0.3)]"
        style={{ x: ringX, y: ringY, translateX: -24, translateY: -24 }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(33, 213, 191, 0.12)" : "rgba(33, 213, 191, 0)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.8 }}
      />
    </>
  );
}
