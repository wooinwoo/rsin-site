import type { Employee } from "~/entities/employees/model";

export interface TeamMemberCardProps {
  item: Employee;
  onEdit?: (employee: Employee) => void;
  onDelete?: (employee: Employee) => void;
}
