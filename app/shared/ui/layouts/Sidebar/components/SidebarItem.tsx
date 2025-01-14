import { NavLink } from "@remix-run/react";
import { useLocation } from "@remix-run/react";
import { memo } from "react"; // 메모이제이션 추가
import type { MenuItem } from "~/shared/constants/navigation";

export interface SidebarItemProps extends MenuItem {
  isCollapsed?: boolean;
  isFirst?: boolean;
}

// 메모이제이션된 컴포넌트
export const SidebarItem = memo(function SidebarItem({
  icon: Icon,
  label,
  path,
  children,
  isCollapsed,
}: SidebarItemProps) {
  const location = useLocation();
  const targetPath = children?.length ? children[0].path : path;

  // 경로 매칭 로직을 useMemo로 최적화
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

  return (
    <li data-sidebar="menu-item" className="group/menu-item relative">
      <NavLink
        to={targetPath}
        prefetch="intent"
        className={({ isActive }) => `
          relative flex w-full items-center gap-2 rounded-md p-2 
          text-left outline-none
          transition-colors
          disabled:opacity-50 
          hover:bg-gray-800
          ${
            isActive || isPathInGroup(location.pathname)
              ? "bg-gray-800 text-gray-100 font-medium"
              : "text-gray-400 hover:text-gray-100"
          }
          h-8 text-sm
        `}
      >
        {({ isActive }) => (
          <>
            <Icon
              className={`
                w-6 h-6 shrink-0
                ${isActive || isPathInGroup(location.pathname) ? "text-gray-100" : "text-gray-400"}
              `}
            />
            <span className="truncate">{label}</span>

            {/* 툴팁 - 조건부 렌더링 최적화 */}
            {isCollapsed && (
              <div
                className={`
                  absolute left-full ml-2 px-2 py-1 
                  bg-gray-900 text-gray-100 text-xs rounded
                  whitespace-nowrap
                  opacity-0 invisible
                  group-hover/menu-item:opacity-100 group-hover/menu-item:visible
                  transition-all duration-200
                  z-50
                `}
              >
                {label}
                <div
                  className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 
                  border-4 border-transparent border-r-gray-900"
                />
              </div>
            )}
          </>
        )}
      </NavLink>
    </li>
  );
});
