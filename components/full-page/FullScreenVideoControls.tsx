import React from 'react';
import { VideoData } from '../../types';
import ControlPad from './ControlPad';
import EngagementPanel from './EngagementPanel';

interface FullScreenVideoControlsProps { 
  data: VideoData; 
  onNext?: () => void; 
  onPrev?: () => void; 
  isFirst?: boolean; 
  isLast?: boolean; 
  onToggleComments?: () => void; 
  className?: string; 
  hideShareAndMusic?: boolean;
}

const FullScreenVideoControls: React.FC<FullScreenVideoControlsProps> = ({ 
  data, onNext, onPrev, isFirst, isLast, onToggleComments, className = '', hideShareAndMusic = false 
}) => {
  return (
    <div className={`absolute right-5 bottom-[36px] flex flex-col items-center gap-4 ${className}`}>
      <ControlPad onNext={onNext} onPrev={onPrev} isFirst={isFirst} isLast={isLast} />
      <EngagementPanel data={data} onToggleComments={onToggleComments} hideShareAndMusic={hideShareAndMusic} />
    </div>
  );
};

export default FullScreenVideoControls;
