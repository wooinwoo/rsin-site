export interface User {
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
  role?: string;
  sub?: number;
}

export interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (additionalInfo: Partial<User>) => void;
  clearUser: () => void;
}
