import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MENU_GROUPS } from "~/shared/constants/navigation";
import { SidebarHeader } from "./components/SidebarHeader";
import { SidebarFooter } from "./components/SidebarFooter";
import { SidebarItem } from "./components/SidebarItem";
import { SidebarGroup } from "./components/SidebarGroup";
import { BoundingBoxIcon } from "~/shared/ui/icons";

export function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    isMobileOpen && setIsMobileOpen(false);
  }, [location?.pathname]);

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={`
          md:hidden fixed top-4 z-[9993]
          transition-[left] duration-300 ease-in-out
          ${isMobileOpen ? "left-[200px]" : "left-4"}
        `}
      >
        <BoundingBoxIcon className="w-6 h-6" />
      </button>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`
          hidden md:flex fixed top-4 z-[9992]
          transition-[left] duration-300 ease-in-out
          ${isCollapsed ? "left-[84px]" : "left-[260px]"}
        `}
      >
        <BoundingBoxIcon className="w-6 h-6" />
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
          z-[9992]
        `}
      >
        <SidebarHeader
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
        <div className="flex-1">
          {MENU_GROUPS.map((group) => (
            <SidebarGroup key={group.label} label={group.label} isCollapsed={isCollapsed}>
              {group.items.map((item: any) => (
                <SidebarItem
                  key={item.path}
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  isCollapsed={isCollapsed}
                />
              ))}
            </SidebarGroup>
          ))}
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
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-[9991]"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
