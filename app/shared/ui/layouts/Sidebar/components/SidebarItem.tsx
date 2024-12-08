import { NavLink } from "@remix-run/react";
interface SidebarItemProps {
  icon: string;
  label: string;
  path: string;
  isCollapsed: boolean;
  isFirst?: boolean;
}

export function SidebarItem({ icon, label, path, isCollapsed, isFirst }: SidebarItemProps) {
  return (
    <li className="relative">
      <NavLink
        to={path}
        className={({ isActive }) => `
          relative flex items-center p-2 text-left
          transition-colors duration-200 outline-none h-12 text-base
          hover:bg-gray-300 hover:text-gray-900 rounded-md
          ${isActive ? "bg-gray-300 font-medium text-gray-900" : "text-gray-600"}
        `}
      >
        <div className="relative w-[30px] flex items-center flex-shrink-0">
          <img src={icon} alt={label} className="w-[30px] h-[30px]" />
        </div>
        <div
          className={`
            ml-2 transition-[width,opacity] duration-300 ease-in-out text-base
            ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
            overflow-hidden whitespace-nowrap
          `}
        >
          {label}
        </div>
      </NavLink>

      {isFirst && <div className="my-2 border-t border-gray-400" />}

      {isCollapsed && (
        <div
          className="absolute left-full top-0 ml-2 hidden rounded-md 
                    bg-gray-900 px-2 py-1 text-base text-white 
                    group-hover:block"
        >
          {label}
        </div>
      )}
    </li>
  );
}
