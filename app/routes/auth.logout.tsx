import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { authApi } from "~/entities/auth/api";
import { getApiToken, destroyApiToken, destroyUserInfo } from "~/cookies.server";

export async function action({ request }: ActionFunctionArgs) {
  const token = await getApiToken(request);

  try {
    if (token) {
      await authApi.signOut(token);
    }
  } catch (error) {
    console.error("Logout API Error:", error);
  }

  const headers = new Headers();
  try {
    headers.append("Set-Cookie", await destroyApiToken());
    headers.append("Set-Cookie", await destroyUserInfo());
  } catch (error) {
    console.error("Logout Cookie Error:", error);
  }

  return redirect("/auth/login", { headers });
}
