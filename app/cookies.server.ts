import { createCookie } from "@remix-run/node";
import { User } from "~/shared/store/auth/types";
import type { SignInResponse } from "~/entities/auth/model";
export const apiTokenCookie = createCookie("api-token", {
  secrets: ["123123213"],
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
});
export const userCookie = createCookie("user-info", {
  secrets: ["123123213"],
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
});

export async function saveApiToken(token: string) {
  return await apiTokenCookie.serialize(token);
}
export async function saveUserInfo(user: SignInResponse) {
  return await userCookie.serialize(user);
}

export async function getApiToken(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  return await apiTokenCookie.parse(cookieHeader);
}

export async function getUserInfo(request: Request): Promise<SignInResponse | null> {
  const cookieHeader = request.headers.get("Cookie");
  return await userCookie.parse(cookieHeader);
}

export async function destroyApiToken() {
  return `api-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

export async function destroyUserInfo() {
  return `user-info=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}
