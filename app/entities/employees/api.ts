import { client } from "~/shared/api";
import type {
  CreateEmployeeRequest,
  UpdateEmployeeRequest,
  Employee,
  GetEmployeesParams,
} from "./model";

interface ApiResponse<T> {
  data: T;
}

// 관리자용 API
export const adminEmployeeApi = {
  getEmployees(
    cookieHeader: string | null,
    params: GetEmployeesParams
  ): Promise<ApiResponse<{ totalCount: number; employees: Employee[] }>> {
    return client.get(`/employees?size=${params.size}&page=${params.page}`, {
      headers: {
        Cookie: cookieHeader || "",
      },
    });
  },

  createEmployee(cookieHeader: string, data: CreateEmployeeRequest) {
    return client.post(`/employees`, data, {
      headers: { Cookie: cookieHeader || "" },
    });
  },

  updateEmployee(cookieHeader: string, empNo: number, data: UpdateEmployeeRequest) {
    return client.patch(`/employees/${empNo}`, data, {
      headers: { Cookie: cookieHeader || "" },
    });
  },

  resignEmployee(cookieHeader: string, id: number, data: { resignedAt: string }) {
    return client.patch(`/employees/${id}/resign`, data, {
      headers: { Cookie: cookieHeader || "" },
    });
  },
};
// 일반 직원용 API
export const employeeApi = {
  getSelf() {
    return client.get<Employee>("/employees/self");
  },

  updateSelf(id: number, data: UpdateEmployeeRequest) {
    return client.patch<Employee>(`/employees/${id}`, data);
  },
};
