import React from 'react';

export const videoOverlayClasses = {
  container: (className: string) => `absolute bottom-0 left-0 right-0 h-auto pt-4 px-5 pb-8 pointer-events-none bg-gradient-to-b from-black/0 to-black/30 ${className}`,
  inner: "text-white drop-shadow-lg w-full",
  header: "flex items-center gap-2 mb-2",
  author: "font-bold text-lg cursor-pointer pointer-events-auto hover:opacity-70 transition-opacity",
  time: "text-white/80 text-sm font-medium",
  descriptionWrapper: "pointer-events-auto",
  description: "text-[15px] font-normal truncate leading-relaxed text-[#F0F0F0]"
};

export const videoOverlayStyles = {
  inner: (isSmall: boolean): React.CSSProperties => ({ maxWidth: isSmall ? 320 : 560 })
};
