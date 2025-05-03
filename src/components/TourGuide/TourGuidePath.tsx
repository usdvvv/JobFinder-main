
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface TourGuidePathProps {
  sourceSelector: string;
  targetSelector: string;
  active: boolean;
}

const TourGuidePath = ({ sourceSelector, targetSelector, active }: TourGuidePathProps) => {
  const [path, setPath] = useState<{ start: { x: number, y: number }, end: { x: number, y: number } } | null>(null);
  const pathRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!active) return;
    
    const calculatePath = () => {
      const sourceElement = document.querySelector(sourceSelector) as HTMLElement;
      const targetElement = document.querySelector(targetSelector) as HTMLElement;
      
      if (!sourceElement || !targetElement) return null;
      
      const sourceRect = sourceElement.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();
      
      // Calculate center points
      const startX = sourceRect.left + sourceRect.width / 2;
      const startY = sourceRect.top + sourceRect.height / 2;
      const endX = targetRect.left + targetRect.width / 2;
      const endY = targetRect.top + targetRect.height / 2;
      
      setPath({
        start: { x: startX, y: startY },
        end: { x: endX, y: endY }
      });
    };
    
    // Initial calculation
    calculatePath();
    
    // Recalculate on window resize and scroll
    window.addEventListener('resize', calculatePath);
    window.addEventListener('scroll', calculatePath);
    
    // Recalculate every 300ms to handle dynamic UI changes
    const interval = setInterval(calculatePath, 300);
    
    return () => {
      window.removeEventListener('resize', calculatePath);
      window.removeEventListener('scroll', calculatePath);
      clearInterval(interval);
    };
  }, [sourceSelector, targetSelector, active]);
  
  if (!path || !active) return null;
  
  // Calculate path attributes
  const dx = path.end.x - path.start.x;
  const dy = path.end.y - path.start.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  
  // Calculate control points for the curve (for a slight curve effect)
  const curveIntensity = length * 0.2;
  const midX = (path.start.x + path.end.x) / 2;
  const midY = (path.start.y + path.end.y) / 2 - curveIntensity;
  
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <svg 
        ref={pathRef}
        width="100%" 
        height="100%" 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0,
          overflow: 'visible'
        }}
      >
        {/* The curved path */}
        <motion.path
          d={`M ${path.start.x} ${path.start.y} Q ${midX} ${midY} ${path.end.x} ${path.end.y}`}
          fill="none"
          stroke="rgba(59, 130, 246, 0.6)"
          strokeWidth="3"
          strokeDasharray="10 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        
        {/* Animated dots along the path */}
        <motion.circle
          cx={path.start.x}
          cy={path.start.y}
          r="4"
          fill="#3b82f6"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], x: [0, dx/2, dx], y: [0, dy/2, dy] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
        />
        
        {/* Moving arrow along the path */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            x: [path.start.x, path.end.x], 
            y: [path.start.y, path.end.y],
            rotate: angle
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            repeatType: "loop",
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "center center" }}
        >
          <circle r="14" fill="rgba(59, 130, 246, 0.2)" />
          <circle r="10" fill="rgba(59, 130, 246, 0.4)" />
          <foreignObject width="24" height="24" x="-12" y="-12">
            <ArrowRight className="h-6 w-6 text-blue-500" />
          </foreignObject>
        </motion.g>
      </svg>
    </div>
  );
};

export default TourGuidePath;
