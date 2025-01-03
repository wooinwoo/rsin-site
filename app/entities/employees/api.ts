import { client } from "~/shared/api";
import type {
  CreateEmployeeRequest,
  UpdateEmployeeRequest,
  ResignEmployeeRequest,
  GetEmployeesResponse,
  Employee,
} from "./model";

interface ApiResponse<T> {
  data: T;
}

// 관리자용 API
export const adminEmployeeApi = {
  getEmployees(cookieHeader?: string | null): Promise<ApiResponse<{ employees: Employee[] }>> {
    return client.get(`/employees`, {
      headers: {
        Cookie: cookieHeader || "",
      },
    });
  },

  createEmployee(cookieHeader: string, data: CreateEmployeeRequest) {
    return client.post(`/admin/employees`, data, {
      headers: { Cookie: cookieHeader || "" },
    });
  },

  updateEmployee(cookieHeader: string, empNo: number, data: UpdateEmployeeRequest) {
    return client.patch(`/admin/employees/${empNo}`, data, {
      headers: { Cookie: cookieHeader || "" },
    });
  },

  resignEmployee(cookieHeader: string, id: number, data: { resignedAt: string }) {
    return client.patch(`/admin/employees/${id}/resign`, data, {
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
