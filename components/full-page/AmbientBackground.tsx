import React from 'react';

interface AmbientBackgroundProps {
  posterUrl: string;
  className?: string;
  opacity?: number;
}

const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ posterUrl, className = '', opacity = 0.40 }) => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none -z-10">
        <img
            src={posterUrl}
            alt=""
            className={`w-full h-full object-fill transition-opacity duration-500 ${className}`}
            style={{
                opacity: opacity,
                // Much stronger blur
                filter: 'blur(30px) saturate(135%) brightness(0.95) contrast(1.15)',
                // Scale is handled by parent container now to avoid clipping issues
                transform: 'scale(1.02)', // Slight scale to prevent edge bleeding
                backfaceVisibility: 'hidden',
            }}
        />
    </div>
  );
};

export default AmbientBackground;
