import type { Employee } from "~/entities/employees/model";

// Loader 타입
export interface TeamManagementLoaderData {
  employees: Employee[];
}

// Action 타입
export interface TeamManagementActionData {
  success: boolean;
  message: string;
}

// Action Intent 타입
export type ActionIntent = "create" | "update" | "resign";

// Form 데이터 타입
export interface EmployeeFormData {
  name: string;
  phone: string;
  email: string;
  department: string;
  position: string;
  joinDate: string;
  birthDate: string;
  mbti: string | null;
  isManager: boolean;
}
