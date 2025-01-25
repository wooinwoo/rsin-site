import { useEffect, useRef } from "react";
import { Modal } from "~/shared/ui/components/Modal";
import { useNavigate, useFetcher } from "@remix-run/react";
import { Notification } from "~/entities/notification/model";

interface NotificationDropdownProps {
  notifications: Notification[];
  onClose: () => void;
}

export function NotificationDropdown({ notifications, onClose }: NotificationDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const readFetcher = useFetcher();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isMobile) {
      function handleClickOutside(event: MouseEvent) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          const bellButton = document.querySelector("[data-bell-button]");
          if (!bellButton?.contains(event.target as Node)) {
            onClose();
          }
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [onClose, isMobile]);

  const handleNotificationClick = (notification: Notification) => {
    onClose();
    readFetcher.submit(
      {
        intent: "read",
        ids: JSON.stringify([notification.id]),
      },
      {
        method: "post",
        action: "/resources/notification",
      }
    );

    navigate(notification.redirectUri);
  };

  const NotificationList = () => (
    <div className="max-h-[400px] overflow-y-auto">
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => handleNotificationClick(notification)}
            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
              !notification.isRead ? "bg-blue-50" : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">{notification.message}</p>
              </div>
              {!notification.isRead && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {new Date(notification.createdAt).toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </p>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-gray-500">새로운 알림이 없습니다</div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <Modal isOpen={true} onClose={onClose} title="알림">
        <NotificationList />
      </Modal>
    );
  }

  return (
    <div
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()}
      className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
    >
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium">알림</h3>
      </div>
      <NotificationList />
    </div>
  );
}
