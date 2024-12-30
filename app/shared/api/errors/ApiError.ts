export class ApiError extends Error {
  constructor(
    public message: string,
    public status?: number,
    public code?: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiError";
  }

  static fromAxiosError(error: any) {
    const response = error.response;
    if (!response) {
      return new ApiError("네트워크 에러가 발생했습니다.");
    }

    return new ApiError(
      response.data?.message || "알 수 없는 에러가 발생했습니다.",
      response.status,
      response.data?.code,
      response.data?.errors
    );
  }
}
