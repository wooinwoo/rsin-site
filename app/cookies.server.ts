import { createCookie } from "@remix-run/node";

export const apiTokenCookie = createCookie("api-token", {
  secrets: ["123123213"],
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
});

export async function saveApiToken(token: string) {
  return await apiTokenCookie.serialize(token);
}

export async function getApiToken(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  return await apiTokenCookie.parse(cookieHeader);
}
