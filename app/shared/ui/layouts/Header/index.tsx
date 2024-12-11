import { useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { MENU_ITEMS } from "~/shared/constants/navigation";
import { LeaveRequestModal } from "~/features/leave/components/LeaveRequestModal";
import { Button } from "~/shared/ui/components/Button";

export function Header() {
  const location = useLocation();
  const currentPageTitle = MENU_ITEMS.find((item) => item.path === location.pathname)?.label || "";

  // 데이터 로드 시점 기록
  const [loadTime, setLoadTime] = useState<string>("");
  // 휴가신청 모달
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  useEffect(() => {
    const now = new Date();
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"]; // 요일 배열

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 월(0부터 시작하므로 +1)
    const day = String(now.getDate()).padStart(2, "0");
    const weekday = weekdays[now.getDay()]; // 요일 가져오기
    const hours = String(now.getHours()).padStart(2, "0"); // 24시간 형식
    const minutes = String(now.getMinutes()).padStart(2, "0");

    // 형식: YYYY.MM.DD (요일) HH:mm
    const formattedDate = `${year}.${month}.${day} (${weekday}) ${hours}:${minutes}`;
    setLoadTime(formattedDate);
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행

  const handleRefresh = () => {
    window.location.reload(); // 페이지 새로고침
  };

  return (
    <header className="bg-gray-200 bg-opacity-50 sticky top-0 z-49 flex pl-6 pr-4  h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <div
          data-orientation="vertical"
          role="none"
          className="shrink-0 bg-border w-[1px] mr-2 h-4"
        ></div>
        <nav aria-label="breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
            <li className="items-center gap-1.5 ">
              <a className="transition-colors hover:text-foreground" href="#">
                {currentPageTitle}
              </a>
            </li>
          </ol>
        </nav>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <span className="text-sm">{loadTime}</span>
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
