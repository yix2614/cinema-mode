import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { VIDEO_LIST, Icons } from '../../constants';
import FullScreenVideoControls from './FullScreenVideoControls';
import FullScreenVideoOverlay from './FullScreenVideoOverlay';
import AmbientBackground from './AmbientBackground';
import ProgressBar from './ProgressBar';
const EASE = 'cubic-bezier(0.25,0,0.25,1)';
const ENTER_DURATION = 300;
const EXIT_DURATION = 150;

interface FullScreenVideoContainerProps {
  onToggleComments?: () => void;
  isCommentsOpen?: boolean;
}

const FullScreenVideoContainer: React.FC<FullScreenVideoContainerProps> = ({ onToggleComments, isCommentsOpen = false }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [entered, setEntered] = useState(false);
  const [isMounting, setIsMounting] = useState(true);
  const mainStyle = useMemo(() => ({
    zIndex: 0,
    transform: entered ? 'scale(1)' : (isMounting ? 'scale(1.05)' : 'scale(1.02)'),
    opacity: entered ? 1 : 0,
    transition: `transform ${entered ? ENTER_DURATION : EXIT_DURATION}ms ${EASE}, opacity ${entered ? ENTER_DURATION : EXIT_DURATION}ms ${EASE}`,
    willChange: 'transform, opacity'
  }), [entered, isMounting]);
  
  // Use array of RefObjects to maintain stable refs for AmbientBackground
  const videoRefs = useRef(VIDEO_LIST.map(() => React.createRef<HTMLVideoElement>()));
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentVideo = VIDEO_LIST[currentIndex];

  const [aspectRatios, setAspectRatios] = useState<Record<number, number>>({});

  useEffect(() => {
    videoRefs.current.forEach((ref, index) => {
      const video = ref.current;
      if (video) {
        if (index === currentIndex) {
          video.muted = true;
          video.currentTime = 0;
          // Reset progress bar state when video changes
          setCurrentTime(0);
          setDuration(video.duration || 0);
          
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

  const handleSeek = (time: number) => {
    const video = videoRefs.current[currentIndex].current;
    if (video) {
      video.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollTimeoutRef.current) return;

    if (e.deltaY > 50) {
      handleNext();
      scrollTimeoutRef.current = setTimeout(() => {
        scrollTimeoutRef.current = null;
      }, 500);
    } else if (e.deltaY < -50) {
      handlePrev();
      scrollTimeoutRef.current = setTimeout(() => {
        scrollTimeoutRef.current = null;
      }, 500);
    }
  };

  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetControlsTimeout = () => {
    setIsControlsVisible(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setIsControlsVisible(false);
    }, 3000);
  };

  useEffect(() => {
    const handleMouseMove = () => {
      resetControlsTimeout();
    };

    window.addEventListener('mousemove', handleMouseMove);
    resetControlsTimeout(); // Initialize timer

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Optimize aspect ratio calculation with useMemo if possible, but it depends on state.
  // Instead, prevent frequent updates by checking value.
  const updateAspectRatio = (idx: number, width: number, height: number) => {
      if (!width || !height) return;
      const ratio = width / height;
      setAspectRatios(prev => {
          // Use a small epsilon for float comparison
          if (prev[idx] && Math.abs(prev[idx] - ratio) < 0.001) return prev;
          return {...prev, [idx]: ratio};
      });
  };

  return (
    <main 
      className={`flex-1 h-full relative bg-black flex items-center justify-center ${!isControlsVisible ? 'cursor-none' : ''}`}
      onWheel={handleWheel}
      style={mainStyle}
    >
      <div 
        className="w-full h-full relative overflow-visible bg-black group transition-all duration-400 ease-[cubic-bezier(0.25,0.25,0,1)]"
      >
        <div 
          className="w-full h-full flex flex-col will-change-transform"
          style={{ 
            transform: `translateY(-${currentIndex * 100}%)`,
            transition: `transform 150ms ${EASE}`
          }}
        >
          {VIDEO_LIST.map((video, idx) => {
             // Calculate scale logic outside JSX for cleaner render
             const ratio = aspectRatios[idx];
             const isLandscape = ratio && ratio > 1;
             const isAlmostSquareLandscape = isLandscape && ratio < 1.1;
             
             // Optimized transform style
             const ambientScale = isAlmostSquareLandscape ? 'scale(1.05)' : 'scale(1.15)';
             const ambientOpacity = isLandscape ? 0.3 : 0.4;

             return (
            <div 
                key={video.id} 
                className="w-full h-full shrink-0 bg-transparent flex items-center justify-center relative"
                style={{ clipPath: 'inset(0 -100vw 0 -100vw)' }} // Clip vertically (0), allow horizontal overflow (-100vw)
            >
              {/* Aspect Ratio Wrapper */}
              <div 
                className={`relative flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.25,0.25,0,1)] ${isCommentsOpen ? 'rounded-[12px]' : ''}`}
                style={{
                  aspectRatio: ratio ? ratio : 'auto',
                  width: ratio ? (ratio > 1 ? '100%' : 'auto') : '100%',
                  height: ratio ? (ratio > 1 ? 'auto' : '100%') : '100%',
                  maxHeight: isCommentsOpen 
                    ? (window.innerWidth >= 1201 ? 'calc(100% - 32px)' : 'calc(100% - 16px)')
                    : '100%',
                  margin: isCommentsOpen ? 'auto 0 auto 16px' : 'auto', // Add left gap when comments are open, 16px default
                  marginLeft: isCommentsOpen 
                    ? (window.innerWidth >= 1201 ? '16px' : '8px') // 16px gap for wide, 8px for small
                    : 'auto',
                  overflow: 'visible', // Allow ambient to spill out of this wrapper specifically
                }}
              >
                {/* Ambient Background - render BEHIND the video but inside this wrapper */}
                <div className="absolute inset-0 flex items-center justify-center -z-10">
                    <div 
                        className="w-full h-full relative"
                        style={{ 
                          transform: ambientScale
                        }}
                    >
                        <AmbientBackground 
                          posterUrl={video.poster || ''} 
                          opacity={ambientOpacity}
                        />
                    </div>
                </div>
                
                <div 
                  className={`relative w-full h-full overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.25,0.25,0,1)] ${isCommentsOpen ? 'rounded-[12px]' : ''}`}
                  style={{
                      transform: 'translateZ(0)', // Force GPU layer
                  }}
                >
                  <video
                      ref={videoRefs.current[idx]}
                      src={video.url}
                      className="w-full h-full object-contain relative z-10"
                      loop
                      muted
                      playsInline
                      preload="auto"
                      onContextMenu={(e) => e.preventDefault()}
                      onTimeUpdate={(e) => {
                      if (idx === currentIndex) {
                          setCurrentTime(e.currentTarget.currentTime);
                      }
                      }}
                      onLoadedMetadata={(e) => {
                        updateAspectRatio(idx, e.currentTarget.videoWidth, e.currentTarget.videoHeight);
                        if (idx === currentIndex) {
                            setDuration(e.currentTarget.duration);
                        }
                      }}
                  />
                </div>
              </div>
            </div>
          );
          })}
        </div>

        {/* Top Controls */}
        <div 
          className={`absolute top-0 left-0 right-0 h-[84px] px-6 flex items-center justify-between z-40 transition-opacity duration-300 pointer-events-none ${isControlsVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%)'
          }}
        >
          <div className="pointer-events-auto flex items-center gap-3">
            <button 
              className="w-[44px] h-[44px] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 active:scale-95 transition-all"
              onClick={() => {
                setIsMounting(false);
                setEntered(false);
                requestAnimationFrame(() => {
                  setTimeout(() => navigate('/'), EXIT_DURATION);
                });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.3616 2.95071C12.5243 2.78799 12.7887 2.78799 12.9515 2.95071L13.7171 3.71634C13.8798 3.87906 13.8798 4.14346 13.7171 4.30618L8.02274 10.0005L13.7171 15.6949C13.8797 15.8576 13.8798 16.121 13.7171 16.2837L12.9515 17.0493C12.7887 17.2121 12.5243 17.2121 12.3616 17.0493L5.60673 10.2945C5.44428 10.1318 5.44421 9.86825 5.60673 9.7056L12.3616 2.95071Z" fill="#F6F6F6"/>
              </svg>
            </button>
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

        {/* Bottom Gradient */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[108px] pointer-events-none z-10"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%)'
          }}
        />

        {/* Controls Layer */}
        <div className={`absolute inset-0 pointer-events-none z-20`}>
          <div className="w-full h-full relative pointer-events-auto">
            <FullScreenVideoOverlay 
                data={currentVideo} 
                // Removed opacity toggle for clean mode as requested
            />
            <FullScreenVideoControls 
              data={currentVideo} 
              onNext={handleNext} 
              onPrev={handlePrev} 
              isFirst={currentIndex === 0}
              isLast={currentIndex === VIDEO_LIST.length - 1}
              onToggleComments={onToggleComments}
              // Removed opacity toggle for clean mode as requested
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div 
            className={`absolute left-[20px] right-[20px] bottom-[16px] z-30 pointer-events-auto`}
        >
          <ProgressBar 
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
            // Removed opacity toggle for clean mode as requested
          />
        </div>
      </div>
    </main>
  );
};

export default FullScreenVideoContainer;
