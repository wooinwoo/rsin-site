import type { Employee } from "~/entities/employees/model";
import type { TeamMemberAddData } from "~/features/team/components/TeamMemberAddModal/types";

export function getInitialModalData(member: Employee | null): TeamMemberAddData {
  console.log("getInitialModalData", member);
  if (!member) {
    return {
      name: "",
      phone: "",
      email: "",
      department: "",
      position: "",
      joinDate: "",
      birthDate: "",
      mbti: null,
      isManager: false,
    };
  }

  return {
    name: member.name,
    phone: member.phone,
    email: member.email,
    department: member.department?.name ?? "",
    position: member.position,
    joinDate: member.joinedAt,
    birthDate: member.birth,
    mbti: member.mbti,
    isManager: member.role === "admin",
  };
}
