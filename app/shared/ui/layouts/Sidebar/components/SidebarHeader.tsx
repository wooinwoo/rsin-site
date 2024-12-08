interface SidebarHeaderProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
}

export function SidebarHeader({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}: SidebarHeaderProps) {
  return (
    <div className="absolute top-0 left-0 w-full h-[54px] bg-[#333333] flex items-center justify-between px-4">
      <h1
        className={`
          text-white font-bold text-base whitespace-nowrap
          transition-[width,opacity] duration-200
          ${isCollapsed ? "opacity-0 w-0 md:block" : "opacity-100"}
        `}
      >
        RS-TEAM
      </h1>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden md:flex items-center justify-center flex-shrink-0 z-10"
      >
        <img src="/svg/bounding_box.svg" alt="toggle" className="w-6 h-6" />
      </button>
      <button onClick={() => setIsMobileOpen(false)} className="md:hidden absolute top-4 right-4">
        <img src="/svg/close.svg" alt="close" className="w-6 h-6" />
      </button>
    </div>
  );
}
