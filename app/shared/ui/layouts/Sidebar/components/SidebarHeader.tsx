import { LogoIcon } from "~/shared/ui/icons";
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
      className="w-full flex items-center overflow-hidden p-2 text-left outline-none 
      h-14
      border-b border-gray-800
    transition-all hover:bg-gray-800 
    disabled:pointer-events-none disabled:opacity-50"
      type="button"
      onClick={() => {
        setIsCollapsed(!isCollapsed);
        setIsMobileOpen(!isMobileOpen);
      }}
    >
      <div className={`flex w-full items-center gap-2`}>
        <div className="ml-1 mr-1 flex aspect-square items-center justify-center rounded-lg bg-gray-600 text-white">
          <LogoIcon className="min-w-[32px] w-[32px] h-[32px]" />
        </div>
        <div className="grid flex-1 text-left text-lg leading-tight">
          <span className="truncate font-semibold text-base tracking-tight text-gray-100">
            RS-TEAM
          </span>
          <span className="truncate text-xs text-gray-400">RSIN Portal</span>
        </div>
      </div>
    </button>
  );
}
