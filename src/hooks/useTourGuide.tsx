
import { useState, useEffect, useCallback } from 'react';

export interface TourStep {
  targetSelector: string;
  title: string;
  description: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

interface UseTourGuideProps {
  steps: TourStep[];
  onComplete?: () => void;
  storageKey?: string;
}

export function useTourGuide({ steps, onComplete, storageKey = 'jobfinder_has_seen_tour' }: UseTourGuideProps) {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [tourActive, setTourActive] = useState(false);

  // Clean up function to reset highlighted elements and restore scroll
  const cleanupHighlightedElements = useCallback(() => {
    document.querySelectorAll('[data-tour-highlighted="true"]').forEach((el) => {
      (el as HTMLElement).style.boxShadow = '';
      (el as HTMLElement).style.zIndex = '';
      (el as HTMLElement).style.position = '';
      (el as HTMLElement).style.borderRadius = '';
      (el as HTMLElement).removeAttribute('data-tour-highlighted');
    });
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
  }, []);

  useEffect(() => {
    // Check if this is the user's first visit
    const hasSeenTour = localStorage.getItem(storageKey);
    
    if (!hasSeenTour) {
      // Delay showing the welcome modal to let the page load first
      const timer = setTimeout(() => {
        setShowWelcomeModal(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [storageKey]);

  const startTour = useCallback(() => {
    setShowWelcomeModal(false);
    setCurrentStep(1);
    setTourActive(true);
    // Ensure scrolling is enabled
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
  }, []);

  const skipTour = useCallback(() => {
    setShowWelcomeModal(false);
    setTourActive(false);
    localStorage.setItem(storageKey, 'true');
    cleanupHighlightedElements();
    // Ensure normal scrolling is maintained
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
  }, [storageKey, cleanupHighlightedElements]);

  const nextStep = useCallback(() => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  }, [currentStep, steps.length]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const completeTour = useCallback(() => {
    setTourActive(false);
    localStorage.setItem(storageKey, 'true');
    cleanupHighlightedElements();
    if (onComplete) onComplete();
  }, [storageKey, onComplete, cleanupHighlightedElements]);

  const resetTour = useCallback(() => {
    localStorage.removeItem(storageKey);
    setShowWelcomeModal(true);
    setCurrentStep(0);
    setTourActive(false);
    cleanupHighlightedElements();
  }, [storageKey, cleanupHighlightedElements]);

  return {
    showWelcomeModal,
    tourActive,
    currentStep,
    currentStepData: steps[currentStep - 1],
    totalSteps: steps.length,
    startTour,
    skipTour,
    nextStep,
    prevStep,
    completeTour,
    resetTour
  };
}
