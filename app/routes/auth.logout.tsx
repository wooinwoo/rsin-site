import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { authApi } from "~/entities/auth/api";
import { getApiToken, destroyApiToken, destroyUserInfo } from "~/cookies.server";

export async function action({ request }: ActionFunctionArgs) {
  const token = await getApiToken(request);
  const headers = new Headers();

  try {
    if (token) {
      await authApi.signOut(token);
    }
  } catch (error) {
    console.error("Logout API Error:", error);
  } finally {
    // API 성공, 실패와 관계없이 항상 쿠키 삭제
    headers.append("Set-Cookie", await destroyApiToken());
    headers.append("Set-Cookie", await destroyUserInfo());
  }

  return redirect("/auth/login", { headers });
}
