import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { leaveApi } from "~/entities/leave/api";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const joinedAt = url.searchParams.get("joinedAt");
  const type = url.searchParams.get("type");

  if (!joinedAt) {
    return json({ error: "입사일이 필요합니다." }, { status: 400 });
  }

  try {
    if (type === "prorate") {
      const response = await leaveApi.getProrateSimulation(joinedAt);
      return json(response.data);
    } else if (type === "annual") {
      const response = await leaveApi.getAnnualSimulation(joinedAt);
      return json(response.data);
    }
  } catch (error) {
    return json({ error: "시뮬레이션 중 오류가 발생했습니다." }, { status: 500 });
  }
}
