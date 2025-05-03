
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface TourGuideButtonProps {
  onStartTour: () => void;
}

const TourGuideButton = ({ onStartTour }: TourGuideButtonProps) => {
  const [isPulsing, setIsPulsing] = useState(true);
  
  useEffect(() => {
    // Stop pulsing animation after 5 seconds
    const timer = setTimeout(() => {
      setIsPulsing(false);
    }, 5000);
    
    // Restart pulsing every 60 seconds
    const interval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => {
        setIsPulsing(false);
      }, 5000);
    }, 60000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handleClick = () => {
    onStartTour();
    toast({
      title: "Tour Guide Activated",
      description: "Let's explore JobFinder's features together!",
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Ripple effect background */}
      {isPulsing && (
        <>
          <span className="absolute inset-0 block w-12 h-12 rounded-full bg-blue-500 opacity-40 animate-ping"></span>
          <span className="absolute inset-0 block w-12 h-12 rounded-full bg-blue-400 opacity-20" style={{ 
            animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
            animationDelay: '0.2s' 
          }}></span>
        </>
      )}
      
      <Button
        variant="outline"
        size="sm"
        className="relative w-12 h-12 p-0 rounded-full bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950 shadow-lg hover:shadow-xl border border-blue-200 dark:border-blue-800 transition-all duration-300 hover:scale-110"
        onClick={handleClick}
        aria-label="Start tour guide"
      >
        <HelpCircle className="h-6 w-6 text-blue-500" />
        
        {/* Label that appears on hover */}
        <span className="absolute right-full mr-2 whitespace-nowrap bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-md">
          Take a tour
        </span>
      </Button>
    </div>
  );
};

export default TourGuideButton;
