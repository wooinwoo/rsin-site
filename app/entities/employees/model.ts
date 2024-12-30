export interface Department {
  name: string;
}

export interface Employee {
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
  role: "admin" | "user";
  department?: Department;
}

export interface CreateEmployeeRequest {
  name: string;
  departmentId: number;
  empNo: string;
  position: string;
  joinedAt: string;
  email: string;
  phone: string;
  birth: string;
  mbti?: string;
  role: "admin" | "user";
}

export interface UpdateEmployeeRequest {
  email?: string;
  phone?: string;
  birth?: string;
  mbti?: string;
}

export interface ResignEmployeeRequest {
  resignedAt: string;
}

export interface GetEmployeesResponse {
  employees: Employee[];
}
