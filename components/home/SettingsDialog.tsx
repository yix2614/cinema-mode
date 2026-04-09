import React, { useMemo, useState, type ReactNode } from 'react';
import {
  TUXAvatar,
  TUXListCell,
  TUXModal,
  TUXText,
  getColorCSSVar,
} from '@byted-tiktok/tux-web';
import {
  TUXIconARectangleFill,
  TUXIconArrowLeftArrowRightFill,
  TUXIconArrowToLeftFill,
  TUXIconArrowTurnUpRightFill,
  TUXIconBellFill,
  TUXIconBookmarkFill,
  TUXIconCellularDataFill,
  TUXIconChevronRightSlimThinLTR,
  TUXIconClockFill,
  TUXIconContrastFill,
  TUXIconFamilyFill,
  TUXIconFlagFill,
  TUXIconHourglassFill,
  TUXIconInfoCircleFill,
  TUXIconLIVETVFill,
  TUXIconLockLargeFill,
  TUXIconMessageSmileFill,
  TUXIconMusicNoteFill,
  TUXIconPersonFill,
  TUXIconShieldFill,
  TUXIconShoppingCartFillLTR,
  TUXIconTrashBinFill,
  TUXIconVerticalRectanglePlayFill,
  TUXIconWalletFill,
} from '@byted-tiktok/tux-icons';

type SettingsDialogProps = {
  visible: boolean;
  onClose: () => void;
};

type SettingsItem = {
  key: string;
  label: string;
  icon: ReactNode;
  trailing?: ReactNode;
};

type SettingsDetailItem = {
  key: string;
  label: string;
  subtitle?: string;
};

type SettingsSection = {
  key: string;
  title: string;
  items: SettingsItem[];
};

const defaultTrailing = (
  <div style={{ color: getColorCSSVar('UIShapeNeutral2') }}>
    <TUXIconChevronRightSlimThinLTR size={16} />
  </div>
);

const settingsSections: SettingsSection[] = [
  {
    key: 'account',
    title: 'Account',
    items: [
      { key: 'account', label: 'Account', icon: <TUXIconPersonFill size={20} /> },
      { key: 'privacy', label: 'Privacy', icon: <TUXIconLockLargeFill size={20} /> },
      { key: 'security', label: 'Security', icon: <TUXIconShieldFill size={20} /> },
      { key: 'balance', label: 'Balance', icon: <TUXIconWalletFill size={20} /> },
      { key: 'share-profile', label: 'Share profile', icon: <TUXIconArrowTurnUpRightFill size={20} /> },
    ],
  },
  {
    key: 'content-display',
    title: 'Content & Display',
    items: [
      { key: 'notifications', label: 'Notifications', icon: <TUXIconBellFill size={20} /> },
      { key: 'live', label: 'LIVE', icon: <TUXIconLIVETVFill size={20} /> },
      { key: 'music', label: 'Music', icon: <TUXIconMusicNoteFill size={20} /> },
      { key: 'activity-center', label: 'Activity center', icon: <TUXIconClockFill size={20} /> },
      { key: 'content-preferences', label: 'Content preferences', icon: <TUXIconBookmarkFill size={20} /> },
      { key: 'ads', label: 'Ads', icon: <TUXIconShoppingCartFillLTR size={20} /> },
      { key: 'playback', label: 'Playback', icon: <TUXIconVerticalRectanglePlayFill size={24} /> },
      { key: 'language', label: 'Language', icon: <TUXIconARectangleFill size={20} /> },
      { key: 'display', label: 'Display', icon: <TUXIconContrastFill size={20} /> },
      { key: 'screen-time', label: 'Screen time', icon: <TUXIconHourglassFill size={20} /> },
      { key: 'family-pairing', label: 'Family Pairing', icon: <TUXIconFamilyFill size={20} /> },
    ],
  },
  {
    key: 'cache-cellular',
    title: 'Cache & Cellular',
    items: [
      { key: 'free-up-space', label: 'Free up space', icon: <TUXIconTrashBinFill size={20} /> },
      { key: 'data-saver', label: 'Data Saver', icon: <TUXIconCellularDataFill size={20} /> },
    ],
  },
  {
    key: 'support-about',
    title: 'Support & About',
    items: [
      { key: 'report', label: 'Report a problem', icon: <TUXIconFlagFill size={20} /> },
      { key: 'support', label: 'Support', icon: <TUXIconMessageSmileFill size={20} /> },
      { key: 'terms', label: 'Terms and Policies', icon: <TUXIconInfoCircleFill size={20} /> },
    ],
  },
  {
    key: 'login',
    title: 'Login',
    items: [
      {
        key: 'switch',
        label: 'Switch account',
        icon: <TUXIconArrowLeftArrowRightFill size={20} />,
        trailing: (
          <div className="flex items-center gap-3">
            <TUXAvatar
              size={32}
              src="https://picsum.photos/seed/tux-settings-account/64/64"
              alt=""
              ringColor="UIShapeNeutral3"
            />
            <div style={{ color: getColorCSSVar('UITextPlaceholder') }}>
              <TUXIconChevronRightSlimThinLTR size={16} />
            </div>
          </div>
        ),
      },
      {
        key: 'logout',
        label: 'Log out',
        icon: <TUXIconArrowToLeftFill size={20} />,
      },
    ],
  },
];

const settingsDetails: Record<string, SettingsDetailItem[]> = {
  account: [
    { key: 'user-information', label: 'User information' },
    { key: 'password', label: 'Password' },
    {
      key: 'passkey',
      label: 'Passkey',
      subtitle:
        'Set up an iCloud passkey to log in to TikTok with Face ID or Touch ID. TikTok can’t access this biometric data.',
    },
    { key: 'verification', label: 'Verification' },
    { key: 'switch-business', label: 'Switch to Business Account' },
    { key: 'download-data', label: 'Download your data', subtitle: 'Get a copy of your TikTok data' },
    { key: 'deactivate', label: 'Deactivate or delete account' },
  ],
  privacy: [
    { key: 'private-account', label: 'Private account' },
    { key: 'suggest-account', label: 'Suggest your account to others' },
    { key: 'sync-contacts', label: 'Sync contacts and Facebook friends' },
    { key: 'downloads', label: 'Downloads' },
    { key: 'comments', label: 'Comments' },
    { key: 'mentions', label: 'Mentions' },
  ],
  security: [
    { key: 'devices', label: 'Manage devices' },
    { key: 'alerts', label: 'Security alerts' },
    { key: '2sv', label: '2-step verification' },
    { key: 'trusted-devices', label: 'Trusted devices' },
  ],
  balance: [
    { key: 'balance-overview', label: 'Balance overview' },
    { key: 'coins', label: 'Coins' },
    { key: 'transactions', label: 'Transaction history' },
  ],
  'share-profile': [
    { key: 'copy-link', label: 'Copy profile link' },
    { key: 'share-qr', label: 'Share QR code' },
    { key: 'share-external', label: 'Share to other apps' },
  ],
  notifications: [
    { key: 'push', label: 'Push notifications' },
    { key: 'in-app', label: 'In-app notifications' },
  ],
  live: [
    { key: 'live-notification', label: 'LIVE notifications' },
    { key: 'live-replay', label: 'LIVE replays' },
  ],
  music: [
    { key: 'music-preferences', label: 'Music preferences' },
    { key: 'saved-sounds', label: 'Saved sounds' },
  ],
  'activity-center': [
    { key: 'activity-center-main', label: 'Activity center' },
  ],
  'content-preferences': [
    { key: 'filter-keywords', label: 'Filter keywords' },
    { key: 'restricted-mode', label: 'Restricted Mode' },
  ],
  ads: [
    { key: 'ads-personalization', label: 'Ads personalization' },
  ],
  playback: [
    { key: 'autoplay', label: 'Autoplay' },
    { key: 'data-usage', label: 'Data usage' },
  ],
  language: [
    { key: 'app-language', label: 'App language' },
    { key: 'content-language', label: 'Content language preferences' },
  ],
  display: [
    { key: 'appearance', label: 'Appearance' },
    { key: 'accessibility', label: 'Accessibility' },
  ],
  'screen-time': [
    { key: 'screen-time-dashboard', label: 'Screen time dashboard' },
    { key: 'sleep-reminders', label: 'Sleep reminders' },
  ],
  'family-pairing': [
    { key: 'family-pairing-main', label: 'Family Pairing' },
  ],
  'free-up-space': [
    { key: 'cache', label: 'Clear cache' },
    { key: 'downloads-storage', label: 'Downloads' },
  ],
  'data-saver': [
    { key: 'data-saver-main', label: 'Data Saver' },
  ],
  report: [
    { key: 'report-main', label: 'Report a problem' },
    { key: 'safety-center', label: 'Safety Center' },
  ],
  support: [
    { key: 'support-center', label: 'Support Center' },
    { key: 'help', label: 'Help' },
  ],
  terms: [
    { key: 'terms-service', label: 'Terms of Service' },
    { key: 'privacy-policy', label: 'Privacy Policy' },
    { key: 'community-guidelines', label: 'Community Guidelines' },
  ],
  switch: [
    { key: 'switch-account-main', label: 'Switch account' },
  ],
  logout: [
    { key: 'logout-main', label: 'Log out' },
  ],
};

function SettingsSidebarSection({
  section,
  activeKey,
  onSelect,
}: {
  section: SettingsSection;
  activeKey: string;
  onSelect: (key: string) => void;
}) {
  return (
    <section className="flex flex-col gap-1">
      <div className="px-4 pb-1">
        <TUXText typographyPreset="P1-Medium" color="UIText3">
          {section.title}
        </TUXText>
      </div>
      <div
        className="overflow-hidden rounded-lg"
        style={{ backgroundColor: getColorCSSVar('UIPageFlat1') }}
      >
        {section.items.map((item, index) => {
          const isActive = item.key === activeKey;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelect(item.key)}
              className="w-full text-left transition-colors"
              style={{
                backgroundColor: isActive ? getColorCSSVar('UIShapeNeutral3') : 'transparent',
                borderTop: index > 0 ? `0.5px solid ${getColorCSSVar('UIShapeNeutral3')}` : 'none',
              }}
            >
              <TUXListCell
                title={item.label}
                leadingIcon={
                  <div
                    className="flex items-center justify-center"
                    style={{ width: 20, height: 20, color: getColorCSSVar('UIText1') }}
                  >
                    {item.icon}
                  </div>
                }
                trailing={defaultTrailing}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}

function SettingsDetailRow({ item, showDivider }: { item: SettingsDetailItem; showDivider: boolean }) {
  return (
    <div
      style={{
        borderTop: showDivider ? `0.5px solid ${getColorCSSVar('UIShapeNeutral3')}` : 'none',
      }}
    >
      <TUXListCell
        title={item.label}
        description={item.subtitle}
        trailing={defaultTrailing}
        onClick={() => {}}
      />
    </div>
  );
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ visible, onClose }) => {
  const [activeKey, setActiveKey] = useState('account');
  const activeTitle = useMemo(() => {
    for (const section of settingsSections) {
      const matched = section.items.find((item) => item.key === activeKey);
      if (matched) return matched.label;
    }
    return 'Account';
  }, [activeKey]);

  const activeItems = settingsDetails[activeKey] ?? [];

  return (
    <TUXModal
      visible={visible}
      onVisibleChange={(nextVisible) => {
        if (!nextVisible) onClose();
      }}
      closeOnOutsideClick
      width="780px"
      height="600px"
      modalBackgroundColor="UIPageFlat1"
    >
      <div
        className="h-full w-full overflow-hidden"
        style={{
          backgroundColor: getColorCSSVar('UIPageFlat1'),
          borderRadius: 12,
        }}
      >
        <div className="flex h-full">
          <div
            className="h-full shrink-0 overflow-y-auto"
            style={{
              width: 320,
              backgroundColor: getColorCSSVar('UIPageGrouped1'),
            }}
          >
            <div className="flex flex-col gap-4 px-0 py-0">
              <div className="px-6 pt-6">
                <TUXText as="h2" typographyPreset="H1-Semibold" color="UIText1">
                  Settings
                </TUXText>
              </div>
              <div className="flex flex-col gap-2 pb-6">
                {settingsSections.map((section) => (
                  <SettingsSidebarSection
                    key={section.key}
                    section={section}
                    activeKey={activeKey}
                    onSelect={setActiveKey}
                  />
                ))}
              </div>
            </div>
          </div>
          <div
            className="min-w-0 flex-1 overflow-y-auto"
            style={{
              borderLeft: `1px solid ${getColorCSSVar('UIShapeNeutral3')}`,
              backgroundColor: getColorCSSVar('UIPageFlat1'),
            }}
          >
            <div className="flex flex-col">
              <div className="px-8 pt-6 pb-4">
                <TUXText as="h2" typographyPreset="H1-Semibold" color="UIText1">
                  {activeTitle}
                </TUXText>
              </div>
              <div className="px-0 pb-6">
                {activeItems.map((item, index) => (
                  <SettingsDetailRow key={item.key} item={item} showDivider={index > 0} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TUXModal>
  );
};

export default SettingsDialog;
