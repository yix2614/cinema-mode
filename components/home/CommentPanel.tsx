
import React, { useEffect, useState } from 'react';

interface CommentPanelProps {
  onClose: () => void;
}

const CommentPanel: React.FC<CommentPanelProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = requestAnimationFrame(() => setIsOpen(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 400); // Match animation duration
  };

  return (
    <div 
      className="overflow-hidden h-full flex shrink-0"
      style={{
        width: isOpen ? '352px' : '0',
        transition: 'width 400ms cubic-bezier(0.25, 0.25, 0, 1)',
      }}
    >
      <div className="w-[352px] h-full bg-[#F8F8F8] rounded-[20px] flex flex-col shrink-0 overflow-hidden shadow-sm relative">
        {/* Header */}
        <div className="px-5 pt-6 pb-4 flex items-center justify-between shrink-0">
          <h2 className="text-[18px] font-bold text-[#161823]">
            Comments <span className="text-[#161823]/50 font-normal ml-1">200</span>
          </h2>
          <button 
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 active:scale-90 transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 14L34 34" stroke="#161823" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M34 14L14 34" stroke="#161823" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Comment List */}
        <div className="flex-1 overflow-y-auto px-5 scrollbar-hide pb-6">
          <div className="flex flex-col gap-8 py-2">
            
            {/* Main Comment with Replies */}
            <CommentItem 
              avatar="https://picsum.photos/seed/user1/100/100"
              name="Alvin_Design"
              text="The color grading on this video is just phenomenal! Which lut are you using? 🎨✨"
              time="2h ago"
              likes="1.5K"
              replies={[
                {
                  avatar: "https://picsum.photos/seed/user2/100/100",
                  name: "Creator_Dev",
                  text: "Custom made! I'll share it in the next post.",
                  time: "1h ago",
                  likes: "420"
                }
              ]}
            />

            {/* Image Comment 1 */}
            <div className="flex gap-3">
              <img src="https://picsum.photos/seed/user3/100/100" className="w-8 h-8 rounded-full shrink-0" alt="" />
              <div className="flex-1 flex flex-col gap-1">
                <span className="text-[14px] font-bold text-[#161823]/60 leading-[130%]">Sarah Jenkins</span>
                <p className="text-[15px] text-[#161823] leading-[140%]">I tried to recreate this view during my last trip, check this out!</p>
                <div className="mt-2 w-[164px] h-[220px] rounded-[12px] overflow-hidden bg-gray-200 shadow-sm border border-black/5">
                  <img src="https://picsum.photos/seed/nature1/400/600" className="w-full h-full object-cover" alt="Nature" />
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-[12px] text-[#161823]/40">6-2</span>
                  <button className="text-[12px] font-bold text-[#161823]/60 hover:underline">Reply</button>
                  <div className="ml-auto flex items-center gap-1">
                    <HeartIcon className="w-4 h-4 text-[#161823]/40" />
                    <span className="text-[12px] text-[#161823]/40">892</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Comment 2 (Cat Theme) */}
            <div className="flex gap-3">
              <img src="https://picsum.photos/seed/user4/100/100" className="w-8 h-8 rounded-full shrink-0" alt="" />
              <div className="flex-1 flex flex-col gap-1">
                <span className="text-[14px] font-bold text-[#161823]/60 leading-[130%]">CatLover99</span>
                <p className="text-[15px] text-[#161823] leading-[140%]">Reminds me of my sleepy buddy while watching this... 🐱💤</p>
                <div className="mt-2 w-[164px] h-[164px] rounded-[12px] overflow-hidden bg-gray-200 border border-black/5">
                  <img src="https://res.cloudinary.com/dkjokhb4w/image/upload/v1741082531/cat_u66xun.png" className="w-full h-full object-cover" alt="Cat" />
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-[12px] text-[#161823]/40">4h ago</span>
                  <button className="text-[12px] font-bold text-[#161823]/60 hover:underline">Reply</button>
                  <div className="ml-auto flex items-center gap-1">
                    <HeartIcon className="w-4 h-4 text-[#161823]/40" />
                    <span className="text-[12px] text-[#161823]/40">126</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Simple Text Comment */}
            <CommentItem 
              avatar="https://picsum.photos/seed/user5/100/100"
              name="UrbanExplorer"
              text="Need the location tag for this! Is it in Norway? 🇳🇴"
              time="5h ago"
              likes="34"
            />

            {/* Image Comment 3 (City/Architecture) */}
            <div className="flex gap-3">
              <img src="https://picsum.photos/seed/user6/100/100" className="w-8 h-8 rounded-full shrink-0" alt="" />
              <div className="flex-1 flex flex-col gap-1">
                <span className="text-[14px] font-bold text-[#161823]/60 leading-[130%]">Archy_Vibes</span>
                <p className="text-[15px] text-[#161823] leading-[140%]">The scale of these cliffs is insane. Reminded me of this project I worked on.</p>
                <div className="mt-2 w-[164px] h-[120px] rounded-[12px] overflow-hidden bg-gray-200 border border-black/5">
                  <img src="https://picsum.photos/seed/architecture/400/300" className="w-full h-full object-cover" alt="Architecture" />
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-[12px] text-[#161823]/40">Yesterday</span>
                  <button className="text-[12px] font-bold text-[#161823]/60 hover:underline">Reply</button>
                  <div className="ml-auto flex items-center gap-1">
                    <HeartIcon className="w-4 h-4 text-[#161823]/40" />
                    <span className="text-[12px] text-[#161823]/40">56</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#F8F8F8] border-t border-black/5 shrink-0">
          <div className="flex items-center gap-2">
            <img src="https://picsum.photos/seed/currentuser/100/100" className="w-8 h-8 rounded-full shrink-0 bg-gray-200" alt="Me" />
            <div className="flex-1 relative flex items-center bg-[#F1F1F2] rounded-full px-4 h-[40px]">
              <input 
                type="text" 
                placeholder="Add comment..." 
                className="bg-transparent border-none outline-none flex-1 text-[14px] placeholder:text-[#161823]/40"
              />
              <div className="flex items-center gap-3 text-[#161823]/60 text-[18px]">
                <button className="hover:scale-110 transition-transform">@</button>
                <button className="hover:scale-110 transition-transform text-[16px]">😊</button>
              </div>
            </div>
            <button className="w-8 h-8 bg-[#FE2C55]/20 flex items-center justify-center rounded-full text-[#FE2C55] hover:bg-[#FE2C55]/30 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4V20M12 4L4 12M12 4L20 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommentItem: React.FC<{ 
  avatar: string; 
  name: string; 
  text: string; 
  time: string; 
  likes: string; 
  replyTo?: string;
  replies?: any[];
}> = ({ avatar, name, text, time, likes, replies, replyTo }) => (
  <div className="flex flex-col gap-3">
    <div className="flex gap-3">
      <img src={avatar} className="w-8 h-8 rounded-full shrink-0 bg-gray-200" alt="" />
      <div className="flex-1 flex flex-col gap-1">
        <span className="text-[14px] font-bold text-[#161823]/60 leading-[130%]">{name}</span>
        <p className="text-[15px] text-[#161823] leading-[140%]">
          {replyTo && <span className="font-bold text-[#161823]/60 mr-1">▶ {replyTo}</span>}
          {text}
        </p>
        <div className="flex items-center gap-4 mt-1">
          <span className="text-[12px] text-[#161823]/40">{time}</span>
          <button className="text-[12px] font-bold text-[#161823]/60 hover:underline">Reply</button>
          <div className="ml-auto flex items-center gap-1">
            <HeartIcon className="w-4 h-4 text-[#161823]/40" />
            <span className="text-[12px] text-[#161823]/40">{likes}</span>
          </div>
        </div>
      </div>
    </div>
    
    {replies && replies.length > 0 && (
      <div className="ml-[44px] flex flex-col gap-5 mt-2">
        {replies.map((reply, i) => (
          <CommentItem key={i} {...reply} />
        ))}
        <button className="text-[12px] font-bold text-[#161823]/40 text-left flex items-center gap-2 group">
          <div className="w-[12px] h-[1px] bg-[#161823]/10 group-hover:bg-[#161823]/30 transition-colors"></div>
          View more replies <ChevronDownIcon className="w-3 h-3" />
        </button>
      </div>
    )}
  </div>
);

const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z" fill="currentColor" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export default CommentPanel;
