import { Outlet } from "@remix-run/react";

export default function TeamManagementLayout() {
  return (
    <div className="mx-auto sm:px-4">
      <Outlet />
    </div>
  );
}
