import { withAuth } from "~/shared/api/withAuth";
import { notificationApi } from "~/entities/notification/api";
import type { ReadNotificationsRequest } from "~/entities/notification/model";

export async function getNotifications(request: Request) {
  return withAuth(request, async (token) => {
    const response = await notificationApi.getSelf(token);
    return response.data;
  });
}

export async function readNotifications(request: Request, data: ReadNotificationsRequest) {
  return withAuth(request, async (token) => {
    const response = await notificationApi.read(token, data);
    return response.data;
  });
}

export async function readAllNotifications(request: Request) {
  return withAuth(request, async (token) => {
    const response = await notificationApi.readAll(token);
    return response.data;
  });
}
