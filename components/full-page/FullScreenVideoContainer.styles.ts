import React from 'react';

export const videoContainerClasses = {
  main: (isControlsVisible: boolean) => `flex-1 min-w-0 h-full relative bg-black flex items-center justify-center ${!isControlsVisible ? 'cursor-none' : ''}`,
  wrapper: (isCommentsOpen: boolean) => `w-full h-full relative bg-black group transition-all duration-400 ease-[cubic-bezier(0.25,0.25,0,1)] ${isCommentsOpen ? 'overflow-hidden' : 'overflow-visible'}`,
  scrollContainer: "w-full h-full flex flex-col will-change-transform",
  videoItem: "w-full h-full shrink-0 bg-transparent flex items-center justify-center relative",
  ambientWrapper: "absolute flex items-center justify-center pointer-events-none -z-10",
  ambientInner: "w-full h-full relative",
  videoWrapper: (isCommentsOpen: boolean) => `relative flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.25,0.25,0,1)] ${isCommentsOpen ? 'rounded-[12px] overflow-hidden' : ''}`,
  video: "w-full h-full object-contain relative z-10",
  overlayContainer: "absolute inset-0 pointer-events-none z-20",
  overlayInner: "w-full h-full relative pointer-events-auto",
  progressBarWrapper: "absolute left-[20px] right-[20px] bottom-[16px] z-30 pointer-events-auto",
  topControls: (isControlsVisible: boolean) => `absolute top-0 left-0 right-0 h-[84px] px-6 flex items-center justify-between z-40 transition-opacity duration-300 pointer-events-none ${isControlsVisible ? 'opacity-100' : 'opacity-0'}`,
  topControlsLeft: "pointer-events-auto flex items-center gap-3",
  topControlsRight: "flex items-center gap-3 pointer-events-auto",
  iconBtn: "w-[44px] h-[44px] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 active:scale-95 transition-all isolate overflow-hidden",
  bottomGradient: "absolute bottom-0 left-0 right-0 h-[108px] pointer-events-none z-10"
};

export const videoContainerStyles = {
  main: (entered: boolean, isMounting: boolean, enterDuration: number, exitDuration: number, ease: string): React.CSSProperties => ({
    zIndex: 0,
    transform: entered ? 'scale(1)' : (isMounting ? 'scale(1.05)' : 'scale(1.02)'),
    opacity: entered ? 1 : 0,
    transition: `transform ${entered ? enterDuration : exitDuration}ms ${ease}, opacity ${entered ? enterDuration : exitDuration}ms ${ease}`,
    willChange: 'transform, opacity'
  }),
  scrollContainer: (currentIndex: number, ease: string): React.CSSProperties => ({
    transform: `translateY(-${currentIndex * 100}%)`,
    transition: `transform 200ms ${ease}`
  }),
  videoItem: { clipPath: 'inset(0 -100vw 0 -100vw)' },
  ambientWrapper: (ratio: number, isCommentsOpen: boolean, innerWidth: number): React.CSSProperties => ({
    aspectRatio: ratio ? ratio : 'auto',
    width: ratio ? (ratio > 1 ? '100%' : 'auto') : '100%',
    height: ratio ? (ratio > 1 ? 'auto' : '100%') : '100%',
    maxWidth: isCommentsOpen 
      ? (innerWidth >= 1201 ? 'calc(100% - 32px)' : 'calc(100% - 16px)')
      : '100%',
    maxHeight: isCommentsOpen 
      ? (innerWidth >= 1201 ? 'calc(100% - 32px)' : 'calc(100% - 16px)')
      : '100%',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: isCommentsOpen ? '0' : 'auto',
    marginLeft: isCommentsOpen 
      ? (innerWidth >= 1201 ? '16px' : '8px') 
      : 'auto',
  }),
  ambientInner: (ambientScale: string): React.CSSProperties => ({ transform: ambientScale }),
  videoWrapper: (ratio: number, isCommentsOpen: boolean, innerWidth: number): React.CSSProperties => ({
    aspectRatio: ratio ? ratio : 'auto',
    width: ratio ? (ratio > 1 ? '100%' : 'auto') : '100%',
    height: ratio ? (ratio > 1 ? 'auto' : '100%') : '100%',
    maxWidth: isCommentsOpen 
      ? (innerWidth >= 1201 ? 'calc(100% - 32px)' : 'calc(100% - 16px)')
      : '100%',
    maxHeight: isCommentsOpen 
      ? (innerWidth >= 1201 ? 'calc(100% - 32px)' : 'calc(100% - 16px)')
      : '100%',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: isCommentsOpen ? '0' : 'auto',
    marginLeft: isCommentsOpen 
      ? (innerWidth >= 1201 ? '16px' : '8px') 
      : 'auto',
    transform: 'translateZ(0)',
  }),
  topControls: {
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%)'
  },
  bottomGradient: {
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%)'
  }
};
