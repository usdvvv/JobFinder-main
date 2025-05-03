
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const RoleSelection = () => {
  const particlesRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLHeadingElement>(null);
  const roleTextRef = useRef<HTMLHeadingElement>(null);
  const choiceContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Create floating particles
    const createParticles = () => {
      if (!particlesRef.current) return;
      
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 2 and 6 pixels
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        particlesRef.current.appendChild(particle);

        // Animate each particle
        gsap.to(particle, {
          y: -Math.random() * 400 - 200,
          x: (Math.random() - 0.5) * 200,
          opacity: Math.random() * 0.6 + 0.2,
          duration: Math.random() * 4 + 4,
          repeat: -1,
          delay: Math.random() * 2,
          ease: "power1.inOut",
          yoyo: true
        });
      }
    };

    // Animation sequence
    const startAnimations = () => {
      if (!introTextRef.current || !roleTextRef.current || !choiceContainerRef.current) return;

      // Initial "Welcome" text animation
      gsap.to(introTextRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.7)"
      });

      // Move "Welcome" text to the top-left corner
      gsap.to(introTextRef.current, {
        top: '2rem',
        left: '2rem',
        scale: 0.5,
        fontSize: '2rem',
        delay: 2,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          // Fade out "Welcome" text
          gsap.to(introTextRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              // Show "Choose Your Role" text
              gsap.to(roleTextRef.current, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1.5,
                ease: "elastic.out(1, 0.7)",
                onComplete: () => {
                  // Move "Choose Your Role" text to the top-left corner
                  gsap.to(roleTextRef.current, {
                    top: '2rem',
                    left: '2rem',
                    scale: 0.5,
                    fontSize: '2rem',
                    duration: 1,
                    ease: "power2.inOut",
                    onComplete: () => {
                      // Show buttons
                      gsap.to(choiceContainerRef.current, {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power2.out"
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    };

    // Glow effect following cursor
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      
      gsap.to(glowRef.current, {
        x: e.clientX - 50,
        y: e.clientY - 50,
        opacity: 0.5,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    // Initialize
    createParticles();
    startAnimations();
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleUserClick = () => {
    navigate('/choose');
  };

  const handleCompanyClick = () => {
    navigate('/company/login');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="background"></div>
      <div ref={particlesRef} className="particles"></div>
      <div ref={glowRef} className="glow"></div>

      <h1 ref={introTextRef} className="intro-text">Welcome to JobFinder</h1>
      <h1 ref={roleTextRef} className="role-text">Choose Your Role</h1>

      <div ref={choiceContainerRef} className="choice-container">
        {/* User Button */}
        <button className="choice-button" onClick={handleUserClick}>
          <div className="button-content">
            <span className="button-icon">👤</span>
            <span className="button-title">User</span>
            <span className="button-subtitle">Graduate, Student, or Professional</span>
          </div>
        </button>

        {/* Company Button */}
        <button className="choice-button" onClick={handleCompanyClick}>
          <div className="button-content">
            <span className="button-icon">🏢</span>
            <span className="button-title">Company</span>
            <span className="button-subtitle">Employers and Recruiters</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
