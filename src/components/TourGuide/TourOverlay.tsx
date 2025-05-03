
import React from 'react';

interface TourOverlayProps {
  visible: boolean;
}

const TourOverlay = ({ visible }: TourOverlayProps) => {
  if (!visible) return null;
  
  return (
    <div className="fixed inset-0 z-40 pointer-events-none transition-all duration-300">
      {/* Very light gradient background that doesn't obstruct content */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-blue-900/10">
        {/* Exclude the navbar from the overlay */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-transparent"></div>
      </div>
      
      {/* Subtle particle effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/20 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      {/* Very light path effect */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxOTc2RDIiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0xN3Y5aDR2LTloLTR6TTI0IDQyLjVoMS41djFIMjR2LTF6TTIwIDI4aDV2LTFoLTV2MXptLTggMTBoMS41di0xLjVIMTJ2MS41ek0zNiAxOS41aDEuNXYtMS41SDM2djEuNXptLTE0LTUuNXYxaDE0di0xSDIyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-5">
      </div>
    </div>
  );
};

export default TourOverlay;
