import { json, type ActionFunctionArgs } from "@remix-run/node";
import { updateProfile, getThumbnailUploadUrl } from "~/features/profile/api/profile.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "updateProfile") {
    const updateData = {
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      birth: formData.get("birth") as string,
      mbti: formData.get("mbti") as string,
      thumbnailPath: formData.get("thumbnailPath") as string,
    };

    try {
      const result = await updateProfile(request, updateData);
      return json(result);
    } catch (error) {
      return json({ error: "프로필 수정에 실패했습니다." }, { status: 400 });
    }
  }

  if (action === "getUploadUrl") {
    const path = formData.get("path") as string;
    try {
      const result = await getThumbnailUploadUrl(request, path);
      return json(result);
    } catch (error) {
      return json({ error: "업로드 URL 발급에 실패했습니다." }, { status: 400 });
    }
  }

  return json({ error: "잘못된 요청입니다." }, { status: 400 });
};
