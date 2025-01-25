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
  status?: "pending" | "approved" | "rejected";
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
    id: number;
    name: string;
    departmentId: number;
    position: string;
    approverId: number;
    thumbnailPath: string;
    step: number;
    status: "pending" | "approved" | "rejected";
    processedAt: string;
  }>;
}

export interface LeaveDetail {
  type: string;
  startedAt: string;
  endedAt: string;
  reason: string;
  submittedAt: string;
  requester: {
    id: number;
    name: string;
    departmentId: number;
    position: string;
    thumbnailPath: string;
  };
  approvals: Array<{
    status: "pending" | "approved" | "rejected";
    name: string;
    departmentId: number;
    position: string;
  }>;
}

export interface ApproveRequest {
  approvals: number[];
}

export type GetLeaveDetailResponse = LeaveDetail[];

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

export interface MyAnnual {
  total: number;
  used: number;
  remain: number;
}

export type GetMyAnnualResponse = MyAnnual;

export interface CreateLeaveRequest {
  document: {
    type: "leave";
  };
  documentLeave: {
    type: "annual";
    startedAt: string;
    endedAt: string;
    reason: string;
  };
}

export interface Department {
  id: number;
  name: string;
}

export interface Approver {
  id: number;
  name: string;
  position: string;
  department: Department;
}

export type GetApproverLinesResponse = Approver[];

export interface ProrateSimulationResponse {
  attendanceRate: number;
  offset: number;
  amount: number;
  grantAt: string;
  joinedYearWorkdays: number;
  nextYearWorkdays: number;
}

export interface AnnualSimulationItem {
  grantAt: string;
  amount: number;
}

export type AnnualSimulationResponse = AnnualSimulationItem[];
