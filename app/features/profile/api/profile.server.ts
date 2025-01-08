import { employeeApi } from "~/entities/employees/api";
import { withAuth } from "~/shared/api/withAuth";

interface UpdateProfileData {
  email?: string;
  phone?: string;
  birth?: string;
  mbti?: string;
}

export async function updateProfile(request: Request, data: UpdateProfileData) {
  return withAuth(request, async (token) => {
    await employeeApi.updateSelf(token, data);
    return { success: true, message: "프로필이 수정되었습니다." };
  });
}

export async function getThumbnailUploadUrl(request: Request, path: string) {
  return withAuth(request, async (token) => {
    const response = await employeeApi.getThumbnailUploadUrl(token, path);
    return response.data;
  });
}
