import { client } from "~/shared/api";
import type {
  CreateEmployeeRequest,
  UpdateEmployeeRequest,
  ResignEmployeeRequest,
  GetEmployeesResponse,
  Employee,
} from "./model";

// 관리자용 API
export const adminEmployeeApi = {
  getEmployees(size: number = 25) {
    return client.get<GetEmployeesResponse>(`/admin/employees?size=${size}`);
  },

  createEmployee(data: CreateEmployeeRequest) {
    return client.post<Employee>("/admin/employees", data);
  },

  updateEmployee(id: number, data: UpdateEmployeeRequest) {
    return client.patch<Employee>(`/admin/employees/${id}`, data);
  },

  resignEmployee(id: number, data: ResignEmployeeRequest) {
    return client.patch<Employee>(`/admin/employees/${id}/resign`, data);
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
