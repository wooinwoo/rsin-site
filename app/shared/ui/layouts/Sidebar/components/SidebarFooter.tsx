import { useRevalidator } from "@remix-run/react";
import { Form } from "@remix-run/react";
import { useRef, useState } from "react";
import { ProfileCell } from "~/features/datatable/components/cells/ProfileCell";
import { ProfileEditModal } from "~/features/profile/components/ProfileEditModal";
import { ProfileEditData } from "~/features/profile/components/ProfileEditModal/types";
import { useClickAway } from "~/shared/hooks/useClickAway";
import { useAuthStore } from "~/shared/store";
import { LeaveSimulatorModal } from "~/features/leave/components/LeaveSimulatorModal";
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
  const user = useAuthStore((state) => state.user);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const revalidator = useRevalidator();

  useClickAway([contextMenuRef, buttonRef], () => {
    setIsContextMenuOpen(false);
  });
  return (
    <>
      <div className="relative border-t border-gray-800">
        <button
          ref={buttonRef}
          className="w-full flex justify-between items-center overflow-hidden rounded-md p-2 text-left outline-none 
            transition-all hover:bg-gray-800"
          onClick={() => setIsContextMenuOpen(!isContextMenuOpen)}
        >
          <div className={`p-2 flex w-full items-center gap-2`}>
            <span className="relative flex shrink-0 overflow-hidden h-8 w-8 rounded-lg">
              <ProfileCell
                profileUrl={user?.thumbnailPath ?? ""}
                employeeName={user?.name || ""}
                withBorder={false}
              />
            </span>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold text-gray-100">{user?.name}</span>
              <span className="truncate text-xs text-gray-400">{user?.email}</span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400 ml-auto size-4"
            >
              <path d="m7 15 5 5 5-5"></path>
              <path d="m7 9 5-5 5 5"></path>
            </svg>
          </div>
        </button>

        {/* Context Menu */}
        {isContextMenuOpen && (
          <div
            ref={contextMenuRef}
            className={`
              absolute bottom-full mb-2 w-48 rounded-lg bg-white shadow-lg border border-gray-200 py-1
             ${
               isMobileOpen
                 ? "left-0 translate-x-4"
                 : isCollapsed
                 ? "left-0 translate-x-16"
                 : "left-0 translate-x-40"
             }
            `}
          >
            <button
              onClick={() => {
                setIsSimulatorOpen(true);
                setIsContextMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 0 1 9-9" />
              </svg>
              연차 시뮬레이터
            </button>
            <button
              onClick={() => {
                setIsProfileEditModalOpen(true);
                setIsContextMenuOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              내 정보 수정
            </button>
            <Form action="/auth/logout" method="post">
              <button
                type="submit"
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-log-out"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" x2="9" y1="12" y2="12" />
                </svg>
                로그아웃
              </button>
            </Form>
          </div>
        )}
      </div>
      <ProfileEditModal
        isOpen={isProfileEditModalOpen}
        onClose={() => setIsProfileEditModalOpen(false)}
        initialData={user as ProfileEditData | undefined}
        onSubmit={async (data) => {
          setIsProfileEditModalOpen(false);
          revalidator.revalidate();
        }}
      />
      <LeaveSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        joinedAt={user?.joinedAt}
      />
    </>
  );
}
