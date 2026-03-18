# Control Pad 设计规范

悬浮在右下角的胶囊形导航组件，用于上下切换视频，位于 Engagement Panel 正上方。

## 布局容器
- **位置**: 绝对定位在屏幕右下角区域。
  - 整体包裹器 (`FullScreenVideoControls`) 距屏幕底部 `36px`，距右侧 `20px`。
  - Control Pad 自身高度自适应内部元素，但**它的绝对物理位置是通过固定下方的 Engagement Panel 的高度来保持稳定的**。无论 Engagement Panel 内部按钮数量如何变化，其高度始终固定（大屏 420px，小屏 320px），从而确保 Control Pad 永远悬浮在同一个垂直高度，不会随着内容的减少而掉落。
- **外观**: 
  - 胶囊圆角 (`rounded-full`)
  - 半透明白色背景 (`bg-white/10`)
  - 毛玻璃效果 (`backdrop-blur`)
  - **渲染修复**: 强制开启 `isolate`、`overflow-hidden` 和 `backface-visibility: hidden` 以防止 WebKit 渲染重影。
- **排列**: 垂直居中排列，自身与下方 Engagement Panel 的间距为 `16px` (`gap-4`)，内部按钮间距 `8px` (`gap-2`)。

## 按钮 (上/下箭头)
- **样式**: 圆形图标按钮，白色图标。
- **状态**:
  - **默认**: 透明背景。
  - **悬停**: 半透明白背景 (`hover:bg-white/20`)。
  - **点击**: 缩小反馈 (`active:scale-90`)。
  - **禁用**: 透明度 `30%`，禁止点击（首/尾视频）。

## 响应式规则 (断点 840px)

| 属性 | 大屏 (>= 840px) | 小屏 (< 840px) |
| :--- | :--- | :--- |
| **容器内边距** | `8px` (上下左右) | `2px` (上下左右) |
| **按钮尺寸** | `32px` | `28px` |
| **图标尺寸** | `16px` | `14px` |
