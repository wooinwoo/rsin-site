import { client } from "~/shared/api";
import type { PasswordResetRequest, ResetPasswordRequest } from "./model";

export const accountApi = {
  requestPasswordReset(data: PasswordResetRequest) {
    return client.post("/accounts/password-reset/request", data);
  },

  resetPassword(accessToken: string, data: ResetPasswordRequest) {
    return client.post("/accounts/password-reset", data, {
      params: { accessToken },
    });
  },
};
