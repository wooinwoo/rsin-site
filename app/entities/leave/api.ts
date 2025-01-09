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

  getLeaves(CookieHeader?: string, params?: GetLeavesParams) {
    const searchParams = new URLSearchParams();

    if (params?.size) searchParams.append("size", params.size.toString());
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.type) searchParams.append("type", params.type);
    if (params?.scope) searchParams.append("scope", params.scope);
    if (params?.startDate) searchParams.append("startDate", params.startDate);
    if (params?.endDate) searchParams.append("endDate", params.endDate);
    if (params?.applicant) searchParams.append("applicant", params.applicant);
    if (params?.approvalStatus) searchParams.append("approvalStatus", params.approvalStatus);

    return client.get<GetLeavesResponse>(`/documents/leaves?${searchParams.toString()}`, {
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
};
