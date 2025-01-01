import { client } from "~/shared/api";
import type { SignInRequest, SignInResponse, MyProfileResponse } from "./model";

export const authApi = {
  signIn: (data: SignInRequest) => {
    return client.post<SignInResponse>("/auth/signin", data, {
      credentials: "include",
    });
  },
  signOut() {
    return client.post("/auth/signout");
  },
  getMyProfile() {
    return client.get<MyProfileResponse>("/employees/self");
  },
};
