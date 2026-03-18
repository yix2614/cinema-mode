import React from 'react';

export const engagementPanelClasses = {
  container: (className: string) => `flex flex-col items-center justify-end ${className}`,
  scrollWrapper: "flex flex-col items-center gap-2 w-full overflow-y-auto no-scrollbar mt-auto max-h-full",
  avatarWrapper: "flex flex-col items-center self-stretch",
  avatarContainer: "rounded-full border-2 border-white overflow-hidden bg-gray-200 shadow-lg cursor-pointer relative z-0",
  plusIconContainer: "bg-[#FE2C55] rounded-full flex items-center justify-center text-white shadow-sm cursor-pointer hover:scale-110 transition-transform z-10 relative mt-[-12px]",
  musicRecordContainer: "rounded-full bg-black/40 border-2 border-white/50 overflow-hidden animate-spin-slow shadow-lg cursor-pointer shrink-0",
  actionButton: {
    wrapper: "flex flex-col items-center gap-1 self-stretch shrink-0",
    button: "flex justify-center items-center rounded-full transition-all duration-200 active:scale-90 hover:brightness-125 isolate overflow-hidden",
    iconWrapper: "flex items-center justify-center text-white fill-current",
    label: (className?: string) => `text-[12px] font-bold text-white drop-shadow-md select-none ${className ?? 'mt-[2px]'}`
  }
};

export const engagementPanelStyles = {
  container: (isSmall: boolean): React.CSSProperties => ({
    height: isSmall ? 320 : 420
  }),
  avatarContainer: (size: number): React.CSSProperties => ({
    width: size,
    height: size
  }),
  plusIconContainer: (size: number): React.CSSProperties => ({
    width: size,
    height: size
  }),
  musicRecordContainer: (size: number): React.CSSProperties => ({
    width: size,
    height: size
  }),
  actionButton: {
    button: (size: number): React.CSSProperties => ({
      width: size,
      height: size,
      borderRadius: '999px',
      background: 'rgba(255, 255, 255, 0.13)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden'
    }),
    iconWrapper: (size: number): React.CSSProperties => ({
      width: size,
      height: size
    })
  }
};
