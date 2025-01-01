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

export interface MyProfileResponse {
  name: string;
  departmentId: number;
  empNo: string;
  position: string;
  joinedAt: string;
  email: string;
  phone: string;
  birth: string;
  mbti: string;
  thumbnailPath: string | null;
}
