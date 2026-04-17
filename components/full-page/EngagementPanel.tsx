import React, { useEffect, useState } from 'react';
import { Icons } from '../../constants';
import { VideoData } from '../../types';
import { engagementPanelClasses, engagementPanelStyles } from './EngagementPanel.styles';

interface EngagementPanelProps {
  data: VideoData;
  onToggleComments?: () => void;
  className?: string;
  hideShareAndMusic?: boolean;
}

const EngagementPanel: React.FC<EngagementPanelProps> = ({ data, onToggleComments, className = '', hideShareAndMusic = false }) => {
  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    const update = () => setIsSmall(window.innerWidth < 840);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const btnSize = isSmall ? 32 : 48;
  const iconSize = isSmall ? 16 : 20;

  return (
    <div className={engagementPanelClasses.container(className)} style={engagementPanelStyles.container(isSmall)}>
      <div 
        className={engagementPanelClasses.scrollWrapper}
        onWheel={(e) => e.stopPropagation()}
      >
        <div className={engagementPanelClasses.avatarWrapper}>
          <div className={engagementPanelClasses.avatarContainer} style={engagementPanelStyles.avatarContainer(isSmall ? 32 : 48)}>
            <img src={`https://picsum.photos/seed/${data.author}/100/100`} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className={engagementPanelClasses.plusIconContainer} style={engagementPanelStyles.plusIconContainer(isSmall ? 16 : 24)}>
            <svg xmlns="http://www.w3.org/2000/svg" width={isSmall ? 10 : 14} height={isSmall ? 10 : 14} viewBox="0 0 14 14" fill="none">
              <path d="M6.02693 1.40557C5.97925 1.49915 5.97925 1.62166 5.97925 1.86669V5.97919H1.86675C1.62173 5.97919 1.49921 5.97919 1.40563 6.02687C1.32331 6.06882 1.25638 6.13575 1.21443 6.21807C1.16675 6.31165 1.16675 6.43416 1.16675 6.67919V7.32085C1.16675 7.56588 1.16675 7.68839 1.21443 7.78197C1.25638 7.8643 1.32331 7.93122 1.40563 7.97317C1.49921 8.02085 1.62173 8.02085 1.86675 8.02085H5.97925V12.1334C5.97925 12.3784 5.97925 12.5009 6.02693 12.5945C6.06888 12.6768 6.13581 12.7437 6.21813 12.7857C6.31171 12.8334 6.43423 12.8334 6.67925 12.8334H7.32091C7.56594 12.8334 7.68845 12.8334 7.78204 12.7857C7.86436 12.7437 7.93129 12.6768 7.97323 12.5945C8.02091 12.5009 8.02091 12.3784 8.02091 12.1334V8.02085H12.1334C12.3784 8.02085 12.5009 8.02085 12.5945 7.97317C12.6769 7.93122 12.7438 7.8643 12.7857 7.78197C12.8334 7.68839 12.8334 7.56588 12.8334 7.32085V6.67919C12.8334 6.43416 12.8334 6.31165 12.7857 6.21807C12.7438 6.13575 12.6769 6.06882 12.5945 6.02687C12.5009 5.97919 12.3784 5.97919 12.1334 5.97919H8.02091V1.86669C8.02091 1.62166 8.02091 1.49915 7.97323 1.40557C7.93129 1.32325 7.86436 1.25632 7.78204 1.21437C7.68845 1.16669 7.56594 1.16669 7.32091 1.16669H6.67925C6.43423 1.16669 6.31171 1.16669 6.21813 1.21437C6.13581 1.25632 6.06888 1.32325 6.02693 1.40557Z" fill="white"/>
            </svg>
          </div>
        </div>
        <ActionButton 
          icon={<Icons.Like />} 
          label={data.likes} 
          labelClassName={'mt-0'}
          labelStyle={{ lineHeight: '16px' }}
          size={btnSize}
          iconSize={iconSize}
        />
        <ActionButton 
          icon={<Icons.Comment />} 
          label={data.comments} 
          onClick={onToggleComments}
          labelClassName={'mt-0'}
          labelStyle={{ lineHeight: '16px' }}
          size={btnSize}
          iconSize={iconSize}
        />
        <ActionButton 
          icon={<Icons.Bookmark />} 
          label={data.saves} 
          labelClassName={'mt-0'}
          labelStyle={{ lineHeight: '16px' }}
          size={btnSize}
          iconSize={iconSize}
        />
        {!hideShareAndMusic && (
          <>
            <ActionButton 
              icon={<Icons.Share />} 
              label={data.shares} 
              labelClassName={'mt-0'}
              labelStyle={{ lineHeight: '16px' }}
              size={btnSize}
              iconSize={iconSize}
            />
            <div className={engagementPanelClasses.musicRecordContainer} style={engagementPanelStyles.musicRecordContainer(isSmall ? 32 : 48)}>
                <img src={`https://picsum.photos/seed/${data.id}-music/48/48`} alt="Music" className="w-full h-full object-cover" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
  size?: number;
  iconSize?: number;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onClick, labelClassName, labelStyle, size = 48, iconSize = 20 }) => (
  <div className={engagementPanelClasses.actionButton.wrapper}>
    <button 
      onClick={onClick}
      className={engagementPanelClasses.actionButton.button}
      style={engagementPanelStyles.actionButton.button(size)}
    >
      <div className={engagementPanelClasses.actionButton.iconWrapper} style={engagementPanelStyles.actionButton.iconWrapper(iconSize)}>
        {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { width: iconSize, height: iconSize }) : icon}
      </div>
    </button>
    <span className={engagementPanelClasses.actionButton.label(labelClassName)} style={labelStyle}>
      {label}
    </span>
  </div>
);

export default EngagementPanel;
