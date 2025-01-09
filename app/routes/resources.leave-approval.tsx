import { json, type ActionFunctionArgs } from "@remix-run/node";
import { approveLeaves, rejectLeave } from "~/features/leave/api/leave.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  try {
    const status = formData.get("status") as "approve" | "reject" | "approved";
    const leaveId = Number(formData.get("leaveId"));

    if (status === "approved") {
      const approvalIdsString = formData.get("approvalIds") as string;
      const approvalIds = JSON.parse(approvalIdsString) as number[];
      await approveLeaves(request, approvalIds);
      return json({ status: "approve", success: true });
    }

    if (status === "approve") {
      await approveLeaves(request, [leaveId]);
      return json({ status: "approve", success: true });
    }

    if (status === "reject") {
      await rejectLeave(request, leaveId);
      return json({ status: "reject", success: true });
    }

    throw new Error("Invalid status");
  } catch (error) {
    console.error("Leave approval error:", error);
    return json(
      {
        error: "휴가 결재 처리 중 오류가 발생했습니다.",
        success: false,
      },
      { status: 400 }
    );
  }
};
