import { useState, useEffect } from "react";
import { Modal } from "~/shared/ui/components/Modal";
import { Button } from "~/shared/ui/components/Button";
import { Select } from "~/shared/ui/components/Select";
import { Input } from "~/shared/ui/components/Input";
import { DatePicker } from "~/shared/ui/components/DatePicker";
import { ProfileEditModalProps, ProfileEditData } from "./types";
import { FORM_FIELDS } from "./constants";

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
        {FORM_FIELDS.map((field) => (
          <div key={field.name} className="space-y-1">
            <label className="block text-sm font-medium">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === "select" ? (
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
              />
            ) : field.type === "date" ? (
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
              />
            ) : (
              <Input
                required={field.required}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.name] as string}
                onChange={(e) => setFormData((prev) => ({ ...prev, [field.name]: e.target.value }))}
              />
            )}
          </div>
        ))}

        <div className="flex justify-end gap-2 pt-4 border-t border-gray-300">
          <Button type="submit" variant="red">
            수정
          </Button>
        </div>
      </form>
    </Modal>
  );
}
