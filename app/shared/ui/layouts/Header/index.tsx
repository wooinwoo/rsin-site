import { useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { MENU_GROUPS } from "~/shared/constants/navigation";
import { LeaveRequestModal } from "~/features/leave/components/LeaveRequestModal";
import { Button } from "~/shared/ui/components/Button";

export function Header() {
  const location = useLocation();

  const getCurrentMenu = () => {
    for (const group of MENU_GROUPS) {
      const menuItem = group.items.find((item) => item.path === location.pathname);
      if (menuItem) {
        return {
          group: group.label,
          item: menuItem,
        };
      }
    }
    return null;
  };

  const currentMenu = getCurrentMenu();
  // 휴가신청 모달
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  const now = new Date();
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const weekday = weekdays[now.getDay()];
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const loadTime = `${year}.${month}.${day} (${weekday}) ${hours}:${minutes}`;
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <header className="bg-gray-200 bg-opacity-50 sticky top-0 z-49 flex pl-6 pr-4 h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <div
          data-orientation="vertical"
          role="none"
          className="shrink-0 bg-border w-[1px] mr-2 h-4"
        ></div>
        <nav aria-label="breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
            {currentMenu && (
              <>
                {currentMenu.group && (
                  <li className="flex items-center gap-1.5">
                    <span>{currentMenu.group}</span>
                    <span className="text-muted-foreground/40">/</span>
                  </li>
                )}
                <li className="flex items-center gap-1.5">
                  <span className="transition-colors hover:text-foreground">
                    {currentMenu.item.label}
                  </span>
                </li>
              </>
            )}
          </ol>
        </nav>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <span className="text-sm hidden xs:block">{loadTime}</span>
        <button
          onClick={handleRefresh}
          className="flex items-center justify-center bg-white w-8 h-8 border border-[#eaeaea] rounded-[6px] transition-colors hover:bg-gray-100"
        >
          <img src="/svg/replay.svg" alt="새로고침" className="w-5 h-5" />
        </button>
        <Button onClick={() => setIsLeaveModalOpen(true)}>휴가신청</Button>
      </div>
      <LeaveRequestModal isOpen={isLeaveModalOpen} onClose={() => setIsLeaveModalOpen(false)} />
    </header>
  );
}
