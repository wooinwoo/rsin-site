import { withAuth } from "~/shared/api/withAuth";
import { leaveApi } from "~/entities/leave/api";
import type {
  GetEmployeeAnnualParams,
  GetLeavesParams,
  CreateLeaveRequest,
} from "~/entities/leave/model";

export async function getAnnualStatus(request: Request, params?: GetEmployeeAnnualParams) {
  return withAuth(request, async (token) => {
    const response = await leaveApi.getAnnualStatus(token, params);
    return response.data;
  });
}

export async function getLeavesPending(request: Request, params?: GetLeavesParams) {
  return withAuth(request, async (token) => {
    const response = await leaveApi.getLeavesPending(token, params);
    return response.data;
  });
}

export async function getLeavesDone(request: Request, params?: GetLeavesParams) {
  return withAuth(request, async (token) => {
    const response = await leaveApi.getLeavesDone(token, params);
    return response.data;
  });
}

export async function getLeaveDetail(request: Request, documentId: number) {
  return withAuth(request, async (token) => {
    const response = await leaveApi.getLeaveDetail(token, documentId);
    return response.data;
  });
}

export async function approveLeaves(request: Request, leaveIds: number[]) {
  return withAuth(request, async (token) => {
    const response = await leaveApi.approve(token, { approvals: leaveIds });
    return response.data;
  });
}

export async function rejectLeave(request: Request, leaveId: number) {
  return withAuth(request, async (token) => {
    const response = await leaveApi.reject(token, leaveId);
    return response.data;
  });
}

export async function getMyAnnual(request: Request) {
  return withAuth(request, async (token) => {
    const response = await leaveApi.getMyAnnual(token);
    return response.data;
  });
}

export async function createLeave(request: Request, data: CreateLeaveRequest) {
  return withAuth(request, async (token) => {
    const response = await leaveApi.createLeave(token, data);
    return response.data;
  });
}

export async function getApproverLines(request: Request) {
  return withAuth(request, async (token) => {
    const response = await leaveApi.getApproverLines(token);
    return response.data;
  });
}
