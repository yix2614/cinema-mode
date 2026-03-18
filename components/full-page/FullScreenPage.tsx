import React, { useState, useEffect } from 'react';
import FullScreenCommentPanel from './FullScreenCommentPanel';
import FullScreenVideoContainer from './FullScreenVideoContainer';
import { VIDEO_LIST } from '../../constants';
import { VideoData } from '../../types';

interface LayoutConfig {
  margin: number;
  gap: number;
  panelWidth: number;
}

const FullScreenPage: React.FC = () => {
  const [showComments, setShowComments] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<VideoData | undefined>(VIDEO_LIST[0]);
  const [layout, setLayout] = useState<LayoutConfig>({
    margin: 16,
    gap: 16,
    panelWidth: 352
  });

  useEffect(() => {
    const calculateLayout = () => {
      const width = window.innerWidth;
      let margin = 16;
      let gap = 16;
      let cols = 24;
      let panelCols = 6;

      if (width > 1600) {
        // Ultra-Wide
        cols = 24;
        gap = 16;
        margin = 16;
        panelCols = 6;
      } else if (width >= 1201) {
        // Wide
        cols = 20;
        gap = 16;
        margin = 16;
        panelCols = 6;
      } else if (width >= 840) {
        // Standard
        cols = 12;
        gap = 8;
        margin = 16; // Margin is 16px for 840 <= width < 1201
        panelCols = 4;
      } else {
        // Small-Medium (and below)
        cols = 12;
        gap = 8;
        margin = 8; // Margin is 8px for width < 840
        panelCols = 4;
      }

      // Calculate panel width
      const availableWidth = width - (2 * margin);
      const totalGapWidth = (cols - 1) * gap;
      const colWidth = (availableWidth - totalGapWidth) / cols;
      const panelWidth = Math.max((colWidth * panelCols) + ((panelCols - 1) * gap), 288);

      setLayout({ margin, gap, panelWidth });
    };

    calculateLayout();
    window.addEventListener('resize', calculateLayout);
    return () => window.removeEventListener('resize', calculateLayout);
  }, []);

  const toggleComments = () => {
    // If opening, set state directly
    if (!showComments) {
        setShowComments(true);
        return;
    } 
    
    // If closing, trigger closing animation
    setIsClosing(true);
  };

  const [isClosing, setIsClosing] = useState(false);

  return (
    <div 
      className="w-screen h-screen bg-black flex overflow-hidden box-border transition-all duration-300"
      style={{
        paddingLeft: 0,
        paddingRight: 0,
        gap: showComments ? layout.gap : 0,
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      <FullScreenVideoContainer 
        onToggleComments={toggleComments} 
        isCommentsOpen={showComments}
        onCurrentVideoChange={(video) => setCurrentVideo(video)}
      />
      {showComments && (
        <div 
          className="relative z-10 shrink-0"
          style={{ 
            paddingTop: window.innerWidth >= 1201 ? layout.margin : 8,
            paddingRight: window.innerWidth >= 1201 ? layout.margin : 8,
            paddingBottom: window.innerWidth >= 1201 ? layout.margin : 8
          }}
        >
          <FullScreenCommentPanel 
            onClose={() => setShowComments(false)} 
            width={layout.panelWidth}
            isClosing={isClosing}
            video={currentVideo}
            onCloseAnimationComplete={() => {
                setShowComments(false);
                setIsClosing(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default FullScreenPage;
