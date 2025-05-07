
import { useState, useEffect, Suspense, useRef } from 'react';
import { Video, Mic, MicOff, Clock, HeartPulse, CameraOff } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import React from 'react';
import * as THREE from 'three';

function Model({ speaking }: { speaking: boolean }) {
  const { scene } = useGLTF('/white_mesh.glb');
  const [hovered, setHovered] = useState(false);
  const modelRef = useRef<THREE.Object3D>(null);
  
  useEffect(() => {
    if (scene) {
      scene.traverse((child: any) => {
        if (child.isMesh) {
          child.material.color.set(speaking ? '#60a5fa' : '#3b82f6');
          child.material.emissive.set(hovered ? '#1d4ed8' : '#000000');
          child.material.emissiveIntensity = hovered ? 0.5 : 0;
          child.material.metalness = 0.5;
          child.material.roughness = 0.5;
        }
      });
    }
  }, [speaking, hovered, scene]);

  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      if (modelRef.current && speaking) {
        const time = Date.now() * 0.005;
        const scale = 1 + Math.sin(time) * 0.05;
        modelRef.current.scale.set(2 * scale, 2, 2);
      }
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [speaking]);

  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      scale={2}
      position={[0, -2, 0]} 
      rotation={[0, speaking ? Math.sin(Date.now() * 0.001) * 0.1 : 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
}

function ModelFallback() {
  return (
    <mesh>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#3b82f6" />
    </mesh>
  );
}

interface Interviewer3DAvatarProps {
  speaking?: boolean;
  size?: number;
  showWellnessData?: boolean;
}

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("3D Rendering Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white p-4 rounded-lg">
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">3D Rendering Error</p>
            <p className="text-sm mb-4">There was a problem loading the 3D model.</p>
            <button 
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-sm"
              onClick={() => this.setState({ hasError: false })}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const Interviewer3DAvatar = ({ 
  speaking = false, 
  size = 400, 
  showWellnessData = false 
}: Interviewer3DAvatarProps) => {
  const [currentTime, setCurrentTime] = useState('');
  const [interviewerState, setInterviewerState] = useState<'listening' | 'speaking' | 'thinking'>('listening');
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  
  const backgrounds = [
    'linear-gradient(to right, #e6e9f0 0%, #eef1f5 100%)',
    'linear-gradient(to right, #d7d2cc 0%, #304352 100%)',
    'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)'
  ];
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (speaking) {
      setInterviewerState('speaking');
    } else {
      setInterviewerState(Math.random() > 0.7 ? 'thinking' : 'listening');
    }
  }, [speaking]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex(prev => (prev + 1) % backgrounds.length);
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div style={{ width: size, height: size, margin: '0 auto', position: 'relative' }}>
      {showWellnessData && (
        <div className="absolute top-0 left-0 w-full z-30">
          <div className="bg-gradient-to-br from-purple-900/90 to-blue-950/90 backdrop-blur-lg border border-white/10 shadow-lg rounded-md mb-2">
            <div className="bg-gradient-to-r from-red-700 to-red-900 px-4 py-2 text-white rounded-t-md flex items-center">
              <CameraOff size={18} className="mr-2 text-white" />
              <h3 className="text-base font-semibold">Interviewer Camera Turned Off</h3>
            </div>
            <div className="p-3 rounded-b-md text-center text-white/80 text-sm">
              <p>Video feed is currently unavailable.</p>
              <p>Audio connection is still active.</p>
            </div>
            <div className="absolute -right-1 -top-1 w-3 h-3 bg-red-500 rounded-full border border-white shadow-lg"></div>
          </div>
        </div>
      )}

      <div 
        className="rounded-lg overflow-hidden shadow-lg border border-gray-200" 
        style={{ 
          width: '100%', 
          height: '100%', 
          position: 'relative',
          background: 'linear-gradient(to bottom, #1e293b, #0f172a)',
        }}
      >
        <div className="absolute top-0 left-0 right-0 bg-black/70 text-white px-3 py-2 flex justify-between items-center z-10">
          <div className="flex items-center space-x-2">
            <Video size={14} />
            <span className="text-xs font-medium">Interview in progress</span>
          </div>
          <div className="flex items-center space-x-3">
            <Clock size={14} />
            <span className="text-xs">{currentTime}</span>
          </div>
        </div>
        
        <div className="w-full h-full">
          <ErrorBoundary>
            <Canvas
              camera={{ position: [0, 0, 8], fov: 45 }}
              style={{ background: 'transparent' }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <spotLight 
                position={[0, 5, 5]} 
                angle={0.4} 
                penumbra={1} 
                intensity={1.5} 
                castShadow
              />
              <Suspense fallback={<ModelFallback />}>
                <Model speaking={speaking} />
              </Suspense>
              <OrbitControls 
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI/2.5}
                maxPolarAngle={Math.PI/1.8}
                rotateSpeed={0.5}
              />
            </Canvas>
          </ErrorBoundary>
        </div>
        
        <div className="absolute bottom-3 left-3 bg-black/70 rounded-full p-2 z-10">
          {speaking ? (
            <Mic size={18} className="text-green-400" />
          ) : (
            <MicOff size={18} className="text-gray-400" />
          )}
        </div>
        
        <div className="absolute bottom-3 right-3 bg-primary/80 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium z-10">
          AI Interviewer
        </div>
      </div>
      
      {speaking && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center z-20">
          <div className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium animate-pulse flex items-center gap-1.5">
            <span className="w-2 h-2 bg-white rounded-full animate-ping" />
            Speaking...
          </div>
        </div>
      )}
    </div>
  );
};

export default Interviewer3DAvatar;
