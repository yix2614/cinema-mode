
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import VideoContainer from './components/VideoContainer';
import CommentPanel from './components/CommentPanel';

const App: React.FC = () => {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(prev => !prev);
  };

  return (
    <div className="flex h-screen w-screen bg-white text-[#161823] font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex p-4 gap-4 overflow-hidden">
        <VideoContainer onToggleComments={toggleComments} />
        {showComments && <CommentPanel onClose={() => setShowComments(false)} />}
      </div>
    </div>
  );
};

export default App;
