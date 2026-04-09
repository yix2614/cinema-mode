import React from 'react';

export const controlPadClasses = {
  container: (className: string) => `flex flex-col gap-2 items-center bg-white/10 backdrop-blur w-auto rounded-full isolate overflow-hidden ${className}`,
  button: (isEdge: boolean) => `
    flex justify-center items-center rounded-full
    transition-all duration-200 isolate overflow-hidden relative tux-button-border-fix
    ${isEdge ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer active:scale-90 bg-white/20 backdrop-blur-md hover:bg-white/30'}
  `,
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
