import type { Employee } from "~/entities/employees/model";
import type { TeamMemberAddData } from "~/features/team/components/TeamMemberAddModal/types";

export function getInitialModalData(member: Employee | null): TeamMemberAddData | undefined {
  if (!member) {
    return;
  }

  return {
    name: member.name,
    phone: member.phone,
    email: member.email,
    departmentId: member.department?.id ?? 1,
    position: member.position,
    joinedAt: member.joinedAt,
    birth: member.birth,
    mbti: member.mbti || "",
    role: member.role,
    thumbnailPath: member.thumbnailPath || "",
  };
}
