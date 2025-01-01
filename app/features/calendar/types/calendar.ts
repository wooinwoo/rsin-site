export type ViewMode = "calendar" | "list";

export interface CalendarDate {
  date: Date;
  isToday: boolean;
  isCurrentMonth: boolean;
  formattedDate: string;
}
