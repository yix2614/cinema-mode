import React, { useEffect, useState } from 'react';
import { Icons } from '../../constants';
import { TUXIconButton } from '@byted-tiktok/tux-web';
import { controlPadClasses, controlPadStyles } from './ControlPad.styles';

interface ControlPadProps {
  onNext?: () => void;
  onPrev?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
}

const ControlPad: React.FC<ControlPadProps> = ({ onNext, onPrev, isFirst, isLast, className = '' }) => {
  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    const update = () => setIsSmall(window.innerWidth < 840);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const btnSize = isSmall ? 28 : 32;
  const iconSize = isSmall ? 14 : 16;
  const iconColor = 'var(--tux-v2-color-ui-shape-text-1-on-primary)';
  const padY = isSmall ? 2 : 8; // px (上下)
  const padX = isSmall ? 2 : 8; // px (左右：小屏 2px，≥840 为 8px)

  return (
    <div 
      className={controlPadClasses.container(className)}
      style={controlPadStyles.container(padY, padX)}
    >
      <div className={`${controlPadClasses.button(isFirst)} tux-button-border-fix`} style={{...controlPadStyles.button(btnSize), padding: 0}}>
        <TUXIconButton 
          onClick={onPrev}
          disabled={isFirst}
          size={btnSize}
          icon={<Icons.ChevronUp width={iconSize} height={iconSize} stroke={iconColor} color={iconColor} fill="none" />}
          backgroundColor="transparent"
        />
      </div>
      <div className={`${controlPadClasses.button(isLast)} tux-button-border-fix`} style={{...controlPadStyles.button(btnSize), padding: 0}}>
        <TUXIconButton 
          onClick={onNext}
          disabled={isLast}
          size={btnSize}
          icon={<Icons.ChevronDown width={iconSize} height={iconSize} stroke={iconColor} color={iconColor} fill="none" />}
          backgroundColor="transparent"
        />
      </div>
    </div>
  );
};

export default ControlPad;
