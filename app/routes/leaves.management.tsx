import { Link, Outlet, useLocation } from "@remix-run/react";

export default function LeavesManagementLayout() {
  const location = useLocation();
  const isHistory = location.pathname === "/leaves/management/history";
  const isSummary = location.pathname === "/leaves/management/summary";

  return (
    <div className="mx-auto sm:px-4">
      <Outlet />
    </div>
  );
}
