import { withAuth } from "~/shared/api/withAuth";
import { dashboardApi } from "~/entities/dashboard/api";
import type {
  GetDashboardParams,
  DashboardLeave,
  DashboardBirthday,
  DashboardHoliday,
} from "~/entities/dashboard/model";

export async function getDashboardLeaves(
  request: Request,
  params?: GetDashboardParams
): Promise<DashboardLeave[]> {
  return withAuth(request, async (token) => {
    const response = await dashboardApi.getLeaves(token, params);
    return response.data as unknown as DashboardLeave[];
  });
}

export async function getDashboardBirthdays(
  request: Request,
  params?: GetDashboardParams
): Promise<DashboardBirthday[]> {
  return withAuth(request, async (token) => {
    const response = await dashboardApi.getBirthdays(token, params);
    return response.data as unknown as DashboardBirthday[];
  });
}

export async function getDashboardHolidays(
  request: Request,
  params?: GetDashboardParams
): Promise<DashboardHoliday[]> {
  return withAuth(request, async (token) => {
    const response = await dashboardApi.getHolidays(token, params);
    return response.data as unknown as DashboardHoliday[];
  });
}
