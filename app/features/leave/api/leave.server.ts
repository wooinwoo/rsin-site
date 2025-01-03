import { withAuth } from "~/shared/api/withAuth";
import { leaveApi } from "~/entities/leave/api";
import type { GetEmployeeAnnualParams } from "~/entities/leave/model";

export async function getAnnualStatus(request: Request, params?: GetEmployeeAnnualParams) {
  return withAuth(request, async (token) => {
    const response = await leaveApi.getAnnualStatus(token, params);
    return response.data;
  });
}
