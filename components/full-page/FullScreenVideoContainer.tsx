import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { VIDEO_LIST, Icons } from '../../constants';
import { VideoData } from '../../types';
import FullScreenVideoControls from './FullScreenVideoControls';
import FullScreenVideoOverlay from './FullScreenVideoOverlay';
import AmbientBackground from './AmbientBackground';
import ProgressBar from './ProgressBar';
import { videoContainerClasses, videoContainerStyles } from './FullScreenVideoContainer.styles';

const EASE = 'cubic-bezier(0.25,0,0.25,1)';
const ENTER_DURATION = 300;
const EXIT_DURATION = 150;

interface FullScreenVideoContainerProps {
  onToggleComments?: () => void;
  isCommentsOpen?: boolean;
  onCurrentVideoChange?: (video: VideoData, index: number) => void;
}

const FullScreenVideoContainer: React.FC<FullScreenVideoContainerProps> = ({ onToggleComments, isCommentsOpen = false, onCurrentVideoChange }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [entered, setEntered] = useState(false);
  const [isMounting, setIsMounting] = useState(true);
  const [visualReady, setVisualReady] = useState(false);
  const mainStyle = useMemo(() => videoContainerStyles.main(entered, isMounting, ENTER_DURATION, EXIT_DURATION, EASE), [entered, isMounting]);
  
  // Use array of RefObjects to maintain stable refs for AmbientBackground
  const videoRefs = useRef(VIDEO_LIST.map(() => React.createRef<HTMLVideoElement>()));
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentVideo = VIDEO_LIST[currentIndex];

  useEffect(() => {
    if (onCurrentVideoChange) onCurrentVideoChange(currentVideo, currentIndex);
  }, [currentIndex]);

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
    if (isMounting && visualReady) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEntered(true);
          setIsMounting(false);
        });
      });
    }
  }, [visualReady, isMounting]);

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
      className={videoContainerClasses.main(isControlsVisible)}
      onWheel={handleWheel}
      style={mainStyle}
    >
      <div 
        className={videoContainerClasses.wrapper(isCommentsOpen)}
      >
        <div 
          className={videoContainerClasses.scrollContainer}
          style={videoContainerStyles.scrollContainer(currentIndex, EASE)}
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
                className={videoContainerClasses.videoItem}
                style={videoContainerStyles.videoItem}
            >
              {/* 1. Ambient Background - Separated to preserve its original scaling behavior */}
              <div 
                className={videoContainerClasses.ambientWrapper}
                style={videoContainerStyles.ambientWrapper(ratio, isCommentsOpen, window.innerWidth)}
              >
                <div 
                    className={videoContainerClasses.ambientInner}
                    style={videoContainerStyles.ambientInner(ambientScale)}
                >
                    <AmbientBackground 
                      posterUrl={video.poster || ''} 
                      opacity={ambientOpacity}
                    />
                </div>
              </div>

              {/* 2. Video Wrapper - Constrained with maxWidth so it correctly shrinks without overflowing */}
              <div 
                className={videoContainerClasses.videoWrapper(isCommentsOpen)}
                style={videoContainerStyles.videoWrapper(ratio, isCommentsOpen, window.innerWidth)}
              >
                <video
                    ref={videoRefs.current[idx]}
                    src={video.url}
                    className={videoContainerClasses.video}
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
                          setVisualReady(true);
                      }
                    }}
                />
              </div>

              {/* Slide-scoped overlays: description, engagement, progress bar */}
              <div className={videoContainerClasses.overlayContainer}>
                <div className={videoContainerClasses.overlayInner}>
                  <FullScreenVideoOverlay data={video} />
                  <FullScreenVideoControls 
                    data={video}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    isFirst={idx === 0}
                    isLast={idx === VIDEO_LIST.length - 1}
                    onToggleComments={onToggleComments}
                    hideShareAndMusic={video.id === 'art-of-pictures'}
                  />
                  <div 
                    className={videoContainerClasses.progressBarWrapper}
                  >
                    <ProgressBar 
                      currentTime={idx === currentIndex ? currentTime : 0}
                      duration={idx === currentIndex ? duration : 0}
                      onSeek={handleSeek}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
          })}
        </div>

        {/* Top Controls (kept fixed) */}
        <div 
          className={videoContainerClasses.topControls(isControlsVisible)}
          style={videoContainerStyles.topControls}
        >
          <div className={videoContainerClasses.topControlsLeft}>
            <button 
              className={videoContainerClasses.iconBtn}
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
            <button className={videoContainerClasses.iconBtn}>
              <Icons.Volume width={20} height={20} />
            </button>
          </div>
          <div className={videoContainerClasses.topControlsRight}>
            <button className={videoContainerClasses.iconBtn}>
              <Icons.Maximize width={20} height={20} />
            </button>
            <button className={videoContainerClasses.iconBtn}>
              <Icons.More width={20} height={20} />
            </button>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div 
          className={videoContainerClasses.bottomGradient}
          style={videoContainerStyles.bottomGradient}
        />

        {/* Controls Layer removed: now per-slide overlays */}
      </div>
    </main>
  );
};

export default FullScreenVideoContainer;
