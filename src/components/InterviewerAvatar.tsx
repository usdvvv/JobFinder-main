
import { useState, useEffect } from 'react';

interface InterviewerAvatarProps {
  speaking?: boolean;
  size?: number;
}

const InterviewerAvatar = ({ speaking = false, size = 300 }: InterviewerAvatarProps) => {
  const [mouthOpen, setMouthOpen] = useState(0);
  
  // Add mouth animation when speaking
  useEffect(() => {
    if (speaking) {
      // Simple mouth movement pattern
      const interval = setInterval(() => {
        setMouthOpen(Math.random() * 0.5 + 0.1); // Random mouth position when speaking
      }, 150);
      
      return () => clearInterval(interval);
    } else {
      setMouthOpen(0);
    }
  }, [speaking]);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        margin: '0 auto',
        backgroundColor: '#f5f5f5',
        position: 'relative',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      }}
    >
      {/* Base face - realistic human interviewer */}
      <div 
        style={{ 
          width: '100%', 
          height: '100%', 
          position: 'relative',
          backgroundColor: '#f2e2d2', // Skin tone
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        {/* Hair */}
        <div style={{ 
          position: 'absolute',
          top: '-5%',
          left: '-5%',
          width: '110%',
          height: '50%',
          borderRadius: '50% 50% 0 0',
          backgroundColor: '#3a3a3a', // Dark hair
        }} />

        {/* Hair styling */}
        <div style={{ 
          position: 'absolute',
          top: '10%',
          left: '15%',
          width: '70%',
          height: '25%',
          borderRadius: '50% 50% 0 0',
          backgroundColor: '#f2e2d2', // Skin tone - forehead
        }} />
        
        {/* Forehead wrinkles - subtle */}
        <div style={{ 
          position: 'absolute',
          top: '22%',
          left: '25%',
          width: '50%',
          height: '1px',
          backgroundColor: 'rgba(0,0,0,0.05)',
        }} />
        
        {/* Eyebrows */}
        <div style={{ 
          position: 'absolute',
          top: '30%',
          left: '25%',
          width: '15%',
          height: '3%',
          backgroundColor: '#3a3a3a',
          borderRadius: '2px',
          transform: speaking ? 'translateY(-2px)' : 'none',
          transition: 'transform 0.2s',
        }} />
        <div style={{ 
          position: 'absolute',
          top: '30%',
          right: '25%',
          width: '15%',
          height: '3%',
          backgroundColor: '#3a3a3a',
          borderRadius: '2px',
          transform: speaking ? 'translateY(-2px)' : 'none',
          transition: 'transform 0.2s',
        }} />
        
        {/* Eyes */}
        <div style={{ 
          position: 'absolute',
          top: '34%',
          left: '28%',
          width: '12%',
          height: '5%',
          borderRadius: '50%',
          backgroundColor: 'white',
          border: '1px solid #3a3a3a',
          overflow: 'hidden',
        }}>
          {/* Pupil */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            height: '50%',
            borderRadius: '50%',
            backgroundColor: '#3a3a3a',
          }} />
        </div>
        <div style={{ 
          position: 'absolute',
          top: '34%',
          right: '28%',
          width: '12%',
          height: '5%',
          borderRadius: '50%',
          backgroundColor: 'white',
          border: '1px solid #3a3a3a',
          overflow: 'hidden',
        }}>
          {/* Pupil */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            height: '50%',
            borderRadius: '50%',
            backgroundColor: '#3a3a3a',
          }} />
        </div>
        
        {/* Nose */}
        <div style={{ 
          position: 'absolute',
          top: '40%',
          left: '47%',
          width: '6%',
          height: '15%',
          borderRadius: '30% 30% 50% 50%',
          backgroundColor: '#e6d0c0', // Slightly darker skin tone for depth
          boxShadow: '2px 2px 2px rgba(0,0,0,0.05)',
        }} />
        
        {/* Cheeks - subtle shading */}
        <div style={{ 
          position: 'absolute',
          top: '50%',
          left: '20%',
          width: '15%',
          height: '10%',
          borderRadius: '50%',
          backgroundColor: 'rgba(235,137,137,0.1)', // Very subtle blush
        }} />
        <div style={{ 
          position: 'absolute',
          top: '50%',
          right: '20%',
          width: '15%',
          height: '10%',
          borderRadius: '50%',
          backgroundColor: 'rgba(235,137,137,0.1)', // Very subtle blush
        }} />
        
        {/* Mouth */}
        <div style={{ 
          position: 'absolute',
          bottom: '25%',
          left: '35%',
          width: '30%',
          height: speaking ? `${mouthOpen * 8}%` : '2%',
          backgroundColor: speaking ? '#701c28' : 'transparent', // Darker interior when open
          borderRadius: speaking ? '30% 30% 50% 40%' : '30% 30% 30% 30%',
          border: '1px solid #701c28',
          transition: 'height 0.1s',
          overflow: 'hidden',
        }}>
          {/* Lips */}
          <div style={{ 
            position: 'absolute',
            top: '0',
            width: '100%',
            height: '30%',
            backgroundColor: '#b25959', // Lip color
            borderBottom: '1px solid #701c28',
          }} />
          
          {/* Lower lip */}
          <div style={{ 
            position: 'absolute',
            bottom: '0',
            width: '100%',
            height: '40%',
            backgroundColor: '#b25959', // Lip color
            borderTop: '1px solid #701c28',
          }} />
          
          {/* Teeth - only visible when speaking with mouth open */}
          {speaking && mouthOpen > 0.3 && (
            <div style={{ 
              position: 'absolute',
              top: '30%',
              width: '100%',
              height: '30%',
              backgroundColor: 'white',
            }} />
          )}
        </div>
        
        {/* Chin/jawline definition */}
        <div style={{ 
          position: 'absolute',
          bottom: '15%',
          left: '35%',
          width: '30%',
          height: '2%',
          borderRadius: '50%',
          backgroundColor: 'rgba(0,0,0,0.03)', // Very subtle shadow
        }} />
        
        {/* Neck */}
        <div style={{ 
          position: 'absolute',
          bottom: '-5%',
          left: '35%',
          width: '30%',
          height: '15%',
          backgroundColor: '#f2e2d2', // Skin tone
        }} />
        
        {/* Collar/suit */}
        <div style={{ 
          position: 'absolute',
          bottom: '-15%',
          left: '20%',
          width: '60%',
          height: '25%',
          backgroundColor: '#2c3e50', // Dark suit color
        }} />
        
        {/* Shirt collar */}
        <div style={{ 
          position: 'absolute',
          bottom: '-5%',
          left: '38%',
          width: '24%',
          height: '10%',
          backgroundColor: 'white',
          transform: 'rotate(5deg)',
        }} />
        <div style={{ 
          position: 'absolute',
          bottom: '-5%',
          right: '38%',
          width: '24%',
          height: '10%',
          backgroundColor: 'white',
          transform: 'rotate(-5deg)',
        }} />
      </div>
      
      {speaking && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center">
          <div className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium animate-pulse">
            Speaking...
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewerAvatar;
