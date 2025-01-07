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

export async function getLeaves(request: Request, params?: GetLeavesParams) {
  return withAuth(request, async (token) => {
    const response = await leaveApi.getLeaves(token, params);
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
    console.log("data,data,", data);
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
