
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/home/Sidebar';
import VideoContainer from './components/home/VideoContainer';
import CommentPanel from './components/home/CommentPanel';
import VideoControls from './components/home/VideoControls';
import { VIDEO_LIST } from './constants';
import FullScreenPage from './components/full-page/FullScreenPage';

const MainPage: React.FC = () => {
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();

  const toggleComments = () => {
    setShowComments(prev => !prev);
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, VIDEO_LIST.length - 1));
  };
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="flex h-screen w-screen bg-white text-[#161823] font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex p-4 gap-4 overflow-hidden">
        <VideoContainer
          currentIndex={currentIndex}
          onNext={handleNext}
          onPrev={handlePrev}
          onToggleComments={toggleComments}
          onOpenFullScreen={() => navigate('/full-screen')}
        />
        <div className="shrink-0 h-full overflow-hidden">
          <div
            className="w-[64px] h-full flex flex-col will-change-transform"
            style={{
              transform: `translateY(-${currentIndex * 100}%)`,
              transition: 'transform 150ms cubic-bezier(0.25, 0.25, 0, 1)'
            }}
          >
            {VIDEO_LIST.map((video, idx) => (
              <div key={video.id} className="w-[64px] h-full shrink-0 flex items-end justify-center">
                <VideoControls
                  data={video}
                  onNext={handleNext}
                  onPrev={handlePrev}
                  isFirst={idx === 0}
                  isLast={idx === VIDEO_LIST.length - 1}
                  onToggleComments={toggleComments}
                  variant="outside"
                />
              </div>
            ))}
          </div>
        </div>
        {showComments && <CommentPanel onClose={() => setShowComments(false)} />}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/full-screen" element={<FullScreenPage />} />
    </Routes>
  );
};

export default App;
