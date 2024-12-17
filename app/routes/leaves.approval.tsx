import { Link, Outlet, useLocation } from "@remix-run/react";

export default function LeavesApprovalLayout() {
  const location = useLocation();
  const isPending = location.pathname === "/leaves/approval/pending";
  const isCompleted = location.pathname === "/leaves/approval/completed";

  return (
    <div className="mx-auto sm:px-4">
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="inline-flex bg-white h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground mb-4"
      >
        <Link
          to="/leaves/approval/pending"
          role="tab"
          aria-selected={isPending}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
            ${isPending ? "bg-gray-200 text-foreground shadow font-medium" : ""}`}
        >
          결재 대기
        </Link>
        <Link
          to="/leaves/approval/completed"
          role="tab"
          aria-selected={isCompleted}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
            ${isCompleted ? "bg-gray-200 text-foreground shadow font-medium" : ""}`}
        >
          결재 완료
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
