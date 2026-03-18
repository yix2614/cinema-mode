import React from 'react';

export const commentPanelClasses = {
  wrapper: "overflow-hidden h-full flex shrink-0",
  container: "h-full bg-[#F8F8F8] rounded-[20px] flex flex-col shrink-0 overflow-hidden shadow-sm relative",
  header: "px-5 pt-6 pb-4 flex items-center justify-between shrink-0",
  title: "text-[18px] font-bold text-[#161823]",
  closeBtn: "w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 active:scale-90 transition-all",
  content: "flex-1 overflow-y-auto px-5 scrollbar-hide pb-6",
  commentList: "flex flex-col gap-8 py-2",
  footer: "p-4 bg-[#F8F8F8] border-t border-black/5 shrink-0",
  inputWrapper: "flex items-center gap-2",
  inputContainer: "flex-1 relative flex items-center bg-[#F1F1F2] rounded-full px-4 h-[40px]",
  input: "bg-transparent border-none outline-none flex-1 text-[14px] placeholder:text-[#161823]/40",
  inputActions: "flex items-center gap-3 text-[#161823]/60 text-[18px]",
  submitBtn: "w-8 h-8 bg-[#FE2C55]/20 flex items-center justify-center rounded-full text-[#FE2C55] hover:bg-[#FE2C55]/30 transition-colors",
  commentItem: {
    wrapper: "flex flex-col gap-3",
    main: "flex gap-3",
    avatar: "w-8 h-8 rounded-full shrink-0 bg-gray-200",
    content: "flex-1 flex flex-col gap-1",
    name: "text-[14px] font-bold text-[#161823]/60 leading-[130%]",
    text: "text-[15px] text-[#161823] leading-[140%]",
    replyTo: "font-bold text-[#161823]/60 mr-1",
    meta: "flex items-center gap-4 mt-1",
    time: "text-[12px] text-[#161823]/40",
    replyBtn: "text-[12px] font-bold text-[#161823]/60 hover:underline",
    likes: "ml-auto flex items-center gap-1",
    repliesWrapper: "ml-[44px] flex flex-col gap-5 mt-2",
    viewMoreBtn: "text-[12px] font-bold text-[#161823]/40 text-left flex items-center gap-2 group",
    viewMoreLine: "w-[12px] h-[1px] bg-[#161823]/10 group-hover:bg-[#161823]/30 transition-colors",
    customImageWrapper: "mt-2 rounded-[12px] overflow-hidden bg-gray-200 shadow-sm border border-black/5",
    customImage: "w-full h-full object-cover"
  }
};

export const commentPanelStyles = {
  wrapper: (isOpen: boolean, width: number): React.CSSProperties => ({
    width: isOpen ? width : 0,
    transition: 'width 400ms cubic-bezier(0.25, 0.25, 0, 1)'
  }),
  container: (width: number): React.CSSProperties => ({
    width: width
  })
};
