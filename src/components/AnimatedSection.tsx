
import React, { useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-up' | 'slide-down' | 'slide-in-right';
  delay?: number;
  threshold?: number;
}

const AnimatedSection = ({
  children,
  className = '',
  animation = 'fade-in',
  delay = 0,
  threshold = 0.1,
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-in':
        return 'animate-fade-in';
      case 'slide-up':
        return 'animate-slide-up';
      case 'slide-down':
        return 'animate-slide-down';
      case 'slide-in-right':
        return 'animate-slide-in-right';
      default:
        return 'animate-fade-in';
    }
  };

  const delayClass = delay ? `animate-delay-${delay}` : '';

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? `${getAnimationClass()} ${delayClass}` : 'opacity-0'}`}
      style={{ 
        animationDelay: delay && !delayClass ? `${delay}ms` : undefined,
        visibility: isVisible ? 'visible' : 'hidden'
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
