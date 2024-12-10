import { useState } from "react";
import { MENU_ITEMS } from "~/shared/constants/navigation";
import { SidebarHeader } from "./components/SidebarHeader";
import { SidebarFooter } from "./components/SidebarFooter";
import { SidebarItem } from "./components/SidebarItem";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={`
          md:hidden fixed top-4 z-[60]
          transition-[left] duration-300 ease-in-out
          ${isMobileOpen ? "left-[260px]" : "left-4"}
        `}
      >
        <img src="/svg/bounding_box.svg" alt="menu" className="w-6 h-6" />
      </button>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`
          hidden md:flex absolute top-4 z-[60]
          transition-[left] duration-300 ease-in-out
          ${isCollapsed ? "left-[84px]" : "left-[260px]"}
        `}
      >
        <img src="/svg/bounding_box.svg" alt="menu" className="w-6 h-6" />
      </button>

      <div
        className={`transition-[transform,width] duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          ${isCollapsed ? "md:w-16" : "md:w-[240px]"}`}
      ></div>
      <aside
        className={` flex flex-col
          fixed
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
          <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto">
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
        <SidebarFooter
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
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
