export type NotificationType = "approved" | "rejected" | "requested";

export interface Notification {
  id: number;
  employeeId: number;
  type: NotificationType;
  message: string;
  isRead: boolean;
  readAt: string | null;
  redirectUri: string;
  createdAt: string;
}

export interface NotificationResponse {
  totalCount: number;
  notifications: Notification[];
}

export interface ReadNotificationsRequest {
  ids: string[];
}
