import React from 'react';
import { VideoData } from '../types';

interface FullScreenVideoOverlayProps {
  data: VideoData;
}

const FullScreenVideoOverlay: React.FC<FullScreenVideoOverlayProps> = ({ data }) => {
  return (
    <div className="absolute left-6 bottom-9 right-24 text-white pointer-events-none drop-shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-bold text-lg cursor-pointer pointer-events-auto hover:opacity-70 transition-opacity">
          {data.author}
        </h3>
        <span className="text-white/80 text-sm font-medium">• {data.timeAgo}</span>
      </div>
      <div className="max-w-[560px] pointer-events-auto">
        <p className="text-[15px] font-normal truncate leading-relaxed text-[#F0F0F0]">
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default FullScreenVideoOverlay;
