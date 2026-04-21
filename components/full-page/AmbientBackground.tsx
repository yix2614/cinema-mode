import React, { useEffect, useRef } from 'react';

interface AmbientBackgroundProps {
  posterUrl: string;
  videoUrl?: string;
  className?: string;
  opacity?: number;
}

const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ posterUrl, videoUrl, className = '', opacity = 0.40 }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || posterUrl || !videoUrl) return;
    const handleLoadedData = () => {
      video.currentTime = 0;
      video.pause();
    };
    video.addEventListener('loadeddata', handleLoadedData);
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [posterUrl, videoUrl]);

  const styles: React.CSSProperties = {
    opacity: opacity,
    filter: 'blur(30px) saturate(135%) brightness(0.95) contrast(1.15)',
    transform: 'scale(1.02)',
    backfaceVisibility: 'hidden'
  };

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none -z-10">
        {posterUrl ? (
          <img
              src={posterUrl}
              alt=""
              className={`w-full h-full object-fill transition-opacity duration-500 ${className}`}
              style={styles}
          />
        ) : (
          <video
            ref={videoRef}
            src={videoUrl}
            className={`w-full h-full object-fill transition-opacity duration-500 ${className}`}
            style={styles}
            muted
            loop
            playsInline
            preload="auto"
          />
        )}
    </div>
  );
};

export default AmbientBackground;
