import { NavLink, useNavigate } from "@remix-run/react";
import { useLocation } from "@remix-run/react";
import type { MenuItem } from "~/shared/constants/navigation"; // MenuItem 타입 import 추가

// SidebarItemProps 타입 수정
export interface SidebarItemProps extends MenuItem {
  isCollapsed?: boolean;
  isFirst?: boolean;
}

export function SidebarItem({
  icon: Icon,
  label,
  path,
  children,
  isCollapsed,
  isFirst,
}: SidebarItemProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isPathInGroup = (pathname: string) => {
    const pathGroups: Record<string, string[]> = {
      "/leaves/management/history": ["/leaves/management/history", "/leaves/management/summary"],
      "/leaves/approval/pending": ["/leaves/approval/pending", "/leaves/approval/completed"],
    };

    const group = pathGroups[path];
    if (group) {
      return group.some((groupPath) => pathname.startsWith(groupPath));
    }

    return path === "/" ? pathname === "/" : pathname.startsWith(path);
  };

  const isActive = isPathInGroup(location.pathname);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetPath = children?.length ? children[0].path : path;
    navigate(targetPath);
  };

  return (
    <li data-sidebar="menu-item" className="group/menu-item relative">
      <button
        onClick={handleClick}
        className={`
          relative flex w-full items-center gap-2 rounded-md p-2 
          text-left outline-none
          transition-colors
          disabled:opacity-50 
          hover:bg-gray-800
          ${
            isActive ? "bg-gray-800 text-gray-100 font-medium" : "text-gray-400 hover:text-gray-100"
          }
          h-8 text-sm
        `}
      >
        <Icon
          className={`
            w-6 h-6 shrink-0
            ${isActive ? "text-gray-100" : "text-gray-400"}
          `}
        />
        <span className="truncate">{label}</span>

        {/* 툴팁 */}
        <div
          className={`
            absolute left-full ml-2 px-2 py-1 
            bg-gray-900 text-gray-100 text-xs rounded
            whitespace-nowrap
            opacity-0 invisible
            group-hover/menu-item:opacity-100 group-hover/menu-item:visible
            transition-all duration-200
            ${isCollapsed ? "z-50" : "hidden"}
          `}
        >
          {label}
          <div
            className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 
            border-4 border-transparent border-r-gray-900"
          />
        </div>
      </button>
    </li>
  );
}
