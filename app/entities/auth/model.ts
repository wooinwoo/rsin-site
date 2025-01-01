export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  role: "employee" | "admin";
  sub: number;
  email: string;
  name: string;
  thumbnailPath: string | null;
  position: string;
  departmentId: number;
}
