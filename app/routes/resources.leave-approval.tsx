import { json, type ActionFunctionArgs } from "@remix-run/node";
import { approveLeaves, rejectLeave } from "~/features/leave/api/leave.server";
import { withAuth } from "~/shared/api/withAuth";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const action = formData.get("action");

  try {
    const leaveId = Number(formData.get("leaveId"));
    const status = formData.get("status") as "approve" | "reject" | "approved";
    // 일괄 승인 처리
    console.log("#############");
    console.log("leaveId : ", leaveId);
    console.log("status : ,", status);
    if (status === "approved") {
      const approvalIdsString = formData.get("approvalIds") as string;
      const approvalIds = JSON.parse(approvalIdsString) as number[];

      await approveLeaves(request, approvalIds);
      return json({ success: true });
    }

    // 개별 승인/거절 처리

    if (status === "approve") {
    } else if (status === "reject") {
      await approveLeaves(request, [leaveId]);
      await rejectLeave(request, leaveId);
    }

    return json({ success: true });
  } catch (error) {
    console.error("Leave approval error:", error);
    return json(
      {
        success: false,
        message: "휴가 결재 처리 중 오류가 발생했습니다.",
      },
      { status: 400 }
    );
  }
};
