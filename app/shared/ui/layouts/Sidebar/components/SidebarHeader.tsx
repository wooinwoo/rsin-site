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
    <button
      data-sidebar="menu-button"
      data-size="lg"
      data-active="false"
      className="w-full  flex justify-between items-center overflow-hidden rounded-md p-2 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground  text-sm group-data-[collapsible=icon]:!p-0 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      type="button"
      aria-haspopup="menu"
      aria-expanded={isMobileOpen}
      data-state={isMobileOpen ? "open" : "closed"}
      onClick={() => {
        setIsCollapsed(!isCollapsed);
        setIsMobileOpen(!isMobileOpen);
      }}
    >
      <div className={`p-2 flex w-full items-center gap-2`}>
        <div className=" flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground ">
          <img src="/public/svg/logo.svg" className="w-[30px] h-[30px]" alt="로고" />
        </div>
        <div className="grid flex-1 text-left text-lg leading-tight">
          <span className="truncate font-semibold">RS-TEAM</span>
          <span className="truncate text-xs">연차관리시스템</span>
        </div>
      </div>
    </button>
  );
}