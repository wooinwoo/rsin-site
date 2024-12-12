import { NavLink, useLocation } from "@remix-run/react";
// types/sidebar.ts
export interface SidebarItemProps {
  icon: string;
  label: string;
  path: string;
  isCollapsed?: boolean;
  isFirst?: boolean;
}

// components/Sidebar/SidebarItem.tsx
export function SidebarItem({ icon, label, path, isCollapsed, isFirst }: SidebarItemProps) {
  const location = useLocation();

  // 홈(/)일 경우 정확히 일치할 때만, 나머지는 startsWith로 체크
  const isActive = path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <li data-sidebar="menu-item" className="group/menu-item relative">
      <NavLink
        to={path}
        data-sidebar="menu-button"
        className={`
    flex w-full items-center gap-2 rounded-md p-2 
    text-left outline-none
    transition-colors
    disabled:opacity-50 
    hover:bg-gray-600/10
    ${isActive ? "font-medium text-gray-950" : ""}
    h-8 text-sm
  `}
      >
        <img
          src={icon}
          alt={label}
          className={`
      w-6 h-6 shrink-0
      ${isActive ? "brightness-0" : ""}
    `}
        />
        <span className="truncate">{label}</span>
      </NavLink>
    </li>
  );
}
