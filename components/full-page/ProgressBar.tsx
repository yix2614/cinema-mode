import React, { useRef, useState, useEffect } from 'react';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentTime, duration, onSeek, className = '' }) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(0);

  const getSeekTime = (e: React.MouseEvent | React.TouchEvent) => {
    if (!progressRef.current || duration <= 0) return 0;
    
    const rect = progressRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = offsetX / rect.width;
    return percentage * duration;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const time = getSeekTime(e);
    setDragTime(time);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const time = getSeekTime(e);
    setDragTime(time);
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !progressRef.current) return;
      
      // We need to calculate clientX from either mouse or touch event
      const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      const rect = progressRef.current.getBoundingClientRect();
      const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = offsetX / rect.width;
      const time = percentage * duration;
      
      setDragTime(time);
    };

    const handleUp = (e: MouseEvent | TouchEvent) => {
      if (isDragging) {
        // Commit the seek
        // If it was a drag, we use the last dragTime
        // But we should also support click-to-seek without drag
        // Actually handleMove updates dragTime, so dragTime is current
        onSeek(dragTime);
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleUp);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('touchend', handleUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, duration, onSeek, dragTime]);

  const displayTime = isDragging ? dragTime : currentTime;
  const progressPercent = duration > 0 ? (displayTime / duration) * 100 : 0;

  return (
    <div 
      ref={progressRef}
      className={`relative h-[2px] hover:h-[8px] bg-white/20 cursor-pointer group/progress touch-none transition-all duration-200 ${className}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Hover area to make it easier to click */}
      <div className="absolute -top-2 -bottom-2 left-0 right-0 z-10" />
      
      {/* Progress Track */}
      <div 
        className="h-full bg-[#FE2C55] shadow-[0_0_8px_rgba(254,44,85,0.6)] relative pointer-events-none transition-[width] duration-75 ease-linear"
        style={{ width: `${progressPercent}%` }}
      >
        {/* Thumb (only visible on hover or drag) */}
        <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md transform scale-0 group-hover/progress:scale-100 transition-transform duration-200 ${isDragging ? 'scale-100' : ''}`} />
      </div>
    </div>
  );
};

export default ProgressBar;
