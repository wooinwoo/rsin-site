// app/routes/resources.leave-modal.ts
import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { getMyAnnual, createLeave, getApproverLines } from "~/features/leave/api/leave.server";
import type { CreateLeaveRequest } from "~/entities/leave/model";
export interface LeaveModalResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// 연차 현황 조회
export async function loader({ request }: LoaderFunctionArgs) {
  const [annual, approvers] = await Promise.all([getMyAnnual(request), getApproverLines(request)]);
  return json({
    annualStatus: annual,
    approvers,
  });
}

// 휴가 신청
export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const jsonData = JSON.parse(formData.get("json") as string);

    const data: CreateLeaveRequest = {
      document: {
        type: "leave" as const,
      },
      documentLeave: {
        type: jsonData.documentLeave.type,
        startedAt: jsonData.documentLeave.startedAt,
        endedAt: jsonData.documentLeave.endedAt,
        reason: jsonData.documentLeave.reason,
      },
    };

    const result = await createLeave(request, data);

    // 성공 응답 추가
    return json<LeaveModalResponse>({
      success: true,
      data: result,
    });
  } catch (error) {
    // 에러 응답 추가
    return json<LeaveModalResponse>({
      success: false,
      error: error instanceof Error ? error.message : "휴가 신청 중 오류가 발생했습니다.",
    });
  }
}
