import React, { useEffect, useState } from 'react';
import { Icons } from '../../constants';
import { VideoData } from '../../types';
import { videoOverlayClasses, videoOverlayStyles } from './FullScreenVideoOverlay.styles';

interface FullScreenVideoOverlayProps {
  data: VideoData;
  className?: string;
}

const FullScreenVideoOverlay: React.FC<FullScreenVideoOverlayProps> = ({ data, className = '' }) => {
  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    const update = () => setIsSmall(window.innerWidth < 840);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className={videoOverlayClasses.container(className)}>
      <div className={videoOverlayClasses.inner} style={videoOverlayStyles.inner(isSmall)}>
        <div className={videoOverlayClasses.header}>
          <h3 className={videoOverlayClasses.author}>
            {data.author}
          </h3>
          <span className={videoOverlayClasses.time}>• {data.timeAgo}</span>
        </div>
        <div className={videoOverlayClasses.descriptionWrapper}>
          <p className={videoOverlayClasses.description}>
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FullScreenVideoOverlay;
