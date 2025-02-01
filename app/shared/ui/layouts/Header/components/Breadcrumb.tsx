import { useLocation } from "@remix-run/react";
import { MENU_GROUPS } from "~/shared/constants/navigation";

export function Breadcrumb() {
  const location = useLocation();

  const getCurrentMenu = () => {
    for (const group of MENU_GROUPS) {
      for (const item of group.items) {
        // children이 있는 경우 하위 메뉴를 먼저 확인
        if (item.children) {
          const childItem = item.children.find((child) => child.path === location.pathname);
          if (childItem) {
            return { group: group.label, item: childItem };
          }
        }
        // 현재 경로와 정확히 일치하는 메뉴 찾기
        if (item.path === location.pathname) {
          return { group: group.label, item };
        }
      }
    }
    return null;
  };

  const currentMenu = getCurrentMenu();

  if (!currentMenu) return null;

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5 text-gray-800 mt-[2px]">
        {currentMenu.group && (
          <li className="flex items-center gap-1.5">
            <span>{currentMenu.group}</span>
            <span className="text-muted-foreground/40">/</span>
          </li>
        )}
        <li className="flex items-center gap-1.5">
          <span className="transition-colors hover:text-foreground">{currentMenu.item.label}</span>
        </li>
      </ol>
    </nav>
  );
}
