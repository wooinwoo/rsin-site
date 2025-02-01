import { useFetcher, useRouteLoaderData } from "@remix-run/react";
import { useState } from "react";
import { LeaveRequestModal } from "~/features/leave/components/LeaveRequestModal";
import { LeaveModalResponse } from "~/features/leave/components/LeaveRequestModal/types";
import type { LoaderData } from "~/root";
import { Button } from "~/shared/ui/components/Button";
import { ReplayIcon } from "~/shared/ui/icons";
import { BellActiveIcon } from "~/shared/ui/icons/BellActiveIcon";
import { BellIcon } from "~/shared/ui/icons/BellIcon";
import { Breadcrumb } from "~/shared/ui/layouts/Header/components/Breadcrumb";
import { NotificationDropdown } from "~/shared/ui/layouts/Header/components/NotificationDropdown";
export function Header() {
  const data = useRouteLoaderData("root") as LoaderData;
  const notifications = data?.notifications ?? [];
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const hasUnreadNotifications = notifications.some((n) => !n.isRead);

  const now = new Date();
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const weekday = weekdays[now.getDay()];
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const annualFetcher = useFetcher<LeaveModalResponse>();
  const loadTime = `${year}.${month}.${day} (${weekday}) ${hours}:${minutes}`;
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleLeaveModalOpen = () => {
    // 모달 열기 전에 데이터 미리 조회
    annualFetcher.load("/resources/leave-modal");
    setIsLeaveModalOpen(true);
  };

  const handleNotificationClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsNotificationOpen(!isNotificationOpen);
  };
  return (
    <header className="bg-gray-200 bg-opacity-90 sticky top-0 z-[9990] flex pl-6 pr-4 h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <div
          data-orientation="vertical"
          role="none"
          className="shrink-0 bg-border w-[1px] mr-2 h-4"
        />
        <Breadcrumb />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <span className="text-sm hidden sm:block">{loadTime}</span>
        <button
          onClick={handleRefresh}
          className="flex items-center justify-center bg-white w-8 h-8 border border-[#eaeaea] rounded-[6px] transition-colors hover:bg-gray-100"
        >
          <ReplayIcon />
        </button>
        <div className="relative">
          <button
            data-bell-button
            onClick={handleNotificationClick}
            className="flex items-center justify-center bg-white w-8 h-8 border border-[#eaeaea] rounded-[6px] transition-colors hover:bg-gray-100"
          >
            {hasUnreadNotifications ? (
              <div className="relative">
                <BellActiveIcon className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              </div>
            ) : (
              <BellIcon className="w-5 h-5" />
            )}
          </button>
          {isNotificationOpen && (
            <NotificationDropdown
              notifications={notifications}
              onClose={() => setIsNotificationOpen(false)}
            />
          )}
        </div>
        <Button variant="red" onClick={() => handleLeaveModalOpen()}>
          휴가신청
        </Button>
      </div>
      <LeaveRequestModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        initialData={{
          annual: annualFetcher.data?.annualStatus,
          approverLines: annualFetcher.data?.approvers,
        }}
      />
    </header>
  );
}
