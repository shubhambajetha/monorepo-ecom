"use client"
import { useState } from 'react';

import {
  HiOutlineHome,
  HiOutlineCube,
  HiOutlineSquares2X2,
  HiOutlineTag,
  HiOutlineClipboardDocumentList,
  HiOutlineUsers,
  HiOutlineShoppingCart,
  HiOutlineChartBar,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle,
  HiOutlineQuestionMarkCircle,
  HiOutlineBolt,
  HiOutlineChevronRight,
} from 'react-icons/hi2';

type NavItem = {
  label: string;
  icon: JSX.Element;
  hasChevron?: boolean;
};

const iconClass = 'w-[18px] h-[18px]';

const mainNavItems: NavItem[] = [
  {
    label: 'Ecommerce',
    icon: <HiOutlineHome className={iconClass} />,
    hasChevron: true,
  },
  {
    label: 'Product',
    icon: <HiOutlineCube className={iconClass} />,
    hasChevron: true,
  },
  {
    label: 'Category',
    icon: <HiOutlineSquares2X2 className={iconClass} />,
    hasChevron: true,
  },
  {
    label: 'Attributes',
    icon: <HiOutlineTag className={iconClass} />,
    hasChevron: true,
  },
  {
    label: 'Order',
    icon: <HiOutlineClipboardDocumentList className={iconClass} />,
    hasChevron: true,
  },
  {
    label: 'Users',
    icon: <HiOutlineUsers className={iconClass} />,
    hasChevron: true,
  },
  {
    label: 'Store Setting',
    icon: <HiOutlineShoppingCart className={iconClass} />,
  },
  {
    label: 'Report',
    icon: <HiOutlineChartBar className={iconClass} />,
  },
  {
    label: 'Setting',
    icon: <HiOutlineCog6Tooth className={iconClass} />,
  },
  {
    label: 'Log Out',
    icon: <HiOutlineArrowRightOnRectangle className={iconClass} />,
  },
];

const supportItems: NavItem[] = [
  {
    label: 'Terms & Conditions',
    icon: <HiOutlineQuestionMarkCircle className={iconClass} />,
  },
];

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState('Ecommerce');
  return (
    <aside
      className={`
        relative flex flex-col min-h-screen bg-[#1e2128] flex-shrink-0
        transition-[width] duration-300 ease-in-out overflow-hidden
        ${collapsed ? 'w-[68px]' : 'w-[239px]'}
      `}
    >
      {/* Logo */}
      <div
        className={`
          flex items-center gap-[10px] border-b border-white/[0.07]
          py-5 overflow-hidden whitespace-nowrap
          ${collapsed ? 'justify-center px-0' : 'px-[18px]'}
        `}
      >
        <div className="flex-shrink-0 w-[34px] h-[34px] rounded-[9px] bg-orange-500 flex items-center justify-center shadow-[0_2px_12px_rgba(249,115,22,0.4)]">
          <HiOutlineBolt className="w-[17px] h-[17px] text-white" />
        </div>

        {!collapsed && (
          <span className="text-white font-bold text-[17px] tracking-tight">Dataflow</span>
        )}
      </div>

      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-[-10px] top-[24px] w-[28px] h-[28px] rounded-full bg-orange-500 hover:bg-orange-600 border-0 flex items-center justify-center z-20 shadow-[0_2px_8px_rgba(249,115,22,0.45)] transition-colors duration-150 cursor-pointer"
        aria-label="Toggle sidebar"
      >
        <HiOutlineChevronRight
          className={`w-[13px] h-[13px] text-white transition-transform duration-300 ${
            collapsed ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>
      <nav className="flex-1 py-[10px] overflow-y-auto overflow-x-hidden scrollbar-none">
        {mainNavItems.map((item) => (
          <NavRow
            key={item.label}
            item={item}
            active={active === item.label}
            collapsed={collapsed}
            onClick={() => setActive(item.label)}
          />
        ))}

        <div className="mx-[14px] my-[6px] h-px bg-white/[0.06]" />

        {!collapsed && (
          <p className="px-[18px] pt-[10px] pb-1 text-[10px] font-bold tracking-[0.11em] uppercase text-[#3d4354]">
            Support
          </p>
        )}

        {supportItems.map((item) => (
          <NavRow
            key={item.label}
            item={item}
            active={active === item.label}
            collapsed={collapsed}
            onClick={() => setActive(item.label)}
          />
        ))}
      </nav>
    </aside>
  );
}

type NavRowProps = {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
};

function NavRow({ item, active, collapsed, onClick }: NavRowProps) {
  return (
    <div
      onClick={onClick}
      className={`
        group relative flex items-center gap-[11px] cursor-pointer my-px
        transition-colors duration-150 overflow-hidden whitespace-nowrap
        ${collapsed ? 'justify-center px-0 py-[10px]' : 'px-[18px] py-[9px]'}
        ${
          active
            ? 'bg-orange-500/[0.13] text-orange-400'
            : 'text-[#7c8494] hover:bg-white/[0.05] hover:text-[#c8d0e0]'
        }
      `}
    >
      {active && (
        <span className="absolute left-0 top-[5px] bottom-[5px] w-[3px] bg-orange-500 rounded-r-[3px]" />
      )}

      <span className="flex-shrink-0 flex items-center justify-center w-[18px] h-[18px]">
        {item.icon}
      </span>

      {!collapsed && <span className="flex-1 text-[13px] font-medium">{item.label}</span>}

      {!collapsed && item.hasChevron && (
        <span className="opacity-35 flex-shrink-0">
          <HiOutlineChevronRight className="w-[13px] h-[13px]" />
        </span>
      )}

      {collapsed && (
        <span
          className="
          pointer-events-none absolute left-full ml-[10px]
          bg-[#2a2e38] text-[#e0e5ef] text-xs font-medium
          px-[10px] py-[5px] rounded-[7px] whitespace-nowrap
          shadow-[0_4px_14px_rgba(0,0,0,0.35)] z-50
          opacity-0 group-hover:opacity-100 transition-opacity duration-150
        "
        >
          {item.label}
        </span>
      )}
    </div>
  );
}
