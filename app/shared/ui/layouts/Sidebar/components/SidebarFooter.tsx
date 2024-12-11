interface SidebarFooterProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
}

export function SidebarFooter({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}: SidebarFooterProps) {
  return (
    <>
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
          <span className="relative flex shrink-0 overflow-hidden h-8 w-8 rounded-lg">
            <img
              className="aspect-square h-full w-full"
              alt="shadcn"
              src="/public/images/profile.jpg"
            />
          </span>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">김태완</span>
            <span className="truncate text-xs">srpn@rs-team.com</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-chevrons-up-down ml-auto size-4"
          >
            <path d="m7 15 5 5 5-5"></path>
            <path d="m7 9 5-5 5 5"></path>
          </svg>
        </div>
      </button>
    </>
  );
}
