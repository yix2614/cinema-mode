
import React, { useRef, useEffect, useState } from 'react';
import { VIDEO_LIST, Icons } from '../constants';
import VideoControls from './VideoControls';
import VideoOverlay from './VideoOverlay';

interface VideoContainerProps {
  onToggleComments: () => void;
}

const VideoContainer: React.FC<VideoContainerProps> = ({ onToggleComments }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentVideo = VIDEO_LIST[currentIndex];

  useEffect(() => {
    // Synchronize video playback: only play the current one, pause others.
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.muted = true;
          video.currentTime = 0;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < VIDEO_LIST.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollTimeoutRef.current) return;

    if (e.deltaY > 50) {
      handleNext();
      scrollTimeoutRef.current = setTimeout(() => {
        scrollTimeoutRef.current = null;
      }, 500); // Debounce to prevent rapid skipping
    } else if (e.deltaY < -50) {
      handlePrev();
      scrollTimeoutRef.current = setTimeout(() => {
        scrollTimeoutRef.current = null;
      }, 500);
    }
  };

  return (
    <main 
      className="flex-1 h-full relative bg-white overflow-hidden flex items-center justify-center transition-[flex-basis,width,flex] duration-[400ms] ease-[cubic-bezier(0.25,0.25,0,1)]"
      onWheel={handleWheel}
    >
      <div className="w-full h-full relative rounded-[20px] overflow-hidden bg-black group shadow-sm">
        
        {/* Animated Video Track: Only the videos slide */}
        <div 
          className="w-full h-full flex flex-col will-change-transform"
          style={{ 
            transform: `translateY(-${currentIndex * 100}%)`,
            transition: 'transform 150ms cubic-bezier(0.25, 0.25, 0, 1)'
          }}
        >
          {VIDEO_LIST.map((video, idx) => (
            <div key={video.id} className="w-full h-full shrink-0 bg-black flex items-center justify-center overflow-hidden">
              <video
                ref={el => { videoRefs.current[idx] = el; }}
                src={video.url}
                className="w-full h-full object-contain"
                loop
                muted
                playsInline
                preload="auto"
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          ))}
        </div>

        {/* Fixed Overlays & UI: These do NOT slide */}
        {/* Top Hover Overlay */}
        <div 
          className="absolute top-0 left-0 right-0 h-[84px] px-6 flex items-center justify-between z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%)'
          }}
        >
          <div className="pointer-events-auto">
            <button className="w-[44px] h-[44px] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 active:scale-95 transition-all">
              <Icons.Volume width={20} height={20} />
            </button>
          </div>
          <div className="flex items-center gap-3 pointer-events-auto">
            <button className="w-[44px] h-[44px] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 active:scale-95 transition-all">
              <Icons.Maximize width={20} height={20} />
            </button>
            <button className="w-[44px] h-[44px] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 active:scale-95 transition-all">
              <Icons.More width={20} height={20} />
            </button>
          </div>
        </div>

        {/* Bottom fixed gradient */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[108px] pointer-events-none z-10"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%)'
          }}
        />

        {/* Fixed UI Components (Controls and Info) */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="w-full h-full relative pointer-events-auto">
            <VideoOverlay data={currentVideo} />
            <VideoControls 
              data={currentVideo} 
              onNext={handleNext} 
              onPrev={handlePrev} 
              isFirst={currentIndex === 0}
              isLast={currentIndex === VIDEO_LIST.length - 1}
              onToggleComments={onToggleComments}
            />
          </div>
        </div>

        {/* Progress bar fixed at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-white/20 z-30 cursor-pointer">
          <div className="h-full bg-[#FE2C55] w-1/3 shadow-[0_0_8px_rgba(254,44,85,0.6)]"></div>
        </div>
      </div>
    </main>
  );
};

export default VideoContainer;
