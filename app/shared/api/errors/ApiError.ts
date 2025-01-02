import type { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

export class ApiError extends Error {
  constructor(
    public message: string,
    public status?: number,
    public code?: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiError";
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static fromAxiosError(error: AxiosError<unknown>) {
    // 여기를 수정
    const response = error.response;
    if (!response) {
      return new ApiError("네트워크 에러가 발생했습니다.");
    }

    const data = response.data as ErrorResponse; // 타입 단언
    return new ApiError(
      data?.message || "알 수 없는 에러가 발생했습니다.",
      response.status,
      data?.code,
      data?.errors
    );
  }
}
