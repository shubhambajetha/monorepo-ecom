'use client';
import { useState } from 'react';
import {
  Search,
  Moon,
  Sun,
  Bell,
  MessageCircle,
  Maximize2,
  LayoutGrid,
  Settings,
} from 'lucide-react';

interface UserInfo {
  name: string;
  role: string;
  initials: string;
  avatarUrl?: string;
}

interface TopBarProps {
  user?: UserInfo;
  notificationCount?: number;
  messageCount?: number;
  onSearch?: (query: string) => void;
  onToggleDarkMode?: () => void;
  onNotificationsClick?: () => void;
  onMessagesClick?: () => void;
  onFullscreen?: () => void;
  onAppsClick?: () => void;
  onSettingsClick?: () => void;
  onUserClick?: () => void;
}

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel: string;
  badge?: number;
  badgeColor?: string;
}

const defaultUser: UserInfo = {
  name: 'Kristin Watson',
  role: 'Sale Administrator',
  initials: 'KW',
};

function IconButton({
  children,
  onClick,
  ariaLabel,
  badge,
  badgeColor = 'bg-red-500',
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="relative w-9 h-9 rounded-xl border-none bg-transparent flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-150 cursor-pointer"
    >
      {children}
      {badge !== undefined && badge > 0 && (
        <span
          className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-white ${badgeColor}`}
          aria-label={`${badge} unread`}
        />
      )}
    </button>
  );
}

export default function TopBar({
  user = defaultUser,
  notificationCount = 3,
  messageCount = 1,
  onSearch,
  onToggleDarkMode,
  onNotificationsClick,
  onMessagesClick,
  onFullscreen,
  onAppsClick,
  onSettingsClick,
  onUserClick,
}: TopBarProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isDark, setIsDark] = useState<boolean>(false);

  const handleDarkToggle = () => {
    setIsDark((prev) => !prev);
    onToggleDarkMode?.();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <header className="w-full h-16 bg-white border-b border-gray-100 flex items-center px-5 gap-3">
      {/* Logo */}
      <div className="flex items-center gap-2.5 min-w-[160px]">
        <div className="grid grid-cols-2 gap-[3px]">
          <div className="w-2 h-2 rounded-[2px] bg-orange-500" />
          <div className="w-2 h-2 rounded-[2px] bg-orange-400" />
          <div className="w-2 h-2 rounded-[2px] bg-orange-200" />
          <div className="w-2 h-2 rounded-[2px] bg-orange-500" />
        </div>
        <span className="text-[17px] font-semibold text-gray-900 tracking-tight">Dataflow</span>
      </div>

      <div className="relative flex-1 max-w-sm">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchChange}
          aria-label="Search"
          className="w-full h-[38px] bg-gray-50 border border-gray-100 rounded-xl pl-9 pr-3 text-[13.5px] text-gray-800 placeholder-gray-300 outline-none focus:border-orange-400 focus:bg-white transition-colors duration-150"
        />
      </div>

      <div className="flex-1" />
      <div className="flex items-center gap-1">
        <IconButton onClick={handleDarkToggle} ariaLabel="Toggle dark mode">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </IconButton>

        <IconButton
          onClick={onNotificationsClick}
          ariaLabel="Notifications"
          badge={notificationCount}
          badgeColor="bg-red-500"
        >
          <Bell size={18} />
        </IconButton>

        <IconButton
          onClick={onMessagesClick}
          ariaLabel="Messages"
          badge={messageCount}
          badgeColor="bg-orange-500"
        >
          <MessageCircle size={18} />
        </IconButton>

        <IconButton onClick={onFullscreen} ariaLabel="Fullscreen">
          <Maximize2 size={18} />
        </IconButton>

        <IconButton onClick={onAppsClick} ariaLabel="Apps">
          <LayoutGrid size={18} />
        </IconButton>
      </div>

      {/* User Profile */}
      <button
        onClick={onUserClick}
        aria-label="User menu"
        className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl border border-gray-100 bg-transparent hover:bg-gray-50 transition-colors duration-150 cursor-pointer ml-1"
      >
        <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-xs font-semibold text-white shrink-0 overflow-hidden">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <span>{user.initials}</span>
          )}
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[13px] font-semibold text-gray-900 leading-tight whitespace-nowrap">
            {user.name}
          </span>
          <span className="text-[11px] text-gray-400 leading-tight whitespace-nowrap">
            {user.role}
          </span>
        </div>
      </button>

      {/* Settings */}
      <button
        onClick={onSettingsClick}
        aria-label="Settings"
        className="w-[34px] h-[34px] rounded-lg border border-gray-100 bg-transparent flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors duration-150 cursor-pointer ml-1"
      >
        <Settings size={16} />
      </button>
    </header>
  );
}
