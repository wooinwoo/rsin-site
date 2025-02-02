import { useState, useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import { Modal } from "~/shared/ui/components/Modal";
import { Button } from "~/shared/ui/components/Button";
import { Select } from "~/shared/ui/components/Select";
import { Input } from "~/shared/ui/components/Input";
import { DatePicker } from "~/shared/ui/components/DatePicker";
import { ProfileEditModalProps, ProfileEditData, FormField } from "./types";
import { FORM_FIELDS } from "./constants";
import { ImageUpload } from "~/shared/ui/components/ImageUpload";
import { getFullImageUrl } from "~/shared/utils/imges";
import { useAuthStore } from "~/shared/store/auth";
import { generateHash } from "~/shared/utils/common";
import { useToastStore } from "~/shared/store/toast";
export function ProfileEditModal({ isOpen, onClose, initialData }: ProfileEditModalProps) {
  const fetcher = useFetcher();
  const { user } = useAuthStore();
  const { showToast } = useToastStore();
  const [formData, setFormData] = useState<ProfileEditData>(
    initialData || {
      name: "",
      departmentId: 1,
      position: "staff",
      joinedAt: "",
      email: "",
      phone: "",
      birth: "",
      mbti: null,
      thumbnailPath: "",
    }
  );

  useEffect(() => {
    if (!isOpen) {
      setFormData(
        initialData || {
          name: "",
          departmentId: 1,
          position: "staff",
          joinedAt: "",
          email: "",
          phone: "",
          birth: "",
          mbti: null,
          thumbnailPath: "",
        }
      );
    }
  }, [initialData, isOpen]);
  const uploadImageToS3 = async (file: File): Promise<string | null> => {
    try {
      console.log("Upload started:", {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      });

      const urlFormData = new FormData();
      urlFormData.append("action", "getUploadUrl");
      urlFormData.append("path", `profile/thumbnail/${user?.sub}/${generateHash(file.name)}.jpg`);
      console.log("Requesting upload URL with path:", urlFormData.get("path"));

      const response = await fetch("/resources/profile", {
        method: "POST",
        body: urlFormData,
      });
      console.log("URL Response status:", response.status);
      const { url } = await response.json();
      console.log("Received presigned URL:", url);

      if (url) {
        try {
          const response = await fetch(url, {
            method: "PUT",
            body: file,
            headers: {
              "Content-Type": file.type,
            },
          });
          console.log("Upload Response:", {
            status: response.status,
            headers: Object.fromEntries(response.headers),
          });

          const text = await response.text();
          console.log("Upload Response text:", text);

          if (response.headers.get("content-type")?.includes("application/json")) {
            const data = JSON.parse(text);
            console.log("Upload Response JSON:", data);
          }
        } catch (error) {
          console.error("S3 Upload error:", error);
        }
        return url;
      }
      return null;
    } catch (error) {
      console.error("Image upload failed:", error);
      showToast("이미지 업로드 중 오류가 발생했습니다.", "error");
      return null;
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.birth) {
      showToast("생년월일을 입력해주세요.", "error");
      return;
    }

    const cleanThumbnailPath = formData.thumbnailPath
      ? formData.thumbnailPath.startsWith("http")
        ? new URL(formData.thumbnailPath).pathname
        : formData.thumbnailPath
      : "";

    fetcher.submit(
      {
        email: formData.email,
        phone: formData.phone,
        birth: formData.birth,
        mbti: formData.mbti,
        thumbnailPath: cleanThumbnailPath,
        action: "updateProfile",
      },
      {
        method: "POST",
        action: "/resources/profile",
      }
    );

    const responseData = fetcher.data as { error?: string };
    if (!responseData?.error) {
      onClose();
      showToast("내 정보가 수정되었습니다.", "success");
    } else {
      showToast("내 정보 수정 실패", "error");
    }
  };
  const renderField = (field: FormField) => {
    if (field.type === "image") {
      return (
        <ImageUpload
          defaultImageUrl={
            formData.thumbnailPath ? getFullImageUrl(formData.thumbnailPath) : undefined
          }
          onChange={async (file) => {
            if (file) {
              const uploadedUrl = await uploadImageToS3(file);
              if (uploadedUrl) {
                setFormData((prev) => ({
                  ...prev,
                  profileImage: file,
                  thumbnailPath: uploadedUrl,
                }));
              }
            }
          }}
          accept="image/*"
        >
          <Button type="button" variant="outline" disabled={field.disabled}>
            {formData.profileImage || formData.thumbnailPath ? "이미지 변경" : "이미지 업로드"}
          </Button>
        </ImageUpload>
      );
    }

    if (field.type === "select") {
      return (
        <Select
          required={field.required}
          options={field.options || []}
          value={String(formData[field.name])}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              [field.name]: field.name === "departmentId" ? Number(value) : value,
            }))
          }
          disabled={field.disabled}
        />
      );
    }

    if (field.type === "date") {
      return (
        <DatePicker
          required={field.required}
          isRange={false}
          value={formData[field.name] ? new Date(formData[field.name] as string) : null}
          onChange={(date) => {
            setFormData((prev) => ({
              ...prev,
              [field.name]: date instanceof Date ? date.toISOString().split("T")[0] : "",
            }));
          }}
          disabled={field.disabled}
        />
      );
    }

    return (
      <Input
        required={field.required}
        type={field.type}
        placeholder={field.placeholder}
        value={formData[field.name] as string}
        onChange={(e) => setFormData((prev) => ({ ...prev, [field.name]: e.target.value }))}
        disabled={field.disabled}
      />
    );
  };

  const formId = "profile-edit-form"; // 고유한 form ID
  const footer = (
    <div className="flex justify-end">
      <Button
        type="submit"
        variant="red"
        size="md"
        disabled={fetcher.state === "submitting"}
        form={formId}
      >
        {fetcher.state === "submitting" ? "수정 중..." : "수정"}
      </Button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="내 정보 수정" footer={footer}>
      <fetcher.Form onSubmit={handleSubmit} className="space-y-4" id={formId}>
        {/* 상단 그룹: 프로필 이미지, 이름, 휴대폰 번호 */}
        <div className="flex gap-4">
          {/* 프로필 이미지 */}
          <div className="w-1/3">
            {FORM_FIELDS.filter((field) => field.name === "profileImage").map((field) => (
              <div key={field.name} className="space-y-1">
                <label className="block text-sm font-medium">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                {renderField(field)}
              </div>
            ))}
          </div>

          {/* 이름과 휴대폰 번호 */}
          <div className="w-2/3 space-y-4">
            {FORM_FIELDS.filter((field) => ["name", "phone"].includes(field.name)).map((field) => (
              <div key={field.name} className="space-y-1">
                <label className="block text-sm font-medium">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                {renderField(field)}
              </div>
            ))}
          </div>
        </div>

        {/* 나머지 필드들 */}
        {FORM_FIELDS.filter((field) => !["profileImage", "name", "phone"].includes(field.name)).map(
          (field) => (
            <div key={field.name} className="space-y-1">
              <label className="block text-sm font-medium">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              {renderField(field)}
            </div>
          )
        )}
      </fetcher.Form>
    </Modal>
  );
}
