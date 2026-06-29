import { useMotionValue, useSpring } from "framer-motion";
import { useCallback } from "react";

export function useMouseParallax(damping = 25, stiffness = 100) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { damping, stiffness });
  const smoothY = useSpring(mouseY, { damping, stiffness });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Normalize coordinates around center (-0.5 to 0.5)
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  return { smoothX, smoothY, handleMouseMove };
}
