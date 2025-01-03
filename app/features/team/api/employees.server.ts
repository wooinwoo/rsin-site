import { adminEmployeeApi } from "~/entities/employees/api";
import { withAuth } from "~/shared/api/withAuth";
import type { CreateEmployeeRequest, UpdateEmployeeRequest } from "~/entities/employees/model";
import type { Employee } from "~/entities/employees/model";
export async function getEmployees(request: Request) {
  return withAuth(request, async (token) => {
    const response = await adminEmployeeApi.getEmployees(token);
    return { employees: response.data.employees as Employee[] };
  });
}

export async function createEmployee(request: Request, data: CreateEmployeeRequest) {
  return withAuth(request, async (token) => {
    await adminEmployeeApi.createEmployee(token, data);
    return { success: true, message: "직원이 등록되었습니다." };
  });
}
export async function updateEmployee(request: Request, empNo: number, data: UpdateEmployeeRequest) {
  return withAuth(request, async (token) => {
    await adminEmployeeApi.updateEmployee(token, empNo, data);
    return { success: true, message: "직원 정보가 수정되었습니다." };
  });
}

export async function resignEmployee(request: Request, id: number, resignedAt: string) {
  return withAuth(request, async (token) => {
    await adminEmployeeApi.resignEmployee(token, id, { resignedAt });
    return { success: true, message: "퇴사 처리가 완료되었습니다." };
  });
}
