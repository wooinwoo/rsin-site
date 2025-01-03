import { client } from "~/shared/api";
import type { SignInRequest, SignInResponse, MyProfileResponse } from "./model";

export const authApi = {
  signIn(data: SignInRequest) {
    return client.post<SignInResponse>("/auth/signin", data);
  },
  signOut(cookieHeader?: string | null) {
    return client.post("/auth/signout", {
      headers: {
        Cookie: cookieHeader || "",
      },
    });
  },

  getMyProfile(cookieHeader?: string | null) {
    return client.get<MyProfileResponse>("/employees/self", {
      headers: {
        Cookie: cookieHeader || "",
      },
    });
  },
};
