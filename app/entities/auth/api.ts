import { client } from "~/shared/api";
import type { SignInRequest, SignInResponse } from "./model";

export const authApi = {
  signIn(data: SignInRequest) {
    return client.post<SignInResponse>("/auth/signin", data);
  },
};
