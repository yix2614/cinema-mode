
import React from 'react';
import { VideoData } from '../types';

interface VideoOverlayProps {
  data: VideoData;
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({ data }) => {
  return (
    <div className="absolute left-6 bottom-8 right-24 text-white pointer-events-none drop-shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-bold text-lg cursor-pointer pointer-events-auto hover:opacity-70 transition-opacity">
          {data.author}
        </h3>
        <span className="text-white/80 text-sm font-medium">• {data.timeAgo}</span>
      </div>
      {/* 文字描述：最宽 616px，单行打点，常规字体，颜色设置为 #F0F0F0 */}
      <div className="max-w-[616px] pointer-events-auto">
        <p className="text-[15px] font-normal truncate leading-relaxed text-[#F0F0F0]">
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default VideoOverlay;
