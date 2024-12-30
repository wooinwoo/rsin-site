import { client } from "~/shared/api";
import type { SignInRequest } from "./model";

export const authApi = {
  signIn(data: SignInRequest) {
    return client.post("/auth/signin", data);
  },
};
