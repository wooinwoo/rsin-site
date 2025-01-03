export interface Leave {
  id: number;
  type: "annual";
  startedAt: string;
  endedAt: string;
}
export interface Department {
  id: number;
  name: string;
}

export interface EmployeeAnnual {
  name: string;
  empNo: string;
  position: string;
  joinedAt: string;
  index: number;
  department: Department;
  tenure: number;
  leave: Leave;
}

export interface GetEmployeeAnnualResponse {
  totalCount: number;
  employees: EmployeeAnnual[];
}

export interface GetEmployeeAnnualParams {
  size?: number;
  page?: number;
  departmentId?: number;
  employeeName?: string;
}
