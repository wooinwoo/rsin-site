import { Link, useLocation } from "@remix-run/react";
import { MENU_ITEMS } from "~/shared/constants/navigation";

export function Header() {
  const location = useLocation();
  const currentPageTitle = MENU_ITEMS.find((item) => item.path === location.pathname)?.label || "";

  return (
    <header className="flex pl-10 h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <div
          data-orientation="vertical"
          role="none"
          className="shrink-0 bg-border w-[1px] mr-2 h-4"
        ></div>
        <nav aria-label="breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
            <li className="items-center gap-1.5 hidden md:block">
              <a className="transition-colors hover:text-foreground" href="#">
                {currentPageTitle}
              </a>
            </li>
            {/* <li
              role="presentation"
              aria-hidden="true"
              className="[&amp;>svg]:w-3.5 [&amp;>svg]:h-3.5 hidden md:block"
            >
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
                className="lucide lucide-chevron-right "
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </li> */}
          </ol>
        </nav>
      </div>
    </header>
  );
}
