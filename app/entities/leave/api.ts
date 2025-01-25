import { client } from "~/shared/api";
import type {
  GetEmployeeAnnualParams,
  GetEmployeeAnnualResponse,
  GetLeavesParams,
  GetLeavesResponse,
  GetMyAnnualResponse,
  CreateLeaveRequest,
  GetApproverLinesResponse,
  GetLeaveDetailResponse,
  ApproveRequest,
  ProrateSimulationResponse,
  AnnualSimulationResponse,
} from "./model";

export const leaveApi = {
  getAnnualStatus(CookieHeader?: string, params?: GetEmployeeAnnualParams) {
    const searchParams = new URLSearchParams();

    if (params?.size) searchParams.append("size", params.size.toString());
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.departmentId) searchParams.append("departmentId", params.departmentId.toString());
    if (params?.employeeName) searchParams.append("employeeName", params.employeeName);

    return client.get<GetEmployeeAnnualResponse>(`/leaves/annual?${searchParams.toString()}`, {
      headers: {
        Cookie: CookieHeader || "",
      },
    });
  },

  getLeavesPending(CookieHeader?: string, params?: GetLeavesParams) {
    return client.get<GetLeavesResponse>(`/documents/leaves/pending?${params?.toString()}`, {
      headers: {
        Cookie: CookieHeader || "",
      },
    });
  },

  getLeavesDone(CookieHeader?: string, params?: GetLeavesParams) {
    return client.get<GetLeavesResponse>(`/documents/leaves/done?${params?.toString()}`, {
      headers: {
        Cookie: CookieHeader || "",
      },
    });
  },

  getLeaveDetail(CookieHeader: string, documentId: number) {
    return client.get<GetLeaveDetailResponse>(`/documents/leaves/${documentId}`, {
      headers: {
        Cookie: CookieHeader || "",
      },
    });
  },

  approve(CookieHeader: string, data: ApproveRequest) {
    return client.post("/approvals/approve", data, {
      headers: {
        Cookie: CookieHeader || "",
      },
    });
  },

  reject(CookieHeader: string, approvalId: number) {
    return client.patch(
      `/approvals/${approvalId}/reject`,
      { id: approvalId },
      {
        headers: {
          Cookie: CookieHeader || "",
        },
      }
    );
  },

  getMyAnnual(CookieHeader?: string) {
    return client.get<GetMyAnnualResponse>("/leaves/annual/self", {
      headers: {
        Cookie: CookieHeader || "",
      },
    });
  },

  createLeave(CookieHeader: string, data: CreateLeaveRequest) {
    return client.post("/leaves", data, {
      headers: {
        Cookie: CookieHeader || "",
      },
    });
  },

  getApproverLines(CookieHeader?: string) {
    return client.get<GetApproverLinesResponse>("/approvers/lines/self", {
      headers: {
        Cookie: CookieHeader || "",
      },
    });
  },
  getProrateSimulation(joinedAt: string) {
    return client.get<ProrateSimulationResponse>(
      `/leaves/annual/simulations/prorate?joinedAt=${joinedAt}`
    );
  },

  getAnnualSimulation(joinedAt: string) {
    return client.get<AnnualSimulationResponse[]>(
      `/leaves/annual/simulations/annual?joinedAt=${joinedAt}`
    );
  },
};
