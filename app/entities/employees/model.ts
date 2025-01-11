export interface Department {
  id: number;
  name: string;
}

export interface Employee {
  id: number;
  name: string;
  empNo: string;
  thumbnailPath: string;
  position: string;
  joinedAt: string;
  email: string;
  phone: string;
  birth: string;
  resignedAt?: string;
  mbti: string;
  role: "admin" | "employee";
  department?: Department;
}

export interface GetEmployeesParams {
  size?: number;
  page?: number;
  departmentId?: number;
  employeeName?: string;
}

export interface CreateEmployeeRequest {
  name: string;
  departmentId: number;
  position: string;
  joinedAt: string;
  email: string;
  phone: string;
  birth: string;
  mbti?: string;
  role: "admin" | "employee";
}

export interface UpdateEmployeeRequest {
  name?: string;
  departmentId?: number;
  position?: string;
  joinedAt?: string;
  email?: string;
  phone?: string;
  birth?: string;
  mbti?: string;
  role?: "admin" | "user";
}

export interface ResignEmployeeRequest {
  resignedAt: string;
}

export interface GetEmployeesResponse {
  employees: Employee[];
}

export interface GetThumbnailUploadUrlResponse {
  url: string;
}
