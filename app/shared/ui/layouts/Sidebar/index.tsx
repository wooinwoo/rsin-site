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
  const boundingBoxButton = (onClick: () => void, className: string) => (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center bg-white w-8 h-8 
        border border-[#eaeaea] rounded-[6px] 
        transition-all duration-300 ease-in-out
        hover:bg-gray-100
        fixed top-3
        ${className}
      `}
    >
      <BoundingBoxIcon className="w-5 h-5 text-gray-600" />
    </button>
  );

  return (
    <>
      {boundingBoxButton(() => setIsMobileOpen(!isMobileOpen), `md:hidden z-[9991] left-4`)}

      {boundingBoxButton(
        () => setIsCollapsed(!isCollapsed),
        `hidden md:flex z-[9992] transform ${
          isCollapsed ? "left-[84px] translate-x-0" : "left-[260px] translate-x-0"
        }`
      )}

      <div
        className={`transition-[transform,width] duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          ${isCollapsed ? "md:w-16" : "md:w-[240px]"}`}
      ></div>
      <aside
        className={`
    flex flex-col
    fixed
    h-svh bg-gray-900 shadow-lg md:shadow-none
    transition-[transform,width] duration-300 ease-in-out
    ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
    ${isCollapsed ? "md:w-16" : "md:w-[240px]"}
    md:translate-x-0
    w-[240px]
    z-[9992]
    border-r border-gray-800
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
