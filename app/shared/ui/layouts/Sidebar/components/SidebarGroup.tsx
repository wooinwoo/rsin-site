interface SidebarGroupProps {
  label: string;
  children: React.ReactNode;
  isCollapsed?: boolean;
}

export function SidebarGroup({ label, children, isCollapsed }: SidebarGroupProps) {
  return (
    <div className="relative flex w-full min-w-0 flex-col p-2">
      <nav className="w-full">
        {label && (
          <div
            data-sidebar="group-label"
            className="
              text-gray-400
              duration-200 flex h-8 shrink-0 items-center rounded-md px-2 
              text-xs font-medium outline-none 
              transition-[margin,opacity] ease-linear 
              group-data-[collapsible=icon]:-mt-8 
              group-data-[collapsible=icon]:opacity-0"
          >
            {label}
          </div>
        )}
        <ul className="flex w-full min-w-0 flex-col gap-1">{children}</ul>
      </nav>
    </div>
  );
}
