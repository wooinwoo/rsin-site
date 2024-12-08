import { useState } from "react";
import { MENU_ITEMS } from "~/shared/constants/navigation";
import { SidebarHeader } from "./components/SidebarHeader";
import { SidebarItem } from "./components/SidebarItem";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(true)}
        className={`
          md:hidden fixed top-4 z-[60]
          transition-[left] duration-300 ease-in-out
          ${isMobileOpen ? "left-[200px]" : "left-4"}
        `}
      >
        <img src="/svg/bounding_box.svg" alt="menu" className="w-6 h-6" />
      </button>

      <aside
        className={`
          fixed md:relative
          h-svh bg-white shadow-lg md:shadow-none
          transition-[transform,width] duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          ${isCollapsed ? "md:w-16" : "md:w-[240px]"}
          md:translate-x-0
          w-[240px]
          z-[50]
        `}
      >
        <SidebarHeader
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        <div className="flex h-full w-full flex-col">
          <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto pt-[54px]">
            <div className="relative flex w-full min-w-0 flex-col p-2">
              <nav className="w-full">
                <ul className="flex w-full min-w-0 flex-col">
                  {MENU_ITEMS.map((item, index) => (
                    <SidebarItem
                      key={item.label}
                      {...item}
                      isCollapsed={isCollapsed}
                      isFirst={index === 0}
                    />
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </aside>

      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-[40]"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
