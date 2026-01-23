
import React from 'react';
import { Icons } from '../constants';
import { VideoData } from '../types';

interface VideoControlsProps {
  data: VideoData;
  onNext?: () => void;
  onPrev?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  onToggleComments?: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({ 
  data, onNext, onPrev, isFirst, isLast, onToggleComments 
}) => {
  return (
    <div className="absolute right-4 bottom-8 flex flex-col items-center">
      <div className="flex flex-col gap-2 items-center bg-white/10 backdrop-blur-md w-[48px] py-2 rounded-full mb-6">
        <button 
          onClick={onPrev}
          disabled={isFirst}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-all text-white ${isFirst ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20 active:scale-90'}`}
        >
          <Icons.ChevronUp width={20} height={20} />
        </button>
        <button 
          onClick={onNext}
          disabled={isLast}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-all text-white ${isLast ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20 active:scale-90'}`}
        >
          <Icons.ChevronDown width={20} height={20} />
        </button>
      </div>

      <div className="mb-2 flex flex-col items-center self-stretch">
        <div className="w-[48px] h-[48px] rounded-full border-2 border-white overflow-hidden bg-gray-200 shadow-lg cursor-pointer relative z-0">
          <img src={`https://picsum.photos/seed/${data.author}/100/100`} alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="w-6 h-6 bg-[#FE2C55] rounded-full flex items-center justify-center text-white font-bold text-[16px] shadow-sm cursor-pointer hover:scale-110 transition-transform z-10 relative mt-[-12px]">
          +
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 w-full">
        <ActionButton icon={<Icons.Like />} label={data.likes} />
        <ActionButton 
          icon={<Icons.Comment />} 
          label={data.comments} 
          onClick={onToggleComments}
        />
        <ActionButton icon={<Icons.Bookmark />} label={data.saves} />
        <ActionButton icon={<Icons.Share />} label={data.shares} />
      </div>

      <div className="w-[48px] h-[48px] rounded-full bg-black/40 border-2 border-white/50 overflow-hidden animate-spin-slow mt-2 shadow-lg cursor-pointer">
        <img src={`https://picsum.photos/seed/${data.id}-music/48/48`} alt="Music" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onClick }) => (
  <div className="flex flex-col items-center gap-1 self-stretch">
    <button 
      onClick={onClick}
      className="flex h-[48px] px-[14px] py-[8px] justify-center items-center rounded-full transition-all duration-200 active:scale-90 hover:brightness-125"
      style={{
        borderRadius: '999px',
        background: 'rgba(255, 255, 255, 0.13)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)'
      }}
    >
      <div className="w-[20px] h-[20px] flex items-center justify-center text-white fill-current">
        {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { width: 20, height: 20 }) : icon}
      </div>
    </button>
    <span className="text-[12px] font-bold text-white mt-[2px] drop-shadow-md select-none">
      {label}
    </span>
  </div>
);

export default VideoControls;
