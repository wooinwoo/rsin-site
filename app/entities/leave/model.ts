export interface Leave {
  total: number;
  used: number;
  remain: number;
}
export interface Department {
  id: number;
  name: string;
}

export interface EmployeeAnnual {
  thumbnailPath: string;
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

export interface LeaveDocument {
  id: number;
  submittedAt: string;
  leave: {
    type: "annual" | "annual_am" | "annual_pm";
    startedAt: string;
    endedAt: string;
    reason: string;
  };
  requester: {
    id: number;
    name: string;
    departmentId: number;
    position: string;
    thumbnailPath: string;
  };
  approvals: Array<{
    name: string;
    departmentId: number;
    position: string;
    thumbnailPath: string;
    step: number;
    status: "pending" | "approved" | "rejected";
    processedAt: string;
  }>;
}

export interface GetLeavesParams {
  size?: number;
  page?: number;
  type?: "annual" | "annual_am" | "annual_pm";
  startDate?: string;
  endDate?: string;
  applicant?: string;
  processDate?: string;
  approvalStatus?: "pending" | "approved" | "rejected";
  scope?: "self" | "all";
}

export interface GetLeavesResponse {
  totalCount: number;
  documents: LeaveDocument[];
}
