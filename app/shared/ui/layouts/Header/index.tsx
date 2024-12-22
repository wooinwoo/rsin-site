import { useState } from "react";
import { LeaveRequestModal } from "~/features/leave/components/LeaveRequestModal";
import { Button } from "~/shared/ui/components/Button";
import { Breadcrumb } from "~/shared/ui/layouts/Header/components/Breadcrumb";
import { ReplayIcon } from "~/shared/ui/icons";

export function Header() {
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
    <header className="bg-gray-200 bg-opacity-80 sticky top-0 z-[9990] flex pl-6 pr-4 h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <div
          data-orientation="vertical"
          role="none"
          className="shrink-0 bg-border w-[1px] mr-2 h-4"
        />
        <Breadcrumb />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <span className="text-sm hidden xs:block">{loadTime}</span>
        <button
          onClick={handleRefresh}
          className="flex items-center justify-center bg-white w-8 h-8 border border-[#eaeaea] rounded-[6px] transition-colors hover:bg-gray-100"
        >
          <ReplayIcon />
        </button>
        <Button variant="primary" onClick={() => setIsLeaveModalOpen(true)}>
          휴가신청
        </Button>
      </div>
      <LeaveRequestModal isOpen={isLeaveModalOpen} onClose={() => setIsLeaveModalOpen(false)} />
    </header>
  );
}
