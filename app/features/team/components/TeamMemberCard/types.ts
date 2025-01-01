import type { Employee } from "~/entities/employees/model";

export interface TeamMemberCardProps {
  item: Employee;
  onClick?: (employee: Employee) => void;
}
