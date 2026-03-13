
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VideoData } from '../../types';
import { Icons } from '../../constants';

interface VideoOverlayProps {
  data: VideoData;
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="absolute left-6 bottom-8 right-24 text-white pointer-events-none drop-shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-bold text-lg cursor-pointer pointer-events-auto hover:opacity-70 transition-opacity">
          {data.author}
        </h3>
        <span className="text-white/80 text-sm font-medium">• {data.timeAgo}</span>
      </div>
      {/* 文字描述：最宽 480px，单行打点，常规字体，颜色设置为 #F0F0F0 */}
      <div className="max-w-[480px] pointer-events-auto">
        <p className="text-[15px] font-normal truncate leading-relaxed text-[#F0F0F0]">
          {data.description}
        </p>
      </div>

      <div
        className="mt-2 flex items-center gap-2 pointer-events-auto cursor-pointer hover:bg-white/20 transition-colors bg-white/10 backdrop-blur-sm rounded-full h-[44px] pl-4 pr-3 w-full max-w-[480px]"
        onClick={() => navigate('/full-screen')}
      >
        <Icons.Anchor width={14} height={14} />
        <span className="text-[13px] font-medium text-white truncate flex-1">Drama · Watch all 70 Episodes</span>
        <Icons.ArrowRight width={16} height={16} />
      </div>
    </div>
  );
};

export default VideoOverlay;
