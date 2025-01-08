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
import { ApiError } from "~/shared/api/errors/ApiError";
export function ProfileEditModal({ isOpen, onClose, initialData }: ProfileEditModalProps) {
  const fetcher = useFetcher();
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
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 기본 정보만 전송
    const basicInfo = {
      email: formData.email,
      phone: formData.phone,
      birth: formData.birth,
      mbti: formData.mbti,
    };

    // 기본 정보 업데이트
    fetcher.submit(
      { ...basicInfo, action: "updateProfile" },
      {
        method: "POST",
        action: "/resources/profile",
      }
    );

    // 이미지가 변경되었다면 별도로 처리
    if (formData.profileImage) {
      try {
        const urlFormData = new FormData();
        urlFormData.append("action", "getUploadUrl");
        urlFormData.append("path", formData.profileImage.name);

        // 이미지 업로드 URL 요청
        fetcher.submit(urlFormData, {
          method: "POST",
          action: "/resources/profile",
        });

        // fetcher.data 타입 단언 및 체크
        const responseData = fetcher.data as { url?: string };
        if (responseData?.url) {
          await fetch(responseData.url, {
            method: "PUT",
            body: formData.profileImage,
            headers: {
              "Content-Type": formData.profileImage.type,
            },
          });
        }
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
      }
    }

    // 에러가 없으면 모달 닫기
    const responseData = fetcher.data as { error?: string };
    if (!responseData?.error) {
      onClose();
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
              try {
                const urlFormData = new FormData();
                urlFormData.append("action", "getUploadUrl");
                urlFormData.append("path", file.name);

                fetcher.submit(urlFormData, {
                  method: "POST",
                  action: "/resources/profile",
                });

                const responseData = fetcher.data as { url?: string };
                if (responseData?.url) {
                  await fetch(responseData.url, {
                    method: "PUT",
                    body: file,
                    headers: {
                      "Content-Type": file.type,
                    },
                  });

                  setFormData((prev) => ({
                    ...prev,
                    profileImage: file,
                    thumbnailPath: responseData.url,
                  }));
                }
              } catch (error) {
                console.error("이미지 업로드 실패:", error);
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="내 정보 수정">
      <fetcher.Form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="flex justify-end gap-2 pt-4 border-t border-gray-300">
          <Button type="submit" variant="red" size="md" disabled={fetcher.state === "submitting"}>
            {fetcher.state === "submitting" ? "수정 중..." : "수정"}
          </Button>
        </div>
      </fetcher.Form>
    </Modal>
  );
}
