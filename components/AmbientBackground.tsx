import React, { useRef, useEffect } from 'react';

interface AmbientBackgroundProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  className?: string;
}

const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ videoRef, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  
  // Keep the 16x16 size as it works well for extreme blur and performance
  const CANVAS_WIDTH = 16;
  const CANVAS_HEIGHT = 16;
  const lastDrawTimeRef = useRef<number>(0);
  const TARGET_FPS = 15; // Limit to 15fps for performance since it's blurred anyway
  const FRAME_INTERVAL = 1000 / TARGET_FPS;

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    if (!canvas || !video) return;
    
    const ctx = canvas.getContext('2d', { 
      alpha: false, 
      willReadFrequently: false 
    });
    
    if (!ctx) return;

    const draw = (timestamp: number) => {
      // Throttle updates for performance
      if (timestamp - lastDrawTimeRef.current >= FRAME_INTERVAL) {
        // Always try to draw if video has data, regardless of play state, to ensure initial frame is captured
        if (video.readyState >= 2) {
            try {
            ctx.drawImage(video, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            lastDrawTimeRef.current = timestamp;
            } catch (e) {
            // Ignore errors
            }
        }
      }
      animationFrameRef.current = requestAnimationFrame(draw);
    };

    animationFrameRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [videoRef]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none -z-10">
        <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        // Removed blur from className and moved to style for consistent application
        // Changed object-cover to object-fill to stretch colors
        className={`w-full h-full object-fill opacity-[0.34] transition-opacity duration-500 ${className}`}
        style={{
            // Much stronger blur
            filter: 'blur(30px) saturate(120%) brightness(0.8) contrast(1.2)',
            // Scale is handled by parent container now to avoid clipping issues
            transform: 'scale(1.02)', // Slight scale to prevent edge bleeding
            backfaceVisibility: 'hidden',
        }}
        />
        {/* Removed black overlay to prevent "black border" effect */}
    </div>
  );
};

export default AmbientBackground;
