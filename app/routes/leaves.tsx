import { Link, Outlet, useLocation } from "@remix-run/react";

export default function LeavesLayout() {
  const location = useLocation();
  const isApproval = location.pathname === "/leaves/pending";
  const isResult = location.pathname === "/leaves/completed";

  return (
    <div className="mx-auto sm:px-4">
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="inline-flex bg-white h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground mb-4"
      >
        <Link
          to="pending"
          role="tab"
          aria-selected={isApproval}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
            ${isApproval ? "bg-gray-200 text-foreground shadow" : ""}`}
        >
          결재 대기
        </Link>
        <Link
          to="completed"
          role="tab"
          aria-selected={isResult}
          className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
            ${isResult ? "bg-gray-200 text-foreground shadow" : ""}`}
        >
          결재 완료
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
