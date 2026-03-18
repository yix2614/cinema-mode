# Engagement Panel Design Specification

## Overview
The Engagement Panel is a vertical, right-aligned interactive floating component designed for full-screen video feeds (e.g., TikTok/Reels style). It houses the creator's avatar and key social interaction buttons (Like, Comment, Save, Share) along with a rotating music record icon.

## Layout & Container
- **Alignment:** Right-aligned, vertical flex column, anchored towards the bottom of the viewport.
- **Scroll Behavior:** Supports vertical scrolling (`overflow-y-auto`) with hidden scrollbars (`no-scrollbar`) if the content height exceeds the viewport, ensuring buttons remain accessible on extremely short screens.
- **Gap:** 8px (`gap-2`) vertical spacing between elements.

## Component Elements

### 1. Avatar & Follow Wrapper
- **Avatar Container:** 
  - Size: 48x48px (scales down to 32x32px on small screens <840px).
  - Shape: Perfect circle (`rounded-full`).
  - Border: 2px solid white (`border-2 border-white`).
  - Shadow: Large drop shadow (`shadow-lg`).
  - Image: Fills container (`object-cover`).
- **Follow/Plus Button:**
  - Size: 24x24px (scales down to 16x16px on small screens).
  - Position: Overlaps the bottom center of the avatar (`mt-[-12px]`, relative positioning).
  - Color: Brand red (`bg-[#FE2C55]`).
  - Shape: Perfect circle.
  - Icon: White "+" SVG (14x14px, or 10x10px on small screens).
  - Interaction: Scales up slightly on hover (`hover:scale-110`).

### 2. Action Buttons (Like, Comment, Save, Share)
Each action button consists of an icon button and a text label below it.
- **Wrapper:** Flex column, centered items, 4px gap (`gap-1`).
- **Icon Button:**
  - Size: 48x48px (scales down to 32x32px on small screens).
  - Shape: Perfect circle (`rounded-full`).
  - Background: Semi-transparent white (`rgba(255, 255, 255, 0.13)`).
  - Blur Effect: 8px backdrop blur (`backdrop-filter: blur(8px)`).
  - Rendering Fixes: `isolate`, `overflow-hidden`, and `backface-visibility: hidden` to prevent hardware acceleration glitches (e.g., ghost reflections from background elements).
  - Interaction: Active scale down (`active:scale-90`), Hover brightness increase (`hover:brightness-125`).
- **Icons:**
  - Size: 20x20px (scales down to 16x16px on small screens).
  - Color: White (`fill-current text-white`).
- **Labels (e.g., "850K", "12K"):**
  - Font: 12px, Bold, White.
  - Text Shadow: Medium drop shadow for readability against bright videos (`drop-shadow-md`).
  - Margin: Overrides default margin to 0 (`mt-0`).
  - Line Height: Strictly forced to 16px.

### 3. Music Record
- **Size:** 48x48px (scales down to 32x32px on small screens).
- **Shape:** Perfect circle (`rounded-full`).
- **Background:** Dark semi-transparent (`bg-black/40`).
- **Border:** 2px semi-transparent white (`border-2 border-white/50`).
- **Animation:** Continuous slow rotation (`animate-spin-slow`).
- **Shadow:** Large drop shadow (`shadow-lg`).
- **Image:** Fills container (`object-cover`).

## Responsive Rules
- **Breakpoint:** 840px width.
- **>= 840px:** Large sizes (Buttons: 48px, Icons: 20px, Avatar: 48px).
- **< 840px:** Small sizes (Buttons: 32px, Icons: 16px, Avatar: 32px, Plus icon: 16px).
