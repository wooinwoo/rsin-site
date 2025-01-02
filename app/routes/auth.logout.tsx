import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { authApi } from "~/entities/auth/api";
import { getApiToken } from "~/cookies.server";

export async function action({ request }: ActionFunctionArgs) {
  const token = await getApiToken(request);
  await authApi.server.signOut(token);
  return redirect("/auth/login", {
    headers: {
      "Set-Cookie": "api-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
    },
  });
}
