export interface Notification {
  id: string;
  employeeId: string;
  type: "approved" | "rejected" | "requested";
  message: string;
  isRead: boolean;
  readAt: string | null;
  redirectUri: string;
  createdAt: string;
}

export interface GetNotificationsResponse {
  totalCount: number;
  items: Notification[];
}

export interface ReadNotificationsRequest {
  ids: string[];
}
