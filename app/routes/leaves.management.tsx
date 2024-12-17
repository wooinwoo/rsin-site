import { Link, Outlet, useLocation } from "@remix-run/react";

export default function LeavesManagementLayout() {
  const location = useLocation();
  const isHistory = location.pathname === "/leaves/management/history";
  const isSummary = location.pathname === "/leaves/management/summary";

  return (
    <div className="mx-auto sm:px-4">
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="inline-flex bg-white h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground mb-4"
      >
        <Link
          to="/leaves/management/history"
          role="tab"
          aria-selected={isHistory}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
            ${isHistory ? "bg-gray-200 text-foreground shadow font-medium" : ""}`}
        >
          휴가 내역
        </Link>
        <Link
          to="/leaves/management/summary"
          role="tab"
          aria-selected={isSummary}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
            ${isSummary ? "bg-gray-200 text-foreground shadow font-medium" : ""}`}
        >
          연차 현황
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
