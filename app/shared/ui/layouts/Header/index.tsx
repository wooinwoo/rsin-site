import { Link, useLocation } from "@remix-run/react";
import { MENU_ITEMS } from "~/shared/constants/navigation";

export function Header() {
  const location = useLocation();
  const currentPageTitle = MENU_ITEMS.find((item) => item.path === location.pathname)?.label || "";

  return (
    <header className="border-gray-400 h-[54px] bg-gray-900">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-white text-base font-bold">{currentPageTitle}</h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center">
            <img src="/svg/notification.svg" alt="알림" className="w-[30px] h-[30px]" />
          </button>
          <button className="flex items-center justify-center">
            <img src="/svg/profile.svg" alt="프로필" className="w-[30px] h-[30px]" />
          </button>
        </div>
      </div>
    </header>
  );
}
