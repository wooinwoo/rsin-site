export interface User {
  role: "employee" | "admin";
  sub: number;
  email: string;
  name: string;
  thumbnailPath: string | null;
  position: string;
  departmentId: number;
}

export interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}
