import React from 'react';

export const controlPadClasses = {
  container: (className: string) => `flex flex-col gap-2 items-center bg-white/10 backdrop-blur w-auto rounded-full isolate overflow-hidden ${className}`,
  button: (isDisabled?: boolean) => `w-8 h-8 flex items-center justify-center rounded-full transition-all text-white ${isDisabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20 active:scale-90'}`
};

export const controlPadStyles = {
  container: (padY: number, padX: number): React.CSSProperties => ({
    paddingTop: padY,
    paddingBottom: padY,
    paddingLeft: padX,
    paddingRight: padX,
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden'
  }),
  button: (btnSize: number): React.CSSProperties => ({
    width: btnSize,
    height: btnSize
  }),
  icon: (iconSize: number): React.CSSProperties => ({
    width: iconSize,
    height: iconSize
  })
};
