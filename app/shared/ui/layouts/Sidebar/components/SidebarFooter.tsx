import { Form, useNavigate } from "@remix-run/react";
import { useRef, useState } from "react";
import { authApi } from "~/entities/auth/api";
import { ProfileEditModal } from "~/features/profile/components/ProfileEditModal";
import { useClickAway } from "~/shared/hooks/useClickAway";
import { useAuthStore } from "~/shared/store";
import { getFullImageUrl } from "~/shared/utils/imges";
import { ProfileEditData } from "~/features/profile/components/ProfileEditModal/types";
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
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleLogout = async () => {
    try {
      await authApi.signOut();
      clearUser(); // zustand store 초기화
      navigate("/auth/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      // 에러가 발생해도 일단 로그아웃 처리
      clearUser();
      navigate("/auth/login");
    }
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
              <img
                className="aspect-square h-full w-full"
                alt="프로필"
                src={getFullImageUrl(user?.thumbnailPath)}
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
            <Form
              action="/auth/logout"
              method="post"
              onSubmit={() => {
                clearUser(); // zustand store 초기화
              }}
            >
              <button
                onClick={handleLogout}
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
          console.log("프로필 수정 데이터:", data);
          setIsProfileEditModalOpen(false);
        }}
      />
    </>
  );
}
