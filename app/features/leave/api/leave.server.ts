import { client } from "~/shared/api";
import { GetEmployeeAnnualParams, GetEmployeeAnnualResponse } from "~/entities/leave/model";

export const leaveApi = {
  getAnnualStatus(params?: GetEmployeeAnnualParams) {
    const searchParams = new URLSearchParams();

    if (params?.size) searchParams.append("size", params.size.toString());
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.departmentId) searchParams.append("departmentId", params.departmentId.toString());
    if (params?.employeeName) searchParams.append("employeeName", params.employeeName);

    return client.get<GetEmployeeAnnualResponse>(`/leaves/annual?${searchParams.toString()}`);
  },
};
