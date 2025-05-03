
import React, { useRef, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TourTooltipProps {
  targetSelector: string;
  title: string;
  description: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  step: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
}

const TourTooltip = ({
  targetSelector,
  title,
  description,
  position = 'bottom',
  step,
  totalSteps,
  onNext,
  onPrev,
  onClose
}: TourTooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = useState({ top: 0, left: 0, rotate: 'rotate-0' });

  const positionTooltip = () => {
    const targetElement = document.querySelector(targetSelector) as HTMLElement;
    if (!targetElement || !tooltipRef.current) return;

    const targetRect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    // Add highlight effect to the target element
    targetElement.style.position = 'relative';
    targetElement.style.zIndex = '60';
    targetElement.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)';
    targetElement.style.borderRadius = '4px';
    targetElement.style.transition = 'all 0.3s ease';
    
    let top = 0;
    let left = 0;
    let arrowTop = 0;
    let arrowLeft = 0;
    let arrowRotate = 'rotate-0';

    const ARROW_OFFSET = 12;
    const SPACING = 16;

    switch (position) {
      case 'top':
        top = targetRect.top - tooltipRect.height - SPACING;
        left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
        arrowTop = tooltipRect.height;
        arrowLeft = tooltipRect.width / 2 - ARROW_OFFSET;
        arrowRotate = 'rotate-180';
        break;
      case 'right':
        top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
        left = targetRect.right + SPACING;
        arrowTop = tooltipRect.height / 2 - ARROW_OFFSET;
        arrowLeft = -ARROW_OFFSET * 2;
        arrowRotate = '-rotate-90';
        break;
      case 'bottom':
        top = targetRect.bottom + SPACING;
        left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
        arrowTop = -ARROW_OFFSET * 2;
        arrowLeft = tooltipRect.width / 2 - ARROW_OFFSET;
        arrowRotate = 'rotate-0';
        break;
      case 'left':
        top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
        left = targetRect.left - tooltipRect.width - SPACING;
        arrowTop = tooltipRect.height / 2 - ARROW_OFFSET;
        arrowLeft = tooltipRect.width;
        arrowRotate = 'rotate-90';
        break;
    }

    // Make sure tooltip stays within viewport
    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
      left = window.innerWidth - tooltipRect.width - 10;
    }
    
    if (top < 10) top = 10;
    if (top + tooltipRect.height > window.innerHeight - 10) {
      top = window.innerHeight - tooltipRect.height - 10;
    }

    setTooltipPosition({ top, left });
    setArrowPosition({ top: arrowTop, left: arrowLeft, rotate: arrowRotate });
  };

  useEffect(() => {
    positionTooltip();
    
    // Reposition on window resize
    window.addEventListener('resize', positionTooltip);
    
    // Pulse effect on the target element
    const targetElement = document.querySelector(targetSelector) as HTMLElement;
    if (targetElement) {
      const pulseInterval = setInterval(() => {
        targetElement.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.5)';
        setTimeout(() => {
          targetElement.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)';
        }, 700);
      }, 1500);
      
      return () => {
        clearInterval(pulseInterval);
        window.removeEventListener('resize', positionTooltip);
      };
    }
    
    // Clean up
    return () => {
      window.removeEventListener('resize', positionTooltip);
      
      // Remove highlight from all elements
      document.querySelectorAll('[style*="z-index: 60"]').forEach((el) => {
        (el as HTMLElement).style.boxShadow = '';
        (el as HTMLElement).style.zIndex = '';
        (el as HTMLElement).style.position = '';
        (el as HTMLElement).style.borderRadius = '';
      });
    };
  }, [targetSelector, position]);

  return (
    <div 
      ref={tooltipRef}
      className="fixed bg-white dark:bg-gray-900 rounded-lg shadow-xl backdrop-blur-lg border border-blue-500/30 p-4 w-80 z-[100] animate-fade-in transition-all duration-300"
      style={{ 
        top: `${tooltipPosition.top}px`, 
        left: `${tooltipPosition.left}px`,
        background: 'linear-gradient(145deg, rgba(255,255,255,0.8), rgba(240,250,255,0.95))',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)'
      }}
    >
      {/* Custom arrow indicator */}
      <div
        className={`absolute w-6 h-6 bg-white dark:bg-gray-900 transform ${arrowPosition.rotate} rotate-45 border border-blue-500/30 z-[-1]`}
        style={{
          top: `${arrowPosition.top}px`,
          left: `${arrowPosition.left}px`,
          background: 'linear-gradient(145deg, rgba(255,255,255,0.8), rgba(240,250,255,0.95))'
        }}
      ></div>
      
      <button 
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 bg-white/50 dark:bg-gray-800/50 rounded-full p-1 transform transition-transform hover:scale-110"
        aria-label="Close tour"
      >
        <X size={16} />
      </button>
      
      <div className="mb-2 text-xs font-medium text-blue-500 flex items-center justify-between">
        <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full text-blue-600 dark:text-blue-400">
          Step {step} of {totalSteps}
        </span>
        <div className="flex space-x-1">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full ${i < step ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-700'}`}
            />
          ))}
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">{description}</p>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onPrev}
          disabled={step === 1}
          className={cn(
            "transition-all border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950",
            step === 1 && "opacity-50 cursor-not-allowed"
          )}
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Previous
        </Button>
        
        <Button 
          size="sm" 
          onClick={onNext}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all"
        >
          {step === totalSteps ? "Finish" : "Next"} 
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TourTooltip;
