
import React, { useEffect, useRef } from 'react';
import TourModal from './TourModal';
import TourTooltip from './TourTooltip';
import TourOverlay from './TourOverlay';
import TourGuidePath from './TourGuidePath';
import { useTourGuide, TourStep } from '@/hooks/useTourGuide';
import { PartyPopper } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface TourGuideProps {
  steps: TourStep[];
  onComplete?: () => void;
  storageKey?: string;
}

const TourGuide = ({ steps, onComplete, storageKey = 'jobfinder_has_seen_tour' }: TourGuideProps) => {
  const currentStepRef = useRef<number>(0);
  const hasScrolledRef = useRef<boolean>(false);
  
  const {
    showWelcomeModal,
    tourActive,
    currentStep,
    currentStepData,
    totalSteps,
    startTour,
    skipTour,
    nextStep,
    prevStep,
    completeTour
  } = useTourGuide({ steps, onComplete, storageKey });

  // Update ref when step changes
  useEffect(() => {
    currentStepRef.current = currentStep;
    hasScrolledRef.current = false;
  }, [currentStep]);

  // Show congratulations on completing the tour
  const handleCompleteTour = () => {
    completeTour();
    
    // Show success toast with party popper icon
    toast({
      title: "Tour Completed! 🎉",
      description: "You're all set to explore JobFinder. Need help anytime? Just click the tour guide button.",
      variant: "default",
      children: <PartyPopper className="h-5 w-5 text-green-500" />,
    });
  };

  // Add keyboard navigation
  useEffect(() => {
    if (!tourActive) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        completeTour();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        nextStep();
      } else if (e.key === 'ArrowLeft') {
        prevStep();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tourActive, completeTour, nextStep, prevStep]);

  // Enhanced scroll handling with improved element highlighting
  useEffect(() => {
    if (tourActive && currentStepData) {
      const scrollToElement = () => {
        const targetElement = document.querySelector(currentStepData.targetSelector) as HTMLElement;
        
        if (targetElement) {
          // Reset any previous highlighting
          document.querySelectorAll('[data-tour-highlighted="true"]').forEach((el) => {
            (el as HTMLElement).style.boxShadow = '';
            (el as HTMLElement).style.zIndex = '';
            (el as HTMLElement).style.position = '';
            (el as HTMLElement).style.borderRadius = '';
            (el as HTMLElement).removeAttribute('data-tour-highlighted');
          });
          
          // Calculate element position
          const rect = targetElement.getBoundingClientRect();
          const isInViewport = (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
          );
          
          // Apply highlighting with a data attribute for tracking
          targetElement.style.position = 'relative';
          targetElement.style.zIndex = '60';
          targetElement.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.5)';
          targetElement.style.transition = 'all 0.3s ease';
          targetElement.setAttribute('data-tour-highlighted', 'true');
          
          // If element is not fully in viewport, scroll to it
          if (!isInViewport && !hasScrolledRef.current) {
            hasScrolledRef.current = true;
            
            setTimeout(() => {
              window.scrollTo({
                top: rect.top + window.scrollY - (window.innerHeight / 4),
                behavior: 'smooth'
              });
            }, 400);
          }
          
          // Add pulse effect to the target element
          const pulseInterval = setInterval(() => {
            if (targetElement && document.body.contains(targetElement)) {
              targetElement.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.5)';
              setTimeout(() => {
                if (targetElement && document.body.contains(targetElement)) {
                  targetElement.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)';
                }
              }, 700);
            } else {
              clearInterval(pulseInterval);
            }
          }, 1500);
          
          return () => clearInterval(pulseInterval);
        }
      };
      
      const timeoutId = setTimeout(scrollToElement, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [tourActive, currentStep, currentStepData]);

  // Get previous step data for drawing the path
  const getPrevStepSelector = () => {
    if (currentStep > 1 && steps[currentStep - 2]) {
      return steps[currentStep - 2].targetSelector;
    }
    return '';
  };

  // Clean up highlight and z-index when tour is completed or deactivated
  useEffect(() => {
    return () => {
      // Remove highlight from all elements
      document.querySelectorAll('[data-tour-highlighted="true"]').forEach((el) => {
        (el as HTMLElement).style.boxShadow = '';
        (el as HTMLElement).style.zIndex = '';
        (el as HTMLElement).style.position = '';
        (el as HTMLElement).style.borderRadius = '';
        (el as HTMLElement).removeAttribute('data-tour-highlighted');
      });
    };
  }, []);

  return (
    <>
      <TourModal 
        isOpen={showWelcomeModal} 
        onStartTour={startTour} 
        onSkipTour={skipTour} 
      />
      
      <TourOverlay visible={tourActive} />
      
      {/* Animated path between steps */}
      {tourActive && currentStep > 1 && (
        <TourGuidePath 
          sourceSelector={getPrevStepSelector()}
          targetSelector={currentStepData?.targetSelector || ''}
          active={tourActive && currentStep > 1}
        />
      )}
      
      {tourActive && currentStepData && (
        <TourTooltip
          targetSelector={currentStepData.targetSelector}
          title={currentStepData.title}
          description={currentStepData.description}
          position={currentStepData.position}
          step={currentStep}
          totalSteps={totalSteps}
          onNext={currentStep === totalSteps ? handleCompleteTour : nextStep}
          onPrev={prevStep}
          onClose={completeTour}
        />
      )}
    </>
  );
};

export default TourGuide;
