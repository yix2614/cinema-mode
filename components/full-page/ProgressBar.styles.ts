import React from 'react';

export const progressBarClasses = {
  container: (className: string) => `relative h-[2px] hover:h-[8px] bg-white/20 cursor-pointer group/progress touch-none transition-all duration-200 ${className}`,
  hoverArea: "absolute -top-2 -bottom-2 left-0 right-0 z-10",
  track: "h-full bg-[#FE2C55] shadow-[0_0_8px_rgba(254,44,85,0.6)] relative pointer-events-none transition-[width] duration-75 ease-linear",
  thumb: (isDragging: boolean) => `absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md transform scale-0 group-hover/progress:scale-100 transition-transform duration-200 ${isDragging ? 'scale-100' : ''}`
};

export const progressBarStyles = {
  track: (progressPercent: number): React.CSSProperties => ({ width: `${progressPercent}%` })
};
