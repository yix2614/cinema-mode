import React, { useState, useEffect } from 'react';
import FullScreenCommentPanel from './FullScreenCommentPanel';
import FullScreenVideoContainer from './FullScreenVideoContainer';

interface LayoutConfig {
  margin: number;
  gap: number;
  panelWidth: number;
}

const FullScreenPage: React.FC = () => {
  const [showComments, setShowComments] = useState(false);
  const [layout, setLayout] = useState<LayoutConfig>({
    margin: 16,
    gap: 16,
    panelWidth: 352
  });

  useEffect(() => {
    const calculateLayout = () => {
      // Enforce minimum width of 600px for layout calculations
      const width = Math.max(window.innerWidth, 600);
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
        margin = 8;
        panelCols = 4;
      } else {
        // Small-Medium (and below)
        cols = 12;
        gap = 8;
        margin = 8;
        panelCols = 4;
      }

      // Calculate panel width
      const availableWidth = width;
      const totalGapWidth = (cols - 1) * gap;
      const colWidth = (availableWidth - totalGapWidth) / cols;
      const panelWidth = (colWidth * panelCols) + ((panelCols - 1) * gap);

      setLayout({ margin, gap, panelWidth });
    };

    calculateLayout();
    window.addEventListener('resize', calculateLayout);
    return () => window.removeEventListener('resize', calculateLayout);
  }, []);

  const toggleComments = () => {
    setShowComments(prev => !prev);
  };

  return (
    <div 
      className="w-screen h-screen bg-black flex overflow-hidden box-border transition-all duration-300"
      style={{
        paddingLeft: 0,
        paddingRight: 0,
        gap: showComments ? layout.gap : 0,
        paddingTop: 0,
        paddingBottom: 0,
        minWidth: '600px', // Enforce minimum width visually
        overflowX: 'auto', // Allow scrolling if window is smaller than 600px
      }}
    >
      <FullScreenVideoContainer 
        onToggleComments={toggleComments} 
        isCommentsOpen={showComments}
      />
      {showComments && (
        <div 
          className="relative z-10 shrink-0" // Add shrink-0 to prevent compression
          style={{ 
            paddingTop: layout.margin,
            paddingRight: layout.margin,
            paddingBottom: layout.margin
          }}
        >
          <FullScreenCommentPanel 
            onClose={() => setShowComments(false)} 
            width={layout.panelWidth}
          />
        </div>
      )}
    </div>
  );
};

export default FullScreenPage;
