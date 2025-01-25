import { client } from "~/shared/api";
import type { NotificationResponse, ReadNotificationsRequest } from "./model";

export const notificationApi = {
  getSelf(CookieHeader?: string) {
    return client.get<NotificationResponse>("/notifications/self", {
      headers: {
        Cookie: CookieHeader || "",
      },
    });
  },

  read(CookieHeader: string, data: ReadNotificationsRequest) {
    return client.patch("/notifications/read", data, {
      headers: {
        Cookie: CookieHeader || "",
      },
    });
  },

  readAll(CookieHeader: string) {
    return client.patch("/notifications/read/all", undefined, {
      headers: {
        Cookie: CookieHeader || "",
      },
    });
  },
};
