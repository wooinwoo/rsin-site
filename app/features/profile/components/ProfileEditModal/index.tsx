import { useState, useEffect } from "react";
import { Modal } from "~/shared/ui/components/Modal";
import { Button } from "~/shared/ui/components/Button";
import { Select } from "~/shared/ui/components/Select";
import { Input } from "~/shared/ui/components/Input";
import { DatePicker } from "~/shared/ui/components/DatePicker";
import { ProfileEditModalProps, ProfileEditData, FormField } from "./types";
import { FORM_FIELDS } from "./constants";
import { ImageUpload } from "~/shared/ui/components/ImageUpload";

export function ProfileEditModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: ProfileEditModalProps) {
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
    }
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const renderField = (field: FormField) => {
    if (field.type === "image") {
      return (
        <ImageUpload
          onChange={(file) =>
            setFormData((prev) => ({
              ...prev,
              profileImage: file,
            }))
          }
          accept="image/*"
        >
          <Button type="button" variant="outline" disabled={field.disabled}>
            {formData.profileImage || formData.profileImageUrl ? "이미지 변경" : "이미지 업로드"}
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
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await onSubmit(formData);
            onClose();
          } catch (error) {
            console.error(error);
          }
        }}
      >
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
          <Button type="submit" variant="red" size="md">
            수정
          </Button>
        </div>
      </form>
    </Modal>
  );
}
