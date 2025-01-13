import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { authApi } from "~/entities/auth/api";
import { getApiToken } from "~/cookies.server";

export async function action({ request }: ActionFunctionArgs) {
  const token = await getApiToken(request);
  try {
    await authApi.signOut(token);
  } catch (error) {
    console.error("Logout API Error:", error);
  }

  return redirect("/auth/login", {
    headers: {
      "Set-Cookie": [
        "api-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
        "user-info=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
      ].join(", "),
    },
  });
}
