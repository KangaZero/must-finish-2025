"use client";
import React, { useEffect, useRef } from "react";

type Props = {
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export const ParallaxLayer: React.FC<Props> = ({ speed = 0.2, className, style, children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const target = useRef(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const onScroll = () => {
      target.current = window.scrollY * speed;
      if (raf.current == null) raf.current = requestAnimationFrame(update);
    };

    const update = () => {
      raf.current = null;
      if (!ref.current) return;
      ref.current.style.transform = `translate3d(0, ${target.current}px, 0)`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        willChange: "transform",
        transform: "translate3d(0,0,0)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxLayer;
