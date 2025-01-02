import { adminEmployeeApi } from "~/entities/employees/api";
import type { CreateEmployeeRequest, UpdateEmployeeRequest } from "~/entities/employees/model";

export async function getEmployees() {
  try {
    const response = await adminEmployeeApi.getEmployees();
    return { employees: response.data.employees };
  } catch (error) {
    throw new Error("Failed to fetch employees");
  }
}

export async function createEmployee(data: CreateEmployeeRequest) {
  try {
    await adminEmployeeApi.createEmployee(data);
    return { success: true, message: "직원이 등록되었습니다." };
  } catch (error) {
    throw new Error("Failed to create employee");
  }
}

export async function updateEmployee(empNo: number, data: UpdateEmployeeRequest) {
  try {
    await adminEmployeeApi.updateEmployee(empNo, data);
    return { success: true, message: "직원 정보가 수정되었습니다." };
  } catch (error) {
    throw new Error("Failed to update employee");
  }
}

export async function resignEmployee(id: number, resignedAt: string) {
  try {
    await adminEmployeeApi.resignEmployee(id, { resignedAt });
    return { success: true, message: "퇴사 처리가 완료되었습니다." };
  } catch (error) {
    throw new Error("Failed to resign employee");
  }
}
