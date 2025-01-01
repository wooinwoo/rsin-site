import { useRef, useState } from "react";
import { useClickAway } from "~/shared/hooks/useClickAway";
import { useNavigate } from "@remix-run/react";
import { ProfileEditModal } from "~/features/profile/components/ProfileEditModal";
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
  const navigate = useNavigate();
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const mockUserData = {
    name: "김태완",
    departmentId: 1,
    position: "manager",
    joinedAt: "2024-01-01",
    email: "srpn@rs-team.com",
    phone: "01012345678",
    birth: "1990-01-01",
    mbti: "ENFP",
  };

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
              <img className="aspect-square h-full w-full" alt="프로필" src="/images/profile.jpg" />
            </span>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold text-gray-100">김태완</span>
              <span className="truncate text-xs text-gray-400">srpn@rs-team.com</span>
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
            ${isCollapsed ? "left-16" : "left-[230px]"}
            ${isMobileOpen ? "left-[130px]" : ""}
          `}
          >
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
            <button
              onClick={() => {
                navigate("/auth/login");
                /* 로그아웃 핸들러 */
              }}
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
          </div>
        )}
      </div>
      <ProfileEditModal
        isOpen={isProfileEditModalOpen}
        onClose={() => setIsProfileEditModalOpen(false)}
        initialData={mockUserData}
        onSubmit={async (data) => {
          console.log("프로필 수정 데이터:", data);
          setIsProfileEditModalOpen(false);
        }}
      />
    </>
  );
}
