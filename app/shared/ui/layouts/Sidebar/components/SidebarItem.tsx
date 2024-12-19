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
    if (children && children.length > 0) {
      e.preventDefault();
      navigate(children[0].path);
    }
  };

  return (
    <li data-sidebar="menu-item" className="group/menu-item relative">
      <NavLink
        to={path}
        onClick={handleClick}
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
        <Icon
          className={`
            w-6 h-6 shrink-0
            ${isActive ? "text-gray-900" : "text-gray-700"}
          `}
        />
        <span className="truncate">{label}</span>
      </NavLink>
    </li>
  );
}
