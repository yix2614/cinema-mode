import React, { useEffect, useState } from 'react';
import { Icons } from '../../constants';
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
  const padY = isSmall ? 2 : 8; // px (上下)
  const padX = isSmall ? 2 : 8; // px (左右：小屏 2px，≥840 为 8px)

  return (
    <div 
      className={controlPadClasses.container(className)}
      style={controlPadStyles.container(padY, padX)}
    >
      <button 
        onClick={onPrev}
        disabled={isFirst}
        className={controlPadClasses.button(isFirst)}
        style={controlPadStyles.button(btnSize)}
      >
        <Icons.ChevronUp width={iconSize} height={iconSize} style={controlPadStyles.icon(iconSize)} />
      </button>
      <button 
        onClick={onNext}
        disabled={isLast}
        className={controlPadClasses.button(isLast)}
        style={controlPadStyles.button(btnSize)}
      >
        <Icons.ChevronDown width={iconSize} height={iconSize} style={controlPadStyles.icon(iconSize)} />
      </button>
    </div>
  );
};

export default ControlPad;
