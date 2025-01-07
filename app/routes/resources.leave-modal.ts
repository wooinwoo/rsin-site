// app/routes/resources.leave-modal.ts
import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { getMyAnnual, createLeave, getApproverLines } from "~/features/leave/api/leave.server";
import type { CreateLeaveRequest } from "~/entities/leave/model";

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

  return json(await createLeave(request, data));
}
