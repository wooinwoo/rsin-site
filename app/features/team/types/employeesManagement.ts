import type { Employee } from "~/entities/employees/model";

// Loader 타입
export interface TeamManagementLoaderData {
  employees: Employee[];
  totalCount: number;
}

// Action 타입
export interface TeamManagementActionData {
  success: boolean;
  message: string;
}

// Action Intent 타입
export type ActionIntent = "create" | "update" | "resign";
