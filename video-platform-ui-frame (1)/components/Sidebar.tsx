
import React from 'react';
import { Icons } from '../constants';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-[72px] h-full flex flex-col bg-white shrink-0 relative">
      {/* Logo 定位: 距离左边 14px, 上面 22px */}
      <div className="absolute top-[22px] left-[14px] cursor-pointer hover:opacity-80 transition-opacity z-10">
        <Icons.TikTok />
      </div>

      {/* 导航区域：作为一个整体永远在屏幕垂直居中 */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <nav className="flex flex-col gap-[14px]">
          <SidebarIcon label="首页"><Icons.Home /></SidebarIcon>
          <SidebarIcon label="搜索"><Icons.Search /></SidebarIcon>
          <SidebarIcon label="发现"><Icons.Explore /></SidebarIcon>
          <SidebarIcon label="商店"><Icons.Shop /></SidebarIcon>
          <SidebarIcon label="直播"><Icons.Live /></SidebarIcon>
          <SidebarIcon label="消息"><Icons.Messages /></SidebarIcon>
          <SidebarIcon label="上传"><Icons.Plus /></SidebarIcon>
        </nav>
      </div>
    </aside>
  );
};

interface SidebarIconProps {
  children: React.ReactNode;
  label: string;
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ children, label }) => (
  <div className="group relative flex items-center justify-center">
    <button 
      className={`
        flex w-[40px] h-[40px] p-[8px] justify-center items-center 
        rounded-full transition-all duration-200 
        hover:bg-black/5 active:scale-90
        overflow-hidden
      `}
    >
      {/* 图标尺寸由常量定义固定为 24px */}
      {children}
    </button>
    
    {/* Tooltip 提示 - 严格遵循最新规范 */}
    <div className={`
      absolute left-[54px] invisible group-hover:visible opacity-0 group-hover:opacity-100 
      transition-all duration-200 transform translate-x-[-8px] group-hover:translate-x-0 z-50
      flex min-w-[80px] min-h-[48px] p-[12px] justify-center items-center
      bg-[#3A3A3A] rounded-[12px] shadow-[0_2px_10px_0_rgba(0,0,0,0.14)]
      pointer-events-none
    `}>
      <span 
        className="text-[#F6F6F6] text-center text-[14px] font-semibold leading-[130%] whitespace-nowrap"
        style={{ fontFamily: '"TikTok Sans", "Inter", sans-serif' }}
      >
        {label}
      </span>
      {/* 箭头装饰 - 颜色与背景 #3A3A3A 同步 */}
      <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#3A3A3A] rotate-45"></div>
    </div>
  </div>
);

export default Sidebar;
