export interface Department {
  id: number;
  name: string;
}

export interface Employee {
  id: number;
  name: string;
  empNo: string;
  profileUrl: string;
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
