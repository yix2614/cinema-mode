
import React from 'react';
import { Icons } from '../../constants';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-[240px] h-full flex flex-col bg-white shrink-0 overflow-y-auto custom-scrollbar">
      {/* Logo Area */}
      <div className="pt-5 pb-5 pl-4">
        <div className="cursor-pointer hover:opacity-80 transition-opacity w-fit">
          <Icons.TikTok className="h-[28px] w-auto block" />
        </div>
      </div>

      {/* Search Box */}
      <div className="px-2 mb-2">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full h-[46px] bg-[rgba(22,24,35,0.06)] rounded-full pl-12 pr-4 text-[16px] placeholder:text-[rgba(22,24,35,0.5)] outline-none focus:bg-[rgba(22,24,35,0.1)] transition-colors caret-[#FE2C55]"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(22,24,35,0.34)] group-focus-within:text-[rgba(22,24,35,0.75)] pointer-events-none transition-colors">
            <Icons.Search width={24} height={24} fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 px-4 py-2">
        <nav className="flex flex-col gap-1">
          <SidebarItem label="Home" icon={<Icons.Home />} isActive />
          <SidebarItem label="Shop" icon={<Icons.Shop />} />
          <SidebarItem label="Explore" icon={<Icons.Explore />} />
          <SidebarItem label="Following" icon={<Icons.Following />} />
          <SidebarItem label="Friends" icon={<Icons.Friends />} />
          <SidebarItem label="LIVE" icon={<Icons.Live />} />
          <SidebarItem label="Messages" icon={<Icons.Messages />} />
          <SidebarItem label="Activity" icon={<Icons.Inbox />} />
        </nav>
      </div>
    </aside>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, isActive }) => (
  <button 
    className={`
      flex items-center w-full h-[40px] p-[8px] gap-[16px] rounded-[8px] transition-colors
      ${isActive 
        ? 'text-[#FE2C55]' 
        : 'text-[#161823] hover:bg-[rgba(22,24,35,0.03)]'
      }
    `}
  >
    <div className={`w-[24px] h-[24px] flex items-center justify-center ${isActive ? 'text-[#FE2C55]' : 'text-[#161823]'}`}>
      {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { 
        width: 24, 
        height: 24,
        fill: isActive ? '#FE2C55' : 'currentColor'
      }) : icon}
    </div>
    <span 
      className={`text-[16px] leading-[24px] font-semibold ${isActive ? '' : ''}`}
    >
      {label}
    </span>
  </button>
);

const Badge: React.FC<{ count: number }> = ({ count }) => (
  <div className="bg-[#FE2C55] text-white text-[12px] font-bold px-[6px] h-[16px] flex items-center justify-center rounded-full min-w-[16px]">
    {count}
  </div>
);

export default Sidebar;
