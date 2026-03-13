
import React from 'react';
import { Icons } from '../../constants';
import { VideoData } from '../../types';

interface VideoControlsProps {
  data: VideoData;
  onNext?: () => void;
  onPrev?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  onToggleComments?: () => void;
  variant?: 'inside' | 'outside';
}

const VideoControls: React.FC<VideoControlsProps> = ({ 
  data, onNext, onPrev, isFirst, isLast, onToggleComments, variant = 'inside' 
}) => {
  return (
    <div className={
      variant === 'inside'
        ? 'absolute right-4 bottom-8 flex flex-col items-center'
        : 'flex flex-col items-center w-[64px] h-full justify-end pb-4'
    }>
      <div className="flex flex-col gap-2 items-center bg-white/10 backdrop-blur-md w-[48px] py-2 rounded-full mb-6">
        <button 
          onClick={onPrev}
          disabled={isFirst}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${
            variant === 'outside' ? 'text-black bg-[rgba(0,0,0,0.05)]' : 'text-white'
          } ${isFirst ? 'opacity-30 cursor-not-allowed' : variant === 'outside' ? 'hover:bg-[rgba(0,0,0,0.08)] active:scale-90' : 'hover:bg-white/20 active:scale-90'}`}
        >
          <Icons.ChevronUp width={20} height={20} />
        </button>
        <button 
          onClick={onNext}
          disabled={isLast}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${
            variant === 'outside' ? 'text-black bg-[rgba(0,0,0,0.05)]' : 'text-white'
          } ${isLast ? 'opacity-30 cursor-not-allowed' : variant === 'outside' ? 'hover:bg-[rgba(0,0,0,0.08)] active:scale-90' : 'hover:bg-white/20 active:scale-90'}`}
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
        <ActionButton icon={<Icons.Like />} label={data.likes} variant={variant} />
        <ActionButton 
          icon={<Icons.Comment />} 
          label={data.comments} 
          onClick={onToggleComments}
          variant={variant}
        />
        <ActionButton icon={<Icons.Bookmark />} label={data.saves} variant={variant} />
        <ActionButton icon={<Icons.Share />} label={data.shares} variant={variant} />
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

const ActionButton: React.FC<ActionButtonProps & { variant?: 'inside' | 'outside' }> = ({ icon, label, onClick, variant = 'inside' }) => (
  <div className="flex flex-col items-center gap-1 self-stretch">
    <button 
      onClick={onClick}
      className={`flex h-[48px] px-[14px] py-[8px] justify-center items-center rounded-full transition-all duration-200 active:scale-90 ${
        variant === 'outside' ? 'bg-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.08)]' : 'hover:brightness-125'
      }`}
      style={variant === 'outside' ? undefined : {
        borderRadius: '999px',
        background: 'rgba(255, 255, 255, 0.13)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)'
      }}
    >
      <div className={`w-[20px] h-[20px] flex items-center justify-center ${variant === 'outside' ? 'text-black' : 'text-white'} fill-current`}>
        {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { width: 20, height: 20 }) : icon}
      </div>
    </button>
    <span className={`text-[12px] font-bold ${variant === 'outside' ? 'text-black' : 'text-white'} mt-[2px] select-none`}>
      {label}
    </span>
  </div>
);

export default VideoControls;
