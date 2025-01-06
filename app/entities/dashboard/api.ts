import { client } from "~/shared/api";
import type {
  GetDashboardParams,
  GetDashboardLeavesResponse,
  GetDashboardBirthdaysResponse,
  GetDashboardHolidaysResponse,
} from "./model";

export const dashboardApi = {
  getLeaves(CookieHeader?: string, params?: GetDashboardParams) {
    const searchParams = new URLSearchParams();

    if (params?.startDate) searchParams.append("startDate", params.startDate);
    if (params?.endDate) searchParams.append("endDate", params.endDate);

    return client.get<GetDashboardLeavesResponse>(
      `/dashboard/documents/leaves?${searchParams.toString()}`,
      {
        headers: {
          Cookie: CookieHeader || "",
        },
      }
    );
  },

  getBirthdays(CookieHeader?: string, params?: GetDashboardParams) {
    const searchParams = new URLSearchParams();

    if (params?.startDate) searchParams.append("startDate", params.startDate);
    if (params?.endDate) searchParams.append("endDate", params.endDate);

    return client.get<GetDashboardBirthdaysResponse>(
      `/dashboard/birthdays?${searchParams.toString()}`,
      {
        headers: {
          Cookie: CookieHeader || "",
        },
      }
    );
  },

  getHolidays(CookieHeader?: string, params?: GetDashboardParams) {
    const searchParams = new URLSearchParams();

    if (params?.startDate) searchParams.append("startDate", params.startDate);
    if (params?.endDate) searchParams.append("endDate", params.endDate);

    return client.get<GetDashboardHolidaysResponse>(
      `/dashboard/holidays?${searchParams.toString()}`,
      {
        headers: {
          Cookie: CookieHeader || "",
        },
      }
    );
  },
};
