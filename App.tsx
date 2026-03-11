
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import VideoContainer from './components/VideoContainer';
import CommentPanel from './components/CommentPanel';
import FullScreenPage from './components/FullScreenPage';

const MainPage: React.FC = () => {
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();

  const toggleComments = () => {
    setShowComments(prev => !prev);
  };

  return (
    <div className="flex h-screen w-screen bg-white text-[#161823] font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex p-4 gap-4 overflow-hidden">
        <VideoContainer
          onToggleComments={toggleComments}
          onOpenFullScreen={() => navigate('/full-screen')}
        />
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
