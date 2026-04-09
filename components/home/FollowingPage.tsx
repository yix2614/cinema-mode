import React from 'react';
import {
  TUXAvatar,
  TUXButton,
  TUXIconButton,
  TUXText,
  getColorCSSVar,
} from '@byted-tiktok/tux-web';
import {
  TUXIconXMarkSmall,
} from '@byted-tiktok/tux-icons';
import Sidebar from './Sidebar';

interface FollowingPageProps {
  onOpenSettings?: () => void;
}

const FollowingRecommendationCard: React.FC = () => {
  return (
    <div
      className="relative flex flex-col items-center"
      style={{
        width: 160,
        height: 222,
        padding: 16,
        gap: 14,
        borderRadius: 12,
        backgroundColor: getColorCSSVar('UIPageGrouped1'),
      }}
    >
      <div className="absolute right-[6px] top-[6px]">
        <TUXIconButton
          size={24}
          backgroundColor="transparent"
          icon={
            <TUXIconXMarkSmall
              size={16}
              color={getColorCSSVar('UIText3')}
            />
          }
        />
      </div>

      <TUXAvatar
        size={96}
        src="https://i.pravatar.cc/192?img=12"
        alt="Ralph Edwards"
      />

      <div className="flex flex-col items-center gap-1 self-stretch">
        <div className="flex items-center justify-center">
          <TUXText typographyPreset="P1-Semibold" color="UIText1">
            Ralph Edwards
          </TUXText>
        </div>
        <TUXText typographyPreset="P3-Regular" color="UIText3">
          People you may know
        </TUXText>
      </div>

      <TUXButton
        text="Follow back"
        themePreset="primary"
        shapePreset="capsule"
        sizePreset="tiny"
        width="110px"
        height="28px"
      />
    </div>
  );
};

const FollowingPage: React.FC<FollowingPageProps> = ({ onOpenSettings }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white text-[#161823] font-sans">
      <Sidebar onOpenSettings={onOpenSettings} />
      <main className="flex flex-1 items-center justify-center bg-white">
        <FollowingRecommendationCard />
      </main>
    </div>
  );
};

export default FollowingPage;
